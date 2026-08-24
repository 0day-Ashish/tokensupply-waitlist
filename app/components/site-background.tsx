import GradientWaves from "@/components/GradientWaves";

/**
 * Fixed, full-viewport wave field sitting behind every page.
 *
 * It must NOT live inside a negative-z-index container: that puts it behind the
 * opaque page background and nothing is visible regardless of what the shader
 * draws. `body` is transparent (see globals.css) so this layer shows through.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base surface - the waves paint on top of this. */}
      <div className="absolute inset-0 bg-[var(--bg)]" />

      {/* On the white surface the wave field is a faint tint, not a scene: the
          palette is inverted to pale mints and the layer opacity dropped, so it
          reads as a soft wash at the base of the page rather than dark water. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[85%] opacity-30"
        style={{
          maskImage: "linear-gradient(to top, #000 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, #000 30%, transparent 100%)",
        }}
      >
        <GradientWaves
          horizonColor="#ffffff"
          waveColor="#d6f5e3"
          crestColor="#7ddfaa"
          speed={0.3}
          amplitude={2.2}
          brightness={1.0}
          opacity={1}
          grainIntensity={0.02}
          detail="low"
          mouseInteraction={false}
        />
      </div>
    </div>
  );
}
