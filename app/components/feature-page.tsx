import { Mark } from "./logo";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { WaitlistForm } from "./waitlist-form";

export type Feature = {
  title: string;
  body: string;
};

type FeaturePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  /** Heading above the six numbered cards. */
  featuresTitle: string;
  /** Optional line under that heading. */
  featuresIntro?: string;
  features: Feature[];
  ctaTitle: string;
  /** The demo panel that sits between the hero and the feature grid. */
  demo?: React.ReactNode;
  /** Optional extra section between the feature grid and the closing CTA. */
  extra?: React.ReactNode;
};

/**
 * Shared shell for the four product pages (channels, inventory, delivery,
 * auto pricing). They differ only in copy and in the demo panel under the
 * hero, so the chrome - eyebrow, hero, numbered grid, closing CTA - lives here
 * rather than being repeated four times.
 */
export function FeaturePage({
  eyebrow,
  title,
  intro,
  featuresTitle,
  featuresIntro,
  features,
  ctaTitle,
  demo,
  extra,
}: FeaturePageProps) {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ---------------- Hero ---------------- */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
          {/* Ambient glow, matching the other pages */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-22%] -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-[120px]"
            style={{ background: "var(--accent-glow)" }}
          />

          <div className="mx-auto max-w-[72rem] px-6 sm:px-10">
            <div className="ts-rise max-w-3xl">
              <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--accent-text)] uppercase">
                {eyebrow}
              </span>
              <h1 className="mt-6 font-semibold text-[clamp(2.4rem,5.6vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[var(--fg)]">
                {title}
              </h1>
              <p className="mt-5 max-w-[620px] text-[17px] leading-[1.65] text-[var(--fg-muted)]">
                {intro}
              </p>
            </div>

            {demo && (
              <div className="ts-rise mt-16" style={{ animationDelay: "80ms" }}>
                {demo}
              </div>
            )}
          </div>
        </section>

        {/* ---------------- Feature grid ---------------- */}
        <section className="py-20">
          {/* Padding inside the 72rem cap, matching the hero above and
              <SiteRails> - on the section it fell outside the cap and left the
              heading flush against the left rail. */}
          <div className="mx-auto max-w-[72rem] px-6 sm:px-10">
            <div className="max-w-2xl">
              <h2 className="font-semibold text-[clamp(2.1rem,4.4vw,2.9rem)] leading-[1.15] tracking-[-0.015em] text-[var(--fg)]">
                {featuresTitle}
              </h2>
              {featuresIntro && (
                <p className="mt-5 text-[16px] leading-[1.65] text-[var(--fg-muted)]">
                  {featuresIntro}
                </p>
              )}
            </div>

            {/* Dividers come from each cell's own border, matching the home
                page's "how it works" grid - the cards are transparent, so the
                gap-px + background trick would show the page through. */}
            <div className="mt-14 grid overflow-hidden rounded-2xl border border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="ts-card group relative border-t border-[var(--line)] p-8 transition-colors duration-300 first:border-t-0 hover:bg-[var(--fg)]/[0.03] sm:border-t-0 sm:border-l sm:first:border-l-0"
                >
                  <span className="ts-card-num block font-mono text-[12px] text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ts-card-rule mt-4 block h-px w-10 bg-[var(--accent)]" />
                  <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-[var(--fg)]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[var(--fg-muted)]">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {extra && <section className="px-0 pb-16">{extra}</section>}

        {/* ---------------- Closing CTA ---------------- */}
        <section className="relative px-6 pt-16 pb-28">
          {/* Ghost mark clipped to the rail frame, matching the home page. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mx-auto max-w-[72rem] overflow-hidden"
          >
            <div className="ts-drift absolute top-[72%] right-[-14%] hidden -translate-y-1/2 md:block">
              <Mark className="h-[460px] w-[460px] rotate-[18deg] text-[var(--mark-ghost)] lg:h-[560px] lg:w-[560px]" />
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h2 className="mx-auto font-semibold text-[clamp(2rem,4.6vw,3rem)] leading-[1.14] tracking-[-0.025em] text-[var(--fg)]">
              {ctaTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-[560px] text-[15.5px] leading-[1.65] text-[var(--fg-muted)]">
              Join the waitlist and your first channel is synced the week you
              get access.
            </p>
            <div className="mt-10">
              <WaitlistForm />
            </div>
            <p className="mt-8 font-mono text-[11.5px] tracking-[0.1em] text-[var(--fg-muted)] uppercase">
              313 sellers already waiting · Early access rolls out monthly
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
