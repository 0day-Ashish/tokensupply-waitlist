"use client";

import { useId, useState } from "react";

type Status = "idle" | "submitting" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function WaitlistForm() {
  // The form renders twice on the home page (hero and closing CTA), so the
  // field ids have to be per-instance. Hardcoded ids would collide, pointing
  // both labels at the first input and announcing the wrong error.
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();

    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("That email doesn't look right.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          source: "hero",
          utm: {
            source: params.get("utm_source"),
            medium: params.get("utm_medium"),
            campaign: params.get("utm_campaign"),
          },
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("done");
      setMessage(
        data.alreadyJoined
          ? "You're already on the list. We'll email you when your slot opens."
          : "You're on the list. We'll email you when your slot opens.",
      );
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="ts-rise mx-auto flex max-w-[520px] items-center gap-3 rounded-2xl border border-[var(--accent)]/35 bg-[var(--accent-glow)] px-5 py-4 text-left"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="text-[15px] leading-snug text-[var(--fg)]">{message}</p>
      </div>
    );
  }

  const invalid = status === "error";

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto max-w-[520px]">
      <div
        className={`group flex flex-col gap-2 rounded-2xl border p-2 transition-colors duration-300 sm:flex-row sm:items-center ${
          invalid
            ? "border-red-400/60"
            : "border-[var(--line-strong)] focus-within:border-[var(--accent)]/70"
        } bg-[var(--bg-raised)]`}
      >
        <label htmlFor={fieldId} className="sr-only">
          Work email
        </label>
        <input
          id={fieldId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@yourstore.com"
          value={email}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          // focus-visible:outline-none, not just focus:outline-none - the global
          // :focus-visible rule in globals.css comes later in the cascade and
          // re-applied its 2px ring, drawing a second border inside the pill.
          // The wrapper's focus-within:border-[var(--accent)] is the focus cue.
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[15px] text-[var(--fg)] placeholder:text-[var(--fg-faint)] focus:outline-none focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="relative w-full shrink-0 overflow-hidden rounded-xl bg-[var(--accent)] px-5 py-3 text-[15px] font-semibold text-[var(--accent-ink)] transition-transform duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-70 sm:w-auto"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
            {status === "submitting" ? "Joining…" : "Join the waitlist"}
            {status !== "submitting" && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            )}
          </span>
        </button>
      </div>

      {invalid && (
        <p
          id={errorId}
          role="alert"
          className="mt-2.5 pl-1 text-left text-[13px] text-red-400"
        >
          {message}
        </p>
      )}
    </form>
  );
}
