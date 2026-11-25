import type { Metadata } from "next";
import { Suspense } from "react";
import { DEMO_MODE } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { PageHero } from "@/components/ui/PageHero";
import { PledgeForm } from "@/components/forms/PledgeForm";
import { PledgeFromQuery } from "@/components/forms/PledgeFromQuery";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { DonatePanel } from "@/components/forms/DonatePanel";

export const metadata: Metadata = { title: "Get involved", description: "Pledge your vote, volunteer in your ward, or support the campaign." };

export default async function GetInvolved({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHero kicker={t.nav.getInvolved} title={t.pledge.title} intro={<p>Pledge your vote, volunteer in your ward, or support the campaign. Your details are handled as set out in our privacy notice.</p>} slot="gi-hero" />
      <section id="pledge" className="section scroll-mt-28" aria-labelledby="pledge-h">
        <div className="container-site grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-16">
          <div>
            <p className="kicker">{t.pledge.kicker}</p>
            <h2 id="pledge-h" className="mt-4 text-[2rem] md:text-[2.6rem]">{t.nav.pledge}</h2>
            <p className="mt-4 text-muted">Name, phone and ward — that is all. Pledges are counted by ward so the campaign knows where to listen next.</p>
          </div>
          <div className="rounded-[4px] border border-rule p-5 md:p-8">
            <Suspense fallback={<PledgeForm t={t} locale={locale} demo={DEMO_MODE} />}>
              <PledgeFromQuery t={t} locale={locale} demo={DEMO_MODE} />
            </Suspense>
          </div>
        </div>
      </section>
      <section id="volunteer" className="section section-alt scroll-mt-28" aria-labelledby="vol-h">
        <div className="container-site grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-16">
          <div>
            <p className="kicker">Mashinani Kwanza</p>
            <h2 id="vol-h" className="mt-4 text-[2rem] md:text-[2.6rem]">{t.volunteer.title}</h2>
            <p className="mt-4 text-muted">From door-to-door in your ward to polling-station agents on 10 August 2027.</p>
          </div>
          <div className="rounded-[4px] border border-rule bg-white p-5 md:p-8">
            <VolunteerForm t={t} locale={locale} />
          </div>
        </div>
      </section>
      <section id="donate" className="section scroll-mt-28" aria-labelledby="don-h">
        <div className="container-site grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-16">
          <div>
            <p className="kicker">M-Pesa</p>
            <h2 id="don-h" className="mt-4 text-[2rem] md:text-[2.6rem]">{t.donate.title}</h2>
          </div>
          <DonatePanel t={t} />
        </div>
      </section>
    </>
  );
}
