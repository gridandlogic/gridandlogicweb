"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { ScrollReveal } from "@/app/components/animation/ScrollReveal";

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
        <div className="hero-content max-w-4xl">
          <ScrollReveal>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-white mb-6">
              Digital work that moves your business forward.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
              Grid & Logic designs and builds 3D websites, product configurators, and ecommerce stores for businesses that want to look sharp and grow steadily.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              onClick={() => { if (typeof window !== "undefined") window.location.href = "mailto:info@gridandlogic.com?subject=Project%20enquiry"; }}
            >
              Start a Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => { if (typeof window !== "undefined") window.location.href = "#services"; }}
            >
              Explore Services
            </Button>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
