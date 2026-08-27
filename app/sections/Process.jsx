import { Container } from "@/app/components/ui/Container";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { processSteps } from "@/app/data/site";

export function Process() {
  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gridlines-sm mask-fade-b opacity-60"
        aria-hidden="true"
      />

      <Container>
        <SectionHeading
          index="03"
          eyebrow="How we work"
          title="Four steps, no surprises"
          lead="You always know what is happening, what it costs, and when it lands. No black boxes and no open-ended timelines."
        />

        <ol className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.number}>
              <Reveal delay={index * 0.08}>
                {/* Hairline + node reads as a single track across the row on desktop. */}
                <div className="relative mb-6 h-px w-full bg-line">
                  <span
                    className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                </div>
                <span className="font-mono text-sm text-accent">{step.number}</span>
                <h3 className="mt-4 text-h3 text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
