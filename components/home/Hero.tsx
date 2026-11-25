import Image from "next/image";
import Link from "next/link";
import { candidate, slogans } from "@/config/site";
import type { Dict } from "@/lib/i18n";
import { resolveSlot, objectPosition } from "@/lib/photos";
import { Placeholder } from "@/components/ui/Placeholder";

/** Full-height hero with his photo. Nothing is ever laid over his face:
 *  - mobile: photo on top (face framed by the focal point), name below on white;
 *  - desktop: full-bleed photo, name on the side opposite his face over a soft white fade. */
export function Hero({ locale, t }: { locale: string; t: Dict }) {
  const r = resolveSlot("hero");
  const faceLeft = r.kind === "photo" ? r.photo.focalX < 50 : true;

  const text = (
    <>
      <p className={`kicker rise justify-center ${faceLeft ? "lg:justify-start" : "lg:justify-end"}`}>{t.hero.kicker}</p>
      <h1 id="hero-title" className="mt-4 text-[3.25rem] leading-[0.98] tracking-[-0.02em] sm:text-[4.5rem] lg:text-[5.75rem]">
        {candidate.first} <span className="whitespace-nowrap">{candidate.last}</span>
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink lg:text-xl">{locale === "sw" ? slogans.hero.sw : slogans.hero.en}</p>
      <p className="rise rise-d1 mt-2 font-display text-lg text-uda-green">
        “{slogans.main.en}”
        {locale === "en" && <span className="sr-only"> — {slogans.main.gloss}</span>}
      </p>
      <div className={`rise rise-d3 mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center ${faceLeft ? "lg:justify-start" : "lg:justify-end"}`}>
        <Link prefetch={false} href={`/${locale}/get-involved#pledge`} className="btn btn-yellow w-full px-7 text-base sm:w-auto">{t.hero.pledge}</Link>
        <Link prefetch={false} href={`/${locale}/record`} className="btn btn-outline w-full bg-white/80 px-7 text-base sm:w-auto">{t.hero.record}</Link>
      </div>
    </>
  );

  if (r.kind === "placeholder") {
    return (
      <section aria-labelledby="hero-title" className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-alt">
        <div className="flex flex-1 items-end justify-center px-4 pt-8 lg:pt-10">
          <div className="frame frame-feature relative aspect-[4/5] h-[42svh] max-h-[30rem] min-h-[15rem]">
            <Placeholder describe={r.slot.describe} slotKey={r.slot.key} />
          </div>
        </div>
        <div className="container-site pb-12 pt-8 text-center lg:pb-16">{text}</div>
      </section>
    );
  }

  const p = r.photo;
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-white lg:flex lg:min-h-[92svh] lg:items-center">
      {/* Photo: a block on mobile, full-bleed background on desktop */}
      <div className="relative h-[58svh] min-h-[22rem] md:h-[62svh] lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        <div className="kenburns absolute inset-0" style={{ transformOrigin: objectPosition(p) }}>
          <Image
            src={p.src}
            alt={p.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL={p.blur}
            className="object-cover"
            style={{ objectPosition: objectPosition(p) }}
          />
        </div>
        {/* Mobile: soft fade into the white text area. Desktop: fade from the text side only. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent lg:hidden" />
        <div
          aria-hidden
          className={`absolute inset-0 hidden lg:block ${faceLeft ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-white via-white/80 via-40% to-transparent to-65%`}
        />
      </div>

      <div className="container-site relative pb-12 pt-2 text-center lg:py-20">
        <div className={`lg:max-w-[34rem] ${faceLeft ? "lg:ml-auto lg:text-left" : "lg:mr-auto lg:text-right"}`}>{text}</div>
      </div>
    </section>
  );
}
