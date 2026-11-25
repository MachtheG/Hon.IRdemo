// Prebuild guard. When DEMO_MODE is false, the build fails if any demo content
// or unsourced fact remains, listing each item with file and line.
//   • `demo: true` in data/ or config/
//   • `sourceUrl: null` in data/ (an unsourced fact or project)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const { DEMO_MODE } = await import(pathToFileURL(path.join(ROOT, "config", "site.ts")).href);

const scan = (dir, re, label) =>
  fs.readdirSync(path.join(ROOT, dir)).filter((f) => /\.tsx?$/.test(f)).flatMap((f) => {
    const rel = `${dir}/${f}`;
    if (f === "types.ts") return [];
    return fs.readFileSync(path.join(ROOT, rel), "utf8").split(/\r?\n/).flatMap((line, i) =>
      // Skip comment lines: only real data counts.
      re.test(line) && !/^\s*(\/\/|\/?\*)/.test(line) ? [{ where: `${rel}:${i + 1}`, label, text: line.trim().slice(0, 110) }] : []);
  });

const hits = [
  ...scan("data", /demo:\s*true/, "demo content"),
  ...scan("config", /demo:\s*true/, "demo content"),
  ...scan("data", /sourceUrl:\s*null/, "unsourced"),
];

if (DEMO_MODE) {
  console.log(`check-demo: DEMO_MODE is on — ${hits.length} demo/unsourced items allowed (see TODO_VERIFY.md).`);
  process.exit(0);
}
if (hits.length) {
  console.error(`\n✖ check-demo: DEMO_MODE is false but ${hits.length} demo or unsourced items remain:\n`);
  for (const h of hits) console.error(`  ${h.where.padEnd(28)} [${h.label}]  ${h.text}`);
  console.error("\nReplace or remove them (or switch DEMO_MODE back on) before building for launch.\n");
  process.exit(1);
}
console.log("check-demo: DEMO_MODE is off and no demo content remains. ✔");
