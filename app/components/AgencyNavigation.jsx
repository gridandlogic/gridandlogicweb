"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Grid and Logic home">
      <Image src="/icon-192.png" alt="" width={43} height={43} sizes="43px" priority />
      grid
      <span>
        <em>&amp;</em>logic
      </span>
    </Link>
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
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
        <Link className="btn small" href="/#contact">
          Let’s talk <span className="arrow" aria-hidden="true">↗</span>
        </Link>
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
