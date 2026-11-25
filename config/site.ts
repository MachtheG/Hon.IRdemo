// Central switches and campaign copy. Everything the campaign is likely to
// change before launch lives here.
//
// NOTE: this file must stay free of runtime imports so that the Node scripts in
// /scripts can read it (Node strips the types natively).

/** Client-demo switch. While true, the demo banner shows and "Sample" tags render.
 *  `npm run build` refuses to build with DEMO_MODE=false while any `demo: true`
 *  item or unsourced fact remains (see scripts/check-demo.mjs). */
export const DEMO_MODE = true;

/** Yellow "Draft for campaign review" banner under the header. */
export const SHOW_DRAFT_BANNER = true;

/** JSC coat of arms in the home-page JSC section and on /record#jsc.
 *  LEGAL: decide after legal advice before launch (see README flags). */
export const SHOW_JSC_EMBLEM = true;

/** "serving" while he is a sitting JSC member; switch to "former" if he steps down. */
export const JSC_STATUS: "serving" | "former" = "serving";

/** The JSC spells it "Rutto". The campaign uses "Ruto". */
export const NAME_SPELLING: "Ruto" | "Rutto" = "Ruto";

export const candidate = {
  first: "Isaac",
  get last() {
    return NAME_SPELLING;
  },
  get short() {
    return `Isaac ${NAME_SPELLING}`;
  },
  get formal() {
    return `H.E. Hon. Isaac Kiprono ${NAME_SPELLING}, EGH`;
  },
  office: "Governor",
  county: "Bomet County",
  party: "UDA",
  partyLong: "United Democratic Alliance",
  coalition: "Kenya Kwanza",
  partyUrl: "https://uda.ke",
};

/** Demo slogans; swap freely. */
export const slogans = {
  main: { en: "Tulianza Pamoja. Tumalize Kazi.", gloss: "We started together. Let's finish the job." },
  theme: { en: "Mashinani Kwanza", gloss: "The grassroots first" },
  hero: {
    en: "Bomet's founding Governor. Ready to finish the job.",
    sw: "Gavana mwanzilishi wa Bomet. Tayari kumaliza kazi.",
  },
};

/** Election Day, 06:00 East Africa Time (UTC+3). */
export const ELECTION_DATE_ISO = "2027-08-10T06:00:00+03:00";

/** Data retention for form submissions (privacy notice). */
export const RETENTION_UNTIL = "30 November 2027";

/** M-Pesa details. All zeros on purpose so nobody can pay a real business. */
export const donation = {
  paybill: "000000",
  account: "RUTO2027",
  demo: true,
};

/** Campaign contact — CONFIRM with the campaign before launch. */
export const contact = {
  email: null as string | null, // CONFIRM data-controller contact email
  phone: null as string | null, // CONFIRM
  postal: null as string | null, // CONFIRM
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://isaacruto2027.example";
