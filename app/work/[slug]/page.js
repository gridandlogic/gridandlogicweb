import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/search-content";
import { servicePages } from "@/app/data/agency";
import { StructuredData } from "@/app/components/StructuredData";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.category}`,
    description: p.description,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: {
      title: `${p.name} | Grid & Logic`,
      description: p.description,
      url: `/work/${p.slug}/`,
      images: [{ url: `/assets/${p.image}`, alt: `${p.name} website preview` }],
    },
  };
}
export default async function Project({ params }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main">
      <StructuredData
        page={{
          path: `/work/${p.slug}/`,
          name: `${p.name} — ${p.category}`,
          description: p.description,
          parent: { path: "/work/", name: "Work" },
        }}
        project={p}
      />
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/work/">Work</Link> / {p.name}
          </div>
          <div className="eyebrow" style={{ marginTop: 35 }}>
            {p.category}
          </div>
          <h1>{p.name}</h1>
          <p>{p.description}</p>
          <a
            className="btn"
            href={p.external}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit project website ↗
          </a>
        </div>
      </section>
      <section className="section wrap">
        <Image
          className="case-image"
          src={`/assets/${p.image}`}
          width="1440"
          height="1000"
          alt={`${p.name} website — ${p.category}`}
          sizes="(max-width: 760px) 90vw, 80vw"
          priority
        />
        <div className="content-grid" style={{ marginTop: 60 }}>
          <div>
            <h2>The collaboration</h2>
            <p>{p.intro}</p>
          </div>
          <div>
            <h2>Project scope</h2>
            <ul>
              {p.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="content-grid" style={{ marginTop: 60 }}>
          {p.sections.map(([h, t]) => (
            <div key={h}>
              <h2>{h}</h2>
              <p>{t}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section wrap">
        <h2>Planning something similar?</h2>
        <p>
          Tell us about your business, your current website, and what you want
          to improve. We’ll discuss the scope and next steps.
        </p>
        <div className="service-links">
          {servicePages
            .filter((s) => p.services.includes(s.slug))
            .map((s) => (
              <a
                className="service-link"
                key={s.slug}
                href={`/services/${s.slug}/`}
              >
                <h3>{s.name} ↗</h3>
                <p>{s.description}</p>
              </a>
            ))}
        </div>
        <Link className="btn primary" href="/#contact">
          Discuss your project ↗
        </Link>
      </section>
    </main>
  );
}
