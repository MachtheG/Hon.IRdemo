import type { Metadata } from "next";
import Link from "next/link";
import { JSC_STATUS, candidate, slogans } from "@/config/site";
import { factById, isPublishable } from "@/data/record";
import { getDict } from "@/lib/i18n";
import { PageHero } from "@/components/ui/PageHero";
import { SlotImage } from "@/components/ui/SlotImage";
import { SourceLink } from "@/components/ui/SourceLink";

export const metadata: Metadata = { title: "His story", description: "From Tumoi to the Governor's office: the story of Isaac Ruto, Bomet's founding Governor." };

export default async function StoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const S = (id: string) => <SourceLink factId={id} locale={locale} className="text-uda-green" />;
  const show = (id: string) => isPublishable(factById(id));

  const chapters = [
    {
      n: "I", title: "Tumoi, Sigor", years: "1959 →", slot: "story-tumoi",
      body: (
        <>
          <p>Isaac Kiprono Ruto was born on 4 March 1959 and grew up in Tumoi, Sigor, in Chepalungu. {S("born")}</p>
          <p>He studied at Tenwek High School and went on to the University of Nairobi, graduating with a BA in Economics, Sociology and Political Science. {S("education")}</p>
        </>
      ),
    },
    {
      n: "II", title: "Parliament and Cabinet", years: "1998–2012", slot: "story-mp",
      body: (
        <>
          <p>Chepalungu sent him to Parliament in 1998, and again from 2008 to 2012 — the second time on the ODM ticket he won in 2007. {S("mp")}</p>
          <p>In government he served as an Assistant Minister for Education and for Agriculture, and then as a full Cabinet Minister from 2001 to 2003. {S("minister")}</p>
          {/* CONFIRM full-minister portfolio name before naming the ministry */}
        </>
      ),
    },
    {
      n: "III", title: "Building Bomet from day one", years: "2013–2017", slot: "story-governor",
      body: (
        <>
          <p>In March 2013 he became the first Governor of Bomet County. There was no county government to inherit — he and his team had to build one. {S("governor")}</p>
          <p>Within two years the county had launched its development plan, brought ICT into its financial management and connected its headquarters to fibre. {S("governance")}</p>
          <p>Longisa County Referral Hospital gained renal, eye and ICU units; 154 ECDE centres were built and about 1,000 ECDE teachers employed; Bomet Water Company was formed. {S("health-longisa")} {S("ecde")} {S("water-company")}</p>
          <p>For farmers, he set up a multipurpose co-operative in every ward. Registered co-operatives grew from 180 to 446, and a KSh 35m seed fund grew into a KSh 70m revolving fund. {S("coops")} {S("coop-fund")}</p>
        </>
      ),
    },
    {
      n: "IV", title: "Devolution on the national stage", years: "2013–2015", slot: "devolution",
      body: (
        <>
          <p>In April 2013 his fellow governors chose him, by consensus, as the first Chairman of the Council of Governors. {S("cog")}</p>
          <p>He led their <em>Pesa Mashinani</em> push to raise the counties’ share of national revenue from 15% to 45% — money for the grassroots, decided closer to home. {S("pesa-mashinani")}</p>
        </>
      ),
    },
    {
      n: "V", title: "Integrity at the Judicial Service Commission", years: "2023 →", slot: "jsc-portrait",
      body: (
        <>
          <p>In June 2023 he was appointed to the Judicial Service Commission as a representative of the public, and in June 2024 his fellow commissioners elected him Vice Chairperson unanimously. {S("jsc-appointed")} {S("jsc-vc")}</p>
          <p>
            {JSC_STATUS === "serving"
              ? "The JSC describes him as a champion of good governance with over 30 years’ experience."
              : "The JSC described him as a champion of good governance with over 30 years’ experience."}{" "}
            {S("jsc-committees")}
          </p>
          <p><Link prefetch={false} href={`/${locale}/record#jsc`} className="link-arrow">The Commission’s milestones</Link></p>
        </>
      ),
    },
    {
      n: "VI", title: "Back to finish the job", years: "2027", slot: "story-tea",
      body: (
        <>
          <p>In March 2023 Chama Cha Mashinani, the party he founded, folded into UDA. {S("ccm-uda")}</p>
          {/* CONFIRM the campaign wants the Barchok endorsement featured */}
          {show("barchok") && <p>Bomet’s current Governor, Hillary Barchok, has publicly said he backs Isaac Ruto for governor in 2027. {S("barchok")}</p>}
          {show("tea") && <p>{factById("tea").claim} {S("tea")}</p>}
          <p className="font-display text-2xl text-uda-green-deep">“{slogans.main.en}” — {slogans.main.gloss}</p>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHero kicker={t.story.kicker} title={<>From Tumoi to the <span className="whitespace-nowrap">Governor’s office</span></>} intro={<p>The story of {candidate.short}: Bomet’s founding Governor.</p>} slot="story-hero" />
      <div className="container-site py-16 md:py-24">
        <ol className="space-y-20 md:space-y-28">
          {chapters.map((c, i) => (
            <li key={c.n} className={`reveal grid items-start gap-10 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <SlotImage slot={c.slot} aspect="aspect-[4/3]" sizes="(min-width: 768px) 45vw, 100vw" />
              <div>
                <p className="flex items-baseline gap-4">
                  <span className="font-display text-5xl font-semibold text-uda-green-deep/15">{c.n}</span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-uda-green">{c.years}</span>
                </p>
                <h2 className="mt-2 text-[2rem] leading-tight md:text-[2.4rem]">{c.title}</h2>
                <div className="prose-site mt-5 text-[17px]">{c.body}</div>
              </div>
            </li>
          ))}
        </ol>
        <aside className="mt-24 rounded-[4px] border border-rule p-6 md:p-8">
          <p className="kicker">Family</p>
          {/* CONFIRM family details and photo with campaign */}
          <div className="mt-4 grid items-center gap-6 sm:grid-cols-[12rem_1fr]">
            <SlotImage slot="story-family" aspect="aspect-square" sizes="12rem" caption={false} compactPlaceholder />
            <p className="text-lg text-ink">He is married to Esther Ruto; they have three children. {S("family")}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
