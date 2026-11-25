"use client";
import { useState, type ReactNode } from "react";

/** Filter pills for the record ledger. Cards are rendered on the server and passed in. */
export function LedgerFilter({ pillars, items, allLabel }: { pillars: string[]; items: { pillar: string; node: ReactNode }[]; allLabel: string }) {
  const [active, setActive] = useState<string | null>(null);
  const shown = items.filter((i) => !active || i.pillar === active);
  return (
    <>
      <div role="group" aria-label="Filter by pillar" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
        <button type="button" className="pill flex-none" aria-pressed={active === null} onClick={() => setActive(null)}>{allLabel}</button>
        {pillars.map((p) => (
          <button key={p} type="button" className="pill flex-none" aria-pressed={active === p} onClick={() => setActive(active === p ? null : p)}>
            {p}
          </button>
        ))}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((i, k) => (
          <li key={k} className="contents">{i.node}</li>
        ))}
      </ul>
    </>
  );
}
