import type { Metadata } from "next";

import { FeaturePage } from "../components/feature-page";

export const metadata: Metadata = {
  title: "Inventory · TokenSupply",
  description:
    "Upload keys once and map them to every listing. One pool, counts that match everywhere, nothing oversold.",
};

const FEATURES = [
  {
    title: "Mapped to every listing",
    body: "One product, one pool of keys, listings on every channel you sell on. Every sale draws down the same count.",
  },
  {
    title: "Bulk upload, checked",
    body: "Paste keys or import a file. Duplicates and keys you have sold before are caught on the way in.",
  },
  {
    title: "Encrypted at rest",
    body: "Keys sit encrypted in the vault and are only revealed to the buyer at delivery.",
  },
  {
    title: "Locked the instant it sells",
    body: "A sold key is reserved before any other channel can touch it, so nothing oversells.",
  },
  {
    title: "Low-stock alerts",
    body: "Set a threshold per product and hear about it before a listing runs dry.",
  },
  {
    title: "Every movement logged",
    body: "Upload, reserve, delivery, refund. Each key's history is one click away.",
  },
];

const MAPPED = ["G2A", "Eneba", "Kinguin", "eBay", "Shopify"];

/** One pool of keys feeding five listings, all showing the same count. */
function InventoryDemo() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-3.5">
        <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
          One pool
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--accent-text)] uppercase">
          Restocked · +5
        </span>
      </div>

      <div className="grid gap-8 p-6 sm:grid-cols-[220px_1fr] sm:gap-10 sm:p-8">
        {/* The vault */}
        <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-inset)] p-5">
          <p className="text-[15px] text-[var(--fg)]">Windows 11 Pro</p>
          <p className="mt-4 font-mono text-[2.4rem] leading-none text-[var(--accent-text)]">
            412
          </p>
          <p className="mt-2 font-mono text-[10.5px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
            In the vault
          </p>
        </div>

        {/* Every listing drawing from it */}
        <ul className="space-y-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)]">
          {MAPPED.map((channel) => (
            <li
              key={channel}
              className="flex items-center justify-between bg-[var(--bg-raised)] px-4 py-3"
            >
              <span className="text-[15px] text-[var(--fg)]">{channel}</span>
              <span className="flex items-center gap-3">
                <span className="font-mono text-[10.5px] tracking-[0.12em] text-[var(--accent-text)] uppercase">
                  Live
                </span>
                <span className="font-mono text-[14px] text-[var(--fg-muted)]">
                  412
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-[var(--line)] px-5 py-3 font-mono text-[10.5px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
        Simulated stock map · Counts match everywhere
      </p>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <FeaturePage
      eyebrow="Inventory"
      title="One stock. Every listing."
      intro="Upload keys once and map them to your listings, from G2A, Eneba and Kinguin to eBay and Shopify. Every sale draws from the same pool, so counts match everywhere and nothing oversells."
      demo={<InventoryDemo />}
      featuresTitle="One inventory, properly managed."
      featuresIntro="Everything between uploading a key and it landing in a buyer's hands, handled for you."
      features={FEATURES}
      ctaTitle="Upload once. Retire the spreadsheet."
    />
  );
}
