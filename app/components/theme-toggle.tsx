"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

/**
 * The <html data-theme> attribute is the source of truth — the inline script in
 * <head> sets it before first paint, so we read it rather than mirror it in
 * component state.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "dark" as const,
  );

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — the
      // toggle still works for this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="group grid h-9 w-9 place-items-center rounded-full border border-[var(--line-strong)] bg-[var(--bg-raised)] text-[var(--fg-muted)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
        className="h-[15px] w-[15px] transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:rotate-45"
      >
        <circle cx="12" cy="12" r="4.2" />
        {[
          [12, 1.6, 12, 4],
          [12, 20, 12, 22.4],
          [1.6, 12, 4, 12],
          [20, 12, 22.4, 12],
          [4.6, 4.6, 6.3, 6.3],
          [17.7, 17.7, 19.4, 19.4],
          [19.4, 4.6, 17.7, 6.3],
          [6.3, 17.7, 4.6, 19.4],
        ].map(([x1, y1, x2, y2]) => (
          <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </svg>
    </button>
  );
}
