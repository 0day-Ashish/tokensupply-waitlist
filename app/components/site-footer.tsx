import Link from "next/link";

import { Wordmark } from "./logo";

const SOCIALS = [
  { label: "X / Twitter", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Discord", href: "https://discord.com" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] px-6 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:gap-x-24">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="TokenSupply home">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-[320px] text-[15px] leading-[1.6] text-[var(--fg-muted)]">
              Automated key delivery for stores that sell digital goods.
            </p>
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

      {/* Oversized watermark. Full-bleed rather than inside the max-w-6xl
          container, so it centers on the viewport instead of overflowing
          the container's right edge. */}
      <div aria-hidden="true" className="pointer-events-none -mx-6 mt-10 select-none">
        <p className="translate-y-[26%] text-center text-[clamp(4rem,17vw,15rem)] leading-none font-semibold tracking-[-0.045em] whitespace-nowrap text-[var(--fg)]/[0.035]">
          tokensupply
        </p>
      </div>
    </footer>
  );
}
