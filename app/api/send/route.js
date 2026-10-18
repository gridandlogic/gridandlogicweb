import nodemailer from "nodemailer";
import { Resend } from "resend";
import { servicePages } from "@/app/data/agency";
export const runtime = "nodejs";
export const maxDuration = 30;
const attempts = new Map();
const services = new Set([
  ...servicePages.map((s) => s.name),
  "A little bit of everything",
]);
function response(error, status) {
  return Response.json(
    { error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
function escape(value) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
export async function POST(request) {
  const origin = request.headers.get("origin");
  const allowed = new Set([
    new URL(request.url).origin,
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.gridandlogic.com",
  ]);
  if (origin && !allowed.has(origin))
    return response("This request could not be accepted.", 403);
  let body;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text, "utf8") > 24000)
      return response("Your message is too long.", 413);
    body = JSON.parse(text);
  } catch {
    return response("Please send a valid project brief.", 400);
  }
  if (typeof body?.website === "string" && body.website.trim())
    return response("This request could not be accepted.", 400);
  const fields = {};
  for (const [key, limit] of Object.entries({
    name: 100,
    email: 200,
    service: 100,
    message: 5000,
  })) {
    const value = typeof body?.[key] === "string" ? body[key].trim() : "";
    if (!value || value.length > limit)
      return response(
        "Please complete every field within the displayed limits.",
        400,
      );
    fields[key] = value;
  }
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) ||
    /[\r\n]/.test(fields.name) ||
    !services.has(fields.service)
  )
    return response("Please check your email and selected service.", 400);
  const smtpReady = Boolean(process.env.SMTP_USER && process.env.SMTP_PASSWORD);
  const resendReady = Boolean(
    process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL,
  );
  if (!smtpReady && !resendReady)
    return response(
      "Email is temporarily unavailable. Please use WhatsApp or email info@gridandlogic.com directly.",
      503,
    );
  const now = Date.now();
  for (const [key, value] of attempts) {
    if (now - value.start > 600000) attempts.delete(key);
  }
  const ip = (request.headers.get("x-forwarded-for") || "unknown")
    .split(",")[0]
    .trim();
  const count = attempts.get(ip) || { start: now, count: 0 };
  if (count.count >= 5)
    return response(
      "Please wait a few minutes before sending another enquiry.",
      429,
    );
  if (attempts.size < 2000 || attempts.has(ip)) {
    attempts.set(ip, { ...count, count: count.count + 1 });
  }
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    (smtpReady
      ? `Grid & Logic <${process.env.SMTP_USER}>`
      : process.env.RESEND_FROM_EMAIL);
  const to =
    process.env.CONTACT_TO_EMAIL ||
    process.env.RESEND_TO_EMAIL ||
    "info@gridandlogic.com";
  const safe = Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, escape(v)]),
  );
  const email = {
    from,
    to,
    replyTo: fields.email,
    subject: `Project enquiry: ${fields.service} — ${fields.name}`,
    text: `Name: ${fields.name}\nEmail: ${fields.email}\nService: ${fields.service}\n\n${fields.message}`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.7"><h2>New Grid &amp; Logic enquiry</h2><p><b>Name:</b> ${safe.name}<br><b>Email:</b> ${safe.email}<br><b>Service:</b> ${safe.service}</p><p>${safe.message.replace(/\n/g, "<br>")}</p></div>`,
  };
  try {
    if (smtpReady) {
      const port = Number(process.env.SMTP_PORT || 465);
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.hostinger.com",
        port,
        secure: port === 465,
        requireTLS: port !== 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });
      try {
        const sent = await transport.sendMail(email);
        if (!sent.accepted?.length) throw Error("delivery_failed");
      } finally {
        transport.close();
      }
    } else {
      const result = await new Resend(process.env.RESEND_API_KEY).emails.send(
        email,
      );
      if (result.error || !result.data?.id) throw Error("delivery_failed");
    }
    return Response.json(
      { sent: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    console.error("[contact] email delivery failed");
    return response(
      "We could not send your enquiry. Please use WhatsApp or email info@gridandlogic.com directly.",
      502,
    );
  }
}
