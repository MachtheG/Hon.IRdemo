import Image from "next/image";
import { DEMO_MODE } from "@/config/site";
import type { Dict } from "@/lib/i18n";
import { resolveSlot, objectPosition } from "@/lib/photos";
import { SlotImage } from "@/components/ui/SlotImage";
import { PledgeForm } from "@/components/forms/PledgeForm";

export function PledgeBand({ locale, t }: { locale: string; t: Dict }) {
  const bg = resolveSlot("pledge-bg");
  return (
    <section id="pledge" className="relative isolate overflow-hidden bg-uda-green-deep text-white" aria-labelledby="pledge-title">
      {bg.kind === "photo" && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={bg.photo.src} alt="" fill sizes="100vw" className="object-cover opacity-25" style={{ objectPosition: objectPosition(bg.photo) }} placeholder="blur" blurDataURL={bg.photo.blur} />
          <div className="absolute inset-0 bg-gradient-to-r from-uda-green-deep via-uda-green-deep/95 to-uda-green-deep/80" />
        </div>
      )}
      <div className="container-site section grid items-center gap-12 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <div className="reveal hidden lg:block">
          <SlotImage slot="pledge-portrait" aspect="aspect-[4/5]" sizes="30vw" caption={false} />
        </div>
        <div className="reveal reveal-d1">
          <p className="kicker kicker-light">{t.pledge.kicker}</p>
          <h2 id="pledge-title" className="mt-4 text-[2.2rem] leading-[1.08] !text-white md:text-[3.1rem]">{t.pledge.title}</h2>
          <div className="mt-8 rounded-[4px] bg-white/[0.06] p-5 ring-1 ring-white/15 md:p-8">
            <PledgeForm t={t} locale={locale} demo={DEMO_MODE} dark />
          </div>
        </div>
      </div>
    </section>
  );
}
