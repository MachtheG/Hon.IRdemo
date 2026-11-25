import Link from "next/link";
import { JSC_STATUS } from "@/config/site";
import { factById, jscStats } from "@/data/record";
import type { Dict } from "@/lib/i18n";
import { JscEmblem } from "@/components/ui/Brand";
import { SlotImage } from "@/components/ui/SlotImage";
import { SourceLink } from "@/components/ui/SourceLink";

/** Judicial Service Commission section. JSC milestones are the Commission's and
 *  the Judiciary's — always worded as "a Commission he helps lead", never as his own. */
export function JscSection({ locale, t, id = "jsc", headingLevel = 2 }: { locale: string; t: Dict; id?: string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const serving = JSC_STATUS === "serving";
  const quote = factById("jsc-dagoretti-quote");
  const timeline = [
    { date: "15 June 2023", text: "Appointed to the JSC as a representative of the public (Art. 171(2)(h)), approved by Parliament.", factId: "jsc-appointed" },
    { date: "7 June 2024", text: "Elected Vice Chairperson unanimously, deputising Chief Justice Martha Koome.", factId: "jsc-vc" },
  ];
  return (
    <section id={id} className="section scroll-mt-28" aria-labelledby={`${id}-title`}>
      <div className="container-site">
        <div className="reveal flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
          <JscEmblem size={88} />
          <div className="max-w-2xl">
            <p className="kicker">{t.jsc.kicker} · {serving ? t.jsc.serving : t.jsc.former}</p>
            <H id={`${id}-title`} className="mt-3 font-display text-[2rem] font-semibold leading-[1.1] text-uda-green-deep md:text-[2.6rem]">{t.jsc.title}</H>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
          {/* Timeline */}
          <ol className="reveal relative space-y-8 border-l border-rule pl-8">
            {timeline.map((s) => (
              <li key={s.date} className="relative">
                <span aria-hidden className="absolute -left-[37px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-white bg-uda-yellow ring-1 ring-uda-green" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-uda-green">{s.date}</p>
                <p className="mt-1.5 text-lg leading-snug text-ink">{s.text}</p>
                <SourceLink factId={s.factId} locale={locale} className="mt-1 text-uda-green" />
              </li>
            ))}
            <li className="relative">
              <span aria-hidden className="absolute -left-[37px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-white bg-uda-green" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-uda-green">Committees</p>
              <p className="mt-1.5 leading-snug text-ink">Human Resource Management · Finance, Planning &amp; Administration · Administration of Justice</p>
              <SourceLink factId="jsc-committees" locale={locale} className="mt-1 text-uda-green" />
            </li>
          </ol>

          {/* Quote beside his photo */}
          <div className="reveal reveal-d1 grid items-end gap-6 sm:grid-cols-[1fr_1.1fr]">
            <SlotImage slot="jsc-portrait" aspect="aspect-[4/5]" sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 100vw" caption={false} compactPlaceholder />
            <figure className="m-0">
              <span aria-hidden className="block font-display text-7xl leading-none text-uda-yellow">“</span>
              <blockquote className="-mt-4 font-display text-[1.45rem] leading-snug text-uda-green-deep">
                This launch is addressing an urgent need by easing the case backlog and reducing the distance community members need to travel to access justice.
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                Isaac Ruto, at the opening of the Dagoretti Law Courts.{" "}
                <SourceLink factId={quote.id} locale={locale} className="text-uda-green" />
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-16 rounded-[4px] border border-rule bg-alt p-6 md:p-10">
          <p className="max-w-3xl text-[15px] text-muted">{serving ? t.jsc.milestonesNote : t.jsc.milestonesNoteFormer}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {jscStats.map((s, i) => (
              <li key={s.label} className={`reveal reveal-d${i}`}>
                <p className="font-display text-[2.6rem] font-semibold leading-none text-uda-green-deep md:text-5xl">{s.value}</p>
                <span aria-hidden className="mt-3 block h-[3px] w-8 bg-uda-yellow" />
                <p className="mt-3 text-[15px] leading-snug text-ink">{s.label}</p>
                <SourceLink factId={s.factId} locale={locale} className="mt-1 text-uda-green" />
              </li>
            ))}
          </ul>
          <ul className="mt-10 space-y-2 border-t border-rule pt-6 text-[15px] text-ink/90">
            <li>
              Recognised for accountability: the JSC was overall winner among Constitutional Commissions and Independent Offices at the
              2025 FiRe Financial Reporting Awards. <SourceLink factId="jsc-fire" locale={locale} className="text-uda-green" />
            </li>
          </ul>
          {headingLevel === 2 && (
            <Link prefetch={false} href={`/${locale}/record#jsc`} className="link-arrow mt-6">{t.ledger.cta}</Link>
          )}
        </div>
      </div>
    </section>
  );
}
