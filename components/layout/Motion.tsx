"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Runs before paint (in <head>): marks JS available and restores lite mode. */
export const motionBootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('lite')==='1')d.setAttribute('data-lite','')}catch(e){}})();`;

/** Fades/rises `.reveal` elements as they scroll into view. Re-scans on navigation. */
export function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}

/** Lite / reduced-motion toggle. The setting is stored only in this browser. */
export function LiteToggle({ label, onLabel }: { label: string; onLabel: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(document.documentElement.hasAttribute("data-lite")), []);
  const toggle = () => {
    const next = !on;
    setOn(next);
    const d = document.documentElement;
    if (next) d.setAttribute("data-lite", "");
    else d.removeAttribute("data-lite");
    try {
      localStorage.setItem("lite", next ? "1" : "0");
    } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-pressed={on} className="inline-flex min-h-[40px] items-center gap-2.5 text-sm text-white/85 hover:text-white">
      <span aria-hidden className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-uda-yellow" : "bg-white/25"}`}>
        <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : "translate-x-0"}`} />
      </span>
      {on ? onLabel : label}
    </button>
  );
}
