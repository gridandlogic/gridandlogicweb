import Image from "next/image";
import { Container } from "@/app/components/ui/Container";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { site } from "@/app/data/site";

const services = [
  {
    title: "3D Configurators",
    description: "Real-time product configurators that let customers customize, preview, and buy faster.",
    image: "/images/sofa-configrator.png",
    imageAlt: "Sofa configurator interface",
  },
  {
    title: "Web & Ecommerce",
    description: "Websites and online stores built to convert visitors into customers.",
    image: "/images/ecomerce%20website.png",
    imageAlt: "Ecommerce storefront",
  },
  {
    title: "Brand & Content",
    description: "Content, posts, and visuals that grow your audience and make your brand memorable.",
    image: "/images/image-36.png",
    imageAlt: "Brand design samples",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="Services"
          title="Everything you need to get online and grow"
          lead="Three services, one team. Choose one, or let us handle the whole thing."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.title}>
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
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-h3 text-ink">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">
                      {service.description}
                    </p>

                    <Button 
                      href={site.emailHref} 
                      variant="outline" 
                      size="sm" 
                      className="mt-6 w-full"
                    >
                      Start a Project
                    </Button>
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
