export type SubCounty = "Bomet Central" | "Bomet East" | "Chepalungu" | "Sotik" | "Konoin";

export type Pillar =
  | "Health"
  | "Water"
  | "Education"
  | "Agriculture & Co-ops"
  | "Devolution"
  | "Justice"
  | "Governance"
  | "Background";

/** One verifiable claim. /sources is generated from these.
 *  `sourceUrl: null` = not yet sourced: hidden on the live site, listed in TODO_VERIFY.md. */
export interface Fact {
  id: string;
  claim: string;
  pillar: Pillar;
  year?: string;
  sourceTitle: string;
  sourceUrl: string | null;
  /** Extra sources that corroborate the claim. */
  also?: { title: string; url: string }[];
  accessed: string;
  /** Free-text caveat shown on /sources (e.g. conflicting figures). */
  note?: string;
  confirm?: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  /** Focal point in percent (0–100). Applied via object-position. */
  focalX: number;
  focalY: number;
  caption: string;
  credit: string;
  date?: string;
  place?: string;
  subCounty?: SubCounty;
  kind: "him" | "stock";
  /** Stock licence data (for /credits). */
  license?: { name: string; url?: string; sourceUrl: string; photographer: string };
  demo?: boolean;
}

export type Framing = "feature" | "plain";

export interface Slot {
  key: string;
  page: string;
  describe: string;
  /** What should eventually be here. */
  want: "him" | "scene";
  photoId: string | null;
  minLongEdge: number;
  framing: Framing;
  suggested: string;
}

export interface Project {
  id: string;
  name: string;
  layer: "delivered" | "proposed" | "context";
  sector: "Health" | "Water" | "Education" | "Agriculture" | "Markets & jobs" | "Sports";
  ward: string | null;
  subCounty: SubCounty | null;
  lat: number | null;
  lng: number | null;
  coordsVerified: boolean;
  year: string;
  summary: string;
  photo?: string;
  sourceUrl?: string | null;
  factId?: string;
  demo?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  ward: string;
  subCounty: SubCounty;
  quote: string;
  demo: boolean;
}

export interface Promise2027 {
  n: string;
  id: string;
  title: string;
  forWhom: string;
  actions: string[];
  builtOn: string[]; // Fact ids
  draft: true;
}
