import type { Fact } from "./types";

// Every figure on the site comes from here. /sources is generated from this file.
// Facts with `sourceUrl: null` are hidden from the public site and listed in TODO_VERIFY.md.

const A = "2026-11-25";

const BOMET_NYE_2015 = "https://bomet.go.ke/?p=10161";
const WIKI = "https://en.wikipedia.org/wiki/Isaac_Ruto";
const JSC_PROFILE = "https://jsc.go.ke/?p=405";

export const facts: Fact[] = [
  // ── Background ─────────────────────────────────────────────
  {
    id: "born",
    claim: "Born 4 March 1959; from Tumoi, Sigor, Chepalungu.",
    pillar: "Background",
    sourceTitle: "Wikipedia — Isaac Ruto",
    sourceUrl: WIKI,
    accessed: A,
  },
  {
    id: "education",
    claim: "Educated at Tenwek High School; BA in Economics, Sociology & Political Science, University of Nairobi.",
    pillar: "Background",
    sourceTitle: "Judicial Service Commission — Commissioner profile",
    sourceUrl: JSC_PROFILE,
    also: [{ title: "Wikipedia — Isaac Ruto", url: WIKI }],
    accessed: A,
  },
  {
    id: "family",
    claim: "Married to Esther Ruto; three children.",
    pillar: "Background",
    sourceTitle: "Wikipedia — Isaac Ruto",
    sourceUrl: WIKI,
    accessed: A,
    confirm: "CONFIRM family details and photo use with the campaign",
  },
  {
    id: "mp",
    claim: "Member of Parliament for Chepalungu, 1998–2002 and 2008–2012; elected on the ODM ticket in 2007.",
    pillar: "Background",
    year: "1998–2012",
    sourceTitle: "Judicial Service Commission — Commissioner profile",
    sourceUrl: JSC_PROFILE,
    also: [{ title: "Wikipedia — Isaac Ruto", url: WIKI }],
    accessed: A,
  },
  {
    id: "minister",
    claim:
      "Assistant Minister for Education and for Agriculture (1999–2001), then a full Cabinet Minister (2001–2003).",
    pillar: "Background",
    year: "1999–2003",
    sourceTitle: "Wikipedia — Isaac Ruto",
    sourceUrl: WIKI,
    accessed: A,
    note: "Sources disagree on the full ministry (Vocational Training vs Environment & Natural Resources); the portfolio name is omitted until confirmed.",
    confirm: "CONFIRM full-minister portfolio name",
  },

  // ── Founding Governor 2013–2017 ───────────────────────────
  {
    id: "health-longisa",
    claim: "Built renal, eye and ICU units at Longisa County Referral Hospital.",
    pillar: "Health",
    year: "2013–2015",
    sourceTitle: "County Government of Bomet — New Year's Eve (2015) celebrations",
    sourceUrl: BOMET_NYE_2015,
    also: [{ title: "County Government of Bomet — Longisa eye unit commissioned", url: "https://bomet.go.ke/?p=10202" }],
    accessed: A,
  },
  {
    id: "health-services",
    claim:
      "Continuous medicine supply to county health facilities, 24/7 ambulance services, and land acquired for a cancer centre.",
    pillar: "Health",
    year: "2013–2015",
    sourceTitle: "County Government of Bomet — New Year's Eve (2015) celebrations",
    sourceUrl: BOMET_NYE_2015,
    accessed: A,
  },
  {
    id: "ecde",
    claim: "154 ECDE centres built and about 1,000 ECDE teachers employed (as of January 2015).",
    pillar: "Education",
    year: "2015",
    sourceTitle: "County Government of Bomet — New Year's Eve (2015) celebrations",
    sourceUrl: BOMET_NYE_2015,
    also: [{ title: "County Government of Bomet — Launch of ECDE centres", url: "https://bomet.go.ke/?p=10151" }],
    accessed: A,
    note: "An earlier county release gave a January 2014 target for the 154 centres; the January 2015 page lists them as delivered.",
  },
  {
    id: "stadium",
    claim: "Built Bomet Green Stadium.",
    pillar: "Education",
    year: "2013–2015",
    sourceTitle: "County Government of Bomet — New Year's Eve (2015) celebrations",
    sourceUrl: BOMET_NYE_2015,
    accessed: A,
  },
  {
    id: "water-company",
    claim:
      "Formed Bomet Water Company; introduced drip irrigation in drier areas such as Nogirwet; bought three 15,000-litre water bowsers.",
    pillar: "Water",
    year: "2013–2015",
    sourceTitle: "County Government of Bomet — New Year's Eve (2015) celebrations",
    sourceUrl: BOMET_NYE_2015,
    accessed: A,
  },
  {
    id: "water-community",
    claim:
      "Strengthened community water projects at Mogombet, Sergutiet, Chebara, Kaptebengwet and Itare.",
    pillar: "Water",
    year: "2013–2015",
    sourceTitle: "County Government of Bomet — New Year's Eve (2015) celebrations",
    sourceUrl: BOMET_NYE_2015,
    accessed: A,
  },
  {
    id: "chebunyo-water",
    claim:
      "Extended water lines to Chebunyo market, benefiting about 17,000 residents; alongside a county–Kenya Red Cross scheme to serve about 80,000 residents across Chebunyo, Sigor and Kipreres wards.",
    pillar: "Water",
    year: "2016",
    sourceTitle: "County Government of Bomet — Governor launches water project and market in Chebunyo",
    sourceUrl: "https://bomet.go.ke/?p=10184",
    accessed: A,
    note: "The county release gives 17,000 for the market line and 80,000 for the wider Red Cross co-funded scheme. The brief's single '80,000' figure has been split accordingly.",
    confirm: "CONFIRM 17,000 / 80,000 wording with the campaign",
  },
  {
    id: "chebunyo-market",
    claim:
      "Opened Chebunyo fresh-produce market for 300 traders (built under the national Economic Stimulus Programme; the county connected power and opened it).",
    pillar: "Agriculture & Co-ops",
    year: "2016",
    sourceTitle: "County Government of Bomet — Governor launches water project and market in Chebunyo",
    sourceUrl: "https://bomet.go.ke/?p=10184",
    accessed: A,
  },
  {
    id: "coops",
    claim: "Registered cooperatives grew from 180 (2013) to 446 (2016).",
    pillar: "Agriculture & Co-ops",
    year: "2013–2016",
    sourceTitle: "County Government of Bomet — UN International Day of Cooperatives 2016",
    sourceUrl: "https://bomet.go.ke/?p=10197",
    accessed: A,
  },
  {
    id: "coop-fund",
    claim:
      "KSh 35m seed capital to ward multipurpose cooperatives grew into a KSh 70m revolving fund, lending at 1% a month.",
    pillar: "Agriculture & Co-ops",
    year: "2016",
    sourceTitle: "County Government of Bomet — UN International Day of Cooperatives 2016",
    sourceUrl: "https://bomet.go.ke/?p=10197",
    accessed: A,
  },
  {
    id: "coop-per-ward",
    claim: "One multipurpose cooperative per ward; AI (artificial insemination) services and ECF vaccination for livestock.",
    pillar: "Agriculture & Co-ops",
    year: "2013–2015",
    sourceTitle: "County Government of Bomet — New Year's Eve (2015) celebrations",
    sourceUrl: BOMET_NYE_2015,
    accessed: A,
    note: "The 2015 page says 'Free AI services'; a 2016 release describes AI as subsidised to about KSh 200 per service.",
    confirm: "CONFIRM 'free' vs 'subsidised' AI wording",
  },
  {
    id: "milk-coolers",
    claim:
      "Opened two county-funded milk cooling plants: Chesoen Farmers Cooperative (2,000 litres) and Kipsonoi Multipurpose (3,500 litres).",
    pillar: "Agriculture & Co-ops",
    year: "2016",
    sourceTitle: "County Government of Bomet — Governor launches milk cooling plants",
    sourceUrl: "https://bomet.go.ke/?p=10181",
    accessed: A,
  },
  {
    id: "milk-plant",
    claim: "Began setting up a KSh 500m county milk processing plant in Bomet town.",
    pillar: "Agriculture & Co-ops",
    year: "2016",
    sourceTitle: "County Government of Bomet — Governor launches milk cooling plants",
    sourceUrl: "https://bomet.go.ke/?p=10181",
    accessed: A,
  },
  {
    id: "tractors",
    claim: "Eight tractors (KSh 38m) flagged off to cooperatives through county-guaranteed AFC loans.",
    pillar: "Agriculture & Co-ops",
    year: "2016",
    sourceTitle: "County Government of Bomet — Agribusiness in Bomet County gets a boost",
    sourceUrl: "https://bomet.go.ke/?p=10194",
    also: [{ title: "The Standard — flag-off coverage (KSh 38m)", url: "https://www.standardmedia.co.ke/rift-valley/article/2000198617/forget-about-icc-and-build-kenya-uhuru-told" }],
    accessed: A,
    note: "The KSh 38m value is from press coverage of the flag-off; the county release confirms eight tractors and the AFC guarantee.",
    confirm: "CONFIRM the KSh 38m figure in the linked Standard article",
  },
  {
    id: "governance",
    claim:
      "Launched the County Integrated Development Plan and Strategic Investment Plan; ICT-based financial management; fibre optic connected at county headquarters.",
    pillar: "Governance",
    year: "2013–2015",
    sourceTitle: "County Government of Bomet — New Year's Eve (2015) celebrations",
    sourceUrl: BOMET_NYE_2015,
    accessed: A,
  },

  // ── National leadership ──────────────────────────────────
  {
    id: "governor",
    claim: "First Governor of Bomet County, March 2013 – August 2017.",
    pillar: "Devolution",
    year: "2013–2017",
    sourceTitle: "Wikipedia — Isaac Ruto",
    sourceUrl: WIKI,
    also: [{ title: "The Star — Ex-governor Isaac Rutto elected JSC Vice Chairperson", url: "https://www.the-star.co.ke/news/2024-06-10-ex-governor-isaac-rutto-elected-jsc-vice-chairperson" }],
    accessed: A,
  },
  {
    id: "cog",
    claim: "Elected the first Chairman of the Council of Governors, by consensus, in April 2013.",
    pillar: "Devolution",
    year: "2013",
    sourceTitle: "Wikipedia — Isaac Ruto",
    sourceUrl: WIKI,
    accessed: A,
  },
  {
    id: "pesa-mashinani",
    claim:
      "Led the governors' Pesa Mashinani push to raise the counties' share of national revenue from 15% to 45%.",
    pillar: "Devolution",
    year: "2015",
    sourceTitle: "Daily Nation — Governors step up push for vote",
    sourceUrl: "https://nation.africa/kenya/news/politics/governors-step-up-push-for-vote-1026296",
    also: [
      { title: "The Standard — Governor Ruto heads team for referendum", url: "https://www.standardmedia.co.ke/counties/article/2000166792/governor-ruto-heads-team-for-referendum" },
    ],
    accessed: A,
    confirm: "CONFIRM which article carries the 15%→45% figure (search snippets attribute it to the Nation coverage)",
  },

  // ── Judicial Service Commission ──────────────────────────
  {
    id: "jsc-appointed",
    claim:
      "Appointed to the Judicial Service Commission on 15 June 2023 as a representative of the public under Article 171(2)(h), after approval by Parliament.",
    pillar: "Justice",
    year: "2023",
    sourceTitle: "Judicial Service Commission — Commissioner profile",
    sourceUrl: JSC_PROFILE,
    also: [
      { title: "Citizen Digital — Parliament approves nomination of Isaac Ruto, Caroline Nzilani to JSC", url: "https://www.citizen.digital/news/parliament-approves-nomination-of-isaac-ruto-caroline-nzilani-to-jsc-n321576" },
    ],
    accessed: A,
  },
  {
    id: "jsc-vc",
    claim: "Elected JSC Vice Chairperson unanimously on 7 June 2024, deputising Chief Justice Martha Koome.",
    pillar: "Justice",
    year: "2024",
    sourceTitle: "The Star — Ex-governor Isaac Rutto elected JSC Vice Chairperson",
    sourceUrl: "https://www.the-star.co.ke/news/2024-06-10-ex-governor-isaac-rutto-elected-jsc-vice-chairperson",
    also: [{ title: "People Daily — Rutto elected JSC Vice Chairperson", url: "https://peopledaily.digital/news/rutto-elected-jsc-vice-chairperson" }],
    accessed: A,
  },
  {
    id: "jsc-committees",
    claim:
      "Serves on the JSC committees for Human Resource Management; Finance, Planning & Administration; and Administration of Justice. Described by the JSC as a champion of good governance with over 30 years' experience.",
    pillar: "Justice",
    sourceTitle: "Judicial Service Commission — Commissioner profile",
    sourceUrl: JSC_PROFILE,
    accessed: A,
  },
  {
    id: "jsc-recruitment",
    claim:
      "A Commission he helps lead ran its biggest recruitment drive: 2,679 Kenyans applied for 150 advertised posts for judges, magistrates and Kadhis (2025).",
    pillar: "Justice",
    year: "2025",
    sourceTitle: "The Standard — More than 2,600 Kenyans apply to be judges and magistrates (15 Jul 2025)",
    sourceUrl: "https://www.standardmedia.co.ke/national/article/2001524340/more-than-2600-kenyans-apply-to-be-judges-and-magistrates",
    also: [{ title: "Kenyans.co.ke — JSC receives 2,679 applications for 150 vacancies", url: "https://www.kenyans.co.ke/news/114183-jsc-receives-2679-applications-150-judge-magistrate-and-kadhi-vacancies" }],
    accessed: A,
  },
  {
    id: "jsc-briefing",
    claim: "Appeared as Vice Chairperson at the JSC media briefing of 16 January 2025.",
    pillar: "Justice",
    year: "2025",
    sourceTitle: "The Standard",
    sourceUrl: null,
    accessed: A,
    confirm: "CONFIRM — source URL for the 16 Jan 2025 briefing not found",
  },
  {
    id: "jsc-magistrates",
    claim:
      "The Commission appointed 100 new Resident Magistrates on 11 December 2025, for deployment including to underserved areas and newly established courts.",
    pillar: "Justice",
    year: "2025",
    sourceTitle: "The Star — JSC appoints 100 new Resident Magistrates (11 Dec 2025)",
    sourceUrl: "https://www.the-star.co.ke/news/2025-12-11-jsc-appoints-100-new-resident-magistrates",
    also: [
      { title: "The Standard — JSC appoints 100 new magistrates to boost justice delivery", url: "https://www.standardmedia.co.ke/national/article/2001536324/jsc-appoints-100-new-magistrates-to-boost-justice-delivery" },
      { title: "Capital FM — JSC appoints 100 new magistrates", url: "https://www.capitalfm.co.ke/news/2025/12/jsc-appoints-100-new-magistrates-to-boost-justice" },
    ],
    accessed: A,
  },
  {
    id: "jsc-promotions",
    claim: "The Commission promoted 117 judicial officers after interviews held 4–13 August 2025.",
    pillar: "Justice",
    year: "2025",
    sourceTitle: "Kenyans.co.ke — Nine Chief Magistrates among 117 judicial officers promoted by JSC",
    sourceUrl: "https://www.kenyans.co.ke/news/116360-nine-chief-magistrates-among-117-judicial-officers-promoted-jsc",
    accessed: A,
  },
  {
    id: "jsc-integrity",
    claim:
      "The Leadership and Integrity Code for JSC members was gazetted and a JSC Anti-Corruption Policy developed (JSC Annual Report 2024/25).",
    pillar: "Justice",
    year: "2024/25",
    sourceTitle: "JSC Annual Report 2024/25 (Parliament library)",
    sourceUrl: null,
    accessed: A,
    confirm: "CONFIRM — Parliament library URL for the JSC Annual Report 2024/25 not found",
  },
  {
    id: "jsc-fire",
    claim:
      "The JSC was overall winner among Constitutional Commissions and Independent Offices at the FiRe (Financial Reporting) Awards, December 2025.",
    pillar: "Justice",
    year: "2025",
    sourceTitle: "JSC — JSC wins top Financial Reporting Award",
    sourceUrl: "https://jsc.go.ke/jsc-wins-top-financial-reporting-award/",
    also: [{ title: "The Standard — JSC clinches top honour at this year's FiRe awards", url: "https://www.standardmedia.co.ke/courts/article/2001535897/jsc-clinches-top-honour-at-this-years-fire-awards" }],
    accessed: A,
  },
  {
    id: "jsc-backlog",
    claim:
      "Judiciary-wide case backlog fell from 244,267 (June 2024) to 169,349 (June 2025) — down 31%.",
    pillar: "Justice",
    year: "2024/25",
    sourceTitle: "Judiciary — State of the Judiciary and Administration of Justice Annual Report (SOJAR) 2024/25",
    sourceUrl: "https://judiciary.go.ke/wp-content/uploads/2025/12/SOJAR-2024-2025-Final-Dec-12.pdf",
    accessed: A,
    note: "Brief cited SOJAR via Eastleigh Voice; linked here to the Judiciary's own PDF. (244,267 − 169,349) ÷ 244,267 = 30.7%.",
    confirm: "CONFIRM both figures against the SOJAR PDF tables",
  },
  {
    id: "jsc-dagoretti-quote",
    claim:
      "“This launch is addressing an urgent need by easing the case backlog and reducing the distance community members need to travel to access justice.” — at the opening of the Dagoretti Law Courts.",
    pillar: "Justice",
    year: "2024",
    sourceTitle: "Eastleigh Voice — Chief Justice Koome inaugurates Dagoretti Law Courts",
    sourceUrl:
      "https://eastleighvoice.co.ke/city-affairs/81719/chief-justice-koome-inaugurates-dagoretti-law-courts-to-address-nairobi-case-backlog",
    accessed: A,
  },

  // ── Present day ──────────────────────────────────────────
  {
    id: "ccm-uda",
    claim: "Chama Cha Mashinani, the party he founded, dissolved and folded into UDA in March 2023.",
    pillar: "Background",
    year: "2023",
    sourceTitle: "The Star — Six Kenya Kwanza affiliate parties fold to join UDA (14 Mar 2023)",
    sourceUrl: "https://www.the-star.co.ke/news/2023-03-14-six-kenya-kwanza-affiliate-parties-fold-to-join-uda",
    accessed: A,
  },
  {
    id: "barchok",
    claim: "Governor Hillary Barchok has publicly said he backs Isaac Ruto for governor in 2027.",
    pillar: "Background",
    sourceTitle: "Nation — The unlikely alliance between Governor Barchok and his predecessor Ruto",
    sourceUrl:
      "https://nation.africa/kenya/counties/bomet/the-unlikely-alliance-between-governor-barchok-and-his-predecessor-ruto-5333642",
    accessed: A,
    confirm: "CONFIRM the campaign wants this featured",
  },
  {
    id: "tea",
    claim: "Took a break from elective politics to lead tea reforms in the South Rift.",
    pillar: "Background",
    sourceTitle: "The Standard",
    sourceUrl: null,
    accessed: A,
    confirm: "CONFIRM role/title and source — no article found",
  },

  // ── County facts ─────────────────────────────────────────
  {
    id: "county",
    claim:
      "Bomet County: population 875,689 (2019 census); headquarters Bomet town; borders Kericho, Nakuru and Narok; 5 sub-counties and 25 wards.",
    pillar: "Background",
    sourceTitle: "Wikipedia — Bomet County",
    sourceUrl: "https://en.wikipedia.org/wiki/Bomet_County",
    accessed: A,
  },
];

export const factById = (id: string) => {
  const f = facts.find((x) => x.id === id);
  if (!f) throw new Error(`Unknown fact id: ${id}`);
  return f;
};

/** Facts the public site may show (sourced, or any while in demo mode). */
export const isPublishable = (f: Fact) => f.sourceUrl !== null;

/** Trust strip on the home page. */
export const trustStats = [
  { value: "1st", label: "Governor of Bomet County (2013–2017)", factId: "governor" },
  { value: "1st", label: "Chair, Council of Governors (2013)", factId: "cog" },
  { value: "154", label: "ECDE centres built (by Jan 2015)", factId: "ecde" },
  { value: "446", label: "registered cooperatives, up from 180", factId: "coops" },
];

/** JSC milestones row. */
export const jscStats = [
  { value: "2,679", label: "applicants in the biggest recruitment drive", factId: "jsc-recruitment" },
  { value: "100", label: "new Resident Magistrates", factId: "jsc-magistrates" },
  { value: "117", label: "judicial officers promoted", factId: "jsc-promotions" },
  { value: "−31%", label: "case backlog, Judiciary-wide (Jun 2024 → Jun 2025)", factId: "jsc-backlog" },
];

export type LedgerPillar = "Health" | "Water" | "Education" | "Agriculture & Co-ops" | "Devolution" | "Justice";

/** Six record highlights for the home-page ledger. */
export const ledger: {
  id: string;
  pillar: LedgerPillar;
  year: string;
  heading: string;
  metric: string;
  metricLabel: string;
  factId: string;
  slot: string;
}[] = [
  { id: "l-health", pillar: "Health", year: "2013–15", heading: "Specialist care at Longisa", metric: "3", metricLabel: "new units: renal, eye and ICU", factId: "health-longisa", slot: "ledger-health" },
  { id: "l-water", pillar: "Water", year: "2016", heading: "Water lines to Chebunyo market", metric: "17,000", metricLabel: "residents served by the market extension", factId: "chebunyo-water", slot: "ledger-water" },
  { id: "l-edu", pillar: "Education", year: "2015", heading: "Classrooms for the youngest", metric: "154", metricLabel: "ECDE centres; ~1,000 teachers employed", factId: "ecde", slot: "ledger-education" },
  { id: "l-agri", pillar: "Agriculture & Co-ops", year: "2013–16", heading: "Co-operatives that lend", metric: "KSh 70m", metricLabel: "revolving fund grown from KSh 35m seed", factId: "coop-fund", slot: "ledger-agri" },
  { id: "l-dev", pillar: "Devolution", year: "2013", heading: "First chair of the governors", metric: "1st", metricLabel: "Chairman, Council of Governors", factId: "cog", slot: "ledger-devolution" },
  { id: "l-jus", pillar: "Justice", year: "2024", heading: "Vice Chair of the JSC", metric: "Unanimous", metricLabel: "election as JSC Vice Chairperson", factId: "jsc-vc", slot: "ledger-justice" },
];

/** Career timeline for /record. */
export const career = [
  { years: "1998–2002", role: "MP for Chepalungu", factId: "mp" },
  { years: "1999–2003", role: "Assistant Minister, then Cabinet Minister", factId: "minister" },
  { years: "2008–2012", role: "MP for Chepalungu (ODM)", factId: "mp" },
  { years: "2013–2017", role: "Founding Governor of Bomet County", factId: "governor" },
  { years: "2013", role: "First Chair, Council of Governors", factId: "cog" },
  { years: "2023", role: "Commissioner, Judicial Service Commission", factId: "jsc-appointed" },
  { years: "2024", role: "Vice Chairperson, JSC", factId: "jsc-vc" },
];
