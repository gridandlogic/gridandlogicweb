import Image from "next/image";
import { Container } from "@/app/components/ui/Container";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { projects } from "@/app/data/site";
import { cn } from "@/app/lib/utils";

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
      <div
        className={cn(
          "relative overflow-hidden border-b border-line",
          project.featured ? "aspect-[16/9]" : "aspect-[16/10]"
        )}
      >
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          fill
          priority={priority}
          sizes={
            project.featured
              ? "(max-width: 768px) 100vw, 1120px"
              : "(max-width: 768px) 100vw, 560px"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
          <span className="text-accent">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
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

        <p className="mt-2 text-sm leading-relaxed text-ink-dim">{project.result}</p>
      </div>
    </a>
  );
}

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="scroll-mt-24 border-t border-line py-24 lg:py-32">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Things we have shipped"
          lead="A configurator, an agency site, and two storefronts — all live, all linked. Open any of them."
        />

        <div className="grid gap-6">
          <Reveal>
            <ProjectCard project={featured} priority />
          </Reveal>

          {/* Tablets get a 2-up like every other section; three across only
              once there is real width for the card copy. */}
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, index) => (
              <li key={project.href}>
                <Reveal delay={index * 0.08} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
