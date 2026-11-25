import type { Project, SubCounty } from "./types";

// Map data. No exact coordinates have been verified yet: every marker sits at
// its ward's centroid (computed from the ward boundaries) with a small offset so
// markers in the same ward don't overlap, and `coordsVerified: false`.
// Items whose ward is unknown have lat/lng null: they are listed in the table
// under "Location to confirm" but not drawn on the map.

type W = { id: string; name: string; sc: SubCounty; c: [number, number] };
const W: Record<string, W> = {
  silibwet: { id: "silibwet", name: "Silibwet", sc: "Bomet Central", c: [35.3267, -0.7477] },
  chesoen: { id: "chesoen", name: "Chesoen", sc: "Bomet Central", c: [35.2996, -0.6797] },
  longisa: { id: "longisa", name: "Longisa", sc: "Bomet East", c: [35.4055, -0.8649] },
  chebunyo: { id: "chebunyo", name: "Chebunyo", sc: "Chepalungu", c: [35.2076, -0.9719] },
  sigor: { id: "sigor", name: "Sigor", sc: "Chepalungu", c: [35.2969, -0.9404] },
  siongiroi: { id: "siongiroi", name: "Siongiroi", sc: "Chepalungu", c: [35.1991, -0.8907] },
  nyongores: { id: "nyongores", name: "Nyongores", sc: "Chepalungu", c: [35.3195, -0.8314] },
  kipsonoi: { id: "kipsonoi", name: "Kipsonoi", sc: "Sotik", c: [35.1735, -0.7635] },
  kapletundo: { id: "kapletundo", name: "Kapletundo", sc: "Sotik", c: [35.2095, -0.6755] },
  mogogosiek: { id: "mogogosiek", name: "Mogogosiek", sc: "Konoin", c: [35.2696, -0.6308] },
};

// Offsets (degrees) to fan out markers that share a ward centroid.
const OFF: [number, number][] = [[0, 0], [0.012, 0.008], [-0.012, 0.008], [0.012, -0.009], [-0.012, -0.009], [0, 0.015]];
const at = (w: W, i = 0) => ({ ward: w.name, subCounty: w.sc, lng: +(w.c[0] + OFF[i][0]).toFixed(4), lat: +(w.c[1] + OFF[i][1]).toFixed(4) });
const nowhere = { ward: null, subCounty: null, lat: null, lng: null };

export const projects: Project[] = [
  // ── Delivered 2013–2017 ───────────────────────────────────────
  { id: "longisa-renal", name: "Renal unit, Longisa County Referral Hospital", layer: "delivered", sector: "Health", ...at(W.longisa, 0), coordsVerified: false, year: "2013–2015", summary: "Dialysis services at the county referral hospital.", factId: "health-longisa", sourceUrl: "https://bomet.go.ke/?p=10161" },
  { id: "longisa-eye", name: "Eye unit, Longisa County Referral Hospital", layer: "delivered", sector: "Health", ...at(W.longisa, 1), coordsVerified: false, year: "2013–2016", summary: "Eye screening and cataract surgery unit.", factId: "health-longisa", sourceUrl: "https://bomet.go.ke/?p=10202" },
  { id: "longisa-icu", name: "ICU, Longisa County Referral Hospital", layer: "delivered", sector: "Health", ...at(W.longisa, 2), coordsVerified: false, year: "2013–2015", summary: "Intensive care unit at the county referral hospital.", factId: "health-longisa", sourceUrl: "https://bomet.go.ke/?p=10161" },
  { id: "chebunyo-water", name: "Chebunyo market water-line extension", layer: "delivered", sector: "Water", ...at(W.chebunyo, 0), coordsVerified: false, year: "2016", summary: "Piped water to Chebunyo market and kiosk, benefiting about 17,000 residents.", factId: "chebunyo-water", sourceUrl: "https://bomet.go.ke/?p=10184" },
  { id: "chebunyo-market", name: "Chebunyo fresh-produce market", layer: "delivered", sector: "Markets & jobs", ...at(W.chebunyo, 1), coordsVerified: false, year: "2016", summary: "Market for 300 traders opened by the county (built under the national ESP).", factId: "chebunyo-market", sourceUrl: "https://bomet.go.ke/?p=10184" },
  { id: "nogirwet-drip", name: "Drip irrigation, Nogirwet", layer: "delivered", sector: "Agriculture", ...at(W.chebunyo, 2), coordsVerified: false, year: "2013–2015", summary: "Drip irrigation introduced in drier areas such as Nogirwet (Chebunyo ward).", factId: "water-company", sourceUrl: "https://bomet.go.ke/?p=10161" },
  { id: "green-stadium", name: "Bomet Green Stadium", layer: "delivered", sector: "Sports", ...at(W.silibwet, 0), coordsVerified: false, year: "2013–2015", summary: "County stadium in Bomet town.", factId: "stadium", sourceUrl: "https://bomet.go.ke/?p=10161" },
  { id: "cooler-chesoen", name: "Chesoen Farmers Co-op milk cooling plant", layer: "delivered", sector: "Agriculture", ...at(W.chesoen, 0), coordsVerified: false, year: "2016", summary: "County-funded cooling plant, 2,000 litres.", factId: "milk-coolers", sourceUrl: "https://bomet.go.ke/?p=10181" },
  { id: "cooler-kipsonoi", name: "Kipsonoi Multipurpose milk cooling plant", layer: "delivered", sector: "Agriculture", ...at(W.kipsonoi, 0), coordsVerified: false, year: "2016", summary: "County-funded cooling plant, 3,500 litres.", factId: "milk-coolers", sourceUrl: "https://bomet.go.ke/?p=10181" },
  // Ward unknown → table only
  ...["Mogombet", "Sergutiet", "Chebara", "Kaptebengwet", "Itare"].map<Project>((n) => ({
    id: `water-${n.toLowerCase()}`, name: `${n} community water project`, layer: "delivered", sector: "Water", ...nowhere,
    coordsVerified: false, year: "2013–2015", summary: "Community-based water project strengthened by the county.", factId: "water-community", sourceUrl: "https://bomet.go.ke/?p=10161",
  })),
  { id: "cancer-land", name: "Land for a cancer centre", layer: "delivered", sector: "Health", ...nowhere, coordsVerified: false, year: "2013–2015", summary: "Land acquired for a county cancer centre.", factId: "health-services", sourceUrl: "https://bomet.go.ke/?p=10161" },

  // ── Proposed 2027 (DRAFT) ─────────────────────────────────────
  { id: "p-milk-plant", name: "County milk processing plant", layer: "proposed", sector: "Agriculture", ...at(W.silibwet, 1), coordsVerified: false, year: "2027–2032", summary: "Deliver the plant planned during his first term.", factId: "milk-plant" },
  { id: "p-cancer", name: "Bomet cancer centre", layer: "proposed", sector: "Health", ...at(W.longisa, 3), coordsVerified: false, year: "2027–2032", summary: "Build on the land his administration acquired (site to confirm)." , factId: "health-services" },
  ...([W.siongiroi, W.nyongores, W.chebunyo] as W[]).map<Project>((w, i) => ({
    id: `p-drip-${w.id}`, name: `Drip-irrigation programme, ${w.name}`, layer: "proposed", sector: "Agriculture", ...at(w, i === 2 ? 3 : 1),
    coordsVerified: false, year: "2027–2032", summary: "Drip irrigation for the dry lowlands of Chepalungu.",
  })),
  ...([
    [W.silibwet, "Bomet Central"], [W.longisa, "Bomet East"], [W.sigor, "Chepalungu"], [W.kapletundo, "Sotik"], [W.mogogosiek, "Konoin"],
  ] as [W, string][]).flatMap<Project>(([w, sc]) => [
    { id: `p-market-${w.id}`, name: `Modern market, ${sc}`, layer: "proposed", sector: "Markets & jobs", ...at(w, 4), coordsVerified: false, year: "2027–2032", summary: "A modern market in every sub-county (site to confirm)." },
    { id: `p-hub-${w.id}`, name: `Digital jobs hub, ${sc}`, layer: "proposed", sector: "Markets & jobs", ...at(w, 5), coordsVerified: false, year: "2027–2032", summary: "A digital jobs hub in every sub-county (site to confirm)." },
  ]),

  // ── Context: other public projects (NOT his) ─────────────────
  { id: "c-btrh", name: "Bomet Teaching & Referral Hospital (national government)", layer: "context", sector: "Health", ...at(W.chebunyo, 4), coordsVerified: false, year: "ongoing", summary: "National-government project. Shown for context only — not an Isaac Ruto project.", sourceUrl: null, demo: true },
];

/** Ward-wide commitments shown in every ward panel (no markers). */
export const wardWideProposals = [
  "Rehabilitate one community water scheme per ward per year",
  "A milk cooler for every ward",
  "Extension officers and AI services back in the ward",
  "Feeder roads published ward by ward",
];

export const layerMeta = {
  delivered: { label: "Delivered 2013–2017", color: "#0B7A3B" },
  proposed: { label: "Proposed 2027 — draft", color: "#FFC20E" },
  context: { label: "Other public projects (context — not his)", color: "#9AA59F" },
} as const;
