import manifest from "@/data/photo-manifest.json";
import { photoById, slotByKey } from "@/data/photos";
import type { Photo, Slot } from "@/data/types";

type M = Record<string, { w: number; h: number; blur: string }>;
const mf = manifest as unknown as M;

export interface ResolvedPhoto extends Photo {
  w: number;
  h: number;
  blur: string;
}

export type Resolved =
  | { kind: "photo"; slot: Slot; photo: ResolvedPhoto; standIn: boolean }
  | { kind: "placeholder"; slot: Slot };

export function resolvePhoto(id: string | null): ResolvedPhoto | null {
  const p = photoById(id);
  if (!p) return null;
  const m = mf[p.src];
  if (!m) return null;
  return { ...p, w: m.w, h: m.h, blur: m.blur };
}

/** Resolve a slot key to a photo or a placeholder description. */
export function resolveSlot(key: string): Resolved {
  const slot = slotByKey(key);
  if (!slot) throw new Error(`Unknown photo slot: ${key}`);
  const photo = resolvePhoto(slot.photoId);
  if (!photo) return { kind: "placeholder", slot };
  return { kind: "photo", slot, photo, standIn: slot.want === "him" && photo.kind === "stock" };
}

export const objectPosition = (p: { focalX: number; focalY: number }) => `${p.focalX}% ${p.focalY}%`;
