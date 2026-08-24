import type { Metadata } from "next";

import { FeaturePage } from "../components/feature-page";

export const metadata: Metadata = {
  title: "Delivery · TokenSupply",
  description:
    "An order lands on any channel and the key is with the buyer in seconds, at any hour, with stock synced everywhere.",
};

const FEATURES = [
  {
    title: "Always on",
    body: "Buyers pay at any hour, in any timezone. The key is in their hands before you have even seen the sale.",
  },
  {
    title: "Confirmed, not just sent",
    body: "Every delivery is confirmed with the channel, so orders never sit in pending and buyers never chase you.",
  },
  {
    title: "Stock moves with it",
    body: "The second a key leaves the vault, stock updates on every other channel. Nothing ever oversells.",
  },
];

/** The four steps of a single delivery, shown as a static replay. */
const STEPS = [
  { title: "Order received", detail: "G2A · Elden Ring Steam Key" },
  { title: "Key reserved", detail: "In the vault · 239 keys left" },
  { title: "Key delivered", detail: "XK9F-2MQ7-TT41" },
  { title: "Stock synced", detail: "Every other channel updated" },
];

const STATS = [
  { value: "1.8s", label: "Median delivery time" },
  { value: "24/7", label: "Fulfilment, no one awake" },
  { value: "0", label: "Keys pasted by hand" },
];

function DeliveryDemo() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-3.5">
        <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
          Delivery replay
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--fg-faint)] uppercase">
          TS-5117 · G2A
        </span>
      </div>

      <ol className="grid sm:grid-cols-4">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="border-t border-[var(--line)] p-6 first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0"
          >
            <span className="font-mono text-[11px] text-[var(--accent-text)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 text-[15px] font-semibold text-[var(--fg)]">
              {step.title}
            </p>
            <p className="mt-2 font-mono text-[12.5px] leading-[1.5] text-[var(--fg-muted)]">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 border-t border-[var(--line)] px-5 py-5 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-mono text-[1.6rem] leading-none text-[var(--accent-text)]">
              {stat.value}
            </p>
            <p className="mt-2 font-mono text-[10.5px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <p className="border-t border-[var(--line)] px-5 py-3 font-mono text-[10.5px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
        Simulated replay · Median across channels
      </p>
    </div>
  );
}

export default function DeliveryPage() {
  return (
    <FeaturePage
      title="Sold at 3am. Delivered at 3am."
      intro="An order lands on any channel. TokenSupply pulls a key from your vault, hands it to the buyer and updates stock on every other channel. It all happens before the buyer can refresh the page."
      specs={[
        { label: "Median delivery", value: "1.8s" },
        { label: "Coverage", value: "24/7" },
        { label: "Manual steps", value: "0" },
        { label: "Confirmation", value: "Channel-acked" },
      ]}
      endpoint={{
        label: "Order webhook",
        method: "POST",
        path: "/v1/orders/:id/fulfil",
      }}
      demo={<DeliveryDemo />}
      featuresTitle="Built for the order you didn't see."
      features={FEATURES}
      ctaTitle="Your next sale can deliver itself."
    />
  );
}
