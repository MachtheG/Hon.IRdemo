import { z } from "zod";
import { wards } from "@/data/wards";

const wardIds = wards.map((w) => w.id) as [string, ...string[]];

/** Kenyan mobile: 07xx / 01xx, or +254 / 254 prefix. Spaces and dashes allowed. */
const phone = z
  .string()
  .trim()
  .transform((s) => s.replace(/[\s-]/g, ""))
  .refine((s) => /^(?:\+?254|0)(?:7|1)\d{8}$/.test(s), "Enter a valid Kenyan mobile number")
  .transform((s) => s.replace(/^0/, "+254").replace(/^254/, "+254"));

const base = {
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone,
  ward: z.enum(wardIds, { errorMap: () => ({ message: "Choose your ward" }) }),
  consent: z.literal(true, { errorMap: () => ({ message: "Please tick to agree" }) }),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional().or(z.literal("")),
};

export const pledgeSchema = z.object({
  ...base,
  optIn: z.boolean().default(false),
});

import { volunteerRoles } from "./volunteer-roles";
export { volunteerRoles };

export const volunteerSchema = z.object({
  ...base,
  email: z.string().trim().email("Enter a valid email").max(120).optional().or(z.literal("")),
  roles: z.array(z.enum(volunteerRoles)).min(1, "Choose at least one"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  optIn: z.boolean().default(false),
});

export type PledgeInput = z.infer<typeof pledgeSchema>;
export type VolunteerInput = z.infer<typeof volunteerSchema>;
