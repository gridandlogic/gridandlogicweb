import { StructuredData } from "@/app/components/StructuredData";
import { servicePages, faqs } from "@/app/data/agency";
export const metadata = {
  title: "About Our Digital Agency",
  description:
    "What is Grid & Logic? An independent remote digital agency and product studio for web development, ecommerce, 3D experiences, branding, and digital marketing.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Grid & Logic",
    description:
      "An independent digital agency connecting design, development, and digital marketing creative.",
    url: "/about/",
  },
};
export default function About() {
  return (
    <main id="main">
      <StructuredData
        page={{
          path: "/about/",
          name: "About Grid & Logic",
          type: "AboutPage",
        }}
      />
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <a href="/">Home</a> / About
          </div>
          <div className="eyebrow" style={{ marginTop: 35 }}>
            Design meets logic
          </div>
          <h1>What is Grid & Logic?</h1>
          <p>{faqs[0][1]}</p>
        </div>
      </section>
      <section className="section wrap content-grid">
        <div>
          <h2>One agency. Connected skills.</h2>
          <p>
            We connect visual identity, website design, frontend development,
            and digital marketing creative. A project can focus on a single
            service or bring several skills together around a launch.
          </p>
          <p>
            We work remotely with businesses worldwide. Scope, milestones,
            responsibilities, and handover are agreed before the work begins.
          </p>
          <a className="text-link" href="/work/">
            Explore our selected projects ↗
          </a>
        </div>
        <div>
          <h2>Talk directly with us.</h2>
          <p>
            Use the name Grid & Logic, or Grid and Logic, when looking for our
            studio. Our official website is gridandlogic.com.
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@gridandlogic.com">info@gridandlogic.com</a>
            <br />
            WhatsApp: <a href="https://wa.me/923374992211">+92 337 4992211</a>
          </p>
          <p>
            Send a short brief with your business goals, required services, and
            preferred launch date.
          </p>
          <a className="btn primary" href="/#contact">
            Start a conversation ↗
          </a>
        </div>
      </section>
      <section className="section wrap">
        <h2>How we can help</h2>
        <div className="service-links">
          {servicePages.map((s) => (
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
      </section>
    </main>
  );
}
