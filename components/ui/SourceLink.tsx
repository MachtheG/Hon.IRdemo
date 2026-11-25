import Link from "next/link";
import { factById } from "@/data/record";

/** "Source ↗" link to the fact's entry on /sources (which links out to the original). */
export function SourceLink({ factId, locale, label = "Source", className = "" }: { factId: string; locale: string; label?: string; className?: string }) {
  const f = factById(factId);
  return (
    <Link prefetch={false}
      href={`/${locale}/sources#fact-${f.id}`}
      className={`inline-flex min-h-[24px] items-center gap-1 text-[13px] font-medium underline decoration-1 underline-offset-2 ${className}`}
      title={f.sourceUrl ? f.sourceTitle : "Source pending"}
    >
      {f.sourceUrl ? label : "Source pending"} <span aria-hidden>↗</span>
    </Link>
  );
}
