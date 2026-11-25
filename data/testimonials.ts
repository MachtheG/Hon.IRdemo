import type { Testimonial } from "./types";

// SAMPLE testimonials for the client demo. Invented — not real people.
// Every item is demo: true; the prebuild check blocks them when DEMO_MODE is false.

export const testimonials: Testimonial[] = [
  {
    name: "Chepkoech", role: "Tea farmer", ward: "Kapletundo", subCounty: "Sotik", demo: true,
    quote: "When the co-op got its revolving fund, I bought my first dairy cow. That is the kind of leadership we need again.",
  },
  {
    name: "Kipngeno", role: "Boda boda rider", ward: "Silibwet", subCounty: "Bomet Central", demo: true,
    quote: "He was the first governor and he started from nothing. Now let him finish what he started.",
  },
  {
    name: "Mama Jerotich", role: "ECDE teacher", ward: "Longisa", subCounty: "Bomet East", demo: true,
    quote: "I was among the first ECDE teachers employed by the county. Our children got classrooms of their own.",
  },
  {
    name: "Kiprotich", role: "Water committee member", ward: "Chebunyo", subCounty: "Chepalungu", demo: true,
    quote: "Before the water lines reached Chebunyo market we walked for hours. Water changed everything here.",
  },
  {
    name: "Chelangat", role: "Young entrepreneur", ward: "Mogogosiek", subCounty: "Konoin", demo: true,
    quote: "We want jobs and markets for young people. Isaac Ruto has the experience to deliver them.",
  },
];
