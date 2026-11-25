import Link from "next/link";
import type { Dict } from "@/lib/i18n";
import { JSC_STATUS } from "@/config/site";
import { SlotImage } from "@/components/ui/SlotImage";
import { SourceLink } from "@/components/ui/SourceLink";

export function StorySplit({ locale, t }: { locale: string; t: Dict }) {
  return (
    <section className="section" aria-labelledby="story-title">
      <div className="container-site grid items-center gap-12 md:grid-cols-[5fr_6fr] lg:gap-20">
        <div className="reveal">
          <SlotImage slot="home-story" aspect="aspect-[4/5]" sizes="(min-width: 768px) 42vw, 100vw" />
        </div>
        <div className="reveal reveal-d1">
          <p className="kicker">{t.story.kicker}</p>
          <h2 id="story-title" className="mt-4 text-[2.1rem] leading-[1.1] md:text-[2.9rem]">{t.story.title}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/90">
            <p>
              Born in Tumoi, Sigor, in Chepalungu, Isaac Ruto went from Tenwek High School and the University of Nairobi to
              represent Chepalungu in Parliament, serve in the Cabinet, and — in March 2013 — become the first Governor of
              Bomet County. <SourceLink factId="born" locale={locale} className="text-uda-green" />
            </p>
            <p>
              There was no county government before him. He built one: health units at Longisa, 154 ECDE centres, a county
              water company, and a co-operative in every ward.{" "}
              <SourceLink factId="ecde" locale={locale} className="text-uda-green" />
            </p>
            <p className="text-muted">
              Then he took devolution to the national stage as the first Chair of the Council of Governors
              {JSC_STATUS === "serving" ? " — and today serves on the Judicial Service Commission." : ", and later served on the Judicial Service Commission."}
            </p>
          </div>
          <Link prefetch={false} href={`/${locale}/story`} className="link-arrow mt-8">{t.story.cta}</Link>
        </div>
      </div>
    </section>
  );
}
