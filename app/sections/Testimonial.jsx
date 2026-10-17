import Image from "next/image";
import { Container } from "@/app/components/ui/Container";
import { Reveal } from "@/app/components/ui/Reveal";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { testimonial } from "@/app/data/site";

export function Testimonial() {
  return (
    <section className="relative overflow-hidden border-t border-line py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 glow-accent opacity-70" aria-hidden="true" />

      <Container>
        <Reveal>
          <Eyebrow index="05">What clients say</Eyebrow>
          <h2 className="mt-5 max-w-md text-h2 text-gradient-ink">
            Real feedback from the people we have worked with
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 flex max-w-3xl flex-col items-center text-center">
          <span className="hairline h-px w-24" aria-hidden="true" />

          <figure className="mt-10">
            <blockquote>
              <p className="text-h2 text-balance text-gradient-ink">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="mx-auto mt-7 max-w-xl text-lead text-balance text-ink-dim">
                {testimonial.body}
              </p>
            </blockquote>

            <figcaption className="mt-10 flex items-center justify-center gap-4">
              <span className="relative h-11 w-11 overflow-hidden rounded-full border border-line">
                <Image
                  src={testimonial.avatar}
                  alt=""
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="text-left">
                <span className="block text-sm font-medium text-ink">
                  {testimonial.name}
                </span>
                <span className="block text-xs text-ink-faint">{testimonial.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
