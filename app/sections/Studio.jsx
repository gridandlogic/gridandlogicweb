import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Reveal } from "@/app/components/ui/Reveal";
import { GlobeVisual } from "@/app/components/visual/GlobeVisual";
import { site } from "@/app/data/site";

const principles = [
  {
    title: "Senior hands only",
    body: "The people you meet on the call are the people who design and build the thing.",
  },
  {
    title: "Built in the open",
    body: "You get a live staging link from week one, not a slide deck at the end.",
  },
  {
    title: "Owned by you",
    body: "Clean, documented code in your repository, on your hosting, with no lock-in.",
  },
];

export function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 border-t border-line py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow index="04">The studio</Eyebrow>
              <h2 className="mt-5 max-w-md text-h2 text-gradient-ink">
                A small studio, built to ship
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-lg text-lead text-ink-dim">
                We are a compact team of designers and engineers working remotely with
                brands around the world. Small enough to move quickly, experienced
                enough to get it right the first time.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-10 flex flex-col divide-y divide-line border-y border-line">
                {principles.map((principle) => (
                  <div key={principle.title} className="py-5">
                    <dt className="text-[0.95rem] font-medium text-ink">
                      {principle.title}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                      {principle.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <Button href={site.emailHref} variant="outline" className="mt-9">
                Start a conversation
              </Button>
            </Reveal>
          </div>

          {/* Global reach, shown rather than claimed. */}
          <Reveal delay={0.1} className="relative">
            <div className="overflow-hidden rounded-panel border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
                  Remote-first
                </span>
                <span className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Working worldwide
                </span>
              </div>
              <div className="relative">
                <GlobeVisual className="h-[300px] w-full sm:h-[380px] lg:h-[440px]" />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
