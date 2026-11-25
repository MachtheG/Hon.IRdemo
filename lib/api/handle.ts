import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";
import { getStore, type Kind } from "@/lib/storage";
import { wardById } from "@/data/wards";

/** Shared POST handler: validate with zod, drop bots, save via the adapter. */
export async function handleSubmission(req: Request, kind: Kind, schema: ZodSchema) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const { company, consent, ...data } = parsed.data as Record<string, unknown>;
  const store = getStore();
  if (company) return NextResponse.json({ ok: true, count: await store.count(kind) }); // honeypot: pretend success
  const ward = wardById(String(data.ward));
  await store.save({
    kind,
    at: new Date().toISOString(),
    data: { ...data, subCounty: ward?.subCounty, consent: consent === true, consentAt: new Date().toISOString() },
  });
  return NextResponse.json({ ok: true, count: await store.count(kind) });
}
