import Image from "next/image";
import Link from "next/link";
import { configurators } from "@/app/data/configurators";
import { StructuredData } from "@/app/components/StructuredData";
import { ConfiguratorFaq, ConfiguratorLinks, enquiryUrl, lightingDemo, OfferTable } from "@/app/components/ConfiguratorOffer";
import { solutionDescription, solutionFaq, solutionTitle } from "@/app/data/configurator-offers";

const path = "/configurators/";
const packages = [
  ["Preview", "One product family or lead generation", "3D viewer, agreed finish options, brand styling, and a buy or enquiry link.", "Fixed setup quote after asset review."],
  ["Store", "Shopify or compatible headless stores", "Preview scope plus variant mapping, supported price and SKU updates, and tested add-to-cart behaviour.", "Setup and integration quote based on catalogue and storefront scope."],
  ["Catalogue", "Modular lighting, furniture, or larger ranges", "Multiple families, compatibility rules, component choices, and a checkout or quote workflow.", "Quote based on product families, rules, and integration requirements."],
];

export const metadata = {
  title: solutionTitle,
  description: solutionDescription,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    title: solutionTitle + " | Grid & Logic",
    description: solutionDescription,
    url: path,
  },
};

export default function ConfiguratorsPage() {
  return (
    <main id="main">
      <StructuredData
        page={{ path, name: solutionTitle, description: solutionDescription, type: "CollectionPage" }}
        answers={solutionFaq}
      />
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / Product configurators</nav>
          <h1>Buy a 3D product configurator for your ecommerce store</h1>
          <p><strong>Grid &amp; Logic (Grid and Logic) is a digital agency and web development studio that adapts ready-to-deploy 3D web configurators for your products and storefront.</strong> Start with an existing foundation, then add your models, options, and buying rules.</p>
          <div className="offer-actions">
            <Link className="btn primary" href={enquiryUrl}>Get a package quote ↗</Link>
            <a className="text-link" href={lightingDemo.url}>Try the live lighting demo ↗</a>
          </div>
        </div>
      </section>
      <section className="section wrap offer-copy">
        <h2>What can customers do with a 3D ecommerce configurator?</h2>
        <p><strong>Customers can see supported changes in real time and get price and SKU updates when the configurator is connected to catalogue data.</strong> Send supported selections to the cart or capture a full specification for a sales quote.</p>
        <ul>
          <li><strong>Preview changes live.</strong> Let buyers inspect the model and switch available finishes, materials, or components.</li>
          <li><strong>Show the right price and SKU.</strong> Map valid choices to store variants or approved pricing rules. The store validates the final purchase.</li>
          <li><strong>Carry choices into the cart.</strong> Pass the selected variant and supported configuration details to Shopify or a compatible headless storefront. Check price, quantity, and order details before launch.</li>
          <li><strong>Keep the product page responsive.</strong> Optimise models and textures, load interactive 3D when needed, and show a still image while it loads. Measure Core Web Vitals on representative devices.</li>
        </ul>
      </section>
      <section className="section wrap offer-copy" id="packages">
        <h2>Which 3D configurator package should you buy?</h2>
        <p><strong>Choose Preview for product exploration, Store for checkout, or Catalogue for multiple product families.</strong> We quote after checking whether the package fits your product and storefront.</p>
        <OfferTable caption="Compare 3D configurator packages" columns={["Package", "Best for", "Included scope", "Pricing"]} rows={packages} />
        <p>Ask for an itemised quote for setup, model preparation, integration, testing, hosting, and any ongoing support.</p>
        <Link className="btn primary" href={enquiryUrl}>Request a package quote ↗</Link>
      </section>
      <section className="section wrap offer-copy">
        <h2>How do we go from demo to deployment?</h2>
        <p><strong>Send one representative product and your store URL so we can check what fits the existing configurator and what needs adaptation.</strong></p>
        <ol>
          <li><strong>Try the demo.</strong> Note which interactions would help your customers.</li>
          <li><strong>Send a sample product.</strong> Include photos or models, options, SKUs, and any compatibility rules.</li>
          <li><strong>Review your quote.</strong> Confirm the package, fees, dependencies, and target launch date.</li>
          <li><strong>Approve a working example.</strong> Review a representative configuration and its checkout or enquiry flow before going live.</li>
        </ol>
      </section>
      <section className="section wrap offer-copy" id="demos">
        <h2>Where can you see the configurator in action?</h2>
        <p><strong>Open our Lighting Studio to browse a modular lighting catalogue and try configurable fixtures.</strong> The other samples show storefront design across different product categories.</p>
        <div className="configurator-sample-grid">
          {configurators.map((sample) => (
            <article className="configurator-sample" key={sample.slug}>
              <a
                className="configurator-preview-link"
                href={sample.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${sample.name}`}
              >
                <Image
                  className="configurator-preview"
                  src={`/assets/${sample.image}`}
                  alt={sample.imageAlt}
                  width={1440}
                  height={960}
                  sizes="(max-width: 760px) 90vw, 45vw"
                  loading="lazy"
                />
              </a>
              <div className="eyebrow">
                <span className="dot" /> {sample.category}
              </div>
              <h3>{sample.name}</h3>
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
      <ConfiguratorFaq entries={solutionFaq} />
      <section className="section wrap offer-copy">
        <h2>Do you need a custom 3D build?</h2>
        <p><strong>Our custom development service covers bespoke interfaces, complex assembly rules, and white-label agency work.</strong></p>
        <ConfiguratorLinks />
      </section>
    </main>
  );
}
