import fs from "node:fs";
import path from "node:path";
import type { SubCounty } from "@/data/types";

type Ring = [number, number][];
interface Feature {
  properties: { id: string; ward: string; subCounty: SubCounty };
  geometry: { type: "Polygon"; coordinates: Ring[] } | { type: "MultiPolygon"; coordinates: Ring[][] };
}

export const subCountyTint: Record<SubCounty, string> = {
  "Bomet Central": "#CFE5D3",
  "Bomet East": "#B9D9C0",
  Chepalungu: "#E1EEDF",
  Sotik: "#A9CFB2",
  Konoin: "#C4DFC9",
};

let cache: Feature[] | null = null;
export function wardFeatures(): Feature[] {
  if (cache) return cache;
  const file = path.join(process.cwd(), "public", "geo", "bomet-wards.geojson");
  cache = JSON.parse(fs.readFileSync(file, "utf8")).features as Feature[];
  return cache;
}

/** Equirectangular projection fitted to a width; returns path data per ward and a point projector. */
export function projectWards(width: number, pad = 8) {
  const feats = wardFeatures();
  const rings = (f: Feature): Ring[] => (f.geometry.type === "Polygon" ? f.geometry.coordinates : f.geometry.coordinates.flat());
  const all = feats.flatMap((f) => rings(f).flat());
  const minX = Math.min(...all.map((p) => p[0])), maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1])), maxY = Math.max(...all.map((p) => p[1]));
  const k = Math.cos((((minY + maxY) / 2) * Math.PI) / 180);
  const scale = (width - pad * 2) / ((maxX - minX) * k);
  const height = Math.ceil((maxY - minY) * scale + pad * 2);
  const project = (lng: number, lat: number): [number, number] => [pad + (lng - minX) * k * scale, pad + (maxY - lat) * scale];
  const paths = feats.map((f) => ({
    ...f.properties,
    d: rings(f)
      .map((r) => "M" + r.map(([x, y]) => project(x, y).map((v) => v.toFixed(1)).join(",")).join("L") + "Z")
      .join(""),
  }));
  return { paths, project, width, height };
}
