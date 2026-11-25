"use client";
import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as MLMap, MapGeoJSONFeature } from "maplibre-gl";
import type { Project } from "@/data/types";

type Layer = Project["layer"];
interface WardLite { id: string; name: string; subCounty: string }

const TINT: Record<string, string> = { "Bomet Central": "#CFE5D3", "Bomet East": "#B9D9C0", Chepalungu: "#E1EEDF", Sotik: "#A9CFB2", Konoin: "#C4DFC9" };
const COLOR: Record<Layer, string> = { delivered: "#0B7A3B", proposed: "#FFC20E", context: "#9AA59F" };
const STYLE = "https://tiles.openfreemap.org/styles/positron";
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function CountyMap({ projects, wards, wardWide, layerLabels, locale }: { projects: Project[]; wards: WardLite[]; wardWide: string[]; layerLabels: Record<Layer, string>; locale: string }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [on, setOn] = useState<Record<Layer, boolean>>({ delivered: true, proposed: true, context: false });

  const points = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: projects.filter((p) => p.lat !== null && p.lng !== null).map((p) => ({
        type: "Feature" as const,
        properties: { id: p.id, name: p.name, layer: p.layer, summary: p.summary, year: p.year, ward: p.ward ?? "", approx: !p.coordsVerified, sourceUrl: p.sourceUrl ?? "" },
        geometry: { type: "Point" as const, coordinates: [p.lng!, p.lat!] },
      })),
    }),
    [projects],
  );

  useEffect(() => {
    let cancelled = false;
    let hovered: string | number | undefined;
    (async () => {
      try {
        const maplibregl = (await import("maplibre-gl")).default;
        if (cancelled || !el.current) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.hasAttribute("data-lite");
        const m = new maplibregl.Map({
          container: el.current,
          style: STYLE,
          bounds: [[35.03, -1.09], [35.62, -0.41]],
          fitBoundsOptions: { padding: 24 },
          attributionControl: { compact: true },
          cooperativeGestures: true,
          fadeDuration: reduce ? 0 : 300,
        });
        map.current = m;
        m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        m.on("error", (e) => console.warn("map:", e.error?.message));
        m.on("load", () => {
          m.addSource("wards", { type: "geojson", data: "/geo/bomet-wards.geojson", promoteId: "id" });
          m.addSource("subcounties", { type: "geojson", data: "/geo/bomet-subcounties.geojson" });
          m.addSource("projects", { type: "geojson", data: points });
          m.addLayer({
            id: "ward-fill", type: "fill", source: "wards",
            paint: {
              "fill-color": ["case", ["any", ["boolean", ["feature-state", "hover"], false], ["boolean", ["feature-state", "selected"], false]], "#FFC20E",
                ["match", ["get", "subCounty"], ...Object.entries(TINT).flat(), "#DDE9DD"]] as never,
              "fill-opacity": ["case", ["boolean", ["feature-state", "selected"], false], 0.75, 0.62],
            },
          });
          m.addLayer({ id: "ward-line", type: "line", source: "wards", paint: { "line-color": "#FFFFFF", "line-width": 1.2 } });
          m.addLayer({ id: "sc-line", type: "line", source: "subcounties", paint: { "line-color": "#06401F", "line-width": 1.6, "line-opacity": 0.55 } });
          m.addLayer({ id: "ward-label", type: "symbol", source: "wards", minzoom: 9.3, layout: { "text-field": ["get", "ward"], "text-size": 11, "text-font": ["Noto Sans Regular"] }, paint: { "text-color": "#06401F", "text-halo-color": "#fff", "text-halo-width": 1.2 } });
          (["context", "delivered", "proposed"] as Layer[]).forEach((l) =>
            m.addLayer({
              id: `pts-${l}`, type: "circle", source: "projects", filter: ["==", ["get", "layer"], l],
              layout: { visibility: l === "context" ? "none" : "visible" },
              paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 5, 12, 8], "circle-color": COLOR[l], "circle-stroke-width": 1.6, "circle-stroke-color": l === "proposed" ? "#06401F" : "#FFFFFF" },
            }),
          );

          m.on("mousemove", "ward-fill", (e) => {
            const f = e.features?.[0];
            if (!f) return;
            if (hovered !== undefined) m.setFeatureState({ source: "wards", id: hovered }, { hover: false });
            hovered = f.id;
            m.setFeatureState({ source: "wards", id: hovered! }, { hover: true });
            m.getCanvas().style.cursor = "pointer";
          });
          m.on("mouseleave", "ward-fill", () => {
            if (hovered !== undefined) m.setFeatureState({ source: "wards", id: hovered }, { hover: false });
            hovered = undefined;
            m.getCanvas().style.cursor = "";
          });
          m.on("click", (e) => {
            const pts = m.queryRenderedFeatures(e.point, { layers: ["pts-delivered", "pts-proposed", "pts-context"].filter((id) => m.getLayoutProperty(id, "visibility") !== "none") });
            if (pts.length) {
              const p = (pts[0] as MapGeoJSONFeature).properties as Record<string, string | boolean>;
              const layer = p.layer as Layer;
              new maplibregl.Popup({ offset: 12, maxWidth: "280px" })
                .setLngLat((pts[0].geometry as GeoJSON.Point).coordinates as [number, number])
                .setHTML(
                  `<p style="font:600 11px/1.3 var(--font-sans);letter-spacing:.1em;text-transform:uppercase;color:${layer === "proposed" ? "#06401F" : "#0B7A3B"}">${esc(layerLabels[layer])}</p>` +
                    `<p style="font:600 15px/1.3 var(--font-sans);color:#06401F;margin-top:4px">${esc(String(p.name))}</p>` +
                    `<p style="font:13px/1.45 var(--font-sans);color:#10241A;margin-top:4px">${esc(String(p.summary))}</p>` +
                    `<p style="font:12px/1.4 var(--font-sans);color:#4B5B52;margin-top:6px">${esc(String(p.ward))} · ${esc(String(p.year))}${p.approx ? " · <em>approximate location</em>" : ""}</p>` +
                    (p.sourceUrl ? `<p style="margin-top:6px"><a href="${esc(String(p.sourceUrl))}" target="_blank" rel="noopener" style="font:600 12px var(--font-sans);color:#0B7A3B;text-decoration:underline">Source ↗</a></p>` : ""),
                )
                .addTo(m);
              return;
            }
            const w = m.queryRenderedFeatures(e.point, { layers: ["ward-fill"] })[0];
            setSelected(w ? String(w.properties.id) : null);
          });
          setReady(true);
        });
      } catch (err) {
        console.warn(err);
        setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Selected-ward highlight
  const prevSel = useRef<string | null>(null);
  useEffect(() => {
    const m = map.current;
    if (!m || !ready) return;
    if (prevSel.current) m.setFeatureState({ source: "wards", id: prevSel.current }, { selected: false });
    if (selected) m.setFeatureState({ source: "wards", id: selected }, { selected: true });
    prevSel.current = selected;
  }, [selected, ready]);

  // Layer toggles
  useEffect(() => {
    const m = map.current;
    if (!m || !ready) return;
    (Object.keys(on) as Layer[]).forEach((l) => m.setLayoutProperty(`pts-${l}`, "visibility", on[l] ? "visible" : "none"));
  }, [on, ready]);

  const ward = wards.find((w) => w.id === selected);
  const inWard = ward ? projects.filter((p) => p.ward === ward.name) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="relative">
        <div ref={el} className="frame frame-feature h-[62svh] min-h-[420px] w-full bg-alt" role="region" aria-label="Interactive map of Bomet County. The same information is in the table below the map." />
        {!ready && !failed && <p className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-muted">Loading map…</p>}
        {failed && <p className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-muted">The map could not load. Every project is listed in the table below.</p>}
        <fieldset className="mt-4 flex flex-wrap gap-x-6 gap-y-2 rounded-[4px] border border-rule bg-white px-4 py-3">
          <legend className="px-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Layers</legend>
          {(Object.keys(on) as Layer[]).map((l) => (
            <label key={l} className="flex min-h-[36px] items-center gap-2.5 text-[14px] text-ink">
              <input type="checkbox" className="h-5 w-5 accent-[#0B7A3B]" checked={on[l]} onChange={(e) => setOn((s) => ({ ...s, [l]: e.target.checked }))} />
              <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: COLOR[l], boxShadow: l === "proposed" ? "inset 0 0 0 1.5px #06401F" : undefined }} />
              {layerLabels[l]}
            </label>
          ))}
        </fieldset>
      </div>

      <aside aria-live="polite" className="rounded-[4px] border border-rule bg-white p-6 lg:max-h-[62svh] lg:overflow-y-auto">
        <label htmlFor="ward-pick" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Ward</label>
        <select id="ward-pick" className="input mt-2" value={selected ?? ""} onChange={(e) => setSelected(e.target.value || null)}>
          <option value="">Tap a ward on the map, or choose…</option>
          {wards.map((w) => <option key={w.id} value={w.id}>{w.name} — {w.subCounty}</option>)}
        </select>
        {ward ? (
          <div className="mt-6">
            <h2 className="text-[1.9rem] leading-tight">{ward.name}</h2>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-uda-green">{ward.subCounty}</p>
            <h3 className="mt-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">Delivered 2013–2017</h3>
            <ul className="mt-2 space-y-2 text-[15px]">
              {inWard.filter((p) => p.layer === "delivered").map((p) => <li key={p.id} className="border-l-2 border-uda-green pl-3">{p.name}{!p.coordsVerified && <span className="block text-[12px] text-muted">approximate location</span>}</li>)}
              {!inWard.some((p) => p.layer === "delivered") && <li className="text-muted">No ward-specific items recorded yet.</li>}
            </ul>
            <h3 className="mt-6 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">Proposed 2027 <span className="tag tag-draft">Draft</span></h3>
            <ul className="mt-2 space-y-2 text-[15px]">
              {inWard.filter((p) => p.layer === "proposed").map((p) => <li key={p.id} className="border-l-2 border-uda-yellow pl-3">{p.name}</li>)}
              {wardWide.map((w) => <li key={w} className="border-l-2 border-uda-yellow pl-3">{w}</li>)}
            </ul>
            <Link prefetch={false} href={`/${locale}/get-involved?ward=${ward.id}#pledge`} className="btn btn-yellow mt-7 w-full">Pledge from {ward.name}</Link>
          </div>
        ) : (
          <p className="mt-6 text-[15px] leading-relaxed text-muted">Select a ward to see what was delivered there, what the 2027 plan proposes, and to pledge your vote from that ward.</p>
        )}
      </aside>
    </div>
  );
}
