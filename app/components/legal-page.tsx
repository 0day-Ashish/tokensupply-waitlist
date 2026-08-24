import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export type LegalSection = {
  heading: string;
  /** Each entry renders as its own paragraph. */
  body: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  /** Human-readable date, e.g. "15 August 2026". */
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:pt-36">
          {/* Ambient glow, matching the other pages */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-22%] -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-[120px]"
            style={{ background: "var(--accent-glow)" }}
          />

          <div className="mx-auto max-w-3xl">
            {/* Heading */}
            <div className="ts-rise">
              <h1 className="font-semibold text-[clamp(2.4rem,5.6vw,3.4rem)] leading-[1.08] tracking-[-0.02em] text-[var(--fg)]">
                {title}
              </h1>
              <p className="mt-5 text-[17px] leading-[1.65] text-[var(--fg-muted)]">
                {intro}
              </p>
              <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                Last updated · {updated}
              </p>
            </div>

            {/* Contents. Hairline rows in two columns rather than a filled
                card - it reads as an index, and keeps the panel from
                dominating the top of a long legal page. */}
            <nav
              aria-label="On this page"
              className="ts-rise mt-12 border-t border-[var(--line)]"
              style={{ animationDelay: "80ms" }}
            >
              <h2 className="pt-5 font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                On this page
              </h2>
              <ol className="mt-3 grid sm:grid-cols-2">
                {sections.map((section, i) => (
                  <li
                    key={section.heading}
                    className="border-b border-[var(--line)] sm:even:border-l sm:even:pl-6"
                  >
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="group flex gap-3 py-3 pr-4 transition-colors duration-200"
                    >
                      <span className="font-mono text-[11.5px] tracking-[0.12em] text-[var(--accent-text)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14.5px] text-[var(--fg-muted)] transition-colors duration-200 group-hover:text-[var(--fg)]">
                        {section.heading}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Body */}
            <div
              className="ts-rise mt-14 space-y-12"
              style={{ animationDelay: "140ms" }}
            >
              {sections.map((section, i) => (
                <section
                  key={section.heading}
                  id={slugify(section.heading)}
                  className="scroll-mt-28"
                >
                  <h2 className="flex items-baseline gap-3 font-semibold text-[1.65rem] leading-tight text-[var(--fg)]">
                    <span className="font-mono text-[12px] tracking-[0.14em] text-[var(--accent-text)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>

                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mt-4 text-[15.5px] leading-[1.7] text-[var(--fg-muted)]"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-5 space-y-2.5">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet.slice(0, 40)}
                          className="flex gap-3 text-[15.5px] leading-[1.7] text-[var(--fg-muted)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Questions. A ruled footer rather than a filled card, so the
                page ends on the same hairline rhythm as the index above. */}
            <div className="mt-16 flex flex-col gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h2 className="font-semibold text-[1.25rem] leading-tight text-[var(--fg)]">
                  Questions about this page?
                </h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                  We&apos;ll walk you through it.
                </p>
              </div>
              <a
                href="mailto:support@tokensupply.io"
                className="font-mono text-[13px] text-[var(--accent-text)] transition-opacity duration-200 hover:opacity-80"
              >
                support@tokensupply.io
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
