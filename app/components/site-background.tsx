"use client";

import { useEffect, useState } from "react";

import GradientWaves from "@/components/GradientWaves";

/**
 * Wave palettes per theme.
 *
 * These are shader uniforms, not CSS, so they cannot read the --bg/--accent
 * tokens the rest of the site uses - the values have to be duplicated here and
 * kept in step with globals.css by hand.
 *
 * Light keeps the field as a faint tint: pale mints at low layer opacity, so it
 * reads as a wash rather than dark water. Dark restores the deeper palette the
 * original surface used, where the field can carry more weight without
 * competing with the copy above it.
 */
const PALETTES = {
  light: {
    horizonColor: "#ffffff",
    waveColor: "#d6f5e3",
    crestColor: "#7ddfaa",
    grainIntensity: 0.02,
    layerOpacity: "opacity-30",
  },
  dark: {
    horizonColor: "#000000",
    waveColor: "#0e3d2c",
    crestColor: "#17c989",
    grainIntensity: 0.03,
    layerOpacity: "opacity-45",
  },
} as const;

/** Reads the live theme off <html>, following the toggle's attribute writes. */
function useTheme() {
  // Starts light to match the server render, then corrects after mount. The
  // field is decorative, so a one-frame palette correction is invisible in a
  // way a content flash would not be.
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

    read();

    // The toggle rewrites the attribute rather than re-rendering this tree,
    // so the change has to be observed rather than passed down.
    const observer = new MutationObserver(read);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

/**
 * The page's base surface: a fixed, opaque --bg layer behind everything.
 *
 * `body` is transparent (see globals.css), so without this the page would show
 * the browser's own canvas. It must NOT sit at a negative z-index, which would
 * put it behind that canvas and paint nothing.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-[var(--bg)]"
    />
  );
}

/**
 * The wave field, scoped to the foot of the page.
 *
 * This used to be a fixed full-viewport layer sitting behind every section.
 * Rendered inside <SiteFooter> instead, it reads as the page settling into the
 * footer rather than a tint applied to the whole site. The footer is
 * `relative overflow-hidden`, so this absolute band is clipped to it.
 */
export function FooterWaves() {
  const theme = useTheme();
  const palette = PALETTES[theme];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[420px] transition-opacity duration-500 ${palette.layerOpacity}`}
      style={{
        // Fades in from nothing at the top so the field emerges out of the
        // footer surface instead of starting on a hard edge.
        maskImage: "linear-gradient(to top, #000 35%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, #000 35%, transparent 100%)",
      }}
    >
      <GradientWaves
        // Remounts the canvas when the palette changes: the shader reads its
        // colours as uniforms at init, so without this the old palette stays
        // painted until something else forces a redraw.
        key={theme}
        horizonColor={palette.horizonColor}
        waveColor={palette.waveColor}
        crestColor={palette.crestColor}
        speed={0.3}
        amplitude={2.2}
        brightness={1.0}
        opacity={1}
        grainIntensity={palette.grainIntensity}
        detail="low"
        mouseInteraction={false}
      />
    </div>
  );
}
