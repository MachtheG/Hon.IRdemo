import Link from "next/link";
import { trustStats } from "@/data/record";

export function TrustStrip({ locale, title }: { locale: string; title: string }) {
  return (
    <section aria-label={title} className="bg-uda-green-deep text-white">
      <div className="container-site">
        <ul className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
          {trustStats.map((s, i) => (
            <li key={s.label} className={`reveal reveal-d${i % 4} border-white/10 py-8 lg:px-8 lg:py-12 ${i < 2 ? "border-b lg:border-b-0" : ""} ${i % 2 === 0 ? "pr-4" : "pl-4 lg:pl-8"} first:lg:pl-0`}>
              <Link prefetch={false} href={`/${locale}/sources#fact-${s.factId}`} className="group block">
                <span className="block font-display text-5xl font-semibold leading-none text-uda-yellow md:text-6xl">{s.value}</span>
                <span className="mt-3 block text-[15px] leading-snug text-white/90">{s.label}</span>
                <span className="mt-2 inline-block text-[12px] font-medium text-white/75 underline decoration-white/30 underline-offset-2 group-hover:text-white">
                  Source ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
