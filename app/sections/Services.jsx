import Image from "next/image";
import { Container } from "@/app/components/ui/Container";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { site } from "@/app/data/site";

const services = [
  {
    title: "3D Configurator",
    description: "Real-time product customization that increases conversion and reduces returns.",
    link: "#contact",
  },
  {
    title: "AR Previews",
    description: "Augmented reality experiences that let customers see products in their space.",
    link: "#contact",
  },
  {
    title: "AI Integration",
    description: "Smart recommendations and automated workflows powered by artificial intelligence.",
    link: "#contact",
  },
  {
    title: "Web & Ecommerce",
    description: "High-performance websites and stores built to convert visitors into customers.",
    link: "#contact",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="Services & Expertise"
          title="Systems built to perform"
          lead="Every service is engineered around a single business result, so your investment turns into measurable growth."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <li key={service.title}>
              <Reveal delay={index * 0.08} className="h-full">
                <Card interactive className="flex h-full flex-col p-6 border border-line bg-surface hover:border-accent/50 transition-colors">
                  <h3 className="text-h3 text-ink mb-3">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-dim mb-6 flex-1">
                    {service.description}
                  </p>

                  <Button 
                    href={service.link} 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    Learn more
                  </Button>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
