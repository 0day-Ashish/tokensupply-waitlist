"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Wordmark } from "./logo";
import { ThemeToggle } from "./theme-toggle";

/** Primary nav. Every route here is built. */
const NAV = [
  { label: "About", href: "/about" },
  { label: "Channels", href: "/channels" },
  { label: "Inventory", href: "/inventory" },
  { label: "Delivery", href: "/delivery" },
  { label: "Auto pricing", href: "/auto-pricing" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The path the panel was opened against. Comparing it to the live pathname
  // during render closes the panel on a route change without a setState in an
  // effect - which would cost an extra render pass. Each link also closes on
  // click; this is what catches back/forward navigation.
  const [openedAt, setOpenedAt] = useState(pathname);

  if (open && openedAt !== pathname) {
    setOpen(false);
    setOpenedAt(pathname);
  }

  // While the panel is up, lock the page behind it and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    // A single full-width bar pinned to the top: it stays the same width and
    // height at every scroll position, so the surface is opaque from the start
    // rather than fading in behind a condensing pill.
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-xl">
      {/* The inner row is capped and padded like the page frame so the wordmark
          and nav line up with the content below, while the bar itself and its
          bottom rule run edge to edge. */}
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[84rem] items-center justify-between px-6 sm:px-10">
        <Link href="/" aria-label="TokenSupply home">
          <Wordmark />
        </Link>
        {/* Hidden below lg, where six links plus the wordmark still overflow.
            The bar is full width now, so this no longer has to wait for xl.
            A mobile menu is still the follow-up. */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[15px] transition-colors duration-200 ${
                  active
                    ? "text-[var(--fg)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Theme switch and hamburger share the right end of the bar. The
            switch shows at every width; the hamburger only below lg. */}
        <div className="-mr-2 flex shrink-0 items-center gap-1">
          <ThemeToggle />

          {/* Hamburger. Two bars that rotate into a cross rather than a swapped
              icon, so the shape morphs instead of popping. Hidden from lg up,
              where the inline nav takes over. */}
          <button
            type="button"
            onClick={() => {
              setOpen((value) => !value);
              setOpenedAt(pathname);
            }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 shrink-0 place-items-center lg:hidden"
          >
            <span className="relative block h-[14px] w-[22px]">
              <span
                className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-[var(--fg)] transition-transform duration-300 ease-[var(--ease-out-quint)] ${
                  open ? "top-[6px] rotate-45" : "top-0 rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-[var(--fg)] transition-transform duration-300 ease-[var(--ease-out-quint)] ${
                  open ? "top-[6px] -rotate-45" : "top-[12px] rotate-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Panel. Height and opacity are animated rather than a transform so the
          bar's bottom rule stays put and the links slide out from under it.
          grid-rows 0fr -> 1fr animates to the content's natural height without
          hard-coding one. */}
      <div
        id="mobile-nav"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-[400ms] ease-[var(--ease-out-quint)] lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav
            aria-label="Primary"
            className="ts-frame flex flex-col border-t border-[var(--line)] py-2"
          >
            {NAV.map((item, i) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  // Each row fades up a beat after the one above it, but only
                  // while opening - on close they leave together with the panel.
                  style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
                  className={`flex items-baseline gap-3 border-b border-[var(--line)] py-3.5 text-[17px] transition-[color,opacity,transform] duration-300 last:border-b-0 ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0"
                  } ${
                    active
                      ? "text-[var(--fg)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
