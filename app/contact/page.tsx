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
        <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:pt-36">
          {/* Ambient glow, matching the home hero */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-22%] -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-[120px]"
            style={{ background: "var(--accent-glow)" }}
          />

          <div className="mx-auto max-w-6xl">
            {/* Heading */}
            <div className="ts-rise max-w-2xl">
              <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--accent-text)] uppercase">
                Contact
              </span>
              <h1 className="mt-6 font-semibold text-[clamp(2.4rem,5.6vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[var(--fg)]">
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
                className="ts-rise rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-6 sm:p-8"
                style={{ animationDelay: "80ms" }}
              >
                <ContactForm />
              </div>

              {/* Direct channels */}
              <div className="ts-rise" style={{ animationDelay: "160ms" }}>
                <h2 className="font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
                  Other ways to reach us
                </h2>

                <ul className="mt-6 space-y-8">
                  {CHANNELS.map((channel) => (
                    <li key={channel.label}>
                      <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
                        {channel.label}
                      </p>
                      <a
                        href={channel.href}
                        className="mt-2 inline-block text-[17px] text-[var(--fg)] transition-colors duration-200 hover:text-[var(--accent)]"
                      >
                        {channel.value}
                      </a>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--fg-muted)]">
                        {channel.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
