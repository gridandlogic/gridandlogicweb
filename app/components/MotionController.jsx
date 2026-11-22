"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export function MotionController() {
  const pathname = usePathname();
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
    items.forEach((el, index) => {
      el.style.setProperty("--reveal-delay", `${(index % 3) * 65}ms`);
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add("reveal-ready");
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
