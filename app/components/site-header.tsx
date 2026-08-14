import Link from "next/link";

import { Wordmark } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    // Floating pill: fixed above the page rather than a full-width bar, so the
    // content scrolls underneath it.
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5 sm:px-6">
      <div className="mx-auto flex h-[60px] max-w-4xl items-center justify-between rounded-full border border-[var(--line-strong)] bg-[var(--bg-raised)]/70 pr-3 pl-5 shadow-[0_10px_40px_-12px_rgb(0_0_0_/_0.45)] backdrop-blur-xl sm:pr-4 sm:pl-6">
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
