import en, { type Dict } from "@/dictionaries/en";
import sw from "@/dictionaries/sw";

/** Live locales. To add Kipsigis: create dictionaries/kln.ts, add "kln" here and to `dicts`. */
export const locales = ["en", "sw"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
/** Planned, not yet live. */
export const plannedLocales = ["kln"] as const;

const dicts: Record<Locale, Dict> = { en, sw };

export const isLocale = (x: string): x is Locale => (locales as readonly string[]).includes(x);
export const getDict = (l: string): Dict => dicts[isLocale(l) ? l : defaultLocale];
export const htmlLang = (l: Locale) => (l === "sw" ? "sw-KE" : "en-KE");
export type { Dict };
