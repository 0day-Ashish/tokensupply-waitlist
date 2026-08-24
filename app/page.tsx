import Image from "next/image";

import { DashboardPreview } from "./components/dashboard-preview";
import { Mark } from "./components/logo";
import { ProofCounter } from "./components/proof-counter";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { WaitlistForm } from "./components/waitlist-form";

/**
 * Seller faces for the hero social-proof stack. Square sources, so they're
 * cropped to a circle with object-cover rather than boxed like the logos.
 */
const AVATARS = [
  "/assets/avatars/avatar1.png",
  "/assets/avatars/avatar2.png",
  "/assets/avatars/avatar3.png",
];

/**
 * Marketplace logos live in public/assets. Source files vary in aspect ratio
 * (square icons through to wide wordmarks), so each is rendered inside a fixed
 * box with object-contain rather than at a shared width.
 */
const CHANNELS = [
  { name: "G2A", src: "/assets/435267.png", href: "https://www.g2a.com" },
  { name: "Eneba", src: "/assets/eneba.webp", href: "https://www.eneba.com" },
  { name: "Kinguin", src: "/assets/kinguin.webp", href: "https://www.kinguin.net" },
  { name: "eBay", src: "/assets/ebay.png", href: "https://www.ebay.com" },
  { name: "Shopify", src: "/assets/shopify.png", href: "https://www.shopify.com" },
  { name: "G2G", src: "/assets/g2g.png", href: "https://www.g2g.com" },
  { name: "Gamivo", src: "/assets/gamivo250.png", href: "https://www.gamivo.com" },
  { name: "Driffle", src: "/assets/driffle250.png", href: "https://driffle.com" },
  {
    name: "BigCommerce",
    src: "/assets/bigcommerce.webp",
    href: "https://www.bigcommerce.com",
  },
  { name: "Whoop", src: "/assets/whoop.png", href: "https://www.whoop.com" },
];

/** Mono spec rail beside the hero headline, matching the interior pages. */
const HERO_SPECS = [
  { label: "Median delivery", value: "1.8s" },
  { label: "Channels at launch", value: "10" },
  { label: "Fulfilment", value: "24/7" },
  { label: "Oversold keys", value: "0" },
];

// Split into parts so the figure can count up while the "< " and unit stay put.
const PROOF = [
  { value: 2, prefix: "< ", suffix: "s", label: "Median delivery time" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Fulfilment uptime" },
  { value: 0, label: "Oversold keys" },
];

const STEPS = [
  {
    n: "01",
    title: "Connect your channels",
    body: "Link the marketplaces you already sell on. Orders start flowing in within minutes, with no migration and no new storefront to maintain.",
  },
  {
    n: "02",
    title: "Upload your stock once",
    body: "One pool of keys, shared across every channel. Quantities sync both ways the moment anything moves, so the same key never sells twice.",
  },
  {
    n: "03",
    title: "Delivery runs itself",
    body: "Order lands, key goes out, buyer gets it in seconds. You keep the margin instead of spending the night copy-pasting codes.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ---------------- Hero ---------------- */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
          {/* Centre-focused: everything stacks on one axis inside a narrower
              measure than the rail frame, so the eye lands on the headline
              rather than tracking left to right. The spec rail moves below the
              fold of the copy as a ruled row, keeping the mono register the
              interior pages use without pulling the composition off-centre. */}
          <div className="relative z-10 ts-frame">
            <div className="mx-auto max-w-3xl text-center">
              {/* ts-fade on the wrapper, spin on the svg - separate elements
                  so the two transforms don't overwrite each other. */}
              <div className="ts-fade mx-auto w-fit">
                <Mark animated className="h-[56px] w-[56px] text-[var(--fg)]" />
              </div>

              <h1
                className="ts-rise mt-9 font-semibold text-[clamp(2.4rem,5.6vw,3.6rem)] leading-[1.1] tracking-[-0.02em] text-balance-pretty"
                style={{ animationDelay: "60ms" }}
              >
                <span className="text-[var(--accent)]">
                  Automated key delivery
                </span>{" "}
                <span className="text-[var(--fg)]">
                  for stores that sell digital goods.
                </span>
              </h1>

              <p
                className="ts-rise mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.65] text-[var(--fg-muted)]"
                style={{ animationDelay: "140ms" }}
              >
                TokenSupply connects the channels you already sell on, from
                G2A, Eneba and Kinguin to eBay and Shopify. Every key is
                delivered the second the order lands. Stock synced, nothing
                oversold, no manual steps.
              </p>

              {/* The form caps its own width, so it centres inside the column. */}
              <div className="ts-rise mt-10" style={{ animationDelay: "220ms" }}>
                <WaitlistForm />
              </div>

              {/* Social proof */}
              <div
                className="ts-rise mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
                style={{ animationDelay: "300ms" }}
              >
                <div className="flex -space-x-2">
                  {AVATARS.map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={56}
                      height={56}
                      className="h-7 w-7 rounded-full border-2 border-[var(--bg)] bg-[var(--bg-inset)] object-cover"
                    />
                  ))}
                </div>
                <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
                  313 sellers already waiting · Early access rolls out monthly
                </p>
              </div>
            </div>

            {/* Spec rail, now a ruled row under the copy. Same mono register as
                the product pages, but symmetrical so it reads as a base line
                for the centred stack above it. */}
            <dl
              className="ts-rise mt-16 grid border-y border-[var(--line)] sm:grid-cols-4"
              style={{ animationDelay: "380ms" }}
            >
              {HERO_SPECS.map((spec, i) => (
                <div
                  key={spec.label}
                  /* column-reverse so the value reads above its label while the
                     <dt> still precedes the <dd> in source order, which a
                     description list requires. */
                  className={`flex flex-col-reverse gap-2.5 py-5 text-center ${
                    i > 0
                      ? "border-t border-[var(--line)] sm:border-t-0 sm:border-l"
                      : ""
                  }`}
                >
                  <dt className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                    {spec.label}
                  </dt>
                  <dd className="font-mono text-[19px] leading-none text-[var(--fg)]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------- Dashboard preview slot ---------------- */}
        <section className="pb-24">
          {/* Rail-width, matching the hero above and the interior pages. */}
          <div className="ts-frame">
            <div className="relative">
              <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 font-mono text-[10.5px] font-semibold tracking-[0.12em] text-[var(--accent-ink)] uppercase">
                Under 2s typical
              </span>

              {/* Browser chrome */}
              <div className="relative m-[2px] overflow-hidden rounded-lg border border-[var(--line-strong)] bg-[var(--bg-raised)] shadow-[0_18px_50px_-24px_rgb(0_0_0_/_0.18)]">
                <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
                  {/* macOS traffic lights */}
                  <div className="flex gap-2">
                    {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                      <span
                        key={color}
                        className="h-3 w-3 rounded-full"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <span className="mx-auto rounded-md bg-[var(--bg-inset)] px-3 py-1 font-mono text-[11px] text-[var(--fg-faint)]">
                    tokensupply.io
                  </span>
                </div>

                <DashboardPreview />
              </div>

              {/* Fade the preview into the page. Kept shallow so it grounds the
                  frame without hiding the bottom rows of the screenshot. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--bg)]/80 to-transparent"
              />
            </div>

            {/* Channel strip */}
            <div className="mt-32 sm:mt-40">
              <h2 className="max-w-2xl text-[clamp(2.1rem,4.4vw,2.9rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-[var(--fg)]">
                Every channel you sell on, in one place.
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-[var(--fg-muted)]">
                Connect a marketplace once and TokenSupply keeps its stock and
                deliveries in sync with everywhere else.
              </p>
              {/* Marquee. Breaks out of the column to run edge to edge, with
                  the sides faded so logos enter and leave softly. The negative
                  margin has to cancel the section's padding at both
                  breakpoints (px-6 / sm:px-10) or the track insets. */}
              <div
                className="ts-marquee mt-16 -mx-6 overflow-hidden sm:-mx-10 sm:mt-20"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
                }}
              >
                <div className="ts-marquee-track">
                  {/* Two copies: the second is hidden from screen readers so
                      the list isn't announced twice. */}
                  {[0, 1].map((copy) => (
                    <div
                      key={copy}
                      aria-hidden={copy === 1 ? "true" : undefined}
                      className="flex shrink-0 items-start"
                    >
                      {CHANNELS.map((channel) => (
                        <a
                          key={channel.name}
                          href={channel.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          // The duplicated track is decorative, so only the
                          // first copy is reachable by keyboard or a11y tree.
                          tabIndex={copy === 1 ? -1 : undefined}
                          className="flex w-[150px] shrink-0 flex-col items-center gap-3 px-2 transition-opacity duration-200 hover:opacity-70 sm:w-[176px]"
                        >
                          {/* Fixed-height box keeps wide wordmarks and square
                              icons optically consistent. */}
                          <div className="flex h-12 items-center justify-center">
                            <Image
                              src={channel.src}
                              alt=""
                              width={160}
                              height={56}
                              className="h-full w-auto max-w-[140px] object-contain"
                            />
                          </div>
                          <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
                            {channel.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Proof numbers ---------------- */}
        <section className="py-14">
          {/* Hairline-ruled columns rather than centred blocks, matching the
              timeline on /about and the feature lists on the product pages. */}
          <div className="ts-frame">
            <div className="grid border-y border-[var(--line)] sm:grid-cols-3">
              {PROOF.map((stat, i) => (
                <div
                  key={stat.label}
                  /* Every column pads its own inline edges, so the first one
                     doesn't sit flush against the frame while the rest are
                     inset. */
                  className={`px-6 py-8 ${
                    i > 0
                      ? "border-t border-[var(--line)] sm:border-t-0 sm:border-l"
                      : ""
                  }`}
                >
                  <ProofCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                  <p className="mt-3 font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- How it works ---------------- */}
        <section className="py-24">
          <div className="ts-frame">
            <div className="max-w-2xl">
              <h2 className="font-semibold text-[clamp(2.1rem,4.4vw,2.9rem)] leading-[1.15] tracking-[-0.015em] text-[var(--fg)]">
                Three steps. Then it stops being your problem.
              </h2>
            </div>

            {/* A reference list rather than a card wall, matching the product
                pages: hairline rules with the index hanging in the gutter. */}
            <div className="mt-12 grid border-t border-[var(--line)] sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  className={`ts-card group relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-1 border-b border-[var(--line)] py-7 pr-6 transition-colors duration-300 hover:bg-[var(--fg)]/[0.02] ${
                    i > 0 ? "sm:border-l sm:pl-8" : ""
                  }`}
                >
                  <span className="ts-card-num pt-[0.3rem] font-mono text-[11.5px] tracking-[0.12em] text-[var(--accent-text)]">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[var(--fg)]">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--fg-muted)]">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Closing CTA ---------------- */}
        <section className="pt-8 pb-28">
          {/* The same bordered panel the interior pages close on: copy left,
              form right, so the section reads as part of the page's rhythm
              rather than a centred marketing block. */}
          <div className="relative ts-frame-flush overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-raised)]/50">
            {/* Ghost mark clipped to the panel. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              {/* Hidden below md: at this scale it sits on top of the headline
                  on a phone instead of beside it. The tilt sits on the <Mark>
                  itself, not on the .ts-drift wrapper: ts-drift animates
                  `rotate`, so a rotation on that element would be overwritten
                  every frame. Mark paints with currentColor, so the ghost tint
                  is a text colour, not a fill. */}
              <div className="ts-drift absolute top-[70%] right-[-12%] hidden -translate-y-1/2 md:block">
                <Mark className="h-[380px] w-[380px] rotate-[18deg] text-[var(--mark-ghost)] lg:h-[460px] lg:w-[460px]" />
              </div>
            </div>

            <div className="relative z-10 grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-16">
              <div>
                <h2 className="font-semibold text-[clamp(1.85rem,3.8vw,2.5rem)] leading-[1.14] tracking-[-0.025em]">
                  <span className="text-[var(--fg)]">Never paste a key</span>{" "}
                  <span className="text-[var(--accent)]">by hand</span>{" "}
                  <span className="text-[var(--fg)]">again.</span>
                </h2>

                <p className="mt-5 max-w-[46ch] text-[15.5px] leading-[1.65] text-[var(--fg-muted)]">
                  Every channel, every key, one place. Your first channel is
                  synced the week you get access.
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
