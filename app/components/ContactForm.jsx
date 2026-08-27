"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { site } from "@/app/data/site";

const FIELD =
  "w-full rounded-card border border-line bg-canvas/60 px-4 py-3 text-[0.95rem] text-ink transition-colors placeholder:text-ink-faint focus:border-accent focus:outline-none";
const LABEL =
  "block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint";

const EMPTY = { name: "", email: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState(null);

  const update = (field) => (event) =>
    setValues((prev) => ({ ...prev, [field]: event.target.value }));

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(payload.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setValues(EMPTY);
      setStatus("sent");
    } catch {
      setError("Could not reach the server. Please check your connection.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            className={`mt-2 ${FIELD}`}
            value={values.name}
            onChange={update("name")}
            placeholder="Your name"
            autoComplete="name"
            maxLength={100}
            required
            disabled={sending}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={`mt-2 ${FIELD}`}
            value={values.email}
            onChange={update("email")}
            placeholder="you@company.com"
            autoComplete="email"
            maxLength={200}
            required
            disabled={sending}
          />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="contact-message">
          Project
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className={`mt-2 resize-y ${FIELD}`}
          value={values.message}
          onChange={update("message")}
          placeholder="What are you building, and what does done look like?"
          maxLength={5000}
          required
          disabled={sending}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? "Sending…" : "Send enquiry"}
        </Button>

        {/* Announced to screen readers without stealing focus. */}
        <p aria-live="polite" className="text-sm">
          {status === "sent" ? (
            <span className="text-accent">
              Thanks — we will reply within one working day.
            </span>
          ) : null}
          {status === "error" ? <span className="text-red-400">{error}</span> : null}
        </p>
      </div>

      <p className="text-xs text-ink-faint">
        Prefer email?{" "}
        <a href={site.emailHref} className="text-ink-dim underline hover:text-accent">
          {site.email}
        </a>
      </p>
    </form>
  );
}
