"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Wordmark } from "./logo";

/** How far the user scrolls before the bar condenses into the floating pill. */
const SCROLL_THRESHOLD = 60;

/** Primary nav. Every route here is built. */
const NAV = [
  { label: "Channels", href: "/channels" },
  { label: "Inventory", href: "/inventory" },
  { label: "Delivery", href: "/delivery" },
  { label: "Auto pricing", href: "/auto-pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll(); // handle a restored scroll position on load
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // One element throughout: the full-width bar and the floating pill are the
    // same node with different values, so the browser can tween between them.
    // Swapping two elements would cut rather than morph.
    <header
      data-scrolled={scrolled ? "true" : undefined}
      className={`fixed inset-x-0 z-50 transition-[top,padding] duration-[900ms] ease-[var(--ease-out-quint)] ${
        scrolled ? "top-4 px-4 sm:top-5 sm:px-6" : "top-0 px-0"
      }`}
    >
      {/* max-width is set inline in rem rather than via Tailwind classes: the
          two states must both be concrete, interpolatable lengths or the bar
          snaps between widths instead of easing. */}
      <div
        style={{ maxWidth: scrolled ? "56rem" : "72rem" }}
        className={`mx-auto flex w-full items-center justify-between transition-[max-width,height,border-radius,background-color,border-color,box-shadow,padding] duration-[900ms] ease-[var(--ease-out-quint)] ${
          scrolled
            ? // Blur only once the pill has a surface; frosting a transparent
              // bar would still smear the content scrolling under it.
              "h-[60px] rounded-full border border-[var(--line-strong)] bg-[var(--bg-raised)]/70 pr-3 pl-5 shadow-[0_10px_40px_-12px_rgb(0_0_0_/_0.45)] backdrop-blur-xl sm:pr-4 sm:pl-6"
            : "h-[76px] rounded-none border border-transparent bg-transparent px-6 shadow-none sm:px-10"
        }`}
      >
        <Link href="/" aria-label="TokenSupply home">
          <Wordmark />
        </Link>
        {/* Hidden below xl: six links plus the wordmark overflow the condensed
            pill at lg. A mobile menu is still the follow-up. */}
        <nav className="hidden items-center gap-5 xl:flex xl:gap-6">
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
