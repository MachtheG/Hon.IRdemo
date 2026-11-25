import Image from "next/image";
import Link from "next/link";
import { candidate, slogans } from "@/config/site";
import type { Dict } from "@/lib/i18n";
import { resolveSlot, objectPosition } from "@/lib/photos";
import { Placeholder } from "@/components/ui/Placeholder";

/** Full-height hero: his portrait is the only image above the fold.
 *  Focal point (on his eyes) drives object-position so no viewport crops his face;
 *  the name sits on the lower third over a soft white-to-transparent gradient. */
export function Hero({ locale, t }: { locale: string; t: Dict }) {
  const r = resolveSlot("hero");
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-alt">
      <div className="absolute inset-0 -z-10">
        {r.kind === "photo" ? (
          <div className="kenburns absolute inset-0" style={{ transformOrigin: objectPosition(r.photo) }}>
            <Image
              src={r.photo.src}
              alt={r.photo.alt}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={60}
              placeholder="blur"
              blurDataURL={r.photo.blur}
              className="object-cover"
              style={{ objectPosition: objectPosition(r.photo) }}
            />
          </div>
        ) : null}
        {/* Soft white-to-transparent gradient on the lower third */}
        {r.kind === "photo" && <div aria-hidden className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-white via-white/85 to-transparent" />}
      </div>

      {r.kind === "placeholder" && (
        // Until his portrait arrives: a portrait-shaped framed slot above the name.
        <div className="flex flex-1 items-end justify-center px-4 pt-8 md:pt-10">
          <div className="frame frame-feature relative aspect-[4/5] h-[42svh] max-h-[30rem] min-h-[15rem]">
            <Placeholder describe={r.slot.describe} slotKey={r.slot.key} />
          </div>
        </div>
      )}

      <div className={`container-site pb-12 text-center md:pb-16 ${r.kind === "photo" ? "pt-[40svh]" : "pt-8"}`}>
        <p className="kicker rise justify-center">{t.hero.kicker}</p>
        <h1 id="hero-title" className="mt-4 text-[3.25rem] leading-[0.98] tracking-[-0.02em] sm:text-[4.5rem] md:text-[6rem]">
          {candidate.first} <span className="whitespace-nowrap">{candidate.last}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink md:text-xl">
          {locale === "sw" ? slogans.hero.sw : slogans.hero.en}
        </p>
        <p className="rise rise-d1 mt-2 font-display text-lg text-uda-green">
          “{slogans.main.en}”
          {locale === "en" && <span className="sr-only"> — {slogans.main.gloss}</span>}
        </p>
        <div className="rise rise-d3 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link prefetch={false} href={`/${locale}/get-involved#pledge`} className="btn btn-yellow w-full px-7 text-base sm:w-auto">{t.hero.pledge}</Link>
          <Link prefetch={false} href={`/${locale}/record`} className="btn btn-outline w-full bg-white/70 px-7 text-base sm:w-auto">{t.hero.record}</Link>
        </div>
      </div>
    </section>
  );
}
