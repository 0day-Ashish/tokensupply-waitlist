import type { Metadata } from "next";
import Image from "next/image";

import { FeaturePage } from "../components/feature-page";

export const metadata: Metadata = {
  title: "Channels · TokenSupply",
  description:
    "Connect the marketplaces you already sell on. Listings, offers, orders and stock, all run from one place.",
};

const FEATURES = [
  {
    title: "Orders pulled in",
    body: "Every order lands in TokenSupply the moment it is placed on the channel. Nothing to import by hand.",
  },
  {
    title: "Instant delivery",
    body: "Keys are delivered channel-side in seconds and the order is marked fulfilled where the buyer bought.",
  },
  {
    title: "Stock sync per listing",
    body: "Map a product to a listing and the pool keeps that listing's count true. Map it across channels and one stock feeds them all.",
  },
  {
    title: "Listings and offers, here",
    body: "Create listings, change offer prices and pause them without opening a single seller panel.",
  },
  {
    title: "Quick switch",
    body: "Flip between connected channels in one click. Same screen, different store.",
  },
  {
    title: "Already selling there?",
    body: "Add the integration and your store appears here as it is: listings, orders and history intact.",
  },
];

/** The ten integrations live at launch. Logo files match the home marquee. */
const CHANNELS = [
  { name: "G2A", src: "/assets/435267.png" },
  { name: "Eneba", src: "/assets/eneba.webp" },
  { name: "Kinguin", src: "/assets/kinguin.webp" },
  { name: "eBay", src: "/assets/ebay.png" },
  { name: "Shopify", src: "/assets/shopify.png" },
  { name: "G2G", src: "/assets/g2g.png" },
  { name: "Gamivo", src: "/assets/gamivo250.png" },
  { name: "Driffle", src: "/assets/driffle250.png" },
  { name: "BigCommerce", src: "/assets/bigcommerce.webp" },
  { name: "Whoop", src: "/assets/whoop.png" },
];

const LISTINGS = [
  { name: "Windows 11 Pro", offer: "$29.99", stock: "412" },
  { name: "Elden Ring Steam Key", offer: "$38.40", stock: "240" },
  { name: "Office 2021 Pro Plus", offer: "$52.00", stock: "165" },
];

/** A seller panel for one connected channel, rendered as a static mock. */
function ChannelDemo() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-3.5">
        <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
          G2A · Your store
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--fg-faint)] uppercase">
          Manage listings · Update offers · Pause anytime
        </span>
      </div>

      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--line)]">
            {["Listing", "Offer", "Stock"].map((head) => (
              <th
                key={head}
                scope="col"
                className="px-5 py-3 font-mono text-[10.5px] font-normal tracking-[0.14em] text-[var(--fg-faint)] uppercase last:text-right"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {LISTINGS.map((row) => (
            <tr key={row.name} className="border-b border-[var(--line)]">
              <td className="px-5 py-3.5 text-[15px] text-[var(--fg)]">
                {row.name}
              </td>
              <td className="px-5 py-3.5 font-mono text-[14px] text-[var(--fg-muted)]">
                {row.offer}
              </td>
              <td className="px-5 py-3.5 text-right font-mono text-[14px] text-[var(--fg-muted)]">
                {row.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid gap-4 px-5 py-4 sm:grid-cols-3">
        {[
          { value: "118", label: "Orders imported today" },
          { value: "On", label: "Instant delivery" },
          { value: "Minutes", label: "Time to connect" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="font-mono text-[17px] text-[var(--accent-text)]">
              {stat.value}
            </p>
            <p className="mt-1 font-mono text-[10.5px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChannelsPage() {
  return (
    <FeaturePage
      eyebrow="Integrations"
      title="Sell everywhere. Run it from here."
      intro="Instant delivery does the fulfilment, one inventory feeds the stock, and auto pricing keeps every offer competitive. A connection plugs your store into all three."
      demo={<ChannelDemo />}
      featuresTitle="To connect a channel."
      featuresIntro="Official seller-API integrations only."
      features={FEATURES}
      ctaTitle="Don't see your channel? Tell us where you sell."
      extra={
        <div className="mx-auto max-w-[72rem] px-6 pb-4 sm:px-10">
          <h2 className="font-semibold text-[clamp(1.9rem,4vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--fg)]">
            Ten channels at launch.
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-[var(--fg-muted)]">
            Marketplaces and storefronts with full integrations on day one.
          </p>
          {/* No cells or rules: the logos sit straight on the page, spaced by
              the grid alone. */}
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {CHANNELS.map((channel) => (
              <li
                key={channel.name}
                className="flex flex-col items-center gap-3"
              >
                {/* Fixed-height box keeps wide wordmarks and square icons
                    optically consistent, matching the home marquee. */}
                <div className="flex h-10 items-center justify-center">
                  <Image
                    src={channel.src}
                    alt=""
                    width={160}
                    height={56}
                    className="h-full w-auto max-w-[120px] object-contain"
                  />
                </div>
                <span className="font-mono text-[10.5px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
                  {channel.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
