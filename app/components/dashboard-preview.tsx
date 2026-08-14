"use client";

import { useEffect, useState } from "react";

import { Mark } from "./logo";

type Order = {
  id: string;
  channel: string;
  product: string;
  price: string;
  /** Milliseconds after a row appears before it flips to delivered. */
  deliverAfter: number;
};

/**
 * Rows stream in one at a time, sit in "delivering" for a beat, then flip to
 * "delivered" — the same loop the real fulfilment pipeline runs.
 */
const ORDERS: Order[] = [
  {
    id: "TS-4192",
    channel: "G2A",
    product: "Elden Ring — Steam Key",
    price: "$38.40",
    deliverAfter: 900,
  },
  {
    id: "TS-4193",
    channel: "Kinguin",
    product: "Office 2021 Pro Plus",
    price: "$52.00",
    deliverAfter: 1100,
  },
  {
    id: "TS-4194",
    channel: "Eneba",
    product: "PlayStation Plus 12M",
    price: "$61.25",
    deliverAfter: 800,
  },
  {
    id: "TS-4195",
    channel: "Shopify",
    product: "Windows 11 Pro OEM",
    price: "$29.99",
    deliverAfter: 1000,
  },
  {
    id: "TS-4196",
    channel: "eBay",
    product: "Xbox Game Pass 3M",
    price: "$44.10",
    deliverAfter: 950,
  },
];

const ROW_INTERVAL = 1500;

/** Relative throughput per channel, drawn as continuously refilling bars. */
const CHANNEL_LOAD = [
  { name: "G2A", load: 82 },
  { name: "Kinguin", load: 64 },
  { name: "Eneba", load: 71 },
  { name: "Shopify", load: 48 },
  { name: "eBay", load: 57 },
];

function useOrderStream() {
  // Start with the first row already present so the table is never empty.
  const [visible, setVisible] = useState(1);
  const [delivered, setDelivered] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = setInterval(() => {
      setVisible((n) => {
        const next = n + 1;
        if (next > ORDERS.length) {
          // Loop: clear the board and start the stream over.
          setDelivered(new Set());
          return 1;
        }
        return next;
      });
    }, ROW_INTERVAL);

    return () => {
      clearInterval(tick);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Flip each newly visible row to "delivered" after its own delay.
  useEffect(() => {
    if (visible === 0) return;
    const order = ORDERS[visible - 1];
    const timer = setTimeout(() => {
      setDelivered((prev) => new Set(prev).add(order.id));
    }, order.deliverAfter);
    return () => clearTimeout(timer);
  }, [visible]);

  return { visible, delivered };
}

function useCountUp(start: number) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((v) => v + 1);
    }, ROW_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return value;
}

/** Drifts a value around a base so the figure looks live rather than frozen. */
function useJitter(base: number, spread: number, decimals = 1) {
  const [value, setValue] = useState(base);

  useEffect(() => {
    let step = 0;
    const timer = setInterval(() => {
      // Deterministic wobble — avoids Math.random so server and client agree.
      step += 1;
      const wave = Math.sin(step * 0.7) * 0.6 + Math.sin(step * 1.9) * 0.4;
      setValue(+(base + wave * spread).toFixed(decimals));
    }, ROW_INTERVAL);
    return () => clearInterval(timer);
  }, [base, spread, decimals]);

  return value;
}

export function DashboardPreview() {
  const { visible, delivered } = useOrderStream();
  const fulfilled = useCountUp(312);
  const avgDelivery = useJitter(1.4, 0.25);
  const rows = ORDERS.slice(0, visible);

  return (
    <div className="bg-[var(--bg-inset)]">
      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-px border-b border-[var(--line)] bg-[var(--line)]">
        <Stat label="Orders today" value={String(fulfilled)} />
        <Stat label="Avg. delivery" value={`${avgDelivery.toFixed(1)}s`} accent />
        <Stat label="Oversold" value="0" />
      </div>

      {/* Orders table */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
            <span className="ts-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Orders · Today
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
            Auto-fulfilled · {fulfilled}
          </p>
        </div>

        {/* Fixed height for the full set of rows. Without this the table grows
            as rows stream in, resizing the whole frame and shifting the page. */}
        <div className="mt-4 min-h-[250px] space-y-1.5">
          {rows.map((order) => {
            const isDelivered = delivered.has(order.id);
            return (
              <div
                key={order.id}
                className="ts-row grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 py-2.5 sm:grid-cols-[70px_1fr_auto_auto] sm:gap-4"
              >
                <span className="font-mono text-[11px] text-[var(--fg-faint)]">
                  {order.channel}
                </span>

                <span className="truncate text-[13px] text-[var(--fg)]">
                  {order.product}
                </span>

                <span className="hidden font-mono text-[12px] text-[var(--fg-muted)] sm:block">
                  {order.price}
                </span>

                <span
                  className={`flex items-center gap-1.5 justify-self-end rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] uppercase transition-colors duration-500 ${
                    isDelivered
                      ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                      : "bg-[var(--bg-inset)] text-[var(--fg-faint)]"
                  }`}
                >
                  {isDelivered ? (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="h-2.5 w-2.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Delivered
                    </>
                  ) : (
                    <>
                      <span className="ts-spin h-2.5 w-2.5 rounded-full border border-current border-t-transparent" />
                      Sending
                    </>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Channel throughput — each bar refills as its channel is processed. */}
      <div className="border-t border-[var(--line)] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          {CHANNEL_LOAD.map((channel, i) => (
            <div key={channel.name} className="flex-1">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[9.5px] tracking-[0.1em] text-[var(--fg-faint)] uppercase">
                  {channel.name}
                </span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[var(--line)]">
                <div
                  className="ts-bar h-full rounded-full bg-[var(--accent)]"
                  style={{
                    width: `${channel.load}%`,
                    animationDelay: `${i * 160}ms`,
                    animationDuration: `${1.4 + i * 0.2}s`,
                    animationIterationCount: "infinite",
                    animationDirection: "alternate",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-t border-[var(--line)] px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
          <Mark className="h-2.5 w-2.5 text-[var(--accent)]" />
          Stock synced
        </span>
        <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
          5 channels connected
        </span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-[var(--bg-inset)] px-4 py-4 sm:px-5">
      <p className="font-mono text-[10px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
        {label}
      </p>
      {/* key={value} remounts the node whenever the figure changes, so the
          tick animation replays on every update. */}
      <p
        key={value}
        className={`ts-tick mt-1.5 font-semibold text-[1.6rem] leading-none ${
          accent ? "text-[var(--accent)]" : "text-[var(--fg)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
