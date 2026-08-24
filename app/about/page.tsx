import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { WaitlistForm } from "../components/waitlist-form";
import { Mark } from "../components/logo";

export const metadata: Metadata = {
  title: "About · TokenSupply",
  description:
    "TokenSupply automates key delivery for stores that sell digital goods. What we build, how we work, and where we are heading.",
};

/** Mono spec rail beside the headline, matching the product pages. */
const SPECS = [
  { label: "Entity", value: "TokenSupply Private Limited" },
  { label: "Stage", value: "Early access" },
  { label: "Onboarding", value: "Monthly" },
  { label: "Channels at launch", value: "10" },
];

const PRINCIPLES = [
  {
    title: "The boring part should be invisible",
    body: "Pasting keys at midnight is not a business, it is a chore. Everything we build exists to take a manual step off your plate and never hand it back.",
  },
  {
    title: "One source of truth",
    body: "Stock lives in one pool, not in five spreadsheets that disagree. Every listing draws from the same count, so nothing oversells.",
  },
  {
    title: "Fast is a feature",
    body: "A buyer who waits is a buyer who opens a dispute. Delivery is measured in seconds because that is what the buyer actually experiences.",
  },
  {
    title: "Official integrations only",
    body: "We connect through seller APIs the marketplaces publish. No scraping, no browser automation, nothing that breaks the week a page changes.",
  },
  {
    title: "Your keys stay yours",
    body: "Keys sit encrypted in the vault and are revealed to the buyer at delivery. Every movement is logged and one click away.",
  },
  {
    title: "Ship to sellers, not to slides",
    body: "New sellers are onboarded every month and their problems set the roadmap. The feedback loop is the product plan.",
  },
];

/** The arc from manual fulfilment to the current product. */
const TIMELINE = [
  {
    phase: "The problem",
    body: "Sellers list the same keys across G2A, Eneba, Kinguin, eBay and Shopify, then reconcile the stock by hand and deliver by copy-paste.",
  },
  {
    phase: "The wedge",
    body: "Automate the single worst moment first: an order landing at 3am with nobody awake to fulfil it.",
  },
  {
    phase: "The system",
    body: "One inventory feeding every listing, instant delivery on top of it, and auto pricing keeping each offer competitive.",
  },
  {
    phase: "Now",
    body: "Early access, with sellers onboarded monthly and ten channels integrated at launch.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ---------------- Hero ---------------- */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
          <div className="ts-frame">
            {/* Same two-column split as <FeaturePage>: headline left, spec
                rail right, stacking below lg. */}
            <div className="ts-rise grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
              <div>
                <h1 className="font-semibold text-[clamp(2.4rem,5.6vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[var(--fg)]">
                  We build the part nobody wants to do by hand.
                </h1>
                <p className="mt-5 max-w-[620px] text-[17px] leading-[1.65] text-[var(--fg-muted)]">
                  TokenSupply is automated key delivery for stores that sell
                  digital goods. Connect the channels you already sell on, load
                  your stock once, and let every order fulfil itself.
                </p>
              </div>

              <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)] lg:mt-2">
                {SPECS.map((spec) => (
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
            </div>
          </div>
        </section>

        {/* ---------------- Timeline ---------------- */}
        <section className="pb-20">
          <div className="ts-frame">
            <div className="max-w-2xl">
              <h2 className="font-semibold text-[clamp(2.1rem,4.4vw,2.9rem)] leading-[1.15] tracking-[-0.015em] text-[var(--fg)]">
                How we got here.
              </h2>
            </div>

            {/* Four ruled columns, the same hairline rhythm as the product
                pages' feature list. */}
            <ol className="mt-12 grid border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
              {TIMELINE.map((entry, i) => (
                <li
                  key={entry.phase}
                  className="border-b border-[var(--line)] py-7 pr-6 sm:even:border-l sm:even:pl-8 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
                >
                  <span className="font-mono text-[11.5px] tracking-[0.12em] text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-[var(--fg)]">
                    {entry.phase}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--fg-muted)]">
                    {entry.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- Principles ---------------- */}
        <section className="pb-20">
          <div className="ts-frame">
            <div className="max-w-2xl">
              <h2 className="font-semibold text-[clamp(2.1rem,4.4vw,2.9rem)] leading-[1.15] tracking-[-0.015em] text-[var(--fg)]">
                What we hold to.
              </h2>
              <p className="mt-5 text-[16px] leading-[1.65] text-[var(--fg-muted)]">
                The rules that decide what gets built and what gets refused.
              </p>
            </div>

            <div className="mt-12 grid border-t border-[var(--line)] sm:grid-cols-2">
              {PRINCIPLES.map((principle, i) => (
                <div
                  key={principle.title}
                  className="ts-card group relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-1 border-b border-[var(--line)] py-7 pr-6 transition-colors duration-300 hover:bg-[var(--fg)]/[0.02] sm:even:border-l sm:even:pl-8"
                >
                  <span className="ts-card-num pt-[0.3rem] font-mono text-[11.5px] tracking-[0.12em] text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[var(--fg)]">
                      {principle.title}
                    </h3>
                    <p className="mt-2.5 max-w-[38ch] text-[14.5px] leading-[1.6] text-[var(--fg-muted)]">
                      {principle.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Product links ---------------- */}
        <section className="pb-20">
          <div className="ts-frame">
            <h2 className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
              The three pieces
            </h2>
            <ul className="mt-5 grid border-t border-[var(--line)] sm:grid-cols-3">
              {[
                {
                  label: "Channels",
                  href: "/channels",
                  note: "Connect the marketplaces you already sell on.",
                },
                {
                  label: "Inventory",
                  href: "/inventory",
                  note: "One pool of keys behind every listing.",
                },
                {
                  label: "Delivery",
                  href: "/delivery",
                  note: "Orders fulfil themselves, at any hour.",
                },
              ].map((item, i) => (
                <li
                  key={item.href}
                  className={`border-b border-[var(--line)] ${
                    i > 0 ? "sm:border-l sm:pl-8" : ""
                  }`}
                >
                  <Link
                    href={item.href}
                    className="group block py-6 pr-6 transition-colors duration-200"
                  >
                    <span className="text-[16px] font-semibold text-[var(--fg)] transition-colors duration-200 group-hover:text-[var(--accent-text)]">
                      {item.label}
                    </span>
                    <span className="mt-2 block text-[14.5px] leading-[1.6] text-[var(--fg-muted)]">
                      {item.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- Closing CTA ---------------- */}
        <section className="pt-4 pb-28">
          {/* Same bordered panel as <FeaturePage>'s closing CTA. */}
          <div className="relative ts-frame-flush overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-raised)]/50">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="ts-drift absolute top-[70%] right-[-12%] hidden -translate-y-1/2 md:block">
                <Mark className="h-[380px] w-[380px] rotate-[18deg] text-[var(--mark-ghost)] lg:h-[460px] lg:w-[460px]" />
              </div>
            </div>

            <div className="relative z-10 grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-16">
              <div>
                <h2 className="font-semibold text-[clamp(1.85rem,3.8vw,2.5rem)] leading-[1.14] tracking-[-0.025em] text-[var(--fg)]">
                  Come and build the boring part with us.
                </h2>
                <p className="mt-5 max-w-[46ch] text-[15.5px] leading-[1.65] text-[var(--fg-muted)]">
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
