import Link from "next/link";

import { Wordmark } from "./logo";
import { FooterWaves } from "./site-background";
import { ThemeToggle } from "./theme-toggle";

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
      {/* Wave field, scoped to the foot of the page. Sits at the very back of
          the footer's stacking context, under the dot lattice and the content
          alike, so it reads as the page settling rather than a tint over it. */}
      <FooterWaves />

      {/* Dot grid, matching the reference: a 3px mint dot on a 16px lattice.
          Two masks are stacked - a horizontal one that keeps the dots at the
          left and right edges and clears the middle, and a vertical one that
          fades them out before they reach the legal row. Sits at the very back
          of the footer's stacking context so the wordmark and links paint over
          it untouched.

          The outer div mirrors <SiteRails> (max-w-[72rem], mx-3 sm:mx-5) so the
          lattice starts and stops exactly at the rails instead of running to
          the window edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex justify-center"
      >
        <div className="relative mx-3 max-w-[72rem] flex-1 bg-[radial-gradient(var(--grid-dot)_1.5px,transparent_1.5px)] bg-size-[16px_16px] mask-intersect mask-[linear-gradient(to_right,#000_0%,transparent_28%,transparent_72%,#000_100%),linear-gradient(to_bottom,#000_0%,#000_45%,transparent_85%)] sm:mx-5" />
      </div>

      {/* The rule is drawn on this frame-width element rather than on <footer>
          itself: a border on the full-width element ran edge to edge and cut
          straight across both rails. Capped here, it stops exactly at them. */}
      <div className="relative z-10 ts-frame border-t border-[var(--line)]" />

      {/* max-w-[72rem] with the padding *inside* it, matching <SiteHeader> and
          <SiteRails> - a max-w-6xl container sitting inside a px-6 footer put
          the content edge 1.5rem in from the rails instead of flush to them. */}
      <div className="relative z-10 ts-frame pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto] lg:gap-x-16">
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

          {/* Company */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]"
                >
                  About
                </Link>
              </li>
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
          {/* The theme switch sits at the right end of the legal row - a
              utility control, kept out of the primary nav. */}
          <ThemeToggle />
        </div>
      </div>

      {/* Oversized watermark, sized to span the full rail width. No horizontal
          padding and no max font size: the type scales purely with the
          container so the word scales with the frame. 17cqw fills ~94% of the
          rail width; 18cqw is the point where "tokensupply" exactly meets the
          rails, so anything above it clips the trailing glyphs. Those figures
          are tied to the wordmark face below - swapping the family changes the
          glyph widths and so the ceiling. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-10 mx-auto mt-10 max-w-[72rem] select-none [container-type:inline-size]"
      >
        {/* Tinted with the brand mint rather than --fg: at watermark opacity a
            neutral ink reads as grey, so the colour has to come from the accent
            ramp. Held low enough to stay a wash behind the legal row. */}
        <p className="translate-y-[26%] text-center text-[17cqw] leading-none font-semibold tracking-[-0.045em] whitespace-nowrap text-[var(--accent)]/[0.14] [font-family:var(--font-heading)]">
          tokensupply
        </p>
      </div>
    </footer>
  );
}
