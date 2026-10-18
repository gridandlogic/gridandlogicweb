"use client";
import { useEffect, useState } from "react";
import { servicePages } from "@/app/data/agency";
export function EnquiryForm() {
  const [status, setStatus] = useState("idle"),
    [message, setMessage] = useState(""),
    [whatsapp, setWhatsapp] = useState("");
  useEffect(() => {
    const s = new URLSearchParams(location.search).get("service");
    const select = document.querySelector("#project-form select");
    if (s && select) select.value = s;
  }, []);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    setMessage("");
    const fields = Object.fromEntries(new FormData(form));
    const text = `Hi Grid & Logic!\n\nName: ${fields.name}\nEmail: ${fields.email}\nService: ${fields.service}\n\n${fields.message}`;
    setWhatsapp("https://wa.me/923374992211?text=" + encodeURIComponent(text));
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok)
        throw Error(
          data.error ||
            "Email is unavailable here. Please continue on WhatsApp or email info@gridandlogic.com.",
        );
      setStatus("sent");
      setMessage("Thanks! Your enquiry has been sent to our team.");
      setWhatsapp("");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message ||
          "Unable to send right now. Please use WhatsApp or email us directly.",
      );
    }
  }
  return (
    <form id="project-form" onSubmit={submit}>
      <div className="form-row">
        <label className="field">
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Taylor"
            maxLength="100"
            required
            disabled={status === "sending"}
          />
        </label>
        <label className="field">
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@yourcompany.com"
            maxLength="200"
            required
            disabled={status === "sending"}
          />
        </label>
      </div>
      <label className="field">
        What can we help with?
        <select
          name="service"
          required
          defaultValue=""
          disabled={status === "sending"}
        >
          <option value="" disabled>
            Select a service
          </option>
          {servicePages.map((s) => (
            <option key={s.slug}>{s.name}</option>
          ))}
          <option>A little bit of everything</option>
        </select>
      </label>
      <label className="field">
        A little about your project
        <textarea
          name="message"
          placeholder="Your idea, your goals, and anything we should know…"
          maxLength="5000"
          required
          disabled={status === "sending"}
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex="-1" autoComplete="off" />
      </label>
      <button
        className="btn primary"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
        <span className="arrow" aria-hidden="true">
          ↗
        </span>
      </button>
      <p className="form-note">
        Your brief goes to info@gridandlogic.com.{" "}
        <a href="/privacy/">Privacy policy</a>
      </p>
      <p
        className={`form-status ${status === "error" ? "is-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      {whatsapp && status === "error" && (
        <a
          id="continue-whatsapp"
          className="text-link"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Continue to WhatsApp ↗
        </a>
      )}
    </form>
  );
}
