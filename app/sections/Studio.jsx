import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Reveal } from "@/app/components/ui/Reveal";
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
        <Reveal>
          <Eyebrow index="04">The studio</Eyebrow>
          <h2 className="mt-5 max-w-md text-h2 text-gradient-ink">
            A small team that treats your project like its own
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-3xl text-lead text-ink-dim">
            Grid & Logic is a digital product studio. We build and run the websites, configurators, and ecommerce stores that businesses rely on every day, and we keep the process clear so you always know what is happening.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Our mission", body: "Give businesses well-made digital tools that are simple to use and built to last." },
            { title: "Our vision", body: "To be the first agency a growing business thinks of when it needs to get online and grow." },
            { title: "Projects Delivered", body: "Websites, configurators, and stores completed for our clients." },
            { title: "Projects in Progress", body: "Current work we are building and shipping for clients." },
          ].map((item, index) => (
            <Reveal key={item.title} delay={0.1 + index * 0.05}>
              <div className="p-6 border border-line bg-surface rounded-panel">
                <h3 className="text-h3 text-ink mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-dim">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-16">
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

        <Reveal delay={0.35}>
          <Button href={site.emailHref} variant="outline" className="mt-9">
            Start a conversation
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
