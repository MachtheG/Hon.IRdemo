// Samples the dominant green and yellow from the official UDA logo.
// Usage: node scripts/sample-logo.mjs [public/brand/uda-logo.svg|png]
// Prints the hex values and the CSS lines to paste into app/globals.css.
import fs from "node:fs";
import sharp from "sharp";

const file = process.argv[2] ?? ["public/brand/uda-logo.svg", "public/brand/uda-logo.png"].find((f) => fs.existsSync(f));
if (!file || !fs.existsSync(file)) {
  console.error("No logo found. Put the official file at public/brand/uda-logo.svg (or .png).");
  process.exit(1);
}

const hex = (r, g, b) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
const buckets = new Map();

if (file.endsWith(".svg")) {
  // Count explicit fills/strokes in the SVG source.
  const src = fs.readFileSync(file, "utf8");
  for (const m of src.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) {
    let h = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1];
    h = "#" + h.toUpperCase();
    buckets.set(h, (buckets.get(h) ?? 0) + 1);
  }
}
// Also rasterise and count pixels (works for PNG and SVG).
const { data, info } = await sharp(file, { density: 300 }).resize(600, 600, { fit: "inside" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const px = new Map();
for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] < 200) continue;
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]].map((v) => Math.round(v / 4) * 4);
  const k = hex(Math.min(r, 255), Math.min(g, 255), Math.min(b, 255));
  px.set(k, (px.get(k) ?? 0) + 1);
}
const top = [...px.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
const isGreen = (h) => { const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); return g > r + 30 && g > b + 10; };
const isYellow = (h) => { const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); return r > 200 && g > 150 && b < 90; };
const green = [...buckets.keys(), ...top.map((t) => t[0])].find(isGreen);
const yellow = [...buckets.keys(), ...top.map((t) => t[0])].find(isYellow);

console.log(`Logo: ${file} (${info.width}×${info.height})`);
console.log("Most common colours:", top.map(([h, n]) => `${h} (${n})`).join(", "));
console.log(`\nSuggested tokens for app/globals.css:\n  --uda-green: ${green ?? "?"};\n  --uda-yellow: ${yellow ?? "?"};`);
console.log("\nRe-check WCAG AA pairs after changing them (see README).");
