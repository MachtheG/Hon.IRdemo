import fs from "node:fs";
import path from "node:path";
import { SHOW_JSC_EMBLEM, candidate } from "@/config/site";

const exists = (rel: string) => fs.existsSync(path.join(process.cwd(), "public", rel));
const firstExisting = (...rels: string[]) => rels.find(exists) ?? null;

/** Official UDA emblem (public/brand/uda-logo.svg|png), native proportions.
 *  Until the file is supplied a neutral labelled placeholder renders — never a redrawn logo. */
export function UdaEmblem({ height = 40, label }: { height?: number; label: string }) {
  const file = firstExisting("brand/uda-logo.svg", "brand/uda-logo.png");
  return (
    <a href={candidate.partyUrl} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex flex-none items-center">
      {file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/${file}`} alt="UDA" style={{ height, width: "auto" }} />
      ) : (
        <span
          className="inline-flex items-center justify-center rounded-[3px] border border-dashed border-uda-green/60 px-2 text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.08em] text-uda-green"
          style={{ height }}
          title="Official UDA emblem goes here (public/brand/uda-logo.svg)"
        >
          UDA
          <br />
          emblem
        </span>
      )}
    </a>
  );
}

/** JSC coat of arms (public/brand/jsc-coat-of-arms.svg). Controlled by SHOW_JSC_EMBLEM. */
export function JscEmblem({ size = 96 }: { size?: number }) {
  if (!SHOW_JSC_EMBLEM) return null;
  const file = firstExisting("brand/jsc-coat-of-arms.svg", "brand/jsc-coat-of-arms.png");
  return file ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/${file}`} alt="Judicial Service Commission coat of arms" style={{ height: size, width: "auto" }} />
  ) : (
    <span
      className="inline-flex flex-none items-center justify-center rounded-full border border-dashed border-uda-green/50 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-muted"
      style={{ width: size, height: size }}
      title="JSC coat of arms goes here (public/brand/jsc-coat-of-arms.svg)"
    >
      JSC
      <br />
      emblem
      <br />
      to come
    </span>
  );
}
