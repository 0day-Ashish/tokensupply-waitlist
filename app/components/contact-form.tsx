"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const TOPICS = [
  "General enquiry",
  "Early access",
  "Partnerships",
  "Support",
];

const fieldClass =
  "w-full rounded-xl border border-[var(--line-strong)] bg-[var(--bg-raised)] px-4 py-3 text-[15px] text-[var(--fg)] placeholder:text-[var(--fg-faint)] transition-colors duration-200 focus:border-[var(--accent)]/70 focus:outline-none";

const labelClass =
  "mb-2 block font-mono text-[11px] tracking-[0.14em] text-[var(--fg-faint)] uppercase";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) return fail("Please tell us your name.");
    if (!EMAIL_RE.test(email)) return fail("That email doesn't look right.");
    if (message.length < 10)
      return fail("Please add a bit more detail (10 characters or more).");

    setStatus("submitting");
    setError("");

    // No backend wired up yet - swap this for the real endpoint.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setStatus("done");
  }

  function fail(message: string) {
    setStatus("error");
    setError(message);
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="ts-rise rounded-2xl border border-[var(--accent)]/35 bg-[var(--accent-glow)] p-8 text-center"
      >
        <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="mt-5 font-semibold text-[1.75rem] leading-tight text-[var(--fg)]">
          Message sent.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--fg-muted)]">
          Thanks for reaching out. We usually reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Alex Rivera"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@yourstore.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className={labelClass}>
          Topic
        </label>
        <select id="topic" name="topic" className={fieldClass} defaultValue={TOPICS[0]}>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell us which channels you sell on and what you're trying to automate."
          className={`${fieldClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-[13px] text-red-400">
          {error}
        </p>
      )}

      <div className="flex flex-col items-start gap-4 pt-1 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 text-[15px] font-semibold text-[var(--accent-ink)] transition-transform duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p className="text-[13px] text-[var(--fg-faint)]">
          We reply within one business day.
        </p>
      </div>
    </form>
  );
}
