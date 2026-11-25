import type { Metadata } from "next";
import Link from "next/link";
import { DEMO_MODE } from "@/config/site";
import { facts, isPublishable } from "@/data/record";
import type { Pillar } from "@/data/types";
import { getDict } from "@/lib/i18n";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Sources", description: "Every fact and figure on this site, with a link to its source." };

const order: Pillar[] = ["Background", "Health", "Education", "Water", "Agriculture & Co-ops", "Governance", "Devolution", "Justice"];

export default async function Sources({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const pending = facts.filter((f) => !isPublishable(f));
  return (
    <>
      <PageHero kicker={t.footer.sources} title="Every figure, sourced" intro={<p>{t.footer.tagline} Each entry below links to the original. Access dates are shown for each.</p>} />
      <div className="container-site py-14 md:py-20">
        <div className="max-w-4xl space-y-14">
          {order.map((p) => {
            const list = facts.filter((f) => f.pillar === p && isPublishable(f));
            if (!list.length) return null;
            return (
              <section key={p} aria-labelledby={`src-${p}`}>
                <h2 id={`src-${p}`} className="text-[1.75rem]">{p}</h2>
                <ol className="mt-5 divide-y divide-rule border-y border-rule">
                  {list.map((f) => (
                    <li key={f.id} id={`fact-${f.id}`} className="scroll-mt-32 py-5 target:bg-uda-yellow-soft target:px-4">
                      <p className="text-[17px] leading-relaxed text-ink">{f.claim}</p>
                      <p className="mt-2 text-[15px]">
                        <a href={f.sourceUrl!} target="_blank" rel="noopener noreferrer" className="font-medium text-uda-green underline">{f.sourceTitle} ↗</a>
                        <span className="text-muted"> · accessed {f.accessed}</span>
                      </p>
                      {f.also?.map((a) => (
                        <p key={a.url} className="mt-1 text-[14px]">
                          Also: <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-uda-green underline">{a.title} ↗</a>
                        </p>
                      ))}
                      {f.note && <p className="mt-2 text-[14px] text-muted">Note: {f.note}</p>}
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}

          <section id="map-data" aria-labelledby="src-map" className="scroll-mt-32">
            <h2 id="src-map" className="text-[1.75rem]">Map data</h2>
            <ul className="mt-5 divide-y divide-rule border-y border-rule text-[15px]">
              <li className="py-4">
                Ward boundaries: <a className="text-uda-green underline" href="https://www.geoboundaries.org/countryDownloads.html" target="_blank" rel="noopener noreferrer">geoBoundaries</a> KEN ADM3 (source: Benedict Aboki Omare &amp; George Omare, <a className="text-uda-green underline" href="https://github.com/benaboki/Kenya-County-Assembly-Boundaries" target="_blank" rel="noopener noreferrer">Kenya County Assembly Boundaries</a>, IEBC-derived) — CC BY 4.0. Filtered to Bomet’s 25 wards and simplified with mapshaper. Sub-county outlines dissolved from the wards.
              </li>
              <li className="py-4">Basemap: <a className="text-uda-green underline" href="https://openfreemap.org" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> (Positron style) · © OpenMapTiles · © OpenStreetMap contributors (ODbL).</li>
              <li className="py-4">Ward list and county facts: <a className="text-uda-green underline" href="https://en.wikipedia.org/wiki/Bomet_County" target="_blank" rel="noopener noreferrer">Wikipedia — Bomet County</a>.</li>
            </ul>
          </section>

          <p className="text-[15px] text-muted">Photo credits and licences: <Link prefetch={false} href={`/${locale}/credits`} className="text-uda-green underline">Credits</Link>.</p>

          {DEMO_MODE && pending.length > 0 && (
            <section aria-labelledby="src-pending" className="rounded-[4px] border border-dashed border-[#e3c55a] bg-uda-yellow-soft p-6">
              <h2 id="src-pending" className="text-[1.4rem]">Pending sources (demo only)</h2>
              <p className="mt-2 text-[14px] text-uda-green-deep">These claims are hidden from the site until a source is found. This box disappears when DEMO_MODE is off.</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px]">
                {pending.map((f) => <li key={f.id} id={`fact-${f.id}`}>{f.claim} <span className="text-muted">— {f.confirm}</span></li>)}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
