"use client";
import { useState } from "react";

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Grid and Logic home">
      <img src="/assets/logo.png" alt="" width="43" height="43" />
      grid
      <span>
        <em>&</em>logic
      </span>
    </a>
  );
}
export function AgencyHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <nav className="nav wrap" aria-label="Main navigation">
        <Brand />
        <div className={`navlinks ${open ? "open" : ""}`} id="navigation">
          {[
            ["Services", "/#services"],
            ["Our work", "/#work"],
            ["Samples", "/#samples"],
            ["The studio", "/#about"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>
        <a className="btn small" href="/#contact">
          Let’s talk{" "}
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "×" : "☰"}
        </button>
      </nav>
    </header>
  );
}
export function AgencyFooter() {
  return (
    <>
      <footer className="footer xallama-closing">
        <div className="wrap">
          <div className="closing-social">
            <div className="footer-social">
              <a
                href="https://www.instagram.com/gridandlogic/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61592258005096"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook ↗
              </a>
              <a
                href="https://www.threads.com/@gridandlogic"
                target="_blank"
                rel="noopener noreferrer"
              >
                Threads ↗
              </a>
            </div>
            <a href="mailto:info@gridandlogic.com">info@gridandlogic.com ↗</a>
          </div>
          <div className="closing-grid">
            <div>
              <Brand />
              <p>
                We connect creative thinking with smart engineering. Websites,
                brands, and interactive experiences — built to bring your next
                chapter to life.
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <a href="/">Home</a>
              <a href="/work/">Our work</a>
              <a href="/about/">About the studio</a>
              <a href="/#samples">Samples</a>
              <a href="/services/">Services</a>
              <a href="/#contact">Contact</a>
            </nav>
            <div className="closing-note">
              <span className="dot" /> Remote studio. Worldwide ambition.
              <p>
                Good ideas start with a conversation.
                <br />
                Let’s hear yours.
              </p>
              <a className="text-link" href="https://wa.me/923374992211">
                Start a conversation ↗
              </a>
            </div>
          </div>
          <a className="closing-cta" href="/#contact">
            Get in touch<span aria-hidden="true">↗</span>
          </a>
          <div className="footer-bottom">
            <span>GRID & LOGIC © {new Date().getFullYear()}</span>
            <div>
              <a href="/privacy/">Privacy</a>
              <a href="/sitemap.xml">Sitemap ↗</a>
              <span>DESIGN MEETS POSSIBILITY.</span>
            </div>
          </div>
        </div>
      </footer>
      <a
        className="whatsapp"
        href="https://wa.me/923374992211"
        aria-label="Chat with Grid and Logic on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.2Z" />
          <path d="M8 7.5c-.8 1 .2 3.2 1.8 4.8s3.8 2.6 4.8 1.8l1.1-1.1-2.6-1.5-.8.8c-1.1-.5-2.1-1.5-2.6-2.6l.8-.8L9 6.4Z" />
        </svg>
      </a>
    </>
  );
}
