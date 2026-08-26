"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The small mono label that sits just under the fixed header, naming the
 * section currently in view.
 *
 * One marker is rendered per section rather than a single shared bar: each
 * sticks to the same offset, so as a new section scrolls up its marker takes
 * the previous one's place. That keeps the label correct without measuring
 * scroll positions, and it degrades to a plain static label with JS off.
 *
 * The index is passed in rather than derived, so the counter reads the same on
 * the server and the client.
 */
type SectionMarkerProps = {
  label: string;
  /** 1-based position of this section. */
  index: number;
  /** Total sections on the page, shown after the slash. */
  total: number;
};

export function SectionMarker({ label, index, total }: SectionMarkerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  // The rule under the bar should only appear once it has actually stuck,
  // otherwise every section carries a stray line while it is mid-page. A
  // sentinel one pixel above the marker tells us when that happens.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Read the header height from the same token the header uses, so the
    // trigger point can't drift from the bar the marker sits under.
    const headerH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-h",
        ),
        10,
      ) || 68;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      // The top margin matches the header height, so the callback fires
      // exactly when the marker reaches its resting place beneath it.
      { rootMargin: `-${headerH + 1}px 0px 0px 0px`, threshold: 1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Zero-height sentinel: observed, never painted. */}
      <div ref={ref} aria-hidden="true" className="h-px" />

      {/* Two elements, because the surface and the rule need different widths.
          The sticky wrapper carries the fill edge to edge, matching the fixed
          header above it - stopping the fill at the rails let page content
          show through in the margin outside them as it scrolled past. The row
          inside is rail-width, so the rule spans the rails only.

          The gap sits on the wrapper rather than the row: a margin on the row
          would move the painted surface too, and the bar would come to rest
          below the header instead of flush under it. */}
      <div className="sticky top-[var(--header-h)] z-30 mb-10 bg-[var(--bg)]/85 backdrop-blur-xl sm:mb-12">
        <div
          className={`ts-frame-flush flex h-11 items-center justify-between border-b px-6 transition-colors duration-200 sm:px-10 ${
            // The rule is always drawn so the label reads as a banded row at
            // rest; it only deepens once the marker actually sticks.
            stuck ? "border-[var(--line-strong)]" : "border-[var(--line)]"
          }`}
        >
          <p className="flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            <span aria-hidden="true" className="text-[var(--accent-text)]">
              &rsaquo;
            </span>
            {label}
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.1em] text-[var(--fg-faint)]">
            [{String(index).padStart(2, "0")}/{String(total).padStart(2, "0")}]
          </p>
        </div>
      </div>
    </>
  );
}
