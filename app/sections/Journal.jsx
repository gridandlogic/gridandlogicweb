import Image from "next/image";
import { Container } from "@/app/components/ui/Container";
import { Card } from "@/app/components/ui/Card";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { posts } from "@/app/data/site";

export function Journal() {
  return (
    <section id="journal" className="scroll-mt-24 border-t border-line py-24 lg:py-32">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Journal"
          title="Notes from the work"
          lead="Short write-ups on what we are building and what we learned doing it."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.title}>
              <Reveal delay={index * 0.08} className="h-full">
                <Card interactive className="flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="object-cover opacity-90"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
                      <time dateTime={post.date}>{post.dateLabel}</time>
                      <span aria-hidden="true">·</span>
                      <span className="text-accent">{post.category}</span>
                    </div>

                    <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug tracking-tight text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-dim">
                      {post.excerpt}
                    </p>
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
