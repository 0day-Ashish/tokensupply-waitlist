"use client";

import { ReactLenis } from "lenis/react";

/**
 * Site-wide smooth scrolling.
 *
 * `root` attaches Lenis to the document scroller rather than a nested element,
 * which is what we want for a normal page. Anchor links (the legal pages' table
 * of contents) still work — Lenis intercepts them and eases to the target.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        // Respect the OS setting — Lenis is disabled outright for users who
        // asked for reduced motion, rather than merely animating faster.
        prevent: () =>
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      }}
    >
      {children}
    </ReactLenis>
  );
}
