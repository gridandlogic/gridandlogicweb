"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { Reveal } from "@/app/components/ui/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const sectionRef = useRef(null);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.05]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background pt-20"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface" />
        <div className="absolute inset-0 gradient-glow" />
      </motion.div>

      <Container className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center py-20 lg:py-32">
        <div className="hero-content max-w-5xl">
          <Reveal>
            <span className="inline-block px-4 py-2 mb-6 text-sm font-mono text-accent border border-accent/30 rounded-full">
              (We are Grid & Logic)
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-white mb-6">
              3D product configurator development for brands that want to convert.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mb-8 leading-relaxed">
              Engineered digital products for ambitious brands. 3D configurators and AR previews for furniture, ecommerce, and beyond, on web and mobile.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              onClick={() => { if (typeof window !== "undefined") window.location.href = "#contact"; }}
            >
              Book a free discovery call
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => { if (typeof window !== "undefined") window.location.href = "#work"; }}
            >
              View work
            </Button>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
