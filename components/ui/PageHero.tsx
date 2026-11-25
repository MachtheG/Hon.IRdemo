import type { ReactNode } from "react";
import { SlotImage } from "./SlotImage";

export function PageHero({ kicker, title, intro, slot, children }: { kicker: string; title: ReactNode; intro?: ReactNode; slot?: string; children?: ReactNode }) {
  return (
    <section className="border-b border-rule bg-alt">
      <div className={`container-site grid items-center gap-10 py-14 md:py-20 ${slot ? "md:grid-cols-[7fr_5fr] lg:gap-16" : ""}`}>
        <div>
          <p className="kicker rise">{kicker}</p>
          <h1 className="mt-4 text-[2.6rem] leading-[1.04] md:text-[3.75rem]">{title}</h1>
          {intro && <div className="rise rise-d2 mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{intro}</div>}
          {children}
        </div>
        {slot && (
          <div className="rise rise-d2">
            <SlotImage slot={slot} aspect="aspect-[4/5]" sizes="(min-width: 768px) 38vw, 100vw" priority />
          </div>
        )}
      </div>
    </section>
  );
}
