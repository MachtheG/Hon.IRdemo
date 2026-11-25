/** Elegant framed placeholder for a photo slot that has no image yet. */
export function Placeholder({ describe, slotKey, compact = false }: { describe: string; slotKey: string; compact?: boolean }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-uda-green-deep text-center"
      role="img"
      aria-label={`Photo to come: ${describe}`}
    >
      <div aria-hidden className="absolute inset-[10px] rounded-[2px] border border-uda-yellow/80" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #FFC20E 0, transparent 45%), radial-gradient(circle at 80% 90%, #fff 0, transparent 40%)" }}
      />
      <div className={`relative px-6 ${compact ? "max-w-[16rem]" : "max-w-sm"}`}>
        <svg aria-hidden viewBox="0 0 24 24" className={`mx-auto mb-3 text-uda-yellow ${compact ? "h-5 w-5" : "h-7 w-7"}`} fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M4 8h3l2-2.5h6L17 8h3v11H4z" strokeLinejoin="round" />
          <circle cx="12" cy="13.2" r="3.6" />
        </svg>
        <p className={`font-display text-white ${compact ? "text-sm" : "text-lg"} leading-snug`}>{describe}</p>
        {!compact && (
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-uda-yellow/90">Photo to come · {slotKey}</p>
        )}
      </div>
    </div>
  );
}
