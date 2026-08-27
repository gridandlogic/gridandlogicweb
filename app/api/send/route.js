import { Resend } from "resend";
import { site } from "@/app/data/site";

// Instantiated lazily so a missing key is a request-time error rather than a
// build-time crash (the reason for the upstream `a0392f8` fix).
let resend;

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const LIMITS = { name: 100, email: 200, message: 5000 };

/**
 * Submitted values land inside an HTML email, so they have to be escaped.
 * Without this, anything a visitor types is live markup in the inbox.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(body) {
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) return { error: "Please fill in every field." };
  if (name.length > LIMITS.name) return { error: "That name is too long." };
  if (email.length > LIMITS.email) return { error: "That email address is too long." };
  if (message.length > LIMITS.message) return { error: "That message is too long." };
  // Deliberately loose: enough to catch typos without rejecting valid addresses.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  return { data: { name, email, message } };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { data: fields, error: invalid } = validate(body);
  if (invalid) return Response.json({ error: invalid }, { status: 400 });

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set");
    return Response.json(
      { error: "The form is not configured yet. Please email us instead." },
      { status: 503 }
    );
  }

  const { name, email, message } = fields;
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
  };

  try {
    const { data, error } = await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`,
      to: process.env.RESEND_TO_EMAIL || site.email,
      subject: `New enquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6">
          <p><strong>Name:</strong> ${safe.name}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Message:</strong></p>
          <p>${safe.message}</p>
        </div>
      `,
    });

    if (error) {
      // Resend's error can carry provider detail; log it, don't return it.
      console.error("[contact] resend error", error);
      return Response.json(
        { error: "We could not send that. Please email us directly." },
        { status: 502 }
      );
    }

    return Response.json({ id: data?.id ?? null }, { status: 200 });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return Response.json(
      { error: "We could not send that. Please email us directly." },
      { status: 500 }
    );
  }
}
