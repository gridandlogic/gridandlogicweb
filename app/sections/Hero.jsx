import Image from "next/image";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Reveal } from "@/app/components/ui/Reveal";
import { heroStats, site } from "@/app/data/site";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Brand device: a measured grid fading out toward the edges. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gridlines mask-radial-fade"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 glow-accent" aria-hidden="true" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>3D web · Configurators · Ecommerce</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 text-display text-balance">
                <span className="text-gradient-ink">We design the grid.</span>
                <br />
                <span className="text-ink-dim">We build the </span>
                <span className="text-accent">logic</span>
                <span className="text-ink-dim">.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-lg text-lead text-ink-dim">
                {site.name} is a digital product studio making 3D websites, product
                configurators, and online stores for brands that need to sell — not
                just look good.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={site.emailHref} size="lg">
                  Book a free call
                </Button>
                <Button href="#work" size="lg" variant="outline">
                  See the work
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl font-semibold tracking-tight text-ink">
                        {stat.value}
                      </span>
                      <span className="mt-1.5 block text-xs leading-snug text-ink-faint">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* A real shipped configurator, framed as a browser window. */}
          <Reveal delay={0.1} y={26} className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent/8 blur-2xl"
              aria-hidden="true"
            />
            <figure className="overflow-hidden rounded-panel border border-line bg-panel shadow-2xl shadow-black/60">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line-bright" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-bright" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-bright" aria-hidden="true" />
                <span className="ml-3 font-mono text-[0.68rem] text-ink-faint">
                  configurator · live
                </span>
              </div>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/sofa-configrator.png"
                  alt="A sofa product configurator running in the browser, showing material and colour options"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
                <span className="text-sm text-ink">Real-time 3D product configurator</span>
                <span className="font-mono text-[0.68rem] uppercase tracking-widest text-accent">
                  Shipped
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
