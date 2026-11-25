# Isaac Ruto for Governor · Bomet 2027 — campaign site (client demo)

Next.js 15 (App Router) · Tailwind CSS 4 · `next/font` · `next/image` · MapLibre GL (OpenFreeMap) · zod. Built for Vercel.

> **This build is a client demo.** `DEMO_MODE = true`: sample testimonials, stock photos and the zero paybill are tagged `demo: true`, and a banner says so on every page. Read **Launch flags** below before going live.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /en
npm run build        # prebuild: photo manifest → demo guard → TODO_VERIFY.md + PHOTO_SHOTLIST.md
npm start
```

Node ≥ 22.18. The build scripts read the TypeScript data files directly, using Node's built-in type stripping.

## Where things live

| What | File |
|---|---|
| Switches: `DEMO_MODE`, `SHOW_DRAFT_BANNER`, `SHOW_JSC_EMBLEM`, `JSC_STATUS`, `NAME_SPELLING`; slogans, election date, paybill, contact | `config/site.ts` |
| Every fact, with its source → generates `/sources` | `data/record.ts` |
| Photo library, focal points, credits, and the **slot list** (every image position) | `data/photos.ts` |
| Map projects (delivered / proposed / context) | `data/projects.ts` |
| Wards, sub-counties, centroids | `data/wards.ts` |
| 2027 plan (DRAFT) | `data/plan.ts` |
| Sample testimonials (demo) | `data/testimonials.ts` |
| UI copy, EN / SW | `dictionaries/en.ts`, `dictionaries/sw.ts` |
| Colour tokens, frame system, motion | `app/globals.css` |
| Form storage adapter | `lib/storage/index.ts` |

**Facts rule.** A fact with `sourceUrl: null` is hidden on the site and listed in TODO_VERIFY.md. With `DEMO_MODE = false`, the build fails until it has a source or is removed.

## Photos

1. Drop his photos into `./photos/him/`.
2. Run `npm run photos`. It copies each photo into `public/images/him/`, auto-rotates it and caps it at 3200px, never upscaling or applying filters. It prints a ranking by resolution and sharpness, plus a draft `himPhotos` entry for each photo.
3. In `data/photos.ts`, for each photo:
   - add the entry and set `focalX`/`focalY` on his eyes;
   - write the `alt` text and caption, with place and year (mark guesses `demo: true`).
4. Point slots at the new photos (`photoId`): the strongest head-and-shoulders shot goes to `hero`, the next best to `seal` and `og`.
5. `PHOTO_SHOTLIST.md` regenerates on every build. It lists each slot and whether it holds his photo, a stock stand-in or a placeholder, and flags anything under the minimum size (hero ≥ 2400px, features ≥ 1600px).

Stock photos come from Wikimedia Commons (`public/images/stock/`). They're resized only, credited on `/credits` and captioned generically. Photos showing identifiable people are excluded.

## Brand files

- **UDA emblem** → `public/brand/uda-logo.svg` (or `.png`). It replaces the placeholder in the header automatically and keeps its proportions. Then run `npm run sample-logo` and copy the printed `--uda-green` / `--uda-yellow` values into `app/globals.css`. Re-check the contrast pairs listed in the comment there.
- **JSC coat of arms** → `public/brand/jsc-coat-of-arms.svg`. It appears only in the home-page JSC section and on `/record#jsc`, and only while `SHOW_JSC_EMBLEM` is true.

## Forms

- Pledge and volunteer forms post to `/api/pledge` and `/api/volunteer`. Both endpoints validate with zod, include a honeypot field, and require consent (unticked by default).
- Storage goes through a pluggable adapter:
  - `json` (local default): `.data/submissions.json`, which is git-ignored.
  - `console` (default on Vercel): kept in memory and resets on cold start.
- Set `STORAGE_ADAPTER` to choose explicitly. Implement `StorageAdapter` to connect a database.
- Donate shows M-Pesa details only. There is no payment processing.

## Indexing

The demo is kept out of search engines when deployed on Vercel (`DEMO_MODE` + `VERCEL`), or anywhere if `SITE_NOINDEX=1` is set. Local builds stay crawlable so Lighthouse's SEO audit measures the real launch setup. Set `NEXT_PUBLIC_SITE_URL` for canonical URLs, the sitemap and OG images.

## Languages

Routes are `/en/...` and `/sw/...`. To add Kipsigis:
1. Create `dictionaries/kln.ts`.
2. Add `"kln"` to `locales` in `lib/i18n.ts`.
3. Add it to the middleware regex in `components/layout/LangSwitch.tsx`.

The Swahili copy is a draft and needs native-speaker review.

## Launch flags (decide before `DEMO_MODE = false`)

1. **JSC.** He is a serving JSC Vice Chairperson, which makes him a State officer under the Leadership and Integrity Act (s. 23). A 2026 petition already challenges his partisan activity. Use of the JSC crest may need permission under the National Flag, Emblems and Names Act (Cap. 99). Take legal advice, then set `SHOW_JSC_EMBLEM` and `JSC_STATUS`.
2. **ODPC registration.** Canvassing political support requires registration under the Data Protection (Registration) Regulations, 2021. Fill in `contact` in `config/site.ts` for `/privacy`.
3. **Storage.** Connect a database. The demo adapter does not persist on Vercel.
4. Clear everything in **TODO_VERIFY.md**, which is regenerated on each build.
