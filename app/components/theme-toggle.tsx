"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Light/dark switch for the header.
 *
 * The active theme is applied by an inline script in <RootLayout> before first
 * paint, so this component only has to read what that script decided and write
 * changes back. It starts as null and fills in after mount: on the server there
 * is no way to know the stored preference, and rendering a guess would light
 * the wrong icon for a beat.
 */
export function ThemeToggle() {
  // Deliberately NOT seeded from the DOM during render. The inline script in
  // <RootLayout> has already flipped data-theme by the time this runs on the
  // client, so reading it here would render a different aria-checked and icon
  // state than the server produced - a hydration mismatch. Start null (matching
  // the server) and sync in an effect, which runs after hydration is done.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const read = () =>
      setTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

    read();

    // Keeps the icon honest if anything else rewrites the attribute - another
    // tab through the storage event, or a future OS-preference listener.
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the theme still applies for this
      // page view, it just will not be remembered.
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light" : "Switch to dark"}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-[var(--fg-muted)] transition-colors duration-200 hover:bg-[var(--fg)]/[0.06] hover:text-[var(--fg)]"
    >
      {/* Both icons are always mounted and cross-fade, so the swap has no
          layout step. aria-hidden because the button already has a label. */}
      <span aria-hidden="true" className="relative block h-[18px] w-[18px]">
        {/* Sun */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-300 ease-[var(--ease-out-quint)] ${
            isDark ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.4v2.2M12 19.4v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.4 12h2.2M19.4 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
        </svg>

        {/* Moon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-300 ease-[var(--ease-out-quint)] ${
            isDark ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <path d="M20.5 14.2A8.6 8.6 0 1 1 9.8 3.5a6.9 6.9 0 0 0 10.7 10.7Z" />
        </svg>
      </span>
    </button>
  );
}
