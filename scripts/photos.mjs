// Photo pipeline.
//  1. Copies new photos from ./photos/him/ into public/images/him/ (auto-rotated,
//     long edge capped at 3200px, never upscaled, no colour edits).
//  2. Writes data/photo-manifest.json: { [src]: { w, h, blur } } for every image
//     in public/images (used by next/image for sizes + blur placeholders).
//  3. Prints a ranked report of his photos (resolution + sharpness) and a draft
//     `himPhotos` entry for each, to paste into data/photos.ts after viewing.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IN = path.join(ROOT, "photos", "him");
const OUT = path.join(ROOT, "public", "images", "him");
const PUB = path.join(ROOT, "public");
const MANIFEST = path.join(ROOT, "data", "photo-manifest.json");
const IMG = /\.(jpe?g|png|webp|avif|tiff?|heic)$/i;

fs.mkdirSync(OUT, { recursive: true });

// 1 ─ copy his photos
const incoming = fs.existsSync(IN) ? fs.readdirSync(IN).filter((f) => IMG.test(f)) : [];
const report = [];
for (const f of incoming) {
  const slug = f.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const dest = path.join(OUT, `${slug}.jpg`);
  const src = path.join(IN, f);
  const meta = await sharp(src).rotate().metadata();
  if (!fs.existsSync(dest) || fs.statSync(dest).mtimeMs < fs.statSync(src).mtimeMs) {
    await sharp(src).rotate().resize(3200, 3200, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 88, mozjpeg: true }).toFile(dest);
  }
  // Sharpness: variance of a Laplacian on a 1024px greyscale copy.
  const { data, info } = await sharp(src).rotate().greyscale().resize(1024, 1024, { fit: "inside" })
    .convolve({ width: 3, height: 3, kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0] }).raw().toBuffer({ resolveWithObject: true });
  let sum = 0, sq = 0;
  for (const v of data) { sum += v; sq += v * v; }
  const n = info.width * info.height;
  const sharpness = Math.round(sq / n - (sum / n) ** 2);
  const w = meta.autoOrient?.width ?? meta.width, h = meta.autoOrient?.height ?? meta.height;
  report.push({ file: f, slug, w, h, long: Math.max(w, h), portrait: h > w, sharpness });
}

// 2 ─ manifest for every image under public/images
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : IMG.test(e.name) ? [path.join(d, e.name)] : []);
const old = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
const manifest = {};
for (const file of walk(path.join(PUB, "images"))) {
  const src = "/" + path.relative(PUB, file).split(path.sep).join("/");
  const mtime = Math.round(fs.statSync(file).mtimeMs);
  if (old[src]?.mtime === mtime) { manifest[src] = old[src]; continue; }
  const m = await sharp(file).metadata();
  const blurBuf = await sharp(file).resize(16, 16, { fit: "inside" }).jpeg({ quality: 50 }).toBuffer();
  manifest[src] = { w: m.width, h: m.height, blur: `data:image/jpeg;base64,${blurBuf.toString("base64")}`, mtime };
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + "\n");
console.log(`photos: manifest has ${Object.keys(manifest).length} images`);

// 3 ─ ranking report
if (report.length) {
  report.sort((a, b) => b.long - a.long || b.sharpness - a.sharpness);
  console.log("\nHis photos, ranked by resolution then sharpness:");
  for (const r of report) {
    const flag = r.long < 1600 ? "  ⚠ below 1600px — features only at small sizes" : r.long < 2400 ? "  (below 2400px: not hero-grade)" : "";
    console.log(`  ${r.slug.padEnd(32)} ${r.w}×${r.h}  sharp=${r.sharpness}${r.portrait ? "  portrait" : ""}${flag}`);
  }
  console.log("\nDraft entries for data/photos.ts → himPhotos (set focal point, alt, caption after viewing each):");
  for (const r of report) {
    console.log(`  { id: "${r.slug}", kind: "him", src: "/images/him/${r.slug}.jpg", focalX: 50, focalY: 30, alt: "Isaac Ruto …", caption: "…", place: "…", date: "…", credit: "Isaac Ruto 2027 campaign", demo: true },`);
  }
} else {
  console.log("photos: no photos in ./photos/him/ yet — his slots render framed placeholders.");
}
