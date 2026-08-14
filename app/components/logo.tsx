type MarkProps = {
  className?: string;
  /**
   * Bloom each petal in on load, then rotate slowly. Only worth it for the
   * hero mark — the header/footer copies stay static.
   */
  animated?: boolean;
};

const ANGLES = [0, 60, 120, 180, 240, 300];

/**
 * The tokensupply asterisk — six tapered petals around a common center.
 * Uses currentColor so it inherits from whatever it sits in.
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
              x="41.5"
              y="6"
              width="17"
              height="88"
              rx="8.5"
              className={animated ? "ts-petal" : undefined}
              style={
                animated
                  ? {
                      // Petals scale out of the star's center, staggered.
                      transformOrigin: "50px 50px",
                      animationDelay: `${i * 90}ms`,
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
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <Mark className="h-[22px] w-[22px] text-[var(--fg)]" />
      <span className="text-[19px] font-medium tracking-[-0.02em] text-[var(--fg)]">
        tokensupply
      </span>
    </span>
  );
}
