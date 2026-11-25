import type { Metadata } from "next";
import { layerMeta, projects, wardWideProposals } from "@/data/projects";
import { subCounties, wards } from "@/data/wards";
import { DEMO_MODE } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { PageHero } from "@/components/ui/PageHero";
import { CountyMap } from "@/components/map/CountyMap";

export const metadata: Metadata = { title: "Bomet County map", description: "Delivered 2013–2017 and proposed 2027 projects across Bomet's 5 sub-counties and 25 wards." };

export default async function MapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  // Unsourced context items render only in demo mode.
  const visible = projects.filter((p) => DEMO_MODE || p.sourceUrl !== null || p.layer === "proposed");
  const layerLabels = { delivered: layerMeta.delivered.label, proposed: layerMeta.proposed.label, context: layerMeta.context.label };
  const groups = [...subCounties.map((sc) => ({ title: sc, items: visible.filter((p) => p.subCounty === sc) })), { title: "Location to confirm", items: visible.filter((p) => !p.subCounty) }];

  return (
    <>
      <PageHero kicker={t.mapTeaser.kicker} title={t.mapTeaser.title} intro={<p>Bomet County: 5 sub-counties, 25 wards. Markers sit at approximate locations until exact coordinates are confirmed.</p>} />
      <section className="container-site py-12 md:py-16">
        <CountyMap projects={visible} wards={wards.map(({ id, name, subCounty }) => ({ id, name, subCounty }))} wardWide={wardWideProposals} layerLabels={layerLabels} locale={locale} />
      </section>

      <section className="section section-alt" aria-labelledby="list-title">
        <div className="container-site">
          <p className="kicker">Accessible list</p>
          <h2 id="list-title" className="mt-4 text-[2rem] md:text-[2.4rem]">Every project, by sub-county</h2>
          <p className="mt-3 max-w-2xl text-muted">The same information as the map. “Approximate” means the marker sits at the ward centre until the exact site is confirmed.</p>
          <div className="mt-10 space-y-12">
            {groups.filter((g) => g.items.length).map((g) => (
              <div key={g.title}>
                <h3 className="font-display text-2xl font-semibold">{g.title}</h3>
                <div className="mt-4 overflow-x-auto rounded-[4px] border border-rule bg-white">
                  <table className="w-full min-w-[640px] text-left text-[15px]">
                    <caption className="sr-only">Projects in {g.title}</caption>
                    <thead className="bg-alt text-[12px] uppercase tracking-[0.08em] text-muted">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Project</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Ward</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Year</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {g.items.map((p) => (
                        <tr key={p.id}>
                          <th scope="row" className="px-4 py-3 font-medium text-ink">
                            {p.name}
                            <span className="block text-[13px] font-normal text-muted">{p.summary}</span>
                          </th>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-2 whitespace-nowrap">
                              <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: layerMeta[p.layer].color }} />
                              {p.layer === "delivered" ? "Delivered" : p.layer === "proposed" ? <>Proposed <span className="tag tag-draft">Draft</span></> : "Context (not his)"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted">{p.ward ?? "—"}{p.ward && !p.coordsVerified && <span className="block text-[12px]">approximate</span>}</td>
                          <td className="px-4 py-3 text-muted">{p.year}</td>
                          <td className="px-4 py-3">
                            {p.sourceUrl ? <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-uda-green underline">Source ↗</a> : p.layer === "proposed" ? <span className="text-muted">Draft plan</span> : <span className="text-muted">Source pending</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[13px] text-muted">
            Ward boundaries: geoBoundaries KEN ADM3 (IEBC-derived, CC BY 4.0), simplified. Basemap: OpenFreeMap · © OpenMapTiles · © OpenStreetMap contributors. See <a className="underline" href={`/${locale}/sources#map-data`}>Sources</a>.
          </p>
        </div>
      </section>
    </>
  );
}
