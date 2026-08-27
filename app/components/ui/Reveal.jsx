"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/app/lib/utils";

/**
 * Single scroll-reveal primitive for the whole site: a short fade-and-rise that
 * plays once on enter. Replaces the previous GSAP ScrollTrigger setup, and opts
 * out entirely when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as: Component = "div",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[Component] ?? motion.div;

  if (reduceMotion) {
    return (
      <Component className={cn(className)} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
