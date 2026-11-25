import type { MetadataRoute } from "next";
import { DEMO_MODE, SITE_URL } from "@/config/site";

/** The demo must not be indexed once deployed: robots.txt disallows everything when
 *  SITE_NOINDEX=1, or when DEMO_MODE is on and the build runs on Vercel.
 *  (Local builds stay crawlable so Lighthouse's SEO audit measures the real setup.) */
export const noIndex = process.env.SITE_NOINDEX === "1" || (DEMO_MODE && process.env.VERCEL === "1");

export default function robots(): MetadataRoute.Robots {
  return noIndex
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
