"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";

export interface GalleryItem {
  key: string;
  kind: "photo" | "placeholder";
  stock?: boolean;
  src?: string;
  w?: number;
  h?: number;
  blur?: string;
  alt: string;
  caption: string;
  year?: string;
  subCounty?: string;
  place?: string;
  credit?: string;
  pos?: string;
}

interface Labels { year: string; subCounty: string; all: string; close: string; prev: string; next: string; of: string; stockNote: string }

export function GalleryGrid({ items, labels }: { items: GalleryItem[]; labels: Labels }) {
  const [year, setYear] = useState("");
  const [sc, setSc] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touch = useRef<number | null>(null);

  const years = useMemo(() => [...new Set(items.map((i) => i.year).filter(Boolean) as string[])].sort().reverse(), [items]);
  const scs = useMemo(() => [...new Set(items.map((i) => i.subCounty).filter(Boolean) as string[])].sort(), [items]);
  const shown = items.filter((i) => (!year || i.year === year) && (!sc || i.subCounty === sc));
  const photos = shown.filter((i) => i.kind === "photo");

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  // Deep link: /gallery#gallery-05 opens that photo.
  useEffect(() => {
    const k = window.location.hash.slice(1);
    const i = photos.findIndex((p) => p.key === k);
    if (i >= 0) setOpen(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cur = open !== null ? photos[open] : null;

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="field">
          <label htmlFor="g-year">{labels.year}</label>
          <select id="g-year" className="input sm:w-44" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">{labels.all}</option>
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="g-sc">{labels.subCounty}</label>
          <select id="g-sc" className="input sm:w-56" value={sc} onChange={(e) => setSc(e.target.value)}>
            <option value="">{labels.all}</option>
            {scs.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
        <p className="text-sm text-muted sm:ml-auto" aria-live="polite">{shown.length} / {items.length}</p>
      </div>

      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5 [&>li]:break-inside-avoid">
        {shown.map((it) => (
          <li key={it.key} id={it.key} className="reveal">
            {it.kind === "photo" ? (
              <button
                type="button"
                className="group block w-full text-left"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setOpen(photos.indexOf(it));
                }}
                aria-label={`${it.caption} — open full screen`}
              >
                <span className="frame block" style={{ aspectRatio: `${it.w} / ${it.h}` }}>
                  <Image src={it.src!} alt={it.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" placeholder="blur" blurDataURL={it.blur} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ objectPosition: it.pos }} />
                  {it.stock && <span className="absolute bottom-3 right-3 z-[3] rounded-[2px] bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">Stock</span>}
                </span>
                <span className="caption block">{it.caption}{it.year ? `, ${it.year}` : ""}</span>
              </button>
            ) : (
              <figure className="m-0">
                <div className="frame aspect-[4/5]"><Placeholder describe={it.caption} slotKey={it.key} compact /></div>
              </figure>
            )}
          </li>
        ))}
      </ul>

      {cur && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={cur.caption}
          className="fixed inset-0 z-[90] flex flex-col bg-[#071a10]/96 text-white"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80">
            <span>{open! + 1} {labels.of} {photos.length}</span>
            <button ref={closeBtn} type="button" onClick={close} className="inline-flex h-11 items-center gap-2 rounded px-3 font-semibold hover:bg-white/10">{labels.close} ✕</button>
          </div>
          <div className="relative flex-1">
            <Image key={cur.key} src={cur.src!} alt={cur.alt} fill sizes="100vw" placeholder="blur" blurDataURL={cur.blur} className="object-contain" />
            <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl hover:bg-black/60">←</button>
            <button type="button" onClick={() => step(1)} aria-label={labels.next} className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl hover:bg-black/60">→</button>
          </div>
          <div className="mx-auto w-full max-w-3xl px-5 py-5 text-center">
            <p className="font-display text-xl">{cur.caption}{cur.year ? `, ${cur.year}` : ""}</p>
            <p className="mt-1 text-[13px] text-white/75">
              {cur.place ? `${cur.place} · ` : ""}{cur.stock ? `${labels.stockNote} · ` : ""}{cur.credit}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
