// Generates TODO_VERIFY.md and PHOTO_SHOTLIST.md from the source tree.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const imp = (p) => import(pathToFileURL(path.join(ROOT, p)).href);
const { allSlots, photoById } = await imp("data/photos.ts");
const { projects } = await imp("data/projects.ts");
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "photo-manifest.json"), "utf8"));
const today = new Date().toISOString().slice(0, 10);

// ── TODO_VERIFY.md ──────────────────────────────────────────────────────────
const DIRS = ["config", "data", "app", "components", "lib", "dictionaries"];
const walk = (d) => !fs.existsSync(d) ? [] : fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : /\.(tsx?|mjs)$/.test(e.name) ? [path.join(d, e.name)] : []);
const rules = [
  ["CONFIRM", /CONFIRM/],
  ["DRAFT", /DRAFT — awaiting|draft:\s*true/],
  ["demo: true", /demo:\s*true/],
  ["Unsourced", /sourceUrl:\s*null/],
];
const groups = Object.fromEntries(rules.map(([k]) => [k, []]));
for (const file of DIRS.flatMap((d) => walk(path.join(ROOT, d)))) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  if (rel === "data/types.ts") continue;
  fs.readFileSync(file, "utf8").split(/\r?\n/).forEach((line, i) => {
    const isComment = /^\s*(\/\/|\/?\*)/.test(line);
    for (const [k, re] of rules) if (re.test(line) && (k === "CONFIRM" || k === "DRAFT" || !isComment)) {
      const t = line.trim().replace(/\s+/g, " ").replace(/\|/g, "\\|");
      groups[k].push(`| [${rel}:${i + 1}](${rel}#L${i + 1}) | ${t.length > 120 ? t.slice(0, 117) + "…" : t} |`);
    }
  });
}
const approx = projects.filter((p) => !p.coordsVerified);
let todo = `# TODO_VERIFY

Generated ${today} by \`scripts/reports.mjs\` (runs on every build). Do not edit by hand.

Everything below must be confirmed, sourced, replaced or removed before launch.
With \`DEMO_MODE = false\`, the build **fails** while any \`demo: true\` or \`sourceUrl: null\` item remains.

## Launch blockers (decisions, not code)
- [ ] **JSC emblem / status**: legal advice on \`SHOW_JSC_EMBLEM\` and \`JSC_STATUS\` (config/site.ts). He is a serving State officer, so the Leadership and Integrity Act (s. 23) applies; a 2026 petition already challenges his partisan activity; use of the JSC crest may need permission (Cap. 99).
- [ ] **ODPC registration**: the Data Protection (Registration) Regulations, 2021 require registration for canvassing political support. Register before forms go live.
- [ ] **Data-controller contact** details on /privacy (config/site.ts → \`contact\`).
- [ ] **Storage adapter**: connect a database (lib/storage). The JSON adapter does not persist on Vercel.
- [ ] **Official UDA logo** → public/brand/uda-logo.svg, then \`node scripts/sample-logo.mjs\` to set exact colours.
- [ ] **JSC coat of arms** → public/brand/jsc-coat-of-arms.svg.
- [ ] **His photos** → ./photos/him/ (see PHOTO_SHOTLIST.md).
- [ ] **Swahili copy** (dictionaries/sw.ts) reviewed by a native speaker; Kipsigis version planned.
- [ ] **Pull quote** for the devolution band (components/home/Devolution.tsx).

`;
for (const [k] of rules) {
  todo += `## ${k} (${groups[k].length})\n\n| Where | Line |\n|---|---|\n${groups[k].join("\n") || "| — | none |"}\n\n`;
}
todo += `## Approximate map locations (${approx.length})\n\nAll markers sit at a ward centroid (or have no marker). Supply exact coordinates in data/projects.ts and set \`coordsVerified: true\`.\n\n| Project | Ward | Layer |\n|---|---|---|\n`;
todo += approx.map((p) => `| ${p.name} | ${p.ward ?? "**unknown — not on map**"} | ${p.layer} |`).join("\n") + "\n";
fs.writeFileSync(path.join(ROOT, "TODO_VERIFY.md"), todo);

// ── PHOTO_SHOTLIST.md ───────────────────────────────────────────────────────
const rows = allSlots.map((s) => {
  const p = photoById(s.photoId);
  const m = p ? manifest[p.src] : null;
  const long = m ? Math.max(m.w, m.h) : null;
  const status = !p ? "Placeholder" : p.kind === "him" ? "His photo" : "Stock (stand-in)";
  const res = m ? `${m.w}×${m.h}` : "—";
  const flag = long && long < s.minLongEdge ? ` ⚠ below ${s.minLongEdge}px` : m && Math.min(m.w, m.h) < 1600 && s.minLongEdge >= 1600 ? " ⚠ short edge < 1600px" : "";
  return `| \`${s.key}\` | ${s.page} | ${s.describe} | ${status}${p ? ` — ${p.id}` : ""} | ${res}${flag} | ≥${s.minLongEdge}px | ${s.suggested} |`;
});
const counts = allSlots.reduce((a, s) => { const p = photoById(s.photoId); const k = !p ? "placeholder" : p.kind; a[k] = (a[k] ?? 0) + 1; return a; }, {});
const shot = `# PHOTO_SHOTLIST

Generated ${today} by \`scripts/reports.mjs\`. This is the list of official photos the campaign must supply before launch.

**${allSlots.length} slots** — his photos: ${counts.him ?? 0} · stock stand-ins: ${counts.stock ?? 0} · placeholders: ${counts.placeholder ?? 0}

No photos of him have been supplied yet (\`./photos/him/\` is empty), so every slot that should show him is a framed placeholder or a clearly captioned stock stand-in.

**How to add his photos:** drop originals into \`./photos/him/\` → \`npm run photos\` (copies, ranks by resolution and sharpness, prints draft entries) → add entries to \`himPhotos\` in data/photos.ts with focal point on his face, alt, caption, place and year → set each slot's \`photoId\`.

**Rules:** hero ≥2400px long edge; other features ≥1600px. Nothing is upscaled. No filters on his face (gentle warmth/contrast in the source file only). Focal point (\`focalX\`, \`focalY\`) on his eyes so no screen size crops his face.

| Slot | Page | What goes here | Current | Resolution | Minimum | Suggested framing |
|---|---|---|---|---|---|---|
${rows.join("\n")}
`;
fs.writeFileSync(path.join(ROOT, "PHOTO_SHOTLIST.md"), shot);
console.log(`reports: TODO_VERIFY.md (${Object.values(groups).reduce((a, g) => a + g.length, 0)} items) and PHOTO_SHOTLIST.md (${allSlots.length} slots) written.`);
