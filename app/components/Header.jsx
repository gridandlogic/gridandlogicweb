"use client";

import { useEffect, useState } from "react";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { Logo } from "@/app/components/ui/Logo";
import { nav, site } from "@/app/data/site";
import { cn } from "@/app/lib/utils";

const sectionIds = nav.map((item) => item.href.slice(1));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for whichever section owns the upper part of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  // Lock background scrolling while the mobile sheet is open, and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between gap-6">
          <a href="#home" className="rounded-sm" aria-label={`${site.name} — home`}>
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                        isActive ? "text-ink" : "text-ink-dim hover:text-ink"
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-4 -bottom-0.5 h-px transition-opacity duration-200",
                          isActive ? "bg-accent opacity-100" : "opacity-0"
                        )}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button href="#contact" size="sm" variant="outline">
              Want a Project?
            </Button>
          </div>

          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-6 bg-current transition-transform duration-300",
                  menuOpen ? "top-1/2 rotate-45" : "top-0.5"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-[1.5px] w-6 bg-current transition-opacity duration-200",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-6 bg-current transition-transform duration-300",
                  menuOpen ? "top-1/2 -rotate-45" : "bottom-0.5"
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-canvas lg:hidden"
        >
          <Container>
            <nav aria-label="Mobile" className="flex flex-col py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-line/60 py-4 text-lg transition-colors",
                    active === item.href.slice(1) ? "text-accent" : "text-ink"
                  )}
                >
                  {item.label}
                  <span className="font-mono text-xs text-ink-faint" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
              <Button
                href="#contact"
                className="mt-6 w-full"
                onClick={() => setMenuOpen(false)}
              >
                Want a Project?
              </Button>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
