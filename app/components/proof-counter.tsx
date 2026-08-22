"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1400;

/** Ease-out cubic: fast off the mark, settling gently onto the final figure. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * A proof figure that counts up to its value the first time it scrolls into
 * view.
 *
 * The strip sits well below the fold, so animating on mount would burn through
 * the count while the section is still offscreen and leave a static number by
 * the time anyone reached it. An IntersectionObserver defers the run to the
 * moment it's actually visible, and disconnects after firing so scrolling back
 * up doesn't replay it.
 */
export function ProofCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  // Start at the final value: with JS disabled, or before the observer fires,
  // the real figure is what should be on screen - never a stray zero.
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect a reduced-motion preference by leaving the final value in place.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          setDisplay(+(value * easeOut(t)).toFixed(decimals));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, decimals]);

  return (
    <p
      ref={ref}
      className="font-semibold text-[2.9rem] leading-none tracking-[-0.01em] text-[var(--accent)] tabular-nums"
    >
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </p>
  );
}
