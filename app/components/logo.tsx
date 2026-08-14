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

/**
 * The brand asset files, swapped by theme: logo.svg is near-white (for the dark
 * surface) and logo-dark.png is near-black (for the light surface). CSS handles
 * the swap so it survives the no-flash theme script with no JS.
 */
export function LogoImage({ className }: { className?: string }) {
  return (
    <span className={`relative block ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo.svg"
        alt=""
        className="ts-logo-light h-full w-full object-contain"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo-dark.png"
        alt=""
        className="ts-logo-dark absolute inset-0 h-full w-full object-contain"
      />
    </span>
  );
}

export function Wordmark({ className }: MarkProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoImage className="h-[22px] w-[22px]" />
      {/* §03: Space Grotesk 600, always lowercase, tracked −0.025 em. */}
      <span className="text-[19px] font-semibold lowercase tracking-[-0.025em] text-[var(--fg)]">
        tokensupply
      </span>
    </span>
  );
}
