import { notFound } from "next/navigation";
import { servicePages } from "@/app/data/agency";
import { StructuredData } from "@/app/components/StructuredData";
export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = servicePages.find((s) => s.slug === slug);
  if (!s) return {};
  return {
    title: s.name + " Agency",
    description: s.description,
    alternates: { canonical: `/services/${s.slug}/` },
    openGraph: {
      title: s.name + " | Grid & Logic",
      description: s.description,
      url: `/services/${s.slug}/`,
    },
  };
}
export default async function Service({ params }) {
  const { slug } = await params;
  const s = servicePages.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <main id="main">
      <StructuredData service={s} />
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <a href="/">Home</a> / <a href="/services/">Services</a> / {s.name}
          </div>
          <div className="eyebrow" style={{ marginTop: 35 }}>
            <span className="dot" />
            {s.name}
          </div>
          <h1>{s.heading}</h1>
          <p>{s.description}</p>
          <a
            className="btn primary"
            href={`/?service=${encodeURIComponent(s.name)}#contact`}
          >
            Tell us about your project{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </section>
      <section className="section wrap content-grid">
        <div>
          <div className="eyebrow">The approach</div>
          <h2>{s.name}, built around your business.</h2>
          <p>{s.paragraph}</p>
          <p>
            We begin with a conversation about your goals and agree a clear
            scope before work starts. Every engagement is tailored to the
            business and its audience.
          </p>
        </div>
        <div>
          <div className="eyebrow">What we can help with</div>
          <h2>A clear scope. A useful result.</h2>
          <ul>
            {s.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Exact deliverables, integrations, timelines, and ongoing support are
            agreed in your project proposal.
          </p>
        </div>
      </section>
      <section className="section faq">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Continue exploring</div>
              <h2>The right skills, together.</h2>
            </div>
          </div>
          <div className="service-links">
            {servicePages
              .filter((x) => x.slug !== slug)
              .map((x) => (
                <a
                  className="service-link"
                  href={`/services/${x.slug}/`}
                  key={x.slug}
                >
                  <h3>{x.name} ↗</h3>
                  <p>{x.description}</p>
                </a>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
