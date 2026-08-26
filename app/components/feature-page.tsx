import { Mark } from "./logo";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { WaitlistForm } from "./waitlist-form";

export type Feature = {
  title: string;
  body: string;
};

/** A label/value pair for the hero's spec rail. */
export type Spec = {
  label: string;
  value: string;
};

/** The mono endpoint block under the hero intro. */
export type Endpoint = {
  /** Small caps label above the path, e.g. "Webhook". */
  label: string;
  /** Shown on the right of the header, e.g. "POST". */
  method: string;
  path: string;
};

type FeaturePageProps = {
  title: string;
  intro: string;
  /** Optional mono spec rail beside the headline. */
  specs?: Spec[];
  /** Optional code block under the intro. */
  endpoint?: Endpoint;
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
 * hero, so the chrome - hero, numbered grid, closing CTA - lives here
 * rather than being repeated four times.
 */
export function FeaturePage({
  title,
  intro,
  specs,
  endpoint,
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
          <div className="ts-frame">
            {/* Two columns from lg: the headline holds the left, the spec rail
                sits right. Below lg the rail stacks under the intro rather than
                squeezing the measure of either. */}
            <div className="ts-rise grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
              <div>
                <h1 className="font-semibold text-[clamp(1.75rem,5.6vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[var(--fg)]">
                  {title}
                </h1>
                <p className="mt-5 max-w-[620px] text-[14px] leading-[1.6] sm:text-[17px] sm:leading-[1.65] text-[var(--fg-muted)]">
                  {intro}
                </p>

                {endpoint && (
                  <div className="mt-8 max-w-[620px] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-inset)]">
                    <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5">
                      <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                        {endpoint.label}
                      </span>
                      <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--accent-text)] uppercase">
                        {endpoint.method}
                      </span>
                    </div>
                    {/* Long paths scroll inside the block rather than widening
                        the hero column on a phone. */}
                    <div className="overflow-x-auto px-4 py-3">
                      <code className="font-mono text-[13px] whitespace-pre text-[var(--fg-muted)]">
                        {endpoint.path}
                      </code>
                    </div>
                  </div>
                )}
              </div>

              {specs && specs.length > 0 && (
                <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)] lg:mt-2">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-6 py-3.5"
                    >
                      <dt className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                        {spec.label}
                      </dt>
                      <dd className="text-right font-mono text-[13px] text-[var(--fg)]">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
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
          <div className="ts-frame">
            <div className="max-w-2xl">
              <h2 className="font-semibold text-[clamp(1.75rem,4.4vw,2.9rem)] leading-[1.15] tracking-[-0.015em] text-[var(--fg)]">
                {featuresTitle}
              </h2>
              {featuresIntro && (
                <p className="mt-5 text-[15px] leading-[1.6] sm:text-[16px] sm:leading-[1.65] text-[var(--fg-muted)]">
                  {featuresIntro}
                </p>
              )}
            </div>

            {/* A reference list rather than a card wall: two columns, hairline
                rules, and the index hanging in the gutter. Dividers come from
                each row's own border - the rows are transparent, so the
                gap-px + background trick would show the page through. */}
            <div className="mt-12 grid border-t border-[var(--line)] sm:grid-cols-2">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="ts-card group relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-1 border-b border-[var(--line)] py-7 pr-6 transition-colors duration-300 hover:bg-[var(--fg)]/[0.02] sm:even:border-l sm:even:pl-8"
                >
                  <span className="ts-card-num pt-[0.3rem] font-mono text-[11.5px] tracking-[0.12em] text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-[-0.01em] sm:text-[17px] text-[var(--fg)]">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 max-w-[38ch] text-[13.5px] leading-[1.55] sm:text-[14.5px] sm:leading-[1.6] text-[var(--fg-muted)]">
                      {feature.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {extra && <section className="px-0 pb-16">{extra}</section>}

        {/* ---------------- Closing CTA ---------------- */}
        <section className="pt-16 pb-28">
          {/* A bordered panel rather than a centred block: the copy holds the
              left and the form the right, so the section reads as part of the
              page's rhythm instead of a marketing interruption. */}
          <div className="relative ts-frame-flush overflow-hidden rounded-none border border-[var(--line)] bg-[var(--bg-raised)]/50">
            {/* Ghost mark clipped to the panel, matching the home page. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="ts-drift absolute top-[70%] right-[-12%] hidden -translate-y-1/2 md:block">
                <Mark className="h-[380px] w-[380px] rotate-[18deg] text-[var(--mark-ghost)] lg:h-[460px] lg:w-[460px]" />
              </div>
            </div>

            <div className="relative z-10 grid gap-10 p-8 text-center sm:p-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-16 lg:text-left">
              <div>
                <h2 className="font-semibold text-[clamp(1.65rem,3.8vw,2.5rem)] leading-[1.14] tracking-[-0.025em] text-[var(--fg)]">
                  {ctaTitle}
                </h2>
                <p className="mt-5 mx-auto max-w-[46ch] text-[14.5px] leading-[1.6] sm:text-[15.5px] sm:leading-[1.65] text-[var(--fg-muted)] lg:mx-0">
                  Join the waitlist and your first channel is synced the week
                  you get access.
                </p>
                <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
                  313 sellers already waiting · Early access rolls out monthly
                </p>
              </div>

              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
