"use client";

import { useEffect, useState } from "react";

import { Mark } from "./logo";

type Order = {
  id: string;
  channel: string;
  product: string;
  /** Partially masked: a real dashboard never shows a full key in a list. */
  key: string;
  price: string;
  /** Milliseconds after a row appears before it flips to delivered. */
  deliverAfter: number;
};

/**
 * Rows stream in one at a time, sit in "delivering" for a beat, then flip to
 * "delivered" - the same loop the real fulfilment pipeline runs.
 */
const ORDERS: Order[] = [
  {
    id: "TS-4192",
    channel: "G2A",
    product: "Elden Ring Steam Key",
    key: "XK9F-2MQ7-TT41",
    price: "$38.40",
    deliverAfter: 900,
  },
  {
    id: "TS-4193",
    channel: "Kinguin",
    product: "Office 2021 Pro Plus",
    key: "7HN2-9PLD-4KQX",
    price: "$52.00",
    deliverAfter: 1100,
  },
  {
    id: "TS-4194",
    channel: "Eneba",
    product: "PlayStation Plus 12M",
    key: "BQ4W-6RZM-1VTC",
    price: "$61.25",
    deliverAfter: 800,
  },
  {
    id: "TS-4195",
    channel: "Shopify",
    product: "Windows 11 Pro OEM",
    key: "M3TD-8JXK-9WFN",
    price: "$29.99",
    deliverAfter: 1000,
  },
  {
    id: "TS-4196",
    channel: "eBay",
    product: "Xbox Game Pass 3M",
    key: "D6PV-2LSQ-7HGB",
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
      // Deterministic wobble - avoids Math.random so server and client agree.
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
    <div className="bg-[var(--bg-raised)]">
      {/* Stat strip: plain figures separated by hairlines, no filled panels. */}
      <div className="grid grid-cols-3 border-b border-[var(--line)]">
        <Stat label="Orders today" value={String(fulfilled)} />
        <Stat label="Avg. delivery" value={`${avgDelivery.toFixed(1)}s`} />
        <Stat label="Oversold" value="0" />
      </div>

      {/* Orders table */}
      <div className="px-5 py-5 sm:px-6">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
            Orders · Today
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
            Auto-fulfilled · {fulfilled}
          </p>
        </div>

        {/* Column headings. The grid must match the row grid below exactly or
            the labels drift out of line with their values. */}
        <div className="mt-4 grid grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-[var(--line)] pb-2 sm:grid-cols-[72px_1fr_140px_72px_96px]">
          <span className="font-mono text-[9.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
            Channel
          </span>
          <span className="font-mono text-[9.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase">
            Product
          </span>
          <span className="hidden font-mono text-[9.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase sm:block">
            Key
          </span>
          <span className="hidden font-mono text-[9.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase sm:block">
            Price
          </span>
          <span className="justify-self-end font-mono text-[9.5px] tracking-[0.14em] text-[var(--fg-faint)] uppercase sm:justify-self-start">
            Status
          </span>
        </div>

        {/* Fixed height for the full set of rows. Without this the table grows
            as rows stream in, resizing the whole frame and shifting the page. */}
        <div className="min-h-[250px]">
          {rows.map((order) => {
            const isDelivered = delivered.has(order.id);
            return (
              <div
                key={order.id}
                className="ts-row grid grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-[var(--line)] py-3 last:border-b-0 sm:grid-cols-[72px_1fr_140px_72px_96px]"
              >
                <span className="font-mono text-[11px] text-[var(--fg-faint)]">
                  {order.channel}
                </span>

                <span className="truncate text-[13.5px] text-[var(--fg)]">
                  {order.product}
                </span>

                {/* Keys are always set in mono (brand guidelines §06, §08).
                    Desktop only: the row has no space for it on a phone. */}
                <span className="hidden font-mono text-[12px] tracking-[0.04em] text-[var(--fg-faint)] sm:block">
                  {order.key}
                </span>

                <span className="hidden font-mono text-[12px] text-[var(--fg-muted)] sm:block">
                  {order.price}
                </span>

                {/* Status is text only: colour carries the state, no pill. */}
                <span
                  className={`justify-self-end font-mono text-[10.5px] tracking-[0.1em] uppercase transition-colors duration-700 sm:justify-self-start ${
                    isDelivered ? "text-[var(--accent)]" : "text-[var(--fg-faint)]"
                  }`}
                >
                  {isDelivered ? "Delivered" : "Sending"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-t border-[var(--line)] px-5 py-3.5 sm:px-6">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
          <Mark className="h-2.5 w-2.5 text-[var(--accent)]" />
          Stock synced
        </span>
        <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
          {CHANNEL_LOAD.length} channels connected
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-[var(--line)] px-5 py-5 last:border-r-0 sm:px-6">
      <p className="font-mono text-[10px] tracking-[0.12em] text-[var(--fg-faint)] uppercase">
        {label}
      </p>
      {/* key={value} remounts the node whenever the figure changes, so the
          tick animation replays on every update. */}
      <p
        key={value}
        className="ts-tick mt-2 text-[1.5rem] leading-none font-medium tracking-[-0.02em] text-[var(--fg)] tabular-nums"
      >
        {value}
      </p>
    </div>
  );
}
