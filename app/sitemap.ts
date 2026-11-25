import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { locales } from "@/lib/i18n";

const pages = ["", "/story", "/record", "/plan", "/map", "/gallery", "/get-involved", "/privacy", "/sources", "/credits"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((p) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${p}`])) },
    })),
  );
}
