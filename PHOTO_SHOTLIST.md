# PHOTO_SHOTLIST

Generated 2026-11-25 by `scripts/reports.mjs`. This is the list of official photos the campaign must supply before launch.

**55 slots** — his photos: 22 · stock stand-ins: 33 · placeholders: 0

No photos of him have been supplied yet (`./photos/him/` is empty), so every slot that should show him is a framed placeholder or a clearly captioned stock stand-in.

**How to add his photos:** drop originals into `./photos/him/` → `npm run photos` (copies, ranks by resolution and sharpness, prints draft entries) → add entries to `himPhotos` in data/photos.ts with focal point on his face, alt, caption, place and year → set each slot's `photoId`.

**Rules:** hero ≥2400px long edge; other features ≥1600px. Nothing is upscaled. No filters on his face (gentle warmth/contrast in the source file only). Focal point (`focalX`, `focalY`) on his eyes so no screen size crops his face.

| Slot | Page | What goes here | Current | Resolution | Minimum | Suggested framing |
|---|---|---|---|---|---|---|
| `hero` | / | Hero portrait — head and shoulders, looking at camera | His photo — ir-4 | 678×452 ⚠ below 2400px | ≥2400px | Vertical or 4:5, eyes on upper third, plain soft background, natural light. ≥2400px long edge. |
| `seal` | all (header/footer) | Circular portrait seal (48px header, footer) | His photo — ir-1 | 421×426 ⚠ below 800px | ≥800px | Tight head crop, centred face, 1:1. |
| `og` | social share | OG image portrait (1200×630) | His photo — ir-1 | 421×426 ⚠ below 1600px | ≥1600px | Head and shoulders with room on the right for the name. |
| `home-story` | / | Him at work in the county office or with residents | His photo — ir-3 | 678×452 ⚠ below 1600px | ≥1600px | 4:5 portrait, warm, mid-shot. |
| `ledger-health` | / | Him at Longisa County Referral Hospital (renal/eye/ICU units) | Stock (stand-in) — dispensary | 2400×1800 | ≥1600px | 3:2 landscape at the facility. Stock stand-in until supplied. |
| `ledger-water` | / | Him at the Chebunyo water kiosk or market | Stock (stand-in) — water-tap | 1108×2400 ⚠ short edge < 1600px | ≥1600px | 3:2 landscape. Stock stand-in until supplied. |
| `ledger-education` | / | Him at an ECDE centre with teachers | Stock (stand-in) — kericho-tea-17 | 2400×1800 | ≥1600px | 3:2 landscape. No identifiable children without written consent. |
| `ledger-agri` | / | Him at a milk cooling plant / co-op | Stock (stand-in) — dairy-bomet | 2400×1800 | ≥1600px | 3:2 landscape. Stock stand-in until supplied. |
| `ledger-devolution` | / | Him as Council of Governors chair (2013–15) | His photo — ir-6 | 318×159 ⚠ below 1600px | ≥1600px | 3:2 landscape, official setting. |
| `ledger-justice` | / | Him at a JSC sitting or court opening | His photo — ir-2 | 678×452 ⚠ below 1600px | ≥1600px | 3:2 landscape. Check JSC permission before use. |
| `devolution` | / | Him addressing governors / Pesa Mashinani event | His photo — ir-7 | 519×591 ⚠ below 1600px | ≥1600px | 4:5 portrait or 3:2; dark-band friendly. |
| `jsc-portrait` | / and /record#jsc | Him at the Dagoretti Law Courts opening (quote photo) | His photo — ir-2 | 678×452 ⚠ below 1600px | ≥1600px | 4:5 portrait. Legal sign-off required. |
| `plan-portrait` | / | Him listening to farmers in a ward meeting | His photo — ir-4 | 678×452 ⚠ below 1600px | ≥1600px | 3:2 landscape, grassroots feel. |
| `pledge-portrait` | / and /get-involved | Him greeting voters (smiling, approachable) | His photo — ir-5 | 451×678 ⚠ below 1600px | ≥1600px | 4:5 portrait. |
| `pledge-bg` | / | Background scene for the pledge band | Stock (stand-in) — tea-bomet | 2400×1080 ⚠ short edge < 1600px | ≥1600px | Wide landscape, Bomet tea country. |
| `story-hero` | /story | Portrait for the story opener | His photo — ir-1 | 421×426 ⚠ below 2400px | ≥2400px | 4:5 portrait, reflective. |
| `story-tumoi` | /story | Home ground: Sigor / Chepalungu landscape | Stock (stand-in) — bomet-rainbow | 2400×1800 | ≥1600px | Wide landscape of Chepalungu. |
| `story-mp` | /story | Him as MP for Chepalungu (1998–2012) | His photo — ir-2 | 678×452 ⚠ below 1600px | ≥1600px | Archive photo, any ratio. |
| `story-governor` | /story | Swearing-in as first Governor, March 2013 | His photo — ir-3 | 678×452 ⚠ below 1600px | ≥1600px | Archive photo, 3:2. |
| `story-family` | /story | Family photo (CONFIRM with campaign) | Stock (stand-in) — kericho-tea-06 | 2400×1800 | ≥1600px | Only with family consent. |
| `story-tea` | /story | South Rift tea country | Stock (stand-in) — kericho-tea-21 | 2400×1800 | ≥1600px | Wide landscape. |
| `record-hero` | /record | Him in his Governor's office | His photo — ir-7 | 519×591 ⚠ below 1600px | ≥1600px | 3:2 landscape. |
| `record-water` | /record | Water — scene | Stock (stand-in) — water-tank | 2400×1600 | ≥1600px | Landscape. |
| `record-agri` | /record | Tea and dairy — scene | Stock (stand-in) — kericho-tea-06 | 2400×1800 | ≥1600px | Landscape. |
| `record-health` | /record | Him at the Longisa eye unit commissioning | Stock (stand-in) — dispensary | 2400×1800 | ≥1600px | 3:2 landscape. |
| `plan-1` | /plan | Promise 01 — Water in every ward | Stock (stand-in) — rainwater | 2400×1600 | ≥1600px | Landscape. |
| `plan-2` | /plan | Promise 02 — Dairy and tea that pay | Stock (stand-in) — dairy-bomet | 2400×1800 | ≥1600px | Landscape. |
| `plan-3` | /plan | Promise 03 — Health close to home | Stock (stand-in) — dispensary | 2400×1800 | ≥1600px | Landscape. |
| `plan-4` | /plan | Promise 04 — Children and youth first (ECDE classroom) | Stock (stand-in) — kericho-tea-08 | 2400×1800 | ≥1600px | Landscape; no identifiable children without consent. |
| `plan-5` | /plan | Promise 05 — Roads, markets and jobs | Stock (stand-in) — market | 2400×1600 | ≥1600px | Landscape. |
| `gi-hero` | /get-involved | Him with volunteers / campaign team | His photo — ir-4 | 678×452 ⚠ below 1600px | ≥1600px | 3:2 landscape, energetic. |
| `gallery-01` | /gallery | Him with tea farmers at a buying centre | His photo — ir-4 | 678×452 ⚠ below 1600px | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-02` | /gallery | Bomet / South Rift scene | Stock (stand-in) — tea-bomet | 2400×1080 ⚠ short edge < 1600px | ≥1600px | Landscape. |
| `gallery-03` | /gallery | Him at a ward public participation forum | His photo — ir-1 | 421×426 ⚠ below 1600px | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-04` | /gallery | Bomet / South Rift scene | Stock (stand-in) — dairy-bomet | 2400×1800 | ≥1600px | Landscape. |
| `gallery-05` | /gallery | Bomet / South Rift scene | Stock (stand-in) — tea-sotik | 2400×1800 | ≥1600px | Landscape. |
| `gallery-06` | /gallery | Him at Bomet Green Stadium | His photo — ir-3 | 678×452 ⚠ below 1600px | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-07` | /gallery | Bomet / South Rift scene | Stock (stand-in) — kericho-tea-03 | 2400×1800 | ≥1600px | Landscape. |
| `gallery-08` | /gallery | Him opening a milk cooling plant | His photo — ir-2 | 678×452 ⚠ below 1600px | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-09` | /gallery | Bomet / South Rift scene | Stock (stand-in) — bomet-rainbow | 2400×1800 | ≥1600px | Landscape. |
| `gallery-10` | /gallery | Bomet / South Rift scene | Stock (stand-in) — kericho-tea-09 | 2400×1800 | ≥1600px | Landscape. |
| `gallery-11` | /gallery | Him at an ECDE centre | His photo — ir-7 | 519×591 ⚠ below 1600px | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-12` | /gallery | Bomet / South Rift scene | Stock (stand-in) — market | 2400×1600 | ≥1600px | Landscape. |
| `gallery-13` | /gallery | Him with the Council of Governors | His photo — ir-5 | 451×678 ⚠ below 1600px | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-14` | /gallery | Bomet / South Rift scene | Stock (stand-in) — kericho-landscape | 2400×1594 ⚠ short edge < 1600px | ≥1600px | Landscape. |
| `gallery-15` | /gallery | Bomet / South Rift scene | Stock (stand-in) — tea-small-scale | 2400×1800 | ≥1600px | Landscape. |
| `gallery-16` | /gallery | Him at the JSC | His photo — ir-6 | 318×159 ⚠ below 1600px | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-17` | /gallery | Bomet / South Rift scene | Stock (stand-in) — water-tank | 2400×1600 | ≥1600px | Landscape. |
| `gallery-18` | /gallery | Him in Chebunyo market | Stock (stand-in) — kericho-tea-06 | 2400×1800 | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-19` | /gallery | Bomet / South Rift scene | Stock (stand-in) — kericho-tea-21 | 2400×1800 | ≥1600px | Landscape. |
| `gallery-20` | /gallery | Bomet / South Rift scene | Stock (stand-in) — tea-farm-kenya | 2400×1082 ⚠ short edge < 1600px | ≥1600px | Landscape. |
| `gallery-21` | /gallery | Him with youth / boda boda riders | Stock (stand-in) — water-tank | 2400×1600 | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-22` | /gallery | Bomet / South Rift scene | Stock (stand-in) — rural-road | 2400×1800 | ≥1600px | Landscape. |
| `gallery-23` | /gallery | Him with women's groups | Stock (stand-in) — kericho-tea-21 | 2400×1800 | ≥1600px | Any ratio; candid field photo with place and year. |
| `gallery-24` | /gallery | Bomet / South Rift scene | Stock (stand-in) — kericho-tea-06 | 2400×1800 | ≥1600px | Landscape. |
