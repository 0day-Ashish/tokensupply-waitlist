"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Wordmark } from "./logo";

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
      </div>
    </header>
  );
}
