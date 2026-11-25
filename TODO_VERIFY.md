# TODO_VERIFY

Generated 2026-11-25 by `scripts/reports.mjs` (runs on every build). Do not edit by hand.

Everything below must be confirmed, sourced, replaced or removed before launch.
With `DEMO_MODE = false`, the build **fails** while any `demo: true` or `sourceUrl: null` item remains.

## Launch blockers (decisions, not code)
- [ ] **JSC emblem / status**: legal advice on `SHOW_JSC_EMBLEM` and `JSC_STATUS` (config/site.ts). He is a serving State officer, so the Leadership and Integrity Act (s. 23) applies; a 2026 petition already challenges his partisan activity; use of the JSC crest may need permission (Cap. 99).
- [ ] **ODPC registration**: the Data Protection (Registration) Regulations, 2021 require registration for canvassing political support. Register before forms go live.
- [ ] **Data-controller contact** details on /privacy (config/site.ts → `contact`).
- [ ] **Storage adapter**: connect a database (lib/storage). The JSON adapter does not persist on Vercel.
- [ ] **Official UDA logo** → public/brand/uda-logo.svg, then `node scripts/sample-logo.mjs` to set exact colours.
- [ ] **JSC coat of arms** → public/brand/jsc-coat-of-arms.svg.
- [ ] **His photos** → ./photos/him/ (see PHOTO_SHOTLIST.md).
- [ ] **Swahili copy** (dictionaries/sw.ts) reviewed by a native speaker; Kipsigis version planned.
- [ ] **Pull quote** for the devolution band (components/home/Devolution.tsx).

## CONFIRM (22)

| Where | Line |
|---|---|
| [config/site.ts:67](config/site.ts#L67) | /** Campaign contact — CONFIRM with the campaign before launch. */ |
| [config/site.ts:69](config/site.ts#L69) | email: null as string \| null, // CONFIRM data-controller contact email |
| [config/site.ts:70](config/site.ts#L70) | phone: null as string \| null, // CONFIRM |
| [config/site.ts:71](config/site.ts#L71) | postal: null as string \| null, // CONFIRM |
| [data/photos.ts:205](data/photos.ts#L205) | s("story-family", "/story", "him", "kericho-tea-06", "Family photo (CONFIRM with campaign)", "Only with family consen… |
| [data/record.ts:38](data/record.ts#L38) | confirm: "CONFIRM family details and photo use with the campaign", |
| [data/record.ts:60](data/record.ts#L60) | confirm: "CONFIRM full-minister portfolio name", |
| [data/record.ts:134](data/record.ts#L134) | confirm: "CONFIRM 17,000 / 80,000 wording with the campaign", |
| [data/record.ts:174](data/record.ts#L174) | confirm: "CONFIRM 'free' vs 'subsidised' AI wording", |
| [data/record.ts:205](data/record.ts#L205) | confirm: "CONFIRM the KSh 38m figure in the linked Standard article", |
| [data/record.ts:250](data/record.ts#L250) | confirm: "CONFIRM which article carries the 15%→45% figure (search snippets attribute it to the Nation coverage)", |
| [data/record.ts:305](data/record.ts#L305) | confirm: "CONFIRM — source URL for the 16 Jan 2025 briefing not found", |
| [data/record.ts:339](data/record.ts#L339) | confirm: "CONFIRM — Parliament library URL for the JSC Annual Report 2024/25 not found", |
| [data/record.ts:362](data/record.ts#L362) | confirm: "CONFIRM both figures against the SOJAR PDF tables", |
| [data/record.ts:394](data/record.ts#L394) | confirm: "CONFIRM the campaign wants this featured", |
| [data/record.ts:403](data/record.ts#L403) | confirm: "CONFIRM role/title and source — no article found", |
| [app/[locale]/privacy/page.tsx:23](app/[locale]/privacy/page.tsx#L23) | {/* CONFIRM data-controller name, email, phone and postal address with the campaign */} |
| [app/[locale]/story/page.tsx:34](app/[locale]/story/page.tsx#L34) | {/* CONFIRM full-minister portfolio name before naming the ministry */} |
| [app/[locale]/story/page.tsx:78](app/[locale]/story/page.tsx#L78) | {/* CONFIRM the campaign wants the Barchok endorsement featured */} |
| [app/[locale]/story/page.tsx:108](app/[locale]/story/page.tsx#L108) | {/* CONFIRM family details and photo with campaign */} |
| [components/home/Devolution.tsx:28](components/home/Devolution.tsx#L28) | {/* CONFIRM quote — pull quote to be supplied and sourced by the campaign */} |
| [dictionaries/sw.ts:3](dictionaries/sw.ts#L3) | // Swahili — draft translation. CONFIRM: native-speaker review before launch. |

## DRAFT (8)

| Where | Line |
|---|---|
| [data/plan.ts:3](data/plan.ts#L3) | // {/* DRAFT — awaiting candidate sign-off */} |
| [data/plan.ts:13](data/plan.ts#L13) | n: "01", id: "water", draft: true, // DRAFT — awaiting candidate sign-off |
| [data/plan.ts:24](data/plan.ts#L24) | n: "02", id: "dairy-tea", draft: true, // DRAFT — awaiting candidate sign-off |
| [data/plan.ts:36](data/plan.ts#L36) | n: "03", id: "health", draft: true, // DRAFT — awaiting candidate sign-off |
| [data/plan.ts:48](data/plan.ts#L48) | n: "04", id: "children-youth", draft: true, // DRAFT — awaiting candidate sign-off |
| [data/plan.ts:60](data/plan.ts#L60) | n: "05", id: "roads-markets-jobs", draft: true, // DRAFT — awaiting candidate sign-off |
| [app/[locale]/plan/page.tsx:35](app/[locale]/plan/page.tsx#L35) | {/* DRAFT — awaiting candidate sign-off */} |
| [components/home/PlanCards.tsx:21](components/home/PlanCards.tsx#L21) | {/* DRAFT — awaiting candidate sign-off */} |

## demo: true (33)

| Where | Line |
|---|---|
| [config/site.ts:64](config/site.ts#L64) | demo: true, |
| [data/photos.ts:25](data/photos.ts#L25) | { id: "ir-4", kind: "him", src: "/images/him/ir-4.jpg", focalX: 37, focalY: 40, alt: "Isaac Ruto waving to a large cr… |
| [data/photos.ts:26](data/photos.ts#L26) | { id: "ir-1", kind: "him", src: "/images/him/ir-1.jpg", focalX: 50, focalY: 38, alt: "Portrait of Isaac Ruto in a nav… |
| [data/photos.ts:27](data/photos.ts#L27) | { id: "ir-3", kind: "him", src: "/images/him/ir-3.jpg", focalX: 58, focalY: 40, alt: "Isaac Ruto smiling, wearing a b… |
| [data/photos.ts:28](data/photos.ts#L28) | { id: "ir-2", kind: "him", src: "/images/him/ir-2.jpg", focalX: 50, focalY: 42, alt: "Isaac Ruto smiling at a microph… |
| [data/photos.ts:29](data/photos.ts#L29) | { id: "ir-7", kind: "him", src: "/images/him/ir-7.jpg", focalX: 50, focalY: 25, alt: "Isaac Ruto speaking at a microp… |
| [data/photos.ts:30](data/photos.ts#L30) | { id: "ir-5", kind: "him", src: "/images/him/ir-5.jpg", focalX: 35, focalY: 30, alt: "Campaign poster: Hon. Isaac Rut… |
| [data/photos.ts:31](data/photos.ts#L31) | { id: "ir-6", kind: "him", src: "/images/him/ir-6.jpg", focalX: 70, focalY: 40, alt: "Isaac Ruto in conversation with… |
| [data/photos.ts:40](data/photos.ts#L40) | license: { ...BYSA4, sourceUrl: commons("Bomet-Tea.jpg"), photographer: "Kipkorir Cheruiyot" }, demo: true, |
| [data/photos.ts:47](data/photos.ts#L47) | license: { ...BYSA4, sourceUrl: commons("RainbowBometcounty.jpg"), photographer: "Aaron Better" }, demo: true, |
| [data/photos.ts:54](data/photos.ts#L54) | license: { ...BYSA4, sourceUrl: commons("Dairy_Farming_in_Bomet,_Kenya.jpg"), photographer: "Korirhilla" }, demo: true, |
| [data/photos.ts:61](data/photos.ts#L61) | license: { ...BYSA4, sourceUrl: commons("Tea_Plantation_in_Sotik,_Kenya.jpg"), photographer: "Timmbau" }, demo: true, |
| [data/photos.ts:68](data/photos.ts#L68) | license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_03.JPG"), photographer: "Ahero dala" }, demo: true, |
| [data/photos.ts:75](data/photos.ts#L75) | license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_09.JPG"), photographer: "Ahero dala" }, demo: true, |
| [data/photos.ts:82](data/photos.ts#L82) | license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_21.JPG"), photographer: "Ahero dala" }, demo: true, |
| [data/photos.ts:89](data/photos.ts#L89) | license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_06.JPG"), photographer: "Ahero dala" }, demo: true, |
| [data/photos.ts:96](data/photos.ts#L96) | license: { ...BYSA4, sourceUrl: commons("Tea_plantation,_small_scale.jpg"), photographer: "Kiprotich Towett" }, demo:… |
| [data/photos.ts:103](data/photos.ts#L103) | license: { ...CC0, sourceUrl: commons("Tea_Farm_in_Kenya.jpg"), photographer: "SeanTwice" }, demo: true, |
| [data/photos.ts:110](data/photos.ts#L110) | license: { ...CC0, sourceUrl: commons("Market_Kenya.jpg"), photographer: "safaritravelplus" }, demo: true, |
| [data/photos.ts:117](data/photos.ts#L117) | license: { ...BYSA4, sourceUrl: commons("Fog_in_a_rural_area.a.jpg"), photographer: "Derrq004" }, demo: true, |
| [data/photos.ts:124](data/photos.ts#L124) | license: { ...BYSA4, sourceUrl: commons("Running_water_tap.jpg"), photographer: "Queen Asali" }, demo: true, |
| [data/photos.ts:131](data/photos.ts#L131) | license: { ...BYSA4, sourceUrl: commons("KER_-_Agricultural_landscape_near_Kericho,_Kenya,_2012.jpg"), photographer: … |
| [data/photos.ts:138](data/photos.ts#L138) | license: { ...BYSA3, sourceUrl: commons("Shimoni_Public_Dispensary.JPG"), photographer: "Nealoveselectricity" }, demo… |
| [data/photos.ts:145](data/photos.ts#L145) | license: { ...BYSA4, sourceUrl: commons("Water_storage_tank_and_taps.jpg"), photographer: "Queen Asali" }, demo: true, |
| [data/photos.ts:152](data/photos.ts#L152) | license: { ...BYSA4, sourceUrl: commons("Rain_water_harvesting-Kenya.jpg"), photographer: "Queen Asali" }, demo: true, |
| [data/photos.ts:159](data/photos.ts#L159) | license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_08.JPG"), photographer: "Ahero dala" }, demo: true, |
| [data/photos.ts:166](data/photos.ts#L166) | license: { ...BYSA4, sourceUrl: commons("Tea_farming_in_Kericho_17.JPG"), photographer: "Ahero dala" }, demo: true, |
| [data/projects.ts:61](data/projects.ts#L61) | { id: "c-btrh", name: "Bomet Teaching & Referral Hospital (national government)", layer: "context", sector: "Health",… |
| [data/testimonials.ts:8](data/testimonials.ts#L8) | name: "Chepkoech", role: "Tea farmer", ward: "Kapletundo", subCounty: "Sotik", demo: true, |
| [data/testimonials.ts:12](data/testimonials.ts#L12) | name: "Kipngeno", role: "Boda boda rider", ward: "Silibwet", subCounty: "Bomet Central", demo: true, |
| [data/testimonials.ts:16](data/testimonials.ts#L16) | name: "Mama Jerotich", role: "ECDE teacher", ward: "Longisa", subCounty: "Bomet East", demo: true, |
| [data/testimonials.ts:20](data/testimonials.ts#L20) | name: "Kiprotich", role: "Water committee member", ward: "Chebunyo", subCounty: "Chepalungu", demo: true, |
| [data/testimonials.ts:24](data/testimonials.ts#L24) | name: "Chelangat", role: "Young entrepreneur", ward: "Mogogosiek", subCounty: "Konoin", demo: true, |

## Unsourced (4)

| Where | Line |
|---|---|
| [data/projects.ts:61](data/projects.ts#L61) | { id: "c-btrh", name: "Bomet Teaching & Referral Hospital (national government)", layer: "context", sector: "Health",… |
| [data/record.ts:303](data/record.ts#L303) | sourceUrl: null, |
| [data/record.ts:337](data/record.ts#L337) | sourceUrl: null, |
| [data/record.ts:401](data/record.ts#L401) | sourceUrl: null, |

## Approximate map locations (31)

All markers sit at a ward centroid (or have no marker). Supply exact coordinates in data/projects.ts and set `coordsVerified: true`.

| Project | Ward | Layer |
|---|---|---|
| Renal unit, Longisa County Referral Hospital | Longisa | delivered |
| Eye unit, Longisa County Referral Hospital | Longisa | delivered |
| ICU, Longisa County Referral Hospital | Longisa | delivered |
| Chebunyo market water-line extension | Chebunyo | delivered |
| Chebunyo fresh-produce market | Chebunyo | delivered |
| Drip irrigation, Nogirwet | Chebunyo | delivered |
| Bomet Green Stadium | Silibwet | delivered |
| Chesoen Farmers Co-op milk cooling plant | Chesoen | delivered |
| Kipsonoi Multipurpose milk cooling plant | Kipsonoi | delivered |
| Mogombet community water project | **unknown — not on map** | delivered |
| Sergutiet community water project | **unknown — not on map** | delivered |
| Chebara community water project | **unknown — not on map** | delivered |
| Kaptebengwet community water project | **unknown — not on map** | delivered |
| Itare community water project | **unknown — not on map** | delivered |
| Land for a cancer centre | **unknown — not on map** | delivered |
| County milk processing plant | Silibwet | proposed |
| Bomet cancer centre | Longisa | proposed |
| Drip-irrigation programme, Siongiroi | Siongiroi | proposed |
| Drip-irrigation programme, Nyongores | Nyongores | proposed |
| Drip-irrigation programme, Chebunyo | Chebunyo | proposed |
| Modern market, Bomet Central | Silibwet | proposed |
| Digital jobs hub, Bomet Central | Silibwet | proposed |
| Modern market, Bomet East | Longisa | proposed |
| Digital jobs hub, Bomet East | Longisa | proposed |
| Modern market, Chepalungu | Sigor | proposed |
| Digital jobs hub, Chepalungu | Sigor | proposed |
| Modern market, Sotik | Kapletundo | proposed |
| Digital jobs hub, Sotik | Kapletundo | proposed |
| Modern market, Konoin | Mogogosiek | proposed |
| Digital jobs hub, Konoin | Mogogosiek | proposed |
| Bomet Teaching & Referral Hospital (national government) | Chebunyo | context |
