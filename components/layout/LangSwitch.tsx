"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n";

const short: Record<string, string> = { en: "EN", sw: "SW" };
const full: Record<string, string> = { en: "English", sw: "Kiswahili" };

export function LangSwitch({ current }: { current: string }) {
  const path = usePathname() ?? `/${current}`;
  const rest = path.replace(/^\/(en|sw)(?=\/|$)/, "");
  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-xs font-semibold">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="text-white/60">/</span>}
          <Link prefetch={false}
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={l === current ? "true" : undefined}
            aria-label={full[l]}
            className={`rounded px-1.5 py-1 text-white ${l === current ? "bg-uda-green-deep" : "underline-offset-2 hover:underline"}`}
          >
            {short[l]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
