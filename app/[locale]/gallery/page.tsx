import type { Metadata } from "next";
import { DEMO_MODE } from "@/config/site";
import { gallerySlots } from "@/data/photos";
import { getDict } from "@/lib/i18n";
import { resolveSlot, objectPosition } from "@/lib/photos";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid, type GalleryItem } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = { title: "Gallery — Isaac Ruto in the field", description: "Photos of Isaac Ruto across Bomet County." };

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const items: GalleryItem[] = gallerySlots.map((s) => {
    const r = resolveSlot(s.key);
    if (r.kind === "placeholder") return { key: s.key, kind: "placeholder", alt: s.describe, caption: s.describe };
    const p = r.photo;
    return {
      key: s.key, kind: "photo", stock: p.kind === "stock", src: p.src, w: p.w, h: p.h, blur: p.blur, alt: p.alt,
      caption: p.caption, year: p.date?.slice(0, 4), subCounty: p.subCounty, place: p.place, credit: p.credit, pos: objectPosition(p),
    };
  });
  return (
    <>
      <PageHero kicker={t.gallery.kicker} title={t.gallery.title} intro={<p>{DEMO_MODE ? "Twenty-four photo slots. Framed slots await his photos from the campaign; scenes of Bomet and the South Rift are marked “Stock”." : "Isaac Ruto across Bomet County. Scenes marked “Stock” are general views of the region."}</p>} />
      <section className="container-site py-12 md:py-16">
        <GalleryGrid items={items} labels={t.gallery} />
      </section>
    </>
  );
}
