import Link from "next/link";

import { Wordmark } from "./logo";

/** Mirrors the header nav, matching the live site's footer. */
const PRODUCT = [
  { label: "Channels", href: "/channels" },
  { label: "Inventory", href: "/inventory" },
  { label: "Delivery", href: "/delivery" },
  { label: "Auto pricing", href: "/auto-pricing" },
];

const SOCIALS = [
  { label: "X / Twitter", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Discord", href: "https://discord.com" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* The rule is drawn on this frame-width element rather than on <footer>
          itself: a border on the full-width element ran edge to edge and cut
          straight across both rails. Capped here, it stops exactly at them. */}
      <div className="mx-auto max-w-[72rem] border-t border-[var(--line)]" />

      {/* max-w-[72rem] with the padding *inside* it, matching <SiteHeader> and
          <SiteRails> - a max-w-6xl container sitting inside a px-6 footer put
          the content edge 1.5rem in from the rails instead of flush to them. */}
      <div className="mx-auto max-w-[72rem] px-6 pt-16 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-x-20">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="TokenSupply home">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-[320px] text-[15px] leading-[1.6] text-[var(--fg-muted)]">
              Automated key delivery for stores that sell digital goods.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
              Follow along
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]"
                >
                  Get in touch
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@tokensupply.io"
                  className="text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]"
                >
                  support@tokensupply.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-mono text-[11.5px] tracking-[0.1em] text-[var(--fg-faint)] uppercase">
              © {new Date().getFullYear()} TokenSupply Private Limited
            </p>
            <Link
              href="/terms"
              className="font-mono text-[11.5px] tracking-[0.1em] text-[var(--fg-faint)] uppercase transition-colors duration-200 hover:text-[var(--fg)]"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="font-mono text-[11.5px] tracking-[0.1em] text-[var(--fg-faint)] uppercase transition-colors duration-200 hover:text-[var(--fg)]"
            >
              Privacy
            </Link>
          </div>
          <p className="font-mono text-[11.5px] tracking-[0.1em] text-[var(--fg-faint)] uppercase">
            Every key, one mark
          </p>
        </div>
      </div>

      {/* Oversized watermark, sized to span the full rail width. No horizontal
          padding and no max font size: the type scales purely with the
          container so the word scales with the frame. 17cqw fills ~94% of the
          rail width; 18cqw is the point where "tokensupply" exactly meets the
          rails, so anything above it clips the trailing glyphs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-10 max-w-[72rem] select-none [container-type:inline-size]"
      >
        <p className="translate-y-[26%] text-center text-[17cqw] leading-none font-semibold tracking-[-0.045em] whitespace-nowrap text-[var(--fg)]/[0.035]">
          tokensupply
        </p>
      </div>
    </footer>
  );
}
