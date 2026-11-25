"use client";
import { useEffect, useState } from "react";
import { ELECTION_DATE_ISO } from "@/config/site";

const target = new Date(ELECTION_DATE_ISO).getTime();
const split = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
};
const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ labels }: { labels: { days: string; hrs: string; min: string; sec: string; countdownLabel: string } }) {
  const [t, setT] = useState<ReturnType<typeof split> | null>(null);
  useEffect(() => {
    const tick = () => setT(split(target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const parts: [string, string][] = t
    ? [[String(t.d), labels.days], [pad(t.h), labels.hrs], [pad(t.m), labels.min], [pad(t.s), labels.sec]]
    : [["—", labels.days], ["—", labels.hrs], ["—", labels.min], ["—", labels.sec]];
  return (
    <div role="timer" aria-live="off" aria-label={t ? `${labels.countdownLabel}: ${t.d} ${labels.days}` : labels.countdownLabel} className="flex items-baseline gap-2.5 tabular-nums sm:gap-3.5">
      {parts.map(([v, l], i) => (
        <span key={l} className={`inline-flex items-baseline gap-1 ${i === 3 ? "hidden sm:inline-flex" : ""}`}>
          <span className="min-w-[1.4ch] text-right font-bold text-white">{v}</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-white">{l}</span>
        </span>
      ))}
    </div>
  );
}
