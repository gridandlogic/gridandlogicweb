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
          title="Ready to build something intelligent?"
          lead="Book a free 30-minute discovery call. We'll map your project, identify the fastest path to value, and send you a clear plan."
        />

        <div className="mt-12 max-w-2xl">
          <Reveal>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-canvas font-semibold rounded-full hover:bg-accent/90 transition-colors"
            >
              Book a free discovery call
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm text-ink-dim">
              No pitch. No obligation. Just a clear next step.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
