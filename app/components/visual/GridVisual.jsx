"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/app/lib/utils";

const GridCanvas = dynamic(() => import("./GridCanvas"), { ssr: false });

/**
 * Measures its own box and only mounts the Three.js grid once the visitor scrolls
 * near it, so the three.js chunk and GL context are never created for people who
 * never get that far down the page.
 */
export function GridVisual({ className }) {
  const holderRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    const node = holderRef.current;
    if (!node) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width: Math.round(width), height: Math.round(height) });
    });
    resizeObserver.observe(node);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInRange(true);
          intersectionObserver.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    intersectionObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  const ready = inRange && size.width > 0 && size.height > 0;

  return (
    <div ref={holderRef} className={cn("relative", className)} aria-hidden="true">
      {ready ? <GridCanvas width={size.width} height={size.height} /> : null}
    </div>
  );
}