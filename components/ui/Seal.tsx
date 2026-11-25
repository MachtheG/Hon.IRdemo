import Image from "next/image";
import { resolveSlot, objectPosition } from "@/lib/photos";

/** Circular portrait seal; a monogram until his photo is supplied. */
export function Seal({ size = 48, className = "" }: { size?: number; className?: string }) {
  const r = resolveSlot("seal");
  return (
    <span
      className={`relative inline-flex flex-none items-center justify-center overflow-hidden rounded-full bg-uda-green-deep ring-2 ring-uda-yellow ring-offset-2 ring-offset-white ${className}`}
      style={{ width: size, height: size }}
    >
      {r.kind === "photo" ? (
        <Image src={r.photo.src} alt="" fill sizes={`${size * 2}px`} className="object-cover" style={{ objectPosition: objectPosition(r.photo) }} />
      ) : (
        <span aria-hidden className="font-display font-semibold text-uda-yellow" style={{ fontSize: size * 0.38 }}>
          IR
        </span>
      )}
    </span>
  );
}
