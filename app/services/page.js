import Link from "next/link";
import { servicePages } from "@/app/data/agency";
import { StructuredData } from "@/app/components/StructuredData";
export const metadata = {
  title: "Digital Agency Services",
  description:
    "Explore Grid & Logic’s web development, ecommerce, 3D configurator, digital marketing, brand identity, and SEO services.",
  alternates: { canonical: "/services/" },
};
export default function Services() {
  return (
    <main id="main">
      <StructuredData
        page={{
          path: "/services/",
          name: "Digital Agency Services",
          type: "CollectionPage",
        }}
      />
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Services
          </div>
          <h1>
            Good ideas deserve
            <br />
            great execution.
          </h1>
          <p>
            From the brand people discover to the website they buy from. Explore
            the skills we bring to your business.
          </p>
        </div>
      </section>
      <section className="section wrap">
        <div className="service-list">
          {servicePages.map((s, i) => (
            <a
              className="service-row"
              key={s.slug}
              href={`/services/${s.slug}/`}
            >
              <span className="num">0{i + 1}</span>
              <div>
                <h3>{s.name}</h3>
                <div className="tags">{s.tags}</div>
              </div>
              <p>{s.description}</p>
              <span className="circle" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
