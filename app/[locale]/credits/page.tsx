import type { Metadata } from "next";
import Image from "next/image";
import { himPhotos, stockPhotos } from "@/data/photos";
import { getDict } from "@/lib/i18n";
import { resolvePhoto } from "@/lib/photos";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Credits", description: "Photo credits and licences." };

export default async function Credits({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHero kicker={t.footer.credits} title="Photo credits and licences" intro={<p>Photos of Isaac Ruto are supplied by the campaign. Scenes of the region are free-licence photos from Wikimedia Commons, resized for the web and otherwise unedited. They are general views and do not show his projects.</p>} />
      <div className="container-site py-14 md:py-20">
        <h2 className="text-[1.75rem]">Stock photos ({stockPhotos.length})</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stockPhotos.map((p) => {
            const r = resolvePhoto(p.id);
            return (
              <li key={p.id} className="flex gap-4 rounded-[4px] border border-rule p-4">
                {r && (
                  <span className="frame relative block h-20 w-24 flex-none">
                    <Image src={r.src} alt="" fill sizes="96px" className="object-cover" placeholder="blur" blurDataURL={r.blur} />
                  </span>
                )}
                <div className="min-w-0 text-[14px] leading-snug">
                  <p className="font-semibold text-ink">{p.caption}</p>
                  <p className="mt-1 text-muted">Photo: {p.license!.photographer}</p>
                  <p className="mt-1">
                    <a href={p.license!.url} target="_blank" rel="noopener noreferrer" className="text-uda-green underline">{p.license!.name}</a>
                    {" · "}
                    <a href={p.license!.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-uda-green underline">Wikimedia Commons ↗</a>
                  </p>
                  {r && <p className="mt-1 text-[12px] text-muted">Resized to {r.w}×{r.h}</p>}
                </div>
              </li>
            );
          })}
        </ul>

        <h2 className="mt-16 text-[1.75rem]">Photos of Isaac Ruto</h2>
        <p className="mt-3 text-muted">{himPhotos.length ? `${himPhotos.length} photos supplied by the campaign.` : "To be supplied by the campaign."}</p>

        <h2 className="mt-16 text-[1.75rem]">Other</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-ink">
          <li>Typefaces: Playfair Display and Inter (SIL Open Font License).</li>
          <li>Map: OpenFreeMap · © OpenMapTiles · © OpenStreetMap contributors. Ward boundaries: geoBoundaries (CC BY 4.0).</li>
        </ul>
      </div>
    </>
  );
}
