import Link from "next/link";
import { plan } from "@/data/plan";
import type { Dict } from "@/lib/i18n";
import { SectionHead } from "@/components/ui/Section";
import { SlotImage } from "@/components/ui/SlotImage";

export function PlanCards({ locale, t }: { locale: string; t: Dict }) {
  return (
    <section className="section" aria-labelledby="plan-title">
      <div className="container-site">
        <SectionHead
          id="plan-title"
          kicker={t.plan.kicker}
          title={<>{t.plan.title} <span className="tag tag-draft ml-2 align-middle font-sans">{t.plan.draft}</span></>}
          intro={t.plan.sub}
        />
        <div className="grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-32 lg:self-start">
            <SlotImage slot="plan-portrait" aspect="aspect-[3/2] lg:aspect-[4/5]" sizes="(min-width: 1024px) 32vw, 100vw" />
          </div>
          {/* DRAFT — awaiting candidate sign-off */}
          <ol className="grid gap-4 sm:grid-cols-2">
            {plan.map((p, i) => (
              <li key={p.id} className={`reveal reveal-d${i % 3} ${i === 4 ? "sm:col-span-2" : ""}`}>
                <Link prefetch={false} href={`/${locale}/plan#${p.id}`} className="group flex h-full flex-col rounded-[4px] border border-rule bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-uda-green/40 hover:shadow-[var(--shadow-long)]">
                  <span className="flex items-start justify-between">
                    <span className="font-display text-5xl font-semibold leading-none text-uda-green-deep">
                      {p.n}
                      <span aria-hidden className="mt-2 block h-[3px] w-8 bg-uda-yellow" />
                    </span>
                    <span className="tag tag-draft">{t.plan.draft}</span>
                  </span>
                  <span className="mt-5 block text-xl font-semibold leading-snug text-uda-green-deep">{p.title}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-muted">{p.actions[0]}</span>
                  <span className="link-arrow mt-auto pt-5 text-[15px]">{t.plan.cta}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
