import Image from "next/image";
import Link from "next/link";
import { ConfiguratorFaq, ConfiguratorLinks, enquiryUrl, lightingDemo, OfferTable } from "./ConfiguratorOffer";
import { StructuredData } from "./StructuredData";
import { customDescription, customFaq } from "@/app/data/configurator-offers";

const useCases = [
  ["Ecommerce brands", "Live previews and supported selections carried into the cart.", "Configuration completion and add-to-cart rate."],
  ["Lighting and furniture manufacturers", "Modular assembly, compatibility rules, and a configuration summary for sales enquiries.", "Quote requests with a usable product specification."],
  ["Digital agencies", "A client-branded build to your brief, with integration documentation and an agreed handover.", "Acceptance criteria and launch readiness."],
];

export function CustomConfiguratorPage({ service }) {
  return (
    <main id="main">
      <StructuredData service={{ ...service, description: customDescription }} answers={customFaq} />
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services/">Services</Link> / 3D configurators
          </nav>
          <h1>Custom 3D web configurators for brands, manufacturers, and agencies</h1>
          <p><strong>Grid &amp; Logic (Grid and Logic) is a digital agency and web development studio that builds custom 3D product configurators around your products, selling rules, and storefront.</strong> We also work with agencies that need a white-label 3D development subcontractor.</p>
          <div className="offer-actions">
            <Link className="btn primary" href={enquiryUrl}>Discuss your configurator project ↗</Link>
            <a className="text-link" href={lightingDemo.url}>Try the lighting demo ↗</a>
          </div>
        </div>
      </section>
      <section className="section wrap offer-copy">
        <h2>What can a custom 3D product configurator do?</h2>
        <p><strong>It turns your product options and compatibility rules into an interactive buying experience.</strong> Let customers change finishes, inspect the result, or assemble compatible components, then carry their choices into checkout or a quote request.</p>
        <OfferTable caption="Configurator deliverables by buyer" columns={["Buyer", "What we can build", "What to measure"]} rows={useCases} />
      </section>
      <section className="section wrap offer-copy">
        <h2>How do we build and test your configurator?</h2>
        <p><strong>We agree on product rules and the purchase flow before building the 3D interface.</strong></p>
        <ol>
          <li><strong>Map the product.</strong> Identify materials, components, valid combinations, and any choices that affect price or inventory.</li>
          <li><strong>Build the interaction.</strong> Use Three.js and WebGL for the browser preview, and React where it fits the site. Prepare the 3D models and test key product choices first.</li>
          <li><strong>Connect the buying flow.</strong> Map selections to variants or capture them in a quote. Agree which system owns pricing and availability.</li>
          <li><strong>Test and hand over.</strong> Verify sample configurations, mobile controls, loading, and what reaches the order or enquiry. Document changes your team can make later.</li>
        </ol>
      </section>
      <section className="section wrap offer-copy">
        <h2>Can an agency subcontract 3D configurator development?</h2>
        <p><strong>Yes. Grid &amp; Logic can deliver under your agency’s brand while your team leads the client relationship.</strong> We agree who owns design approval, integration, client communication, and support, then set review milestones and handover requirements.</p>
        <Link className="btn" href={enquiryUrl}>Discuss white-label development ↗</Link>
      </section>
      <section className="section wrap content-grid">
        <div className="offer-copy">
          <h2>What does a live modular lighting configurator look like?</h2>
          <p><strong>Our Lighting Studio lets buyers explore a modular lighting catalogue and open configurable products in 3D.</strong> Try the experience and show us which interactions would help your customers.</p>
          <a className="text-link" href={lightingDemo.url}>Open the modular lighting demo ↗</a>
        </div>
        <a className="configurator-preview-link" href={lightingDemo.url}>
          <Image className="configurator-preview" src={`/assets/${lightingDemo.image}`} alt={lightingDemo.imageAlt} width={1280} height={853} sizes="(max-width: 760px) 90vw, 45vw" />
        </a>
      </section>
      <ConfiguratorFaq entries={customFaq} />
      <section className="section wrap offer-copy">
        <h2>Would an existing configurator fit your catalogue?</h2>
        <p><strong>Compare packages if you want to adapt an existing foundation to your storefront.</strong></p>
        <ConfiguratorLinks custom />
      </section>
    </main>
  );
}
