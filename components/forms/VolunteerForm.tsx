"use client";
import { useId, useState } from "react";
import { volunteerRoles } from "@/lib/volunteer-roles";
import type { Dict } from "@/lib/i18n";
import { Consent, FieldError, Honeypot, WardSelect, errProps, type Errors } from "./fields";

export function VolunteerForm({ t, locale }: { t: Dict; locale: string }) {
  const id = useId().replace(/:/g, "");
  const [f, setF] = useState({ name: "", phone: "", ward: "", email: "", message: "", optIn: false, consent: false, company: "" });
  const [roles, setRoles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const set = (k: keyof typeof f) => (v: string | boolean) => setF((s) => ({ ...s, [k]: v }));
  const v = t.volunteer;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...f, roles };
    const { volunteerSchema } = await import("@/lib/schemas"); // loaded on submit only
    const parsed = volunteerSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as Errors);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const r = await fetch("/api/volunteer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const j = await r.json();
      if (!r.ok || !j.ok) {
        if (j.issues) setErrors(j.issues);
        setStatus("failed");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "done") return <p role="status" className="rounded-[4px] bg-alt p-6 font-display text-xl text-uda-green-deep">{v.thanks}</p>;

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-5">
      {Object.keys(errors).length > 0 && <p role="alert" className="rounded-[4px] bg-[#fdecea] px-4 py-2 text-sm text-[#8a1c12]">{t.pledge.error}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={`${id}-name`}>{t.pledge.name}</label>
          <input id={`${id}-name`} autoComplete="name" className="input" value={f.name} onChange={(e) => set("name")(e.target.value)} {...errProps(id, errors, "name")} />
          <FieldError id={id} errors={errors} name="name" />
        </div>
        <div className="field">
          <label htmlFor={`${id}-phone`}>{t.pledge.phone}</label>
          <input id={`${id}-phone`} type="tel" inputMode="tel" autoComplete="tel" placeholder={t.pledge.phoneHint} className="input" value={f.phone} onChange={(e) => set("phone")(e.target.value)} {...errProps(id, errors, "phone")} />
          <FieldError id={id} errors={errors} name="phone" />
        </div>
        <WardSelect id={id} value={f.ward} onChange={set("ward")} errors={errors} label={t.pledge.ward} pick={t.pledge.wardPick} />
        <div className="field">
          <label htmlFor={`${id}-email`}>{v.email}</label>
          <input id={`${id}-email`} type="email" autoComplete="email" className="input" value={f.email} onChange={(e) => set("email")(e.target.value)} {...errProps(id, errors, "email")} />
          <FieldError id={id} errors={errors} name="email" />
        </div>
      </div>
      <fieldset className="field" {...(errors.roles ? { "aria-describedby": `${id}-roles-err` } : {})}>
        <legend className="mb-2">{v.help}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {volunteerRoles.map((r) => (
            <label key={r} className="flex min-h-[40px] items-center gap-3 rounded-[4px] border border-rule px-3 text-[15px] !font-normal !text-ink">
              <input type="checkbox" className="h-5 w-5 accent-[#0B7A3B]" checked={roles.includes(r)} onChange={(e) => setRoles((s) => (e.target.checked ? [...s, r] : s.filter((x) => x !== r)))} />
              {v.roles[r]}
            </label>
          ))}
        </div>
        <FieldError id={id} errors={errors} name="roles" />
      </fieldset>
      <div className="field">
        <label htmlFor={`${id}-msg`}>{v.message}</label>
        <textarea id={`${id}-msg`} rows={3} className="input" value={f.message} onChange={(e) => set("message")(e.target.value)} />
      </div>
      <label className="flex items-start gap-3 text-[14px] text-ink">
        <input type="checkbox" checked={f.optIn} onChange={(e) => set("optIn")(e.target.checked)} className="mt-0.5 h-5 w-5 flex-none accent-[#0B7A3B]" />
        {t.pledge.optIn}
      </label>
      <Consent id={id} locale={locale} checked={f.consent} onChange={set("consent")} errors={errors} text={t.pledge.consent} linkText={t.pledge.privacy} />
      <Honeypot value={f.company} onChange={set("company")} />
      <button type="submit" className="btn btn-yellow justify-self-start px-8" disabled={status === "sending"}>{status === "sending" ? t.pledge.sending : v.submit}</button>
      {status === "failed" && <p role="alert" className="field-error">{t.pledge.failed}</p>}
    </form>
  );
}
