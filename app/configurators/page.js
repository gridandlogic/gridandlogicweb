import Link from "next/link";
import { configurators } from "@/app/data/configurators";
import { StructuredData } from "@/app/components/StructuredData";

const description =
  "Explore live product configurator and ecommerce samples by Grid & Logic, including lighting, perfume, wallets, jewelry, and watches.";

export const metadata = {
  title: "Product Configurator Samples",
  description,
  alternates: { canonical: "/configurators/" },
  openGraph: {
    type: "website",
    title: "Product Configurator Samples | Grid & Logic",
    description,
    url: "/configurators/",
  },
};

export default function ConfiguratorsPage() {
  return (
    <main id="main">
      <StructuredData
        page={{
          path: "/configurators/",
          name: "Product configurator samples",
          description,
          type: "CollectionPage",
        }}
      />
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Product configurators
          </div>
          <h1>Product configurator samples.</h1>
          <p>
            Explore live product experiences created by Grid &amp; Logic. Each
            sample opens on its own website; the available options and
            interactions depend on that experience.
          </p>
        </div>
      </section>
      <section className="section wrap">
        <div className="configurator-sample-grid">
          {configurators.map((sample) => (
            <article className="configurator-sample" key={sample.slug}>
              <div className="eyebrow">
                <span className="dot" /> {sample.category}
              </div>
              <h2>{sample.name}</h2>
              <p>{sample.description}</p>
              <a
                className="text-link"
                href={sample.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live sample ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="section wrap">
        <div className="content-grid">
          <div>
            <h2>What is a product configurator?</h2>
            <p>
              A product configurator lets a visitor explore a product and its
              available choices in a digital experience. Grid &amp; Logic plans
              each build around the product, the options customers need to
              understand, and the business systems involved.
            </p>
          </div>
          <div>
            <h2>Planning a configurator for your products?</h2>
            <p>
              We can scope a browser-based product experience around your
              catalogue, product assets, option rules, and customer journey.
            </p>
            <Link className="text-link" href="/services/3d-configurators/">
              Learn about our 3D configurator service ↗
            </Link>
          </div>
        </div>
        <p className="configurator-author">Published by the Grid &amp; Logic team.</p>
      </section>
    </main>
  );
}
