import type { Metadata } from "next";

import { ContactForm } from "../components/contact-form";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Contact · TokenSupply",
  description:
    "Questions about automated key delivery, early access, or partnerships? Get in touch with the TokenSupply team.",
};

const CHANNELS = [
  {
    label: "Email us",
    value: "support@tokensupply.io",
    href: "mailto:support@tokensupply.io",
    note: "Best for anything account or billing related.",
  },
  {
    label: "Early access",
    value: "Join the waitlist",
    href: "/",
    note: "New sellers are onboarded every month.",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-24 sm:pt-36">
          {/* max-w-[72rem] with the padding *inside* it, matching <SiteHeader>
              and <SiteRails>. A max-w-6xl container nested inside a px-6
              section put the content edge 1.5rem in from the rails. */}
          <div className="ts-frame">
            {/* Heading */}
            <div className="ts-rise max-w-2xl">
              <h1 className="font-semibold text-[clamp(2.4rem,5.6vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[var(--fg)]">
                Let&apos;s get your keys delivering themselves.
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-[var(--fg-muted)]">
                Whether you&apos;re weighing up TokenSupply for your store or you
                already have a question mid-setup, send us a note and a real
                person will get back to you.
              </p>
            </div>

            <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
              {/* Form */}
              <div
                className="ts-rise rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] p-6 sm:p-8"
                style={{ animationDelay: "80ms" }}
              >
                <ContactForm />
              </div>

              {/* Direct channels */}
              <div className="ts-rise" style={{ animationDelay: "160ms" }}>
                <h2 className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                  Other ways to reach us
                </h2>

                {/* Hairline-ruled rows rather than loose blocks, matching the
                    spec rails on the product pages. */}
                <ul className="mt-6 border-t border-[var(--line)]">
                  {CHANNELS.map((channel) => (
                    <li
                      key={channel.label}
                      className="border-b border-[var(--line)] py-5"
                    >
                      <p className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                        {channel.label}
                      </p>
                      <a
                        href={channel.href}
                        className="mt-2 inline-block font-mono text-[15px] text-[var(--fg)] transition-colors duration-200 hover:text-[var(--accent-text)]"
                      >
                        {channel.value}
                      </a>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--fg-muted)]">
                        {channel.note}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Response-time facts, same register as the hero spec rails. */}
                <dl className="mt-8 space-y-3">
                  {[
                    { label: "Typical reply", value: "< 1 business day" },
                    { label: "Support hours", value: "Mon–Fri" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-6"
                    >
                      <dt className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                        {row.label}
                      </dt>
                      <dd className="font-mono text-[13px] text-[var(--fg-muted)]">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
