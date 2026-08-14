"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Wordmark } from "./logo";
import { ThemeToggle } from "./theme-toggle";

/** How far the user scrolls before the bar condenses into the floating pill. */
const SCROLL_THRESHOLD = 60;

export function SiteHeader() {
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
        style={{ maxWidth: scrolled ? "56rem" : "100rem" }}
        className={`mx-auto flex w-full items-center justify-between backdrop-blur-xl transition-[max-width,height,border-radius,background-color,border-color,box-shadow,padding] duration-[900ms] ease-[var(--ease-out-quint)] ${
          scrolled
            ? "h-[60px] rounded-full border border-[var(--line-strong)] bg-[var(--bg-raised)]/70 pr-3 pl-5 shadow-[0_10px_40px_-12px_rgb(0_0_0_/_0.45)] sm:pr-4 sm:pl-6"
            : "h-[76px] rounded-none border border-transparent border-b-[var(--line)]/70 bg-[var(--bg-raised)]/70 px-6 shadow-none sm:px-10"
        }`}
      >
        <Link href="/" aria-label="TokenSupply home">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-4 sm:gap-5">
          <Link
            href="/contact"
            className="text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
