"use client";
import { useSearchParams } from "next/navigation";
import type { Dict } from "@/lib/i18n";
import { PledgeForm } from "./PledgeForm";

/** Pre-fills the ward from ?ward= (used by "Pledge from this ward" on the map). */
export function PledgeFromQuery({ t, locale, demo }: { t: Dict; locale: string; demo: boolean }) {
  const ward = useSearchParams().get("ward") ?? "";
  return <PledgeForm t={t} locale={locale} demo={demo} initialWard={ward} />;
}
