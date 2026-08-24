import type { Metadata } from "next";

import { FeaturePage } from "../components/feature-page";

export const metadata: Metadata = {
  title: "Auto pricing · TokenSupply",
  description:
    "Set your floor and let the repricer defend it. Competitive on every channel, never sold at a loss.",
};

const FEATURES = [
  {
    title: "Rivals watched",
    body: "Every competing offer on your listings is tracked around the clock. An undercut is noticed in seconds.",
  },
  {
    title: "Floors and ceilings",
    body: "Set the least you will take and the most you will ask, per product. The repricer never leaves that range.",
  },
  {
    title: "Reprices up, not just down",
    body: "When rivals sell out or raise prices, your offer climbs back. Margin is recovered, not just defended.",
  },
  {
    title: "A rule per channel",
    body: "Different fees on every channel. Set a strategy per listing, or one rule that covers them all.",
  },
  {
    title: "No race to zero",
    body: "When the market falls through your floor, you hold and keep your margin. Volume is not worth a loss.",
  },
  {
    title: "Every change logged",
    body: "Each reprice is recorded with what triggered it, so you always know why a price moved.",
  },
];

/** Your offer sitting just under the rival's, both held above the floor. */
const PRICES = [
  {
    label: "Rival's best offer",
    value: "$29.49",
    tone: "text-[var(--fg-muted)]",
  },
  { label: "Your offer", value: "$29.39", tone: "text-[var(--accent-text)]" },
  { label: "Your floor", value: "$27.50", tone: "text-[var(--fg-faint)]" },
];

function PricingDemo() {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-raised)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-3.5">
        <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
          Simulated repricer
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--fg-faint)] uppercase">
          Windows 11 Pro
        </span>
      </div>

      <ul className="grid sm:grid-cols-3">
        {PRICES.map((price) => (
          <li
            key={price.label}
            className="border-t border-[var(--line)] p-6 first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0"
          >
            <p className="font-mono text-[10.5px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
              {price.label}
            </p>
            <p
              className={`mt-3 font-mono text-[1.7rem] leading-none ${price.tone}`}
            >
              {price.value}
            </p>
          </li>
        ))}
      </ul>

      <p className="border-t border-[var(--line)] px-5 py-3 font-mono text-[10.5px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
        Cheapest on the listing · Never below your floor
      </p>
    </div>
  );
}

export default function AutoPricingPage() {
  return (
    <FeaturePage
      title="Set your floor. We do the fighting."
      intro="Rivals undercut around the clock, and every hour you are the second-cheapest offer is an hour of missed sales."
      specs={[
        { label: "Repricing", value: "Continuous" },
        { label: "Floor", value: "Never breached" },
        { label: "Scope", value: "Per listing" },
        { label: "Undercut step", value: "Configurable" },
      ]}
      endpoint={{
        label: "Pricing rule",
        method: "PUT",
        path: "/v1/listings/:id/pricing",
      }}
      demo={<PricingDemo />}
      featuresTitle="The price war, fought properly."
      featuresIntro="Aggressive enough to stay cheapest, disciplined enough to never sell at a loss."
      features={FEATURES}
      ctaTitle="Set your margin once. Defend it forever."
    />
  );
}
