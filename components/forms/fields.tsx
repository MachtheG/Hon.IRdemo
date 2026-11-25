"use client";
import Link from "next/link";
import { subCounties, wards } from "@/data/wards";

export type Errors = Record<string, string[] | undefined>;

export function FieldError({ id, errors, name }: { id: string; errors: Errors; name: string }) {
  const e = errors[name]?.[0];
  return e ? <p id={`${id}-${name}-err`} className="field-error">{e}</p> : null;
}

export const errProps = (id: string, errors: Errors, name: string) =>
  errors[name]?.length ? { "aria-invalid": true as const, "aria-describedby": `${id}-${name}-err` } : {};

export function WardSelect({ id, value, onChange, errors, label, pick }: { id: string; value: string; onChange: (v: string) => void; errors: Errors; label: string; pick: string }) {
  return (
    <div className="field">
      <label htmlFor={`${id}-ward`}>{label}</label>
      <select id={`${id}-ward`} name="ward" required className="input" value={value} onChange={(e) => onChange(e.target.value)} {...errProps(id, errors, "ward")}>
        <option value="">{pick}</option>
        {subCounties.map((sc) => (
          <optgroup key={sc} label={sc}>
            {wards.filter((w) => w.subCounty === sc).map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <FieldError id={id} errors={errors} name="ward" />
    </div>
  );
}

export function Consent({ id, locale, checked, onChange, errors, text, linkText }: { id: string; locale: string; checked: boolean; onChange: (v: boolean) => void; errors: Errors; text: string; linkText: string }) {
  return (
    <div className="field">
      <label className="flex items-start gap-3 !font-normal !text-ink" htmlFor={`${id}-consent`}>
        <input id={`${id}-consent`} type="checkbox" name="consent" required checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-5 w-5 flex-none accent-[#0B7A3B]" {...errProps(id, errors, "consent")} />
        <span className="text-[14px] leading-snug">
          {text}{" "}
          <Link prefetch={false} href={`/${locale}/privacy`} className="font-semibold text-uda-green underline" target="_blank">{linkText}</Link>.
          <span className="text-muted"> (18+)</span>
        </span>
      </label>
      <FieldError id={id} errors={errors} name="consent" />
    </div>
  );
}

/** Visually hidden honeypot field for bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>Company <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} name="company" /></label>
    </div>
  );
}
