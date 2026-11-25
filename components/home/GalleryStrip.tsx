import Link from "next/link";
import { gallerySlots } from "@/data/photos";
import type { Dict } from "@/lib/i18n";
import { SlotImage } from "@/components/ui/SlotImage";

export function GalleryStrip({ locale, t }: { locale: string; t: Dict }) {
  const eight = gallerySlots.slice(0, 8);
  return (
    <section className="section overflow-hidden" aria-labelledby="gstrip-title">
      <div className="container-site">
        <div className="reveal mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="kicker">{t.gallery.kicker}</p>
            <h2 id="gstrip-title" className="mt-4 text-[2rem] leading-[1.1] md:text-[2.75rem]">{t.gallery.title}</h2>
          </div>
          <Link prefetch={false} href={`/${locale}/gallery`} className="link-arrow hidden flex-none sm:inline-flex">{t.gallery.cta}</Link>
        </div>
      </div>
      <ul tabIndex={0} aria-label={t.gallery.title} className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:scroll-px-8 md:px-8 xl:scroll-px-[calc((100vw_-_76rem)/2_+_2rem)] xl:px-[calc((100vw_-_76rem)/2_+_2rem)]">
        {eight.map((s, i) => (
          <li key={s.key} className={`flex-none snap-start ${i % 3 === 0 ? "w-[78vw] sm:w-[26rem]" : "w-[62vw] sm:w-[19rem]"}`}>
            <Link prefetch={false} href={`/${locale}/gallery#${s.key}`} className="block">
              <SlotImage slot={s.key} aspect="aspect-[4/5]" sizes="(min-width: 640px) 26rem, 78vw" compactPlaceholder />
            </Link>
          </li>
        ))}
      </ul>
      <div className="container-site mt-6 sm:hidden">
        <Link prefetch={false} href={`/${locale}/gallery`} className="link-arrow">{t.gallery.cta}</Link>
      </div>
    </section>
  );
}
