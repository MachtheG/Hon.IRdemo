import Link from "next/link";
import { projects, layerMeta } from "@/data/projects";
import type { Dict } from "@/lib/i18n";
import { projectWards, subCountyTint } from "@/lib/geo";

/** Static, dependency-free preview of the county map (no map library on the home page). */
export function MapTeaser({ locale, t }: { locale: string; t: Dict }) {
  const { paths, project, width, height } = projectWards(560);
  const delivered = projects.filter((p) => p.layer === "delivered");
  const proposed = projects.filter((p) => p.layer === "proposed");
  const markers = [...delivered, ...proposed].filter((p) => p.lat !== null && p.lng !== null);
  return (
    <section className="section section-alt" aria-labelledby="mapteaser-title">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div className="reveal">
          <p className="kicker">{t.mapTeaser.kicker}</p>
          <h2 id="mapteaser-title" className="mt-4 text-[2.1rem] leading-[1.1] md:text-[2.9rem]">{t.mapTeaser.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Five sub-counties, twenty-five wards. See what was delivered from 2013 to 2017 and what the 2027 plan proposes, ward by ward.
          </p>
          <dl className="mt-8 grid max-w-sm grid-cols-2 gap-6">
            <div className="border-l-2 border-uda-green pl-4">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{t.mapTeaser.delivered}</dt>
              <dd className="mt-1 font-display text-5xl font-semibold text-uda-green-deep">{delivered.length}</dd>
            </div>
            <div className="border-l-2 border-uda-yellow pl-4">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
                {t.mapTeaser.proposed} <span className="tag tag-draft ml-1">{t.plan.draft}</span>
              </dt>
              <dd className="mt-1 font-display text-5xl font-semibold text-uda-green-deep">{proposed.length}</dd>
            </div>
          </dl>
          <Link prefetch={false} href={`/${locale}/map`} className="btn btn-outline mt-9">{t.mapTeaser.cta} →</Link>
        </div>
        <Link prefetch={false} href={`/${locale}/map`} className="reveal reveal-d1 frame frame-feature block bg-white p-4 md:p-6" aria-label={`${t.mapTeaser.cta}: Bomet County map preview`}>
          <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Map of Bomet County's 25 wards with delivered and proposed project markers">
            {paths.map((p) => (
              <path key={p.id} d={p.d} fill={subCountyTint[p.subCounty]} stroke="#fff" strokeWidth={1.2} strokeLinejoin="round" />
            ))}
            {markers.map((m) => {
              const [x, y] = project(m.lng!, m.lat!);
              return <circle key={m.id} cx={x} cy={y} r={m.layer === "delivered" ? 5 : 4.5} fill={layerMeta[m.layer].color} stroke={m.layer === "delivered" ? "#fff" : "#06401F"} strokeWidth={1.4} />;
            })}
          </svg>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 px-1 text-[12px] text-muted">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-uda-green" />{layerMeta.delivered.label}</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border border-uda-green-deep bg-uda-yellow" />{layerMeta.proposed.label}</span>
            <span>Approximate locations</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
