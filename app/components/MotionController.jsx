"use client";
import { useEffect } from "react";
export function MotionController() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    items.forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add("reveal-ready");
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
