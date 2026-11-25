import type { Metadata } from "next";
import { career, facts, isPublishable } from "@/data/record";
import type { Pillar } from "@/data/types";
import { getDict } from "@/lib/i18n";
import { PageHero } from "@/components/ui/PageHero";
import { SlotImage } from "@/components/ui/SlotImage";
import { SourceLink } from "@/components/ui/SourceLink";
import { JscSection } from "@/components/home/JscSection";

export const metadata: Metadata = { title: "Record of service", description: "MP, Minister, founding Governor of Bomet, first Chair of the Council of Governors, JSC Vice Chairperson — every item sourced." };

const groups: { pillar: Pillar; title: string; slot?: string }[] = [
  { pillar: "Health", title: "Health", slot: "record-health" },
  { pillar: "Education", title: "Education and sport" },
  { pillar: "Water", title: "Water", slot: "record-water" },
  { pillar: "Agriculture & Co-ops", title: "Agriculture and co-operatives", slot: "record-agri" },
  { pillar: "Governance", title: "Governance" },
  { pillar: "Devolution", title: "Devolution" },
];

export default async function RecordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHero
        kicker={t.ledger.kicker}
        title="MP → Minister → Governor → CoG Chair → JSC"
        intro={<p>Thirty years of public service. Every line below links to its source.</p>}
        slot="record-hero"
      />

      {/* Career timeline */}
      <section className="section" aria-labelledby="career-title">
        <div className="container-site">
          <p className="kicker">Career</p>
          <h2 id="career-title" className="mt-4 text-[2rem] md:text-[2.6rem]">A life in public service</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {career.map((c) => (
              <li key={c.years + c.role} className="reveal bg-white p-6">
                <p className="font-display text-2xl font-semibold text-uda-green-deep">{c.years}</p>
                <span aria-hidden className="mt-2 block h-[3px] w-8 bg-uda-yellow" />
                <p className="mt-3 text-ink">{c.role}</p>
                <SourceLink factId={c.factId} locale={locale} className="mt-2 text-uda-green" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Founding Governor, by pillar */}
      <section className="section section-alt" aria-labelledby="governor-title">
        <div className="container-site">
          <p className="kicker">Founding Governor · March 2013 – August 2017</p>
          <h2 id="governor-title" className="mt-4 text-[2rem] md:text-[2.6rem]">Building a county from day one</h2>
          <div className="mt-14 space-y-16">
            {groups.map((g) => {
              const items = facts.filter((f) => f.pillar === g.pillar && isPublishable(f));
              if (!items.length) return null;
              return (
                <div key={g.pillar} className={`reveal grid gap-8 ${g.slot ? "lg:grid-cols-[1fr_22rem]" : ""} lg:gap-14`}>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{g.title}</h3>
                    <ul className="mt-5 divide-y divide-rule border-y border-rule">
                      {items.map((f) => (
                        <li key={f.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                          <span className="text-[17px] leading-relaxed text-ink">
                            {f.claim}
                            {f.year && <span className="ml-2 text-[13px] text-muted">({f.year})</span>}
                          </span>
                          <SourceLink factId={f.id} locale={locale} className="flex-none text-uda-green" />
                        </li>
                      ))}
                    </ul>
                  </div>
                  {g.slot && <SlotImage slot={g.slot} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 22rem, 100vw" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <JscSection locale={locale} t={t} id="jsc" headingLevel={2} />
    </>
  );
}
