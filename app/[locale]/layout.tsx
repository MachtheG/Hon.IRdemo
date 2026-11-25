import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { DEMO_MODE, candidate, slogans, SITE_URL } from "@/config/site";
import { getDict, htmlLang, isLocale, locales, type Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver, motionBootScript } from "@/components/layout/Motion";
import "../globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"], style: ["normal"], variable: "--font-playfair", display: "swap" });
// Body text: "optional" so slow connections paint immediately with the metric-matched
// fallback instead of waiting on the font (keeps hero text LCP fast on 4G).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "optional" });

export const viewport: Viewport = { themeColor: "#0B7A3B", width: "device-width", initialScale: 1 };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = `${candidate.short} for Governor · Bomet 2027`;
  const description = locale === "sw" ? slogans.hero.sw : `${slogans.hero.en} ${slogans.main.en} (${slogans.main.gloss}) — ${candidate.party}.`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${candidate.short} 2027` },
    description,
    alternates: { languages: { en: "/en", sw: "/sw" } },
    openGraph: { title, description, type: "website", locale: locale === "sw" ? "sw_KE" : "en_KE", siteName: `${candidate.short} 2027` },
    twitter: { card: "summary_large_image", title, description },
    robots: process.env.SITE_NOINDEX === "1" || (DEMO_MODE && process.env.VERCEL === "1") ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <html lang={htmlLang(locale as Locale)} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body className="min-h-svh antialiased">
        <Header locale={locale} t={t} />
        <main id="main" tabIndex={-1} className="outline-none">
          {t.common.swNote && (
            <p className="container-site pt-4 text-[13px] text-muted" lang="sw">{t.common.swNote}</p>
          )}
          {children}
        </main>
        <Footer locale={locale} t={t} />
        <RevealObserver />
      </body>
    </html>
  );
}
