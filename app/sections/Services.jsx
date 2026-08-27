import Image from "next/image";
import { Container } from "@/app/components/ui/Container";
import { Card } from "@/app/components/ui/Card";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { services } from "@/app/data/site";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="Services"
          title="Three ways we help brands sell"
          lead="Every engagement is scoped around one business result — more qualified leads, more completed checkouts, or a brand people remember."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <Card interactive className="flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="object-cover opacity-90"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-canvas/80 px-2.5 py-1 font-mono text-[0.68rem] text-accent backdrop-blur-sm">
                      {service.index}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-h3 text-ink">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">
                      {service.summary}
                    </p>

                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2.5 text-[0.82rem] text-ink-faint"
                        >
                          <span
                            className="h-1 w-1 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
