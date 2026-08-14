import Image from "next/image";

import { DashboardPreview } from "./components/dashboard-preview";
import { Mark } from "./components/logo";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { WaitlistForm } from "./components/waitlist-form";

/**
 * Marketplace logos live in public/assets. Source files vary in aspect ratio
 * (square icons through to wide wordmarks), so each is rendered inside a fixed
 * box with object-contain rather than at a shared width.
 */
const CHANNELS = [
  { name: "G2A", src: "/assets/g2a.webp" },
  { name: "Eneba", src: "/assets/eneba.webp" },
  { name: "Kinguin", src: "/assets/kinguin.webp" },
  { name: "eBay", src: "/assets/ebay.png" },
  { name: "Shopify", src: "/assets/shopify.png" },
  { name: "G2G", src: "/assets/g2g.png" },
  { name: "Gamivo", src: "/assets/gamivo.webp" },
  { name: "Driffle", src: "/assets/driffle.webp" },
  { name: "BigCommerce", src: "/assets/bigcommerce.webp" },
  { name: "Whoop", src: "/assets/whoop.png" },
];

const PROOF = [
  { value: "< 2s", label: "Median delivery time" },
  { value: "99.9%", label: "Fulfilment uptime" },
  { value: "0", label: "Oversold keys" },
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
        <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:pt-40">
          {/* Ambient background: grid, glow, drifting ghost marks */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute left-1/2 top-[-18%] h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
              style={{ background: "var(--accent-glow)" }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* ts-rise on the wrapper, spin on the svg - separate elements so
                the two transforms don't overwrite each other. */}
            <div className="ts-fade mx-auto w-fit">
              <Mark
                animated
                className="h-[60px] w-[60px] text-[var(--fg)]"
              />
            </div>

            {/* Two lines from sm: up, where the <br /> applies. Below that the
                headline wraps naturally: forcing two lines on a phone shrank it
                to ~22px, smaller than the 17px lead paragraph beneath it. */}
            <h1
              className="ts-rise mx-auto mt-10 font-semibold text-[clamp(2.15rem,5.2vw,3.6rem)] leading-[1.14] tracking-[-0.025em] sm:leading-[1.12]"
              style={{ animationDelay: "60ms" }}
            >
              <span className="text-[var(--accent)]">Automated key delivery</span>
              <br className="hidden sm:inline" />{" "}
              <span className="text-[var(--fg)]">
                for stores that sell digital goods.
              </span>
            </h1>

            <p
              className="ts-rise mx-auto mt-7 max-w-[620px] text-[17px] leading-[1.6] text-[var(--fg-muted)]"
              style={{ animationDelay: "140ms" }}
            >
              TokenSupply connects the channels you already sell on, from G2A,
              Eneba and Kinguin to eBay and Shopify. Every key is delivered the
              second the order lands. Stock synced, nothing oversold, no manual
              steps.
            </p>

            <div className="ts-rise mt-10" style={{ animationDelay: "220ms" }}>
              <WaitlistForm />
            </div>

            {/* Social proof */}
            <div
              className="ts-rise mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex -space-x-2">
                {["OP", "GC", "VR"].map((initials, i) => (
                  <span
                    key={initials}
                    className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--bg)] font-mono text-[10px] font-semibold"
                    style={{
                      background: `color-mix(in oklab, var(--accent) ${28 + i * 26}%, var(--bg-inset))`,
                      color: i === 2 ? "var(--accent-ink)" : "var(--fg)",
                    }}
                  >
                    {initials}
                  </span>
                ))}
                <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--bg)] bg-[var(--fg)] text-[var(--bg)]">
                  <Mark className="h-2.5 w-2.5" />
                </span>
              </div>
              <p className="font-mono text-[11.5px] tracking-[0.1em] text-[var(--fg-muted)] uppercase">
                313 sellers already waiting · Early access rolls out monthly
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative z-10 mx-auto mt-20 flex max-w-xs items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--line-strong)]" />
            <Mark className="h-3 w-3 text-[var(--accent)]/60" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--line-strong)]" />
          </div>
        </section>

        {/* ---------------- Dashboard preview slot ---------------- */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 font-mono text-[10.5px] font-semibold tracking-[0.12em] text-[var(--accent-ink)] uppercase">
                Under 2s typical
              </span>

              {/* Browser chrome */}
              <div className="relative m-[2px] overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--bg-raised)] shadow-[0_40px_120px_-40px_rgb(0_0_0_/_0.6)]">
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
                    app.tokensupply.io
                  </span>
                </div>

                <DashboardPreview />
              </div>

              {/* Fade the preview into the page. Kept shallow so it grounds the
                  frame without hiding the bottom rows of the screenshot. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-14 rounded-b-2xl bg-gradient-to-t from-[var(--bg)]/80 to-transparent"
              />
            </div>

            {/* Channel strip */}
            <div className="mt-32 text-center sm:mt-40">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--accent-text)] uppercase">
                Integrations
              </p>
              <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.9rem,4vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.025em] text-[var(--fg)]">
                Every channel you sell on, in one place.
              </h2>
              <p className="mx-auto mt-8 max-w-md text-[15.5px] leading-[1.6] text-[var(--fg-muted)]">
                Connect a marketplace once and TokenSupply keeps its stock and
                deliveries in sync with everywhere else.
              </p>
              {/* Marquee. Breaks out of the centered column to run edge to
                  edge, with the sides faded so logos enter and leave softly. */}
              <div
                className="ts-marquee mt-16 -mx-6 overflow-hidden sm:mt-20"
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
                        <div
                          key={channel.name}
                          className="flex w-[150px] shrink-0 flex-col items-center gap-3 px-2 sm:w-[176px]"
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
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Proof numbers ---------------- */}
        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3">
            {PROOF.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-semibold text-[2.9rem] leading-none tracking-[-0.01em] text-[var(--accent)]">
                  {stat.value}
                </p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.13em] text-[var(--fg-muted)] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- How it works ---------------- */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="font-semibold text-[clamp(2.1rem,4.4vw,2.9rem)] leading-[1.15] tracking-[-0.015em] text-[var(--fg)]">
                Three steps. Then it stops being your problem.
              </h2>
            </div>

            {/* Dividers come from each cell's own border rather than the old
                gap-px + background trick, which needs opaque cells to work -
                the cards are transparent so the page shows through. */}
            <div className="mt-14 grid overflow-hidden rounded-2xl border border-[var(--line)] sm:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="ts-card group relative border-t border-[var(--line)] bg-transparent p-8 transition-colors duration-300 first:border-t-0 hover:bg-[var(--fg)]/[0.03] sm:border-t-0 sm:border-l sm:first:border-l-0"
                >
                  {/* Accent bar that wipes across the top edge on hover */}
                  <span
                    aria-hidden="true"
                    className="ts-card-rule absolute inset-x-0 top-0 h-px bg-[var(--accent)]"
                  />
                  <span className="ts-card-num block font-mono text-[12px] tracking-[0.16em] text-[var(--accent-text)]">
                    {step.n}
                  </span>
                  <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.015em] text-[var(--fg)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[var(--fg-muted)]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
