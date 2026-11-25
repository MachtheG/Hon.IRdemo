import Link from "next/link";
import { candidate, slogans } from "@/config/site";
import type { Dict } from "@/lib/i18n";
import { Seal } from "@/components/ui/Seal";
import { LiteToggle } from "./Motion";

export function Footer({ locale, t }: { locale: string; t: Dict }) {
  const L = (p: string) => `/${locale}${p}`;
  const groups = [
    { title: t.footer.explore, links: [[t.nav.story, "/story"], [t.nav.record, "/record"], [t.nav.plan, "/plan"]] },
    { title: t.footer.about, links: [[t.nav.map, "/map"], [t.nav.gallery, "/gallery"], [t.footer.sources, "/sources"]] },
    { title: t.footer.act, links: [[t.nav.pledge, "/get-involved#pledge"], [t.volunteer.title, "/get-involved#volunteer"], [t.donate.title, "/get-involved#donate"]] },
  ];
  return (
    <footer className="bg-uda-green-deep text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.3fr_2fr] md:py-20">
        <div>
          <div className="flex items-center gap-4">
            <Seal size={56} className="!ring-offset-uda-green-deep" />
            <div>
              <p className="font-display text-2xl font-semibold uppercase tracking-[0.04em]">{candidate.short}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-uda-yellow">
                {t.nav.forGovernor} · {t.footer.party}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm font-display text-xl leading-snug text-white/90">“{slogans.main.en}”</p>
          <Link prefetch={false} href={L("/get-involved#pledge")} className="btn btn-yellow mt-7">{t.hero.pledge}</Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-uda-yellow">{g.title}</p>
              <ul className="mt-4 space-y-1">
                {g.links.map(([label, href]) => (
                  <li key={href}>
                    <Link prefetch={false} href={L(href)} className="inline-flex min-h-[32px] items-center text-white/85 hover:text-white hover:underline">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-white/85">
            <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-uda-yellow align-middle" />
            {t.footer.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link prefetch={false} href={L("/sources")} className="text-white/85 hover:text-white hover:underline">{t.footer.sources}</Link>
            <Link prefetch={false} href={L("/privacy")} className="text-white/85 hover:text-white hover:underline">{t.footer.privacy}</Link>
            <Link prefetch={false} href={L("/credits")} className="text-white/85 hover:text-white hover:underline">{t.footer.credits}</Link>
            <LiteToggle label={t.footer.lite} onLabel={t.footer.liteOn} />
          </div>
        </div>
        <p className="container-site pb-8 text-xs text-white/75">
          © 2026 {candidate.short} 2027 Campaign · {candidate.party} ({candidate.partyLong}) · {slogans.theme.en}
        </p>
      </div>
    </footer>
  );
}
