import type { SubCounty } from "./types";

// Ward names follow the campaign brief (Wikipedia: Bomet County).
// Centroids are "inner points" computed from public/geo/bomet-wards.geojson
// (geoBoundaries KEN ADM3, CC BY 4.0) with mapshaper.

export const subCounties: SubCounty[] = ["Bomet Central", "Bomet East", "Chepalungu", "Sotik", "Konoin"];

export interface Ward {
  id: string;
  name: string;
  subCounty: SubCounty;
  /** [lng, lat] */
  centroid: [number, number];
}

export const wards: Ward[] = [
  { id: "silibwet", name: "Silibwet", subCounty: "Bomet Central", centroid: [35.3267, -0.7477] },
  { id: "singorwet", name: "Singorwet", subCounty: "Bomet Central", centroid: [35.3355, -0.7154] },
  { id: "ndarawetta", name: "Ndarawetta", subCounty: "Bomet Central", centroid: [35.3731, -0.6803] },
  { id: "chesoen", name: "Chesoen", subCounty: "Bomet Central", centroid: [35.2996, -0.6797] },
  { id: "mutarakwa", name: "Mutarakwa", subCounty: "Bomet Central", centroid: [35.2456, -0.7727] },

  { id: "longisa", name: "Longisa", subCounty: "Bomet East", centroid: [35.4055, -0.8649] },
  { id: "kembu", name: "Kembu", subCounty: "Bomet East", centroid: [35.4356, -0.8024] },
  { id: "chemaner", name: "Chemaner", subCounty: "Bomet East", centroid: [35.5005, -0.8038] },
  { id: "merigi", name: "Merigi", subCounty: "Bomet East", centroid: [35.4059, -0.7679] },
  { id: "kipreres", name: "Kipreres", subCounty: "Bomet East", centroid: [35.3799, -0.9218] },

  { id: "sigor", name: "Sigor", subCounty: "Chepalungu", centroid: [35.2969, -0.9404] },
  { id: "kongasis", name: "Kongasis", subCounty: "Chepalungu", centroid: [35.2251, -0.8391] },
  { id: "chebunyo", name: "Chebunyo", subCounty: "Chepalungu", centroid: [35.2076, -0.9719] },
  { id: "nyongores", name: "Nyongores", subCounty: "Chepalungu", centroid: [35.3195, -0.8314] },
  { id: "siongiroi", name: "Siongiroi", subCounty: "Chepalungu", centroid: [35.1991, -0.8907] },

  { id: "ndanai-abosi", name: "Ndanai/Abosi", subCounty: "Sotik", centroid: [35.0928, -0.8661] },
  { id: "kipsonoi", name: "Kipsonoi", subCounty: "Sotik", centroid: [35.1735, -0.7635] },
  { id: "kapletundo", name: "Kapletundo", subCounty: "Sotik", centroid: [35.2095, -0.6755] },
  { id: "chemagel", name: "Chemagel", subCounty: "Sotik", centroid: [35.1285, -0.6955] },
  { id: "manaret-rongena", name: "Manaret/Rongena", subCounty: "Sotik", centroid: [35.0841, -0.7216] },

  { id: "kimulot", name: "Kimulot", subCounty: "Konoin", centroid: [35.2485, -0.5393] },
  { id: "mogogosiek", name: "Mogogosiek", subCounty: "Konoin", centroid: [35.2696, -0.6308] },
  { id: "boito", name: "Boito", subCounty: "Konoin", centroid: [35.4625, -0.5369] },
  { id: "embomos", name: "Embomos", subCounty: "Konoin", centroid: [35.3712, -0.6076] },
  { id: "chepchabas", name: "Chepchabas", subCounty: "Konoin", centroid: [35.256, -0.4683] },
];

export const wardById = (id: string) => wards.find((w) => w.id === id);
export const wardsIn = (s: SubCounty) => wards.filter((w) => w.subCounty === s);
