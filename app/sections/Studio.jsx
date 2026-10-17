import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Reveal } from "@/app/components/ui/Reveal";
import { site } from "@/app/data/site";

const principles = [
  {
    title: "Senior-led, not junior-run",
    body: "The people you meet on the call are the people who design and build the thing.",
  },
  {
    title: "Remote-first, global reach",
    body: "We work with brands around the world, delivering results regardless of location.",
  },
];

export function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 border-t border-line py-24 lg:py-32">
      <Container>
        <Reveal>
          <Eyebrow index="04">About Us</Eyebrow>
          <h2 className="mt-5 max-w-md text-h2 text-gradient-ink">
            Intelligent products, built to ship
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-3xl text-lead text-ink-dim">
            We are a digital product agency combining strategy, design, and engineering to turn complex ideas into production-ready systems.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <dl className="flex flex-col divide-y divide-line border-y border-line max-w-2xl">
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
          <Button href="#contact" variant="outline" className="mt-9">
            Get in touch
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
