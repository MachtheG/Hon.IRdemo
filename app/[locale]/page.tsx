import { DEMO_MODE } from "@/config/site";
import { testimonials } from "@/data/testimonials";
import { getDict } from "@/lib/i18n";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { StorySplit } from "@/components/home/StorySplit";
import { Ledger } from "@/components/home/Ledger";
import { Devolution } from "@/components/home/Devolution";
import { JscSection } from "@/components/home/JscSection";
import { MapTeaser } from "@/components/home/MapTeaser";
import { PlanCards } from "@/components/home/PlanCards";
import { Voices } from "@/components/home/Voices";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { PledgeBand } from "@/components/home/PledgeBand";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  // Sample testimonials only render while DEMO_MODE is on.
  const voices = DEMO_MODE ? testimonials : testimonials.filter((v) => !v.demo);
  return (
    <>
      <Hero locale={locale} t={t} />
      <TrustStrip locale={locale} title={t.trust.title} />
      {/* Everything below the fold renders lazily (content-visibility: auto). */}
      <div className="cv-auto"><StorySplit locale={locale} t={t} /></div>
      <div className="cv-auto"><Ledger locale={locale} t={t} /></div>
      <div className="cv-auto"><Devolution locale={locale} t={t} /></div>
      <div className="cv-auto"><JscSection locale={locale} t={t} /></div>
      <div className="cv-auto"><MapTeaser locale={locale} t={t} /></div>
      <div className="cv-auto"><PlanCards locale={locale} t={t} /></div>
      {voices.length > 0 && <div className="cv-auto"><Voices items={voices} labels={t.voices} showSample={DEMO_MODE} /></div>}
      <div className="cv-auto"><GalleryStrip locale={locale} t={t} /></div>
      <PledgeBand locale={locale} t={t} />
    </>
  );
}
