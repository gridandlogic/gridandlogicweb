"use client";
import { useEffect, useRef, useState } from "react";
const work = [
  {
    title: "Pixel Nest",
    detail: "/work/pixel-nest/",
    category: "web",
    type: "Agency website & sprint board",
    image: "pixelnest-current.webp",
    description:
      "Website design and development, with a sprint board to support the team’s workflow.",
    href: "https://pixelnestagy.vercel.app/",
    label: "View website",
  },
  {
    title: "Zaka Engineering",
    detail: "/work/zaka-engineering/",
    category: "web",
    type: "Website update & catalogue",
    image: "zaka.webp",
    description:
      "An updated digital presence and product catalogue for a container engineering business.",
    href: "https://zakaengineeringcontainers.vercel.app/",
    label: "View website",
  },
  {
    title: "Container Studio",
    category: "3d",
    type: "3D configurator & space planner",
    image: "container-exterior.webp",
    description:
      "Container configurations, live 3D previews, and floor-plan layouts. Explore the project images.",
    gallery: [
      "container-exterior.webp",
      "container-3d.webp",
      "container-plan.webp",
    ],
  },
  {
    title: "Sofa Configurator",
    category: "3d",
    type: "3D product experience",
    image: "sofa.webp",
    description:
      "A browser-based product configurator with material and colour customisation.",
    gallery: ["sofa.webp"],
  },
];
const samples = [
  {
    title: "Bro’s Shoes",
    type: "Sneaker ecommerce",
    image: "bros-shoes.webp",
    href: "https://bros-shoes.gridandlogic.com/",
  },
  {
    title: "Forme Clothing",
    type: "Fashion storefront",
    image: "clothing-sample.webp",
    href: "https://clothing.gridandlogic.com/",
  },
  {
    title: "Dental Clinic",
    type: "Healthcare website",
    image: "dental-clinic.webp",
    href: "https://dental-clinic.gridandlogic.com/",
  },
];
function tilt(e) {
  if (matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches)
    return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.transform = `perspective(1100px) rotateX(${-(e.clientY - r.top - r.height / 2) / 65}deg) rotateY(${(e.clientX - r.left - r.width / 2) / 80}deg) translateY(-3px)`;
}
function untilt(e) {
  e.currentTarget.style.transform = "";
}
export function AgencyWork() {
  const [filter, setFilter] = useState("all"),
    [gallery, setGallery] = useState(null),
    [index, setIndex] = useState(0);
  const dialog = useRef(null),
    lastTrigger = useRef(null);
  useEffect(() => {
    if (gallery) {
      dialog.current.showModal();
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [gallery]);
  function close() {
    dialog.current.close();
    setGallery(null);
    lastTrigger.current?.focus();
  }
  function open(project, e) {
    lastTrigger.current = e.currentTarget;
    setIndex(0);
    setGallery(project);
  }
  return (
    <>
      <section className="section work" id="work">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                02 / Selected work
              </div>
              <h2>
                Proof, in pixels
                <br />
                and possibilities.
              </h2>
            </div>
            <div>
              <p className="work-intro">
                Real collaborations. Thoughtful solutions.
                <br />A closer look at what we build.
              </p>
              <div className="filters" aria-label="Filter projects">
                {[
                  ["all", "All work"],
                  ["web", "Websites"],
                  ["3d", "3D experiences"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    className={`filter ${filter === value ? "active" : ""}`}
                    aria-pressed={filter === value}
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="projects">
            {work.map((p) => (
              <article
                key={p.title}
                className="project"
                hidden={filter !== "all" && p.category !== filter}
              >
                <div
                  className="project-tilt"
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                >
                  {p.href ? (
                    <a
                      className="project-image"
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.label}: ${p.title}`}
                    >
                      <img
                        src={`/assets/${p.image}`}
                        alt={`${p.title} — ${p.type}`}
                        width="1440"
                        height="1000"
                        loading="lazy"
                      />
                      <span className="project-kind">{p.label} ↗</span>
                    </a>
                  ) : (
                    <button
                      className="project-image gallery-trigger"
                      onClick={(e) => open(p, e)}
                      aria-label={`View ${p.title} images`}
                    >
                      <img
                        src={`/assets/${p.image}`}
                        alt={`${p.title} — ${p.type}`}
                        width="1440"
                        height="1000"
                        loading="lazy"
                      />
                      <span className="project-kind">
                        EXPLORE IMAGES <span aria-hidden="true">↗</span>
                      </span>
                      <span className="image-count">
                        {p.gallery.length === 1
                          ? "01 IMAGE"
                          : `0${p.gallery.length} IMAGES`}
                      </span>
                    </button>
                  )}
                </div>
                <div className="project-meta">
                  <div>
                    <h3>{p.title}</h3>
                    <small>{p.type}</small>
                  </div>
                  <span className="project-arrow" aria-hidden="true">
                    {p.href ? "↗" : "+"}
                  </span>
                </div>
                <p className="project-description">{p.description}</p>
                {p.detail && (
                  <a className="text-link" href={p.detail}>
                    Explore the project ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section samples wrap" id="samples">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              03 / Explore the possibilities
            </div>
            <h2>
              Your industry.
              <br />A fresh perspective.
            </h2>
          </div>
          <p>
            Explore three sample websites to see different directions for your
            next project. Each one is a live example you can try.
          </p>
        </div>
        <div className="sample-grid">
          {samples.map((s, i) => (
            <a
              className="sample"
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="sample-visual"
                onPointerMove={tilt}
                onPointerLeave={untilt}
              >
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                  <span>G&L / SAMPLE 0{i + 1}</span>
                  <b>↗</b>
                </div>
                <img
                  src={`/assets/${s.image}`}
                  alt={`${s.title} sample website preview`}
                  width="1440"
                  height="1000"
                  loading="lazy"
                />
              </div>
              <div className="project-meta">
                <div>
                  <small>{s.type}</small>
                  <h3>{s.title}</h3>
                </div>
                <span className="project-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
      <dialog
        className="image-dialog"
        ref={dialog}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onKeyDown={(e) => {
          if (!gallery) return;
          if (e.key === "ArrowRight")
            setIndex((index + 1) % gallery.gallery.length);
          if (e.key === "ArrowLeft")
            setIndex(
              (index - 1 + gallery.gallery.length) % gallery.gallery.length,
            );
        }}
        aria-labelledby="gallery-title"
      >
        {gallery && (
          <div className="gallery-content">
            <div className="gallery-header">
              <div>
                <span className="eyebrow">
                  Project images / {String(index + 1).padStart(2, "0")} of{" "}
                  {String(gallery.gallery.length).padStart(2, "0")}
                </span>
                <h2 id="gallery-title">{gallery.title}</h2>
              </div>
              <button
                className="gallery-close"
                onClick={close}
                aria-label="Close image gallery"
              >
                ×
              </button>
            </div>
            <img
              className="gallery-main"
              src={`/assets/${gallery.gallery[index]}`}
              alt={`${gallery.title} — ${index === 0 ? "project overview" : index === 1 ? "3D layout view" : "floor plan"}`}
              width="1440"
              height="1000"
            />
            {gallery.gallery.length > 1 && (
              <div className="gallery-navigation">
                <button
                  className="btn"
                  onClick={() =>
                    setIndex(
                      (index - 1 + gallery.gallery.length) %
                        gallery.gallery.length,
                    )
                  }
                >
                  ← Previous
                </button>
                <span aria-live="polite">
                  {index + 1} / {gallery.gallery.length}
                </span>
                <button
                  className="btn"
                  onClick={() => setIndex((index + 1) % gallery.gallery.length)}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
