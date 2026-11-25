import type { Promise2027 } from "./types";

// {/* DRAFT — awaiting candidate sign-off */}
// Every promise below is a DEMO DRAFT. No costed figures until the campaign provides them.

export const planTheme = {
  title: "Mashinani Kwanza",
  sub: "Finishing the work of devolution, ward by ward.",
};

export const plan: Promise2027[] = [
  {
    n: "01", id: "water", draft: true, // DRAFT — awaiting candidate sign-off
    title: "Water in every ward",
    forWhom: "Every household, and the dry lowlands of Chepalungu first",
    actions: [
      "Expand Bomet Water Company coverage, sub-county by sub-county.",
      "A drip-irrigation programme for the dry lowlands of Chepalungu: Siongiroi, Nyongores and Chebunyo.",
      "Rehabilitate one community water scheme in every ward, every year.",
    ],
    builtOn: ["water-company", "water-community", "chebunyo-water"],
  },
  {
    n: "02", id: "dairy-tea", draft: true, // DRAFT — awaiting candidate sign-off
    title: "Dairy and tea that pay",
    forWhom: "Dairy farmers, tea growers and their co-operatives",
    actions: [
      "A milk cooler for every ward.",
      "Deliver the county milk processing plant planned during his first term.",
      "Grow the co-operative revolving fund; put extension officers and AI services back in every ward.",
      "A voice for tea farmers on bonuses.",
    ],
    builtOn: ["milk-coolers", "milk-plant", "coop-fund", "coop-per-ward"],
  },
  {
    n: "03", id: "health", draft: true, // DRAFT — awaiting candidate sign-off
    title: "Health close to home",
    forWhom: "Patients, families and health workers",
    actions: [
      "A fully staffed and stocked Longisa County Referral Hospital.",
      "Build the cancer centre on the land his administration acquired.",
      "An ambulance for every sub-county.",
      "A public medicine-tracking dashboard so shortages are seen and fixed.",
    ],
    builtOn: ["health-longisa", "health-services"],
  },
  {
    n: "04", id: "children-youth", draft: true, // DRAFT — awaiting candidate sign-off
    title: "Children and youth first",
    forWhom: "Young families, ECDE teachers, students and young athletes",
    actions: [
      "Upgrade ECDE centres and pay ECDE teachers on time.",
      "County bursaries for students who need them.",
      "Vocational training centres linked to real jobs.",
      "A sports talent programme.",
    ],
    builtOn: ["ecde", "stadium"],
  },
  {
    n: "05", id: "roads-markets-jobs", draft: true, // DRAFT — awaiting candidate sign-off
    title: "Roads, markets and jobs",
    forWhom: "Traders, boda boda riders, farmers and job-seekers",
    actions: [
      "An all-weather feeder-road programme, published ward by ward.",
      "A modern market in every sub-county.",
      "Digital jobs hubs for young people.",
      "A transparent county budget portal.",
    ],
    builtOn: ["chebunyo-market", "governance"],
  },
];
