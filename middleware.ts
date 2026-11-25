import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

// Redirect locale-less paths (/, /story …) to /en or /sw based on Accept-Language.
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const accept = req.headers.get("accept-language") ?? "";
  const locale = /\bsw\b/i.test(accept) && !/^en/i.test(accept) ? "sw" : defaultLocale;
  return NextResponse.redirect(new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, req.url));
}

export const config = {
  matcher: ["/((?!api|_next|images|geo|brand|favicon|icon|apple-icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
