import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export type LegalSection = {
  heading: string;
  /** Each entry renders as its own paragraph. */
  body: string[];
  bullets?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  /** Human-readable date, e.g. "15 August 2026". */
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({
  eyebrow,
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
              <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--accent-text)] uppercase">
                {eyebrow}
              </span>
              <h1 className="mt-6 font-semibold text-[clamp(2.4rem,5.6vw,3.4rem)] leading-[1.08] tracking-[-0.02em] text-[var(--fg)]">
                {title}
              </h1>
              <p className="mt-5 text-[17px] leading-[1.65] text-[var(--fg-muted)]">
                {intro}
              </p>
              <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                Last updated · {updated}
              </p>
            </div>

            {/* Contents */}
            <nav
              aria-label="On this page"
              className="ts-rise mt-12 rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)]/60 p-6"
              style={{ animationDelay: "80ms" }}
            >
              <h2 className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                On this page
              </h2>
              <ol className="mt-4 space-y-2">
                {sections.map((section, i) => (
                  <li key={section.heading} className="flex gap-3">
                    <span className="font-mono text-[12px] text-[var(--accent-text)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="text-[15px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]"
                    >
                      {section.heading}
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

            {/* Questions */}
            <div className="mt-16 rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)]/60 p-6 sm:p-8">
              <h2 className="font-semibold text-[1.4rem] leading-tight text-[var(--fg)]">
                Questions about this page?
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                Email{" "}
                <a
                  href="mailto:support@tokensupply.io"
                  className="text-[var(--accent-text)] transition-opacity duration-200 hover:opacity-80"
                >
                  support@tokensupply.io
                </a>{" "}
                and we&apos;ll walk you through it.
              </p>
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
