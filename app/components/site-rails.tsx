/**
 * The two vertical rules that frame the page, edge to edge of the content
 * column.
 *
 * These are fixed rather than drawn on a wrapper element: the rails have to run
 * unbroken from the top of the viewport to the bottom, past sections that each
 * set their own max-width and padding. Painting them once, above the wave
 * field but below the content, keeps them continuous while scrolling and costs
 * no layout.
 */
export function SiteRails() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] flex justify-center"
    >
      {/* A tight frame around the content rather than the window edge. This
          is close to the floor: the widest section inside the rails is
          max-w-5xl (64rem), so 72rem leaves only ~4rem of clearance a side. The
          margin keeps them off the screen edge on narrower viewports, where a
          rail flush against the bezel reads as nothing at all. */}
      <div className="relative mx-3 w-full max-w-[72rem] sm:mx-5">
        <div className="absolute inset-y-0 left-0 w-px bg-[var(--line)]" />
        <div className="absolute inset-y-0 right-0 w-px bg-[var(--line)]" />
      </div>
    </div>
  );
}
