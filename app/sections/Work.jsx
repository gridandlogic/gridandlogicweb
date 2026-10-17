import Image from "next/image";
import { Container } from "@/app/components/ui/Container";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { projects } from "@/app/data/site";
import { cn } from "@/app/lib/utils";

const featuredWork = [
  {
    title: "Sofa Configurator",
    category: "3D Product Configurator",
    metric: "+32% conversion",
    image: "/images/sofa-configrator.png",
    href: "https://abdulahad2468.github.io/sofa-configrator/",
  },
  {
    title: "Clothing Store",
    category: "Ecommerce",
    metric: "+27% AOV",
    image: "/images/clothing%20store.png",
    href: "https://clothing-lovat.vercel.app/",
  },
  {
    title: "Pixel Nest Agency",
    category: "Agency Website",
    metric: "+45% engagement",
    image: "/images/pixelnest.png",
    href: "https://pixelnestagy.vercel.app",
  },
  {
    title: "Multi-brand Storefront",
    category: "Ecommerce",
    metric: "-28% returns",
    image: "/images/ecomerce%20website.png",
    href: "https://e-commerce-chi-eight-35.vercel.app/",
  },
];

function ProjectCard({ project, priority = false }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors duration-300 hover:border-line-bright"
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute bottom-4 left-4">
          <span className="inline-block px-3 py-1 bg-accent/90 text-canvas text-xs font-semibold rounded-full">
            {project.metric}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
          <span className="text-accent">{project.category}</span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <h3 className="text-h3 text-ink">{project.title}</h3>
          <span
            className="mt-1 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-line py-24 lg:py-32">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Featured Work"
          title="Results that speak for themselves"
          lead="Every project is built around measurable business outcomes."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredWork.map((project, index) => (
            <li key={project.href}>
              <Reveal delay={index * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
