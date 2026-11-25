import { DEMO_MODE, donation } from "@/config/site";
import type { Dict } from "@/lib/i18n";

/** M-Pesa details only. No payment processing on this site. */
export function DonatePanel({ t }: { t: Dict }) {
  const d = t.donate;
  return (
    <div className="rounded-[4px] border border-rule bg-white p-6 md:p-8">
      <p className="text-lg text-ink">{d.lead}</p>
      <dl className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-[4px] bg-alt p-4">
          <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{d.paybill}</dt>
          <dd className="mt-1 font-display text-3xl font-semibold tabular-nums text-uda-green-deep">{donation.paybill}</dd>
        </div>
        <div className="rounded-[4px] bg-alt p-4">
          <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{d.account}</dt>
          <dd className="mt-1 font-display text-3xl font-semibold text-uda-green-deep">{donation.account}</dd>
        </div>
      </dl>
      {DEMO_MODE && donation.demo && (
        <p role="note" className="mt-4 flex items-center gap-2 rounded-[4px] border border-[#f0d77a] bg-uda-yellow-soft px-4 py-3 text-[15px] font-semibold text-uda-green-deep">
          <span aria-hidden>⚠</span> {d.demoNote}
        </p>
      )}
      <p className="mt-4 text-[13px] text-muted">{d.noProcessing}</p>
    </div>
  );
}
