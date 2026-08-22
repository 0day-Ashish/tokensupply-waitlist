type MarkProps = {
  className?: string;
  /**
   * Bloom each petal in on load, then rotate slowly. Only worth it for the
   * hero mark - the header/footer copies stay static.
   */
  animated?: boolean;
};

/**
 * Geometry taken verbatim from public/assets/logo.svg: three rounded bars at
 * 0/60/120°, which read as a six-pointed asterisk.
 */
const ANGLES = [0, 60, 120];

/**
 * The tokensupply asterisk.
 *
 * Rendered inline rather than as an <img> so it can inherit currentColor (the
 * mark appears in accent, muted and inverted contexts) and so the hero copy can
 * animate its individual petals. The source file hardcodes a single fill, which
 * neither of those allows.
 */
export function Mark({ className, animated = false }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={`${animated ? "ts-mark-spin" : ""} ${className ?? ""}`}
    >
      <g fill="currentColor">
        {ANGLES.map((angle, i) => (
          // The <g> holds the petal's fixed rotation via the SVG attribute; the
          // <rect> inside animates with CSS transforms. Keeping them on separate
          // elements stops the animation from clobbering the rotation.
          <g key={angle} transform={`rotate(${angle} 50 50)`}>
            <rect
              x="39"
              y="6"
              width="22"
              height="88"
              rx="9"
              className={animated ? "ts-petal" : undefined}
              style={
                animated
                  ? {
                      // Petals scale out of the star's center, staggered.
                      transformOrigin: "50px 50px",
                      animationDelay: `${i * 110}ms`,
                    }
                  : undefined
              }
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Wordmark({ className }: MarkProps) {
  return (
    // ts-wordmark is the hover hook; the rule lives in globals.css so the mark
    // and the text can transition together off the one parent. This uses the
    // inline <Mark> rather than the logo.svg <img> it replaced: an <img> can't
    // inherit currentColor, and the hover tints the mark to the accent.
    <span className={`ts-wordmark flex items-center gap-2.5 ${className ?? ""}`}>
      <Mark className="ts-wordmark-mark h-[22px] w-[22px] text-[var(--fg)]" />
      {/* §03: Space Grotesk 600, always lowercase, tracked −0.025 em. */}
      <span className="ts-wordmark-text text-[19px] font-semibold lowercase tracking-[-0.025em] text-[var(--fg)]">
        tokensupply
      </span>
    </span>
  );
}
