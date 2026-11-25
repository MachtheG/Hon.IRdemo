"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileMenu({ links, labels, locale }: { links: { href: string; label: string }[]; labels: { menu: string; close: string; getInvolved: string; pledge: string }; locale: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-rule text-uda-green-deep"
      >
        <span className="sr-only">{open ? labels.close : labels.menu}</span>
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <div id="mobile-nav" hidden={!open} className="absolute inset-x-0 top-full border-t border-rule bg-white shadow-[0_20px_30px_-20px_rgba(6,64,31,.35)]">
        <nav aria-label="Main" className="container-site flex flex-col py-3">
          {links.map((l) => (
            <Link prefetch={false} key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined} className="border-b border-rule py-3.5 font-display text-xl text-uda-green-deep last:border-0">
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 py-4">
            <Link prefetch={false} href={`/${locale}/get-involved`} className="btn btn-outline flex-1">{labels.getInvolved}</Link>
            <Link prefetch={false} href={`/${locale}/get-involved#pledge`} className="btn btn-yellow flex-1">{labels.pledge}</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
