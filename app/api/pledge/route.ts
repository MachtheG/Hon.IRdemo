import { NextResponse } from "next/server";
import { pledgeSchema } from "@/lib/schemas";
import { getStore } from "@/lib/storage";
import { handleSubmission } from "@/lib/api/handle";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return handleSubmission(req, "pledge", pledgeSchema);
}

/** Live pledge count. */
export async function GET() {
  const store = getStore();
  return NextResponse.json({ count: await store.count("pledge"), adapter: store.name }, { headers: { "Cache-Control": "no-store" } });
}
