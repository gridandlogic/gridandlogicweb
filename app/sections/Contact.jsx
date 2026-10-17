import { Container } from "@/app/components/ui/Container";
import { ContactForm } from "@/app/components/ContactForm";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Reveal } from "@/app/components/ui/Reveal";
import { site } from "@/app/data/site";

const channels = [
  { label: "Email", value: site.email, href: site.emailHref, external: false },
  { label: "Phone", value: site.phone, href: site.phoneHref, external: false },
  { label: "WhatsApp", value: site.whatsapp, href: site.whatsappHref, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-24 lg:py-32">
      <Container>
        <Reveal>
          <Eyebrow index="06">Contact</Eyebrow>
          <h2 className="mt-5 max-w-lg text-h2 text-gradient-ink">
            Let's build something intelligent together
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-lead text-ink-dim">
            Grid & Logic designs and builds intelligent digital products for growth-stage brands. We partner with founders and teams to turn ambitious ideas into polished, production-ready products.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <div className="relative overflow-hidden rounded-panel border border-line bg-surface px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 bg-gridlines opacity-70"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 glow-accent" aria-hidden="true" />

            <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <h3 className="text-h3 text-ink mb-4">Get in touch</h3>
                <p className="text-sm text-ink-dim mb-6">
                  Fill in the form and we will get back to you. You can also reach us directly.
                </p>

                <dl className="flex flex-col divide-y divide-line border-y border-line">
                  {channels.map((channel) => (
                    <div
                      key={channel.label}
                      className="flex items-center justify-between gap-6 py-5"
                    >
                      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
                        {channel.label}
                      </dt>
                      <dd>
                        <a
                          href={channel.href}
                          className="group flex items-center gap-2 text-[0.95rem] text-ink transition-colors hover:text-accent"
                          {...(channel.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : null)}
                        >
                          {channel.value}
                          <span
                            className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </a>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-card border border-line bg-canvas/40 p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
