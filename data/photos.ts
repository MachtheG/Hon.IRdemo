import type { Photo, Slot } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO LIBRARY
//
// `him` photos: ONLY from ./photos/him/ (supplied by the campaign). None have
// been supplied yet, so every slot that wants him renders an elegant framed
// placeholder. When photos arrive: `npm run photos` copies them into
// public/images/him/ and prints a draft entry per file; ranking, focal points
// and captions are then set here by hand after looking at each image.
//
// `stock` photos: Wikimedia Commons, downloaded into public/images/stock/ and
// resized to ≤2400px long edge (no other edits). Every stock entry is tagged as demo content.
// Captions stay generic — stock is never presented as one of his projects.
// ─────────────────────────────────────────────────────────────────────────────

const BYSA4 = { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" };
const BYSA3 = { name: "CC BY-SA 3.0", url: "https://creativecommons.org/licenses/by-sa/3.0/" };
const CC0 = { name: "CC0 1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/" };
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const himPhotos: Photo[] = [
  // Populated from ./photos/him/ — see scripts/photos.mjs output.
];

export const stockPhotos: Photo[] = [
  {
    id: "tea-bomet", kind: "stock", src: "/images/stock/tea-bomet.jpg", focalX: 50, focalY: 60,
    alt: "Rows of bright green tea bushes stretching to a line of tall trees under a clear sky",
    caption: "Tea country, Bomet County", place: "Bomet County", date: "2020",
    credit: "Kipkorir Cheruiyot / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Bomet-Tea.jpg"), photographer: "Kipkorir Cheruiyot" }, demo: true,
  },
  {
    id: "bomet-rainbow", kind: "stock", src: "/images/stock/bomet-rainbow.jpg", focalX: 50, focalY: 45,
    alt: "A double rainbow arching over green pasture and a wire fence",
    caption: "After the rain, Bomet County", place: "Bomet County", date: "2020",
    credit: "Aaron Better / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("RainbowBometcounty.jpg"), photographer: "Aaron Better" }, demo: true,
  },
  {
    id: "dairy-bomet", kind: "stock", src: "/images/stock/dairy-bomet.jpg", focalX: 60, focalY: 55,
    alt: "Dairy cows grazing in a fenced green paddock under a cloudy sky",
    caption: "Dairy farming, Bomet County", place: "Bomet County", date: "2017",
    credit: "Korirhilla / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Dairy_Farming_in_Bomet,_Kenya.jpg"), photographer: "Korirhilla" }, demo: true,
  },
  {
    id: "tea-sotik", kind: "stock", src: "/images/stock/tea-sotik.jpg", focalX: 50, focalY: 55,
    alt: "Neatly pruned tea fields rolling towards the horizon",
    caption: "Tea plantation, Sotik", place: "Sotik", subCounty: "Sotik", date: "2020",
    credit: "Timmbau / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Tea_Plantation_in_Sotik,_Kenya.jpg"), photographer: "Timmbau" }, demo: true,
  },
  {
    id: "kericho-tea-03", kind: "stock", src: "/images/stock/kericho-tea-03.jpg", focalX: 50, focalY: 55,
    alt: "Terraced tea fields bordered by dark forest on a hillside",
    caption: "Tea farms, South Rift", place: "Kericho", date: "2014",
    credit: "Ahero dala / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_03.JPG"), photographer: "Ahero dala" }, demo: true,
  },
  {
    id: "kericho-tea-09", kind: "stock", src: "/images/stock/kericho-tea-09.jpg", focalX: 50, focalY: 50,
    alt: "A lone flowering tree standing in a tea field with distant hills",
    caption: "Tea farms, South Rift", place: "Kericho", date: "2014",
    credit: "Ahero dala / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_09.JPG"), photographer: "Ahero dala" }, demo: true,
  },
  {
    id: "kericho-tea-21", kind: "stock", src: "/images/stock/kericho-tea-21.jpg", focalX: 50, focalY: 55,
    alt: "Wide tea fields sweeping towards forested ridges",
    caption: "Tea country, South Rift", place: "Kericho", date: "2014",
    credit: "Ahero dala / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_21.JPG"), photographer: "Ahero dala" }, demo: true,
  },
  {
    id: "kericho-tea-06", kind: "stock", src: "/images/stock/kericho-tea-06.jpg", focalX: 50, focalY: 60,
    alt: "Tea fields and forest under a dramatic cloudy sky, a cow grazing in the foreground",
    caption: "Tea and dairy, South Rift", place: "Kericho", date: "2014",
    credit: "Ahero dala / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_06.JPG"), photographer: "Ahero dala" }, demo: true,
  },
  {
    id: "tea-small-scale", kind: "stock", src: "/images/stock/tea-small-scale.jpg", focalX: 45, focalY: 65,
    alt: "Small-scale tea plots on a slope beneath a cloudy sky",
    caption: "Smallholder tea farm, Kenya", date: "2019",
    credit: "Kiprotich Towett / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Tea_plantation,_small_scale.jpg"), photographer: "Kiprotich Towett" }, demo: true,
  },
  {
    id: "tea-farm-kenya", kind: "stock", src: "/images/stock/tea-farm-kenya.jpg", focalX: 50, focalY: 60,
    alt: "Dense green tea bushes with trees on the skyline under a deep blue sky",
    caption: "Tea farm, Kenya", date: "2025",
    credit: "SeanTwice / Wikimedia Commons (CC0)",
    license: { ...CC0, sourceUrl: commons("Tea_Farm_in_Kenya.jpg"), photographer: "SeanTwice" }, demo: true,
  },
  {
    id: "market", kind: "stock", src: "/images/stock/market.jpg", focalX: 55, focalY: 60,
    alt: "A market stall piled with pumpkins, papaya, avocados, cassava and bananas",
    caption: "Fresh-produce market, Kenya", date: "2022",
    credit: "safaritravelplus / Wikimedia Commons (CC0)",
    license: { ...CC0, sourceUrl: commons("Market_Kenya.jpg"), photographer: "safaritravelplus" }, demo: true,
  },
  {
    id: "rural-road", kind: "stock", src: "/images/stock/rural-road.jpg", focalX: 50, focalY: 55,
    alt: "A murram road disappearing into morning mist between trees",
    caption: "Rural road in the morning mist, Kenya", date: "2022",
    credit: "Derrq004 / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Fog_in_a_rural_area.a.jpg"), photographer: "Derrq004" }, demo: true,
  },
  {
    id: "water-tap", kind: "stock", src: "/images/stock/water-tap.jpg", focalX: 50, focalY: 65,
    alt: "Clear water running from a standpipe tap into a concrete basin",
    caption: "Running water, Kenya", date: "2026",
    credit: "Queen Asali / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Running_water_tap.jpg"), photographer: "Queen Asali" }, demo: true,
  },
  {
    id: "kericho-landscape", kind: "stock", src: "/images/stock/kericho-landscape.jpg", focalX: 50, focalY: 55,
    alt: "Patchwork of farms on hillsides falling away to a wide valley",
    caption: "Farmland near Kericho, South Rift", place: "Kericho", date: "2012",
    credit: "Josep M. Gracia / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("KER_-_Agricultural_landscape_near_Kericho,_Kenya,_2012.jpg"), photographer: "Josep M. Gracia" }, demo: true,
  },
  {
    id: "dispensary", kind: "stock", src: "/images/stock/dispensary.jpg", focalX: 55, focalY: 55,
    alt: "A single-storey public dispensary building among trees",
    caption: "A public dispensary, Kenya", date: "2012",
    credit: "Nealoveselectricity / Wikimedia Commons",
    license: { ...BYSA3, sourceUrl: commons("Shimoni_Public_Dispensary.JPG"), photographer: "Nealoveselectricity" }, demo: true,
  },
  {
    id: "water-tank", kind: "stock", src: "/images/stock/water-tank.jpg", focalX: 60, focalY: 55,
    alt: "A large black water storage tank with standpipe taps in front",
    caption: "Water storage and taps, Kenya", date: "2026",
    credit: "Queen Asali / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Water_storage_tank_and_taps.jpg"), photographer: "Queen Asali" }, demo: true,
  },
  {
    id: "rainwater", kind: "stock", src: "/images/stock/rainwater.jpg", focalX: 40, focalY: 45,
    alt: "A raised water tank collecting rainwater from a tiled roof gutter",
    caption: "Rainwater harvesting, Kenya", date: "2026",
    credit: "Queen Asali / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Rain_water_harvesting-Kenya.jpg"), photographer: "Queen Asali" }, demo: true,
  },
  {
    id: "kericho-tea-08", kind: "stock", src: "/images/stock/kericho-tea-08.jpg", focalX: 50, focalY: 55,
    alt: "Tea fields and trees across rolling hills in the South Rift",
    caption: "Tea country, South Rift", place: "Kericho", date: "2014",
    credit: "Ahero dala / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_08.JPG"), photographer: "Ahero dala" }, demo: true,
  },
  {
    id: "kericho-tea-17", kind: "stock", src: "/images/stock/kericho-tea-17.jpg", focalX: 50, focalY: 55,
    alt: "Tea fields and trees across rolling hills in the South Rift",
    caption: "Tea country, South Rift", place: "Kericho", date: "2014",
    credit: "Ahero dala / Wikimedia Commons",
    license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_17.JPG"), photographer: "Ahero dala" }, demo: true,
  },
  // Removed: "Strength in Simplicity" (milking) — the farmer's face is identifiable at mobile crops.
];

export const photos: Photo[] = [...himPhotos, ...stockPhotos];

// ─────────────────────────────────────────────────────────────────────────────
// SLOTS — every image position on the site. PHOTO_SHOTLIST.md is generated
// from this list (scripts/reports.mjs).
// `want: "him"` + `photoId: null` → framed placeholder until his photo arrives.
// ─────────────────────────────────────────────────────────────────────────────

const H = 1600;
const s = (key: string, page: string, want: Slot["want"], photoId: string | null, describe: string, suggested: string, framing: Slot["framing"] = "feature", minLongEdge = H): Slot =>
  ({ key, page, want, photoId, describe, suggested, framing, minLongEdge });

export const slots: Slot[] = [
  // Home
  s("hero", "/", "him", "tea-sotik", "Hero portrait — head and shoulders, looking at camera", "Vertical or 4:5, eyes on upper third, plain soft background, natural light. ≥2400px long edge.", "plain", 2400),
  s("seal", "all (header/footer)", "him", null, "Circular portrait seal (48px header, footer)", "Tight head crop, centred face, 1:1.", "plain", 800),
  s("og", "social share", "him", null, "OG image portrait (1200×630)", "Head and shoulders with room on the right for the name.", "plain", H),
  s("home-story", "/", "him", "bomet-rainbow", "Him at work in the county office or with residents", "4:5 portrait, warm, mid-shot.", "feature"),
  s("ledger-health", "/", "him", "dispensary", "Him at Longisa County Referral Hospital (renal/eye/ICU units)", "3:2 landscape at the facility. Stock stand-in until supplied."),
  s("ledger-water", "/", "him", "water-tap", "Him at the Chebunyo water kiosk or market", "3:2 landscape. Stock stand-in until supplied."),
  s("ledger-education", "/", "him", "kericho-tea-17", "Him at an ECDE centre with teachers", "3:2 landscape. No identifiable children without written consent."),
  s("ledger-agri", "/", "him", "dairy-bomet", "Him at a milk cooling plant / co-op", "3:2 landscape. Stock stand-in until supplied."),
  s("ledger-devolution", "/", "him", "kericho-landscape", "Him as Council of Governors chair (2013–15)", "3:2 landscape, official setting."),
  s("ledger-justice", "/", "him", "tea-farm-kenya", "Him at a JSC sitting or court opening", "3:2 landscape. Check JSC permission before use."),
  s("devolution", "/", "him", "kericho-tea-08", "Him addressing governors / Pesa Mashinani event", "4:5 portrait or 3:2; dark-band friendly."),
  s("jsc-portrait", "/ and /record#jsc", "him", "kericho-tea-09", "Him at the Dagoretti Law Courts opening (quote photo)", "4:5 portrait. Legal sign-off required."),
  s("plan-portrait", "/", "him", "tea-small-scale", "Him listening to farmers in a ward meeting", "3:2 landscape, grassroots feel."),
  s("pledge-portrait", "/ and /get-involved", "him", "kericho-tea-21", "Him greeting voters (smiling, approachable)", "4:5 portrait."),
  s("pledge-bg", "/", "scene", "tea-bomet", "Background scene for the pledge band", "Wide landscape, Bomet tea country.", "plain"),
  // Story
  s("story-hero", "/story", "him", "tea-bomet", "Portrait for the story opener", "4:5 portrait, reflective.", "feature", 2400),
  s("story-tumoi", "/story", "scene", "bomet-rainbow", "Home ground: Sigor / Chepalungu landscape", "Wide landscape of Chepalungu.", "plain"),
  s("story-mp", "/story", "him", "kericho-tea-03", "Him as MP for Chepalungu (1998–2012)", "Archive photo, any ratio."),
  s("story-governor", "/story", "him", "rural-road", "Swearing-in as first Governor, March 2013", "Archive photo, 3:2."),
  s("story-family", "/story", "him", "kericho-tea-06", "Family photo (CONFIRM with campaign)", "Only with family consent."),
  s("story-tea", "/story", "scene", "kericho-tea-21", "South Rift tea country", "Wide landscape.", "plain"),
  // Record
  s("record-hero", "/record", "him", "kericho-tea-17", "Him in his Governor's office", "3:2 landscape."),
  s("record-water", "/record", "scene", "water-tank", "Water — scene", "Landscape.", "plain"),
  s("record-agri", "/record", "scene", "kericho-tea-06", "Tea and dairy — scene", "Landscape.", "plain"),
  s("record-health", "/record", "him", "dispensary", "Him at the Longisa eye unit commissioning", "3:2 landscape."),
  // Plan
  s("plan-1", "/plan", "scene", "rainwater", "Promise 01 — Water in every ward", "Landscape.", "plain"),
  s("plan-2", "/plan", "scene", "dairy-bomet", "Promise 02 — Dairy and tea that pay", "Landscape.", "plain"),
  s("plan-3", "/plan", "scene", "dispensary", "Promise 03 — Health close to home", "Landscape.", "plain"),
  s("plan-4", "/plan", "scene", "kericho-tea-08", "Promise 04 — Children and youth first (ECDE classroom)", "Landscape; no identifiable children without consent.", "plain"),
  s("plan-5", "/plan", "scene", "market", "Promise 05 — Roads, markets and jobs", "Landscape.", "plain"),
  // Get involved
  s("gi-hero", "/get-involved", "him", "market", "Him with volunteers / campaign team", "3:2 landscape, energetic."),
];

/** Gallery: 24 slots. 10 reserved for his photos, 14 stock scenes (clearly captioned). */
const galleryStock = [
  "tea-bomet", "dairy-bomet", "tea-sotik", "kericho-tea-03", "bomet-rainbow", "kericho-tea-09", "market",
  "kericho-landscape", "tea-small-scale", "water-tank", "kericho-tea-21", "tea-farm-kenya", "rural-road", "kericho-tea-06",
];
const galleryFill = ["kericho-tea-08", "kericho-tea-17", "bomet-rainbow", "water-tap", "dispensary", "rainwater", "tea-small-scale", "kericho-tea-06", "water-tank", "kericho-tea-21"];
const galleryHim = [
  "Him with tea farmers at a buying centre", "Him at a ward public participation forum", "Him at Bomet Green Stadium",
  "Him opening a milk cooling plant", "Him at an ECDE centre", "Him with the Council of Governors",
  "Him at the JSC", "Him in Chebunyo market", "Him with youth / boda boda riders", "Him with women's groups",
];

export const gallerySlots: Slot[] = Array.from({ length: 24 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  // Interleave: positions 1,3,6,8,11,13,16,18,21,23 (1-based) are him; others stock.
  const himIdx = [0, 2, 5, 7, 10, 12, 15, 17, 20, 22].indexOf(i);
  if (himIdx >= 0) return s(`gallery-${n}`, "/gallery", "him", galleryFill[himIdx], galleryHim[himIdx], "Any ratio; candid field photo with place and year.", "plain");
  const stockIdx = i - [0, 2, 5, 7, 10, 12, 15, 17, 20, 22].filter((x) => x < i).length;
  return s(`gallery-${n}`, "/gallery", "scene", galleryStock[stockIdx] ?? null, "Bomet / South Rift scene", "Landscape.", "plain");
});

export const allSlots: Slot[] = [...slots, ...gallerySlots];
export const photoById = (id: string | null) => (id ? photos.find((p) => p.id === id) ?? null : null);
export const slotByKey = (key: string) => allSlots.find((x) => x.key === key);
