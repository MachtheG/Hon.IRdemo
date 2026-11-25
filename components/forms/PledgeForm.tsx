"use client";
import { useEffect, useId, useState } from "react";
import { wardById } from "@/data/wards";

import type { Dict } from "@/lib/i18n";
import { Consent, FieldError, Honeypot, WardSelect, errProps, type Errors } from "./fields";

export function PledgeForm({ t, locale, initialWard = "", demo, dark = false }: { t: Dict; locale: string; initialWard?: string; demo: boolean; dark?: boolean }) {
  const id = useId().replace(/:/g, "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ward, setWard] = useState(wardById(initialWard) ? initialWard : "");
  const [optIn, setOptIn] = useState(false);
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (initialWard && wardById(initialWard)) setWard(initialWard);
  }, [initialWard]);

  useEffect(() => {
    fetch("/api/pledge", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setCount(j.count))
      .catch(() => {});
  }, []);

  const sub = wardById(ward)?.subCounty ?? "";
  const p = t.pledge;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { name, phone, ward, optIn, consent, company };
    const { pledgeSchema } = await import("@/lib/schemas"); // loaded on submit only
    const parsed = pledgeSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as Errors);
      document.getElementById(`${id}-${Object.keys(parsed.error.flatten().fieldErrors)[0]}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const r = await fetch("/api/pledge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const j = await r.json();
      if (!r.ok || !j.ok) {
        if (j.issues) setErrors(j.issues);
        setStatus("failed");
        return;
      }
      setCount(j.count);
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  const labelTone = dark ? "[&_label]:!text-white [&_legend]:!text-white" : "";

  if (status === "done") {
    return (
      <div role="status" className={`rounded-[4px] p-8 text-center ${dark ? "bg-white/10" : "bg-alt"}`}>
        <p className="font-display text-3xl text-uda-yellow">✓</p>
        <p className={`mt-3 font-display text-2xl ${dark ? "text-white" : "text-uda-green-deep"}`}>{p.thanks}</p>
        {count !== null && <PledgeCount count={count} label={p.count} demoLabel={demo ? p.demoCount : null} dark={dark} />}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`relative grid gap-5 ${labelTone}`} aria-describedby={Object.keys(errors).length ? `${id}-summary` : undefined}>
      {Object.keys(errors).length > 0 && (
        <p id={`${id}-summary`} role="alert" className="rounded-[4px] bg-[#fdecea] px-4 py-2 text-sm text-[#8a1c12]">{p.error}</p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={`${id}-name`}>{p.name}</label>
          <input id={`${id}-name`} name="name" autoComplete="name" required className="input" value={name} onChange={(e) => setName(e.target.value)} {...errProps(id, errors, "name")} />
          <FieldError id={id} errors={errors} name="name" />
        </div>
        <div className="field">
          <label htmlFor={`${id}-phone`}>{p.phone}</label>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={p.phoneHint} required className="input" value={phone} onChange={(e) => setPhone(e.target.value)} {...errProps(id, errors, "phone")} />
          <FieldError id={id} errors={errors} name="phone" />
        </div>
        <WardSelect id={id} value={ward} onChange={setWard} errors={errors} label={p.ward} pick={p.wardPick} />
        <div className="field">
          <label htmlFor={`${id}-sub`}>{p.subCounty}</label>
          <input id={`${id}-sub`} readOnly tabIndex={-1} className="input !bg-alt" value={sub} placeholder="—" aria-readonly="true" />
        </div>
      </div>
      <label className={`flex items-start gap-3 text-[14px] ${dark ? "text-white" : "text-ink"}`}>
        <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-0.5 h-5 w-5 flex-none accent-[#0B7A3B]" />
        {p.optIn}
      </label>
      <div className={dark ? "[&_span]:!text-white [&_a]:!text-uda-yellow" : ""}>
        <Consent id={id} locale={locale} checked={consent} onChange={setConsent} errors={errors} text={p.consent} linkText={p.privacy} />
      </div>
      <Honeypot value={company} onChange={setCompany} />
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-yellow px-8 text-base" disabled={status === "sending"}>
          {status === "sending" ? p.sending : p.submit}
        </button>
        {count !== null && <PledgeCount count={count} label={p.count} demoLabel={demo ? p.demoCount : null} dark={dark} />}
      </div>
      {status === "failed" && <p role="alert" className="field-error">{p.failed}</p>}
    </form>
  );
}

function PledgeCount({ count, label, demoLabel, dark }: { count: number; label: string; demoLabel: string | null; dark: boolean }) {
  return (
    <p className={`text-sm ${dark ? "text-white/90" : "text-muted"}`} aria-live="polite">
      <span className={`font-display text-2xl font-semibold ${dark ? "text-uda-yellow" : "text-uda-green-deep"}`}>{count.toLocaleString("en-KE")}</span> {count === 1 ? label.replace(/^pledges/, "pledge") : label}
      {demoLabel && <span className="tag tag-draft ml-2">{demoLabel}</span>}
    </p>
  );
}
