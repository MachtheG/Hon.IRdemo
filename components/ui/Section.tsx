import type { ReactNode } from "react";

export function SectionHead({
  kicker, title, intro, light = false, children, id,
}: { kicker: string; title: ReactNode; intro?: ReactNode; light?: boolean; children?: ReactNode; id?: string }) {
  return (
    <div className="reveal mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className={`kicker ${light ? "kicker-light" : ""}`}>{kicker}</p>
        <h2 id={id} className={`mt-4 text-[2rem] leading-[1.1] md:text-[2.75rem] ${light ? "!text-white" : ""}`}>{title}</h2>
        {intro && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/85" : "text-muted"}`}>{intro}</p>}
      </div>
      {children}
    </div>
  );
}
