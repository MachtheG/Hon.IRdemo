import Image from "next/image";
import { resolveSlot, objectPosition } from "@/lib/photos";
import { Placeholder } from "./Placeholder";

interface Props {
  slot: string;
  sizes: string;
  /** Tailwind aspect class for the frame, e.g. "aspect-[4/5]". Omit when the parent sizes the frame. */
  aspect?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  caption?: boolean;
  framing?: "feature" | "plain";
  compactPlaceholder?: boolean;
}

/** A photo slot: next/image with focal-point cropping, blur placeholder and the
 *  site framing system — or a framed placeholder when the slot is empty. */
export function SlotImage({ slot, sizes, aspect = "", className = "", imgClassName = "", priority, caption = true, framing, compactPlaceholder }: Props) {
  const r = resolveSlot(slot);
  const fr = framing ?? r.slot.framing;
  const frameCls = `frame ${fr === "feature" ? "frame-feature" : ""} ${aspect} ${className}`;
  if (r.kind === "placeholder") {
    return (
      <figure className="m-0">
        <div className={frameCls}>
          <Placeholder describe={r.slot.describe} slotKey={r.slot.key} compact={compactPlaceholder} />
        </div>
      </figure>
    );
  }
  const p = r.photo;
  return (
    <figure className="m-0">
      <div className={frameCls}>
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={p.blur}
          className={`object-cover ${imgClassName}`}
          style={{ objectPosition: objectPosition(p) }}
        />
        {p.kind === "stock" && (
          <span className="absolute bottom-3 right-3 z-[3] rounded-[2px] bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
            Stock
          </span>
        )}
      </div>
      {caption && (
        <figcaption className="caption">
          {p.caption}
          {p.date ? `, ${p.date}` : ""}
          {p.kind === "stock" && <span> · Stock photo: {p.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
