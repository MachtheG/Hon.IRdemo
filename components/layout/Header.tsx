import Link from "next/link";
import { DEMO_MODE, SHOW_DRAFT_BANNER, candidate } from "@/config/site";
import type { Dict } from "@/lib/i18n";
import { Seal } from "@/components/ui/Seal";
import { UdaEmblem } from "@/components/ui/Brand";
import { Countdown } from "./Countdown";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";

export function Header({ locale, t }: { locale: string; t: Dict }) {
  const L = (p: string) => `/${locale}${p}`;
  const links = [
    { href: L("/story"), label: t.nav.story },
    { href: L("/record"), label: t.nav.record },
    { href: L("/plan"), label: t.nav.plan },
    { href: L("/map"), label: t.nav.map },
    { href: L("/gallery"), label: t.nav.gallery },
  ];
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-uda-yellow focus:px-4 focus:py-2 focus:font-semibold focus:text-uda-green-deep">
        {t.nav.skip}
      </a>
      {DEMO_MODE && (
        <div className="bg-ink px-4 py-1.5 text-center text-[12px] leading-snug text-white/90" role="note">
          {t.demoBanner}
        </div>
      )}
      <header className="sticky top-0 z-50">
        {/* Utility bar */}
        <div className="bg-uda-green text-white">
          <div className="container-site flex h-10 items-center justify-between gap-3 text-[12px]" aria-label={t.utility.election} role="group">
            <p className="hidden font-semibold uppercase tracking-[0.12em] md:block">{t.utility.election}</p>
            <Countdown labels={t.utility} />
            <LangSwitch current={locale} />
          </div>
        </div>
        {/* Main bar */}
        <div className="relative border-b border-rule bg-white">
          <div className="container-site flex h-[72px] items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <Link prefetch={false} href={L("")} className="flex min-w-0 items-center gap-3" aria-label={`${candidate.short} — home`}>
                <Seal size={48} />
                <span className="flex min-w-0 flex-col leading-none">
                  <span className="whitespace-nowrap font-display text-[19px] font-semibold uppercase tracking-[0.04em] text-uda-green-deep sm:text-[21px]">
                    {candidate.first} {candidate.last}
                  </span>
                  <span className="mt-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] text-uda-green sm:text-[10.5px] sm:tracking-[0.14em]">
                    <span className="hidden sm:inline">{t.nav.forGovernor}</span>
                    <span className="sm:hidden">{t.nav.forGovernor.replace(/^(For|Kwa)\s+/i, "")}</span>
                  </span>
                </span>
              </Link>
              <span aria-hidden className="mx-1 h-9 w-px flex-none bg-rule" />
              <UdaEmblem height={40} label={t.nav.udaLink} />
            </div>
            <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
              {links.map((l) => (
                <Link prefetch={false} key={l.href} href={l.href} className="text-[15px] font-medium text-ink hover:text-uda-green">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-none items-center gap-2.5">
              <Link prefetch={false} href={L("/get-involved")} className="btn btn-outline btn-sm hidden md:inline-flex">{t.nav.getInvolved}</Link>
              <Link prefetch={false} href={L("/get-involved#pledge")} className="btn btn-yellow btn-sm hidden min-[420px]:inline-flex">{t.nav.pledge}</Link>
              <MobileMenu links={links} labels={t.nav} locale={locale} />
            </div>
          </div>
        </div>
      </header>
      {SHOW_DRAFT_BANNER && (
        <div className="border-b border-[#f0d77a] bg-uda-yellow-soft px-4 py-2 text-center text-[13px] text-uda-green-deep" role="note">
          <span className="tag tag-draft mr-2 align-middle">Draft</span>
          {t.draftBanner}
        </div>
      )}
    </>
  );
}
