import Link from "next/link";
import { ledger } from "@/data/record";
import type { Dict } from "@/lib/i18n";
import { SlotImage } from "@/components/ui/SlotImage";
import { SourceLink } from "@/components/ui/SourceLink";
import { SectionHead } from "@/components/ui/Section";
import { LedgerFilter } from "./LedgerFilter";

const PILLARS = ["Health", "Water", "Education", "Agriculture & Co-ops", "Devolution", "Justice"];

export function Ledger({ locale, t }: { locale: string; t: Dict }) {
  const items = ledger.map((c) => ({
    pillar: c.pillar,
    node: (
      <article className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-rule bg-white transition-shadow duration-300 hover:shadow-[var(--shadow-long)]">
        <SlotImage slot={c.slot} aspect="aspect-[3/2]" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" caption={false} framing="plain" className="!rounded-none" compactPlaceholder />
        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.12em] text-uda-green">
            <span>{c.pillar}</span>
            <span className="text-muted">{c.year}</span>
          </p>
          <h3 className="mt-3 text-lg font-semibold leading-snug">{c.heading}</h3>
          <p className="mt-5 font-display text-[2.6rem] font-semibold leading-none text-uda-green-deep">
            {c.metric}
            <span aria-hidden className="ml-2 inline-block h-[3px] w-8 translate-y-[-0.6rem] bg-uda-yellow align-middle" />
          </p>
          <p className="mt-2 text-[15px] text-muted">{c.metricLabel}</p>
          <div className="mt-auto pt-5 text-uda-green">
            <SourceLink factId={c.factId} locale={locale} label={t.ledger.source} />
          </div>
        </div>
      </article>
    ),
  }));
  return (
    <section className="section section-alt" aria-labelledby="ledger-title">
      <div className="container-site">
        <SectionHead kicker={t.ledger.kicker} title={t.ledger.title} id="ledger-title">
          <Link prefetch={false} href={`/${locale}/record`} className="link-arrow">{t.ledger.cta}</Link>
        </SectionHead>
        <LedgerFilter pillars={PILLARS} items={items} allLabel={t.ledger.all} />
      </div>
    </section>
  );
}
