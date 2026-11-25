"use client";
import { useRef } from "react";
import type { Testimonial } from "@/data/types";

/** Testimonial carousel: native scroll-snap (swipe works everywhere), with prev/next buttons. */
export function Voices({ items, labels, showSample }: { items: Testimonial[]; labels: { kicker: string; title: string; sample: string; prev: string; next: string }; showSample: boolean }) {
  const track = useRef<HTMLUListElement>(null);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 24), behavior: "smooth" });
  };
  return (
    <section className="section section-alt overflow-hidden" aria-labelledby="voices-title" aria-roledescription="carousel">
      <div className="container-site">
        <div className="reveal mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="kicker">{labels.kicker}</p>
            <h2 id="voices-title" className="mt-4 text-[2rem] leading-[1.1] md:text-[2.75rem]">{labels.title}</h2>
          </div>
          <div className="flex flex-none gap-2">
            <button type="button" onClick={() => go(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-uda-green/40 text-uda-green hover:bg-uda-green hover:text-white" aria-label={labels.prev}>←</button>
            <button type="button" onClick={() => go(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-uda-green/40 text-uda-green hover:bg-uda-green hover:text-white" aria-label={labels.next}>→</button>
          </div>
        </div>
        <ul ref={track} tabIndex={0} aria-label={labels.title} className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto scroll-smooth px-4 pb-4 md:mx-0 md:scroll-px-0 md:px-0">
          {items.map((v, i) => (
            <li key={v.name} aria-roledescription="slide" aria-label={`${i + 1} / ${items.length}`} className="w-[85%] flex-none snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <figure className="flex h-full flex-col rounded-[4px] border border-rule bg-white p-7">
                <span aria-hidden className="font-display text-6xl leading-none text-uda-yellow">“</span>
                <blockquote className="-mt-3 flex-1 font-display text-[1.25rem] leading-snug text-uda-green-deep">{v.quote}</blockquote>
                <figcaption className="mt-6 flex items-end justify-between gap-3 border-t border-rule pt-4">
                  <span>
                    <span className="block font-semibold text-ink">{v.name}</span>
                    <span className="block text-[13px] text-muted">{v.role} · {v.ward} ({v.subCounty})</span>
                  </span>
                  {showSample && v.demo && <span className="tag tag-sample flex-none">{labels.sample}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
