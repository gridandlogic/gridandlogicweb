import AgencyHero from "./AgencyHero";
import { AgencyWork } from "./AgencyWork";
import { EnquiryForm } from "./EnquiryForm";
import { servicePages, faqs } from "@/app/data/agency";
import { StructuredData } from "./StructuredData";
function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="dot" />
      {children}
    </div>
  );
}
export default function AgencyHome() {
  return (
    <main id="main">
      <StructuredData faq />
      <AgencyHero />
      <div className="capabilities">
        <div className="wrap">
          <span>Web development</span>
          <i>✳</i>
          <span>Digital marketing</span>
          <i>✳</i>
          <span>Brand & design</span>
          <i>✳</i>
          <span>3D experiences</span>
          <i>✳</i>
          <span>Ecommerce</span>
        </div>
      </div>
      <section className="section wrap" id="services">
        <div className="section-head reveal">
          <div>
            <Eyebrow>01 / What we do</Eyebrow>
            <h2>Big ideas. All the right skills.</h2>
          </div>
          <p>
            A considered mix of strategy, design, and development. Everything
            your next chapter needs, under one roof.
          </p>
        </div>
        <div className="service-list">
          {servicePages.map((s, i) => (
            <a
              className="service-row reveal"
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
      <AgencyWork />
      <section className="section wrap" id="about">
        <div className="intro reveal">
          <div>
            <Eyebrow>04 / The people behind the pixels</Eyebrow>
            <h2>
              A creative mind.
              <br />
              An engineering heart.
            </h2>
            <a className="text-link" href="/about/">
              Meet your next creative partner <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div>
            <p>
              Grid & Logic is an independent digital agency and product studio.
              We bring design, development, and digital marketing creative
              together to help brands find their voice and build their place
              online.
            </p>
            <p>
              We work remotely with businesses around the world, turning complex
              ideas into clear, useful experiences. Thoughtful design on the
              surface. Solid logic underneath.
            </p>
            <div className="principles">
              {[
                ["Direct collaboration", "Talk to the people doing the work."],
                [
                  "Built around your goals",
                  "A clear purpose behind every decision.",
                ],
                ["A transparent process", "Know the scope and the next step."],
                [
                  "Made for the real world",
                  "Useful, responsive, ready to grow.",
                ],
              ].map(([t, d]) => (
                <div key={t}>
                  <strong>
                    <span>↗</span> {t}
                  </strong>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="process" id="process">
          <div className="section-head">
            <div>
              <Eyebrow>05 / From first hello to launch</Eyebrow>
              <h2>Good work starts with a clear plan.</h2>
            </div>
          </div>
          <div className="steps">
            {[
              [
                "Discover",
                "We get to know your business, audience, and what success should look like.",
              ],
              [
                "Define",
                "We agree on priorities, deliverables, and a clear plan before creating.",
              ],
              [
                "Design & build",
                "We bring the idea to life, sharing progress and refining the details together.",
              ],
              [
                "Launch & evolve",
                "We test, launch, and give you a practical foundation for what comes next.",
              ],
            ].map(([t, d], i) => (
              <div className="step reveal" key={t}>
                <small>0{i + 1} /</small>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section faq">
        <div className="wrap faq-layout">
          <div>
            <Eyebrow>06 / A little clarity</Eyebrow>
            <h2>
              Good questions.
              <br />
              Straight answers.
            </h2>
            <p>Something else on your mind?</p>
            <a className="text-link" href="mailto:info@gridandlogic.com">
              Just ask us <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>
                  {a.replaceAll(
                    "gridandlogic@gmail.com",
                    "info@gridandlogic.com",
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section contact wrap" id="contact">
        <Eyebrow>07 / Your next chapter</Eyebrow>
        <div className="contact-grid">
          <div className="contact-copy">
            <h2>
              Something in mind?
              <br />
              Let’s make it <em>real.</em>
            </h2>
            <p>
              A new website, a fresh identity, or an idea that won’t leave you
              alone. Tell us about it.
            </p>
            <a className="email-link" href="mailto:info@gridandlogic.com">
              info@gridandlogic.com ↗
            </a>
            <p className="contact-direct">
              More of a message person?{" "}
              <a href="https://wa.me/923374992211">Let’s talk on WhatsApp ↗</a>
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </main>
  );
}
