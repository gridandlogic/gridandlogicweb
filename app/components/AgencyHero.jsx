"use client";
import { useEffect, useRef, useState } from "react";
import BrandScene from "./BrandScene";
const slides = [
  {
    tag: "Web development, ecommerce & digital experiences",
    lines: ["Digital ideas.", "Built for", "real impact."],
    description:
      "We design and build websites, online stores, and digital experiences that move your business forward. Thoughtful on the surface. Solid underneath.",
    label: "Web & ecommerce",
    cta: "Let’s build something",
  },
  {
    tag: "3D product configurators & interactive experiences",
    lines: ["Let your products", "do the", "talking."],
    description:
      "Bring materials, colours, and possibilities to life. We build interactive 3D experiences that help customers explore your products with confidence.",
    label: "3D experiences",
    cta: "Explore the possibilities",
  },
  {
    tag: "Brand identity, content & digital marketing",
    lines: ["Stand apart.", "Stay in", "their minds."],
    description:
      "A distinct identity. Consistent content. A clearer story. We bring the creative pieces together so your business shows up with purpose.",
    label: "Brand & growth",
    cta: "Let’s shape your brand",
  },
];
export default function AgencyHero() {
  const [active, setActive] = useState(0),
    [paused, setPaused] = useState(false);
  const pointer = useRef(null);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const id = setInterval(
      () => setActive((n) => (n + 1) % slides.length),
      9000,
    );
    return () => clearInterval(id);
  }, [paused, active]);
  const s = slides[active];
  function move(event) {
    if (matchMedia("(hover:none), (prefers-reduced-motion: reduce)").matches)
      return;
    const r = event.currentTarget.getBoundingClientRect();
    pointer.current?.style.setProperty(
      "--rx",
      `${-(event.clientY - r.top - r.height / 2) / 65}deg`,
    );
    pointer.current?.style.setProperty(
      "--ry",
      `${(event.clientX - r.left - r.width / 2) / 70}deg`,
    );
  }
  return (
    <section
      className="hero elite-opening"
      id="home"
      aria-label="Grid and Logic introduction"
    >
      <div className="hero-light" />
      <div
        className="wrap hero-grid"
        id="hero-slide"
        role="tabpanel"
        aria-labelledby={`hero-tab-${active}`}
      >
        <div className="hero-copy" key={active}>
          <div className="eyebrow">
            <span className="dot" />
            {s.tag}
          </div>
          <h1>
            {s.lines[0]}
            <br />
            {s.lines[1]}
            <br />
            <em>{s.lines[2]}</em>
          </h1>
          <p>{s.description}</p>
          <div className="actions">
            <a className="btn primary" href="/#contact">
              {s.cta}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="text-link" href="#work">
              Explore our work <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="dot" />
            Independent studio. Working worldwide.
          </div>
        </div>
        <div
          className="hero-visual-shell"
          onPointerMove={move}
          onPointerLeave={() => {
            pointer.current?.style.setProperty("--rx", "0deg");
            pointer.current?.style.setProperty("--ry", "0deg");
          }}
        >
          {active === 1 ? (
            <BrandScene />
          ) : (
            <div className="floating-composition" ref={pointer} key={active}>
              {active === 0 ? (
                <>
                  <div className="mock-window">
                    <div className="mock-top">
                      <i />
                      <i />
                      <i />
                      <span>A NEW PERSPECTIVE, BY G&L</span>
                      <b>↗</b>
                    </div>
                    <div className="mock-body">
                      <div className="mock-caption">
                        <span>DESIGNED TO STAND APART</span>
                        <strong>
                          Your next
                          <br />
                          <em>chapter.</em>
                        </strong>
                        <span className="mock-pill">
                          Beautifully built. Purposefully made. ↗
                        </span>
                      </div>
                      <div className="mock-photo">
                        <img
                          src="/assets/clothing-sample.webp"
                          width="1440"
                          height="1000"
                          alt="Fashion storefront website by Grid and Logic"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="float-notification">
                    <span className="check-circle">✓</span>
                    <div>
                      <strong>From idea to launch.</strong>
                      <small>One connected creative partner.</small>
                    </div>
                  </div>
                  <div className="growth-card">
                    <div>
                      <small>BUILT FOR YOUR NEXT CHAPTER</small>
                      <span>↗</span>
                    </div>
                    <div className="growth-bars">
                      {[36, 56, 46, 72, 64, 92].map((h, i) => (
                        <i key={i} style={{ height: h + "%" }} />
                      ))}
                    </div>
                    <p>Design with direction.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="brand-poster">
                    <span>GRID & LOGIC / CREATIVE STUDIO</span>
                    <div className="poster-orbit" />
                    <strong>
                      Make
                      <br />
                      <em>your mark.</em>
                    </strong>
                    <div className="poster-bottom">
                      <span>IDENTITY. CONTENT. CONNECTION.</span>
                      <span>↗</span>
                    </div>
                  </div>
                  <div className="type-card">
                    <span>TYPE WITH PERSONALITY</span>
                    <strong>
                      Aa<span>↗</span>
                    </strong>
                    <small>Considered down to the character.</small>
                  </div>
                  <div className="palette-card">
                    <i />
                    <i />
                    <i />
                    <span>One consistent identity.</span>
                  </div>
                </>
              )}
            </div>
          )}
          <span className="visual-caption">A GLIMPSE OF WHAT’S POSSIBLE</span>
        </div>
      </div>
      <div className="wrap opening-bottom">
        <div
          className="hero-tabs"
          role="tablist"
          aria-label="Explore our expertise"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.label}
              id={`hero-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="hero-slide"
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const next = (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                  setActive(next);
                  document.querySelector(`#hero-tab-${next}`)?.focus();
                }
              }}
            >
              <span>0{i + 1}</span>
              {slide.label}
              <i className={active === i && !paused ? "progress-active" : ""} />
            </button>
          ))}
        </div>
        <button
          className="carousel-pause"
          aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "▷" : "Ⅱ"}
        </button>
        <span className="scroll-cue">SCROLL TO DISCOVER ↓</span>
      </div>
    </section>
  );
}
