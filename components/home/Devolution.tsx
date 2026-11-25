import type { Dict } from "@/lib/i18n";
import { SlotImage } from "@/components/ui/SlotImage";
import { SourceLink } from "@/components/ui/SourceLink";

export function Devolution({ locale, t }: { locale: string; t: Dict }) {
  return (
    <section className="relative overflow-hidden bg-uda-green-deep text-white" aria-labelledby="devolution-title">
      <div aria-hidden className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-uda-yellow/15" />
      <div aria-hidden className="absolute -right-24 -top-24 h-[24rem] w-[24rem] rounded-full border border-uda-yellow/10" />
      <div className="container-site section relative grid items-center gap-12 md:grid-cols-[6fr_5fr] lg:gap-20">
        <div className="reveal">
          <p className="kicker kicker-light">{t.devolution.kicker}</p>
          <h2 id="devolution-title" className="mt-4 text-[2.1rem] leading-[1.1] !text-white md:text-[2.9rem]">{t.devolution.title}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border-l-2 border-uda-yellow pl-5">
              <p className="font-display text-4xl font-semibold text-uda-yellow">2013</p>
              <p className="mt-2 text-white/90">Elected the first Chairman of the Council of Governors, by consensus.</p>
              <SourceLink factId="cog" locale={locale} className="mt-2 text-white/80 hover:text-white" />
            </div>
            <div className="border-l-2 border-uda-yellow pl-5">
              <p className="font-display text-4xl font-semibold text-uda-yellow">15% → 45%</p>
              <p className="mt-2 text-white/90">
                Led the governors’ <em>Pesa Mashinani</em> push to raise the counties’ share of national revenue.
              </p>
              <SourceLink factId="pesa-mashinani" locale={locale} className="mt-2 text-white/80 hover:text-white" />
            </div>
          </div>
          {/* CONFIRM quote — pull quote to be supplied and sourced by the campaign */}
          <blockquote className="mt-10 rounded-[4px] border border-dashed border-white/30 p-6">
            <p className="font-display text-xl leading-snug text-white/75">“{t.devolution.quotePending}”</p>
            <footer className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-uda-yellow">Isaac Ruto · quote pending</footer>
          </blockquote>
        </div>
        <div className="reveal reveal-d1">
          <SlotImage slot="devolution" aspect="aspect-[4/5]" sizes="(min-width: 768px) 38vw, 100vw" caption={false} />
        </div>
      </div>
    </section>
  );
}
