import type { Metadata } from "next";
import Link from "next/link";
import { factById, isPublishable } from "@/data/record";
import { plan, planTheme } from "@/data/plan";
import { getDict } from "@/lib/i18n";
import { PageHero } from "@/components/ui/PageHero";
import { SlotImage } from "@/components/ui/SlotImage";

export const metadata: Metadata = { title: "The 2027 Plan (draft)", description: "Mashinani Kwanza — finishing the work of devolution, ward by ward. Draft for campaign review." };

export default async function PlanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHero
        kicker={t.plan.kicker}
        title={<>“{planTheme.title}” <span className="tag tag-draft ml-1 align-middle font-sans">{t.plan.draft}</span></>}
        intro={
          <>
            <p>{planTheme.sub}</p>
            <p className="mt-3 text-base">
              Draft promises for campaign review — awaiting candidate sign-off. No costed figures are shown until the campaign provides them.
            </p>
          </>
        }
      >
        <nav aria-label="Promises" className="mt-8 flex flex-wrap gap-2">
          {plan.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="pill">{p.n} · {p.title}</a>
          ))}
        </nav>
      </PageHero>

      {/* DRAFT — awaiting candidate sign-off */}
      <div className="container-site py-16 md:py-24">
        <ol className="space-y-20 md:space-y-28">
          {plan.map((p, i) => (
            <li key={p.id} id={p.id} className="reveal grid scroll-mt-32 items-start gap-10 md:grid-cols-[5fr_6fr] md:gap-16">
              <div className={i % 2 ? "md:order-2" : ""}>
                <SlotImage slot={`plan-${i + 1}`} aspect="aspect-[4/3]" sizes="(min-width: 768px) 42vw, 100vw" />
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-6xl font-semibold leading-none text-uda-green-deep">{p.n}</span>
                  <span className="tag tag-draft">{t.plan.draft}</span>
                </div>
                <span aria-hidden className="mt-3 block h-[3px] w-10 bg-uda-yellow" />
                <h2 className="mt-5 text-[2rem] leading-tight md:text-[2.4rem]">{p.title}</h2>
                <p className="mt-3 text-[15px] text-muted"><strong className="font-semibold text-ink">{t.plan.forWhom}:</strong> {p.forWhom}</p>
                <h3 className="mt-7 text-[12px] font-semibold uppercase tracking-[0.12em] text-uda-green">{t.plan.whatHeWillDo}</h3>
                <ul className="mt-3 space-y-3">
                  {p.actions.map((a) => (
                    <li key={a} className="flex gap-3 text-[17px] leading-relaxed text-ink">
                      <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-uda-yellow ring-1 ring-uda-green" />
                      {a}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-8 text-[12px] font-semibold uppercase tracking-[0.12em] text-uda-green">{t.plan.builtOn}</h3>
                <ul className="mt-3 space-y-2 border-l-2 border-uda-green/30 pl-4">
                  {p.builtOn.map((id) => factById(id)).filter(isPublishable).map((f) => (
                    <li key={f.id} className="text-[15px] text-muted">
                      {f.claim}{" "}
                      <Link prefetch={false} href={`/${locale}/sources#fact-${f.id}`} className="font-medium text-uda-green underline">Source ↗</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
