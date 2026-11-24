import Link from "next/link";
import { configurators } from "@/app/data/configurators";

export const enquiryUrl = "/?service=3D%20product%20configurators#contact";
export const lightingDemo = configurators.find(({ slug }) => slug === "lights");

export function OfferTable({ caption, columns, rows }) {
  return (
    <div className="offer-table" role="region" aria-label={caption} tabIndex={0}>
      <table>
        <caption>{caption}</caption>
        <thead><tr>{columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>
          {rows.map(([name, ...cells]) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              {cells.map((cell) => <td key={cell}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ConfiguratorFaq({ entries }) {
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq-layout">
        <div>
          <h2>What do buyers ask before starting?</h2>
          <p><strong>Here’s what to expect on cost, integration, and delivery.</strong></p>
        </div>
        <div>
          {entries.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p><strong>{answer}</strong></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConfiguratorLinks({ custom = false }) {
  return (
    <nav className="profile-links" aria-label="Related Grid and Logic pages">
      <Link href={custom ? "/configurators/" : "/services/3d-configurators/"}>
        {custom ? "Compare configurator packages" : "Explore custom 3D development"} ↗
      </Link>
      <Link href="/services/">All services ↗</Link>
      <Link href="/work/">Selected work ↗</Link>
    </nav>
  );
}
