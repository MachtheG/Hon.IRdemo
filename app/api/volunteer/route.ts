import { volunteerSchema } from "@/lib/schemas";
import { handleSubmission } from "@/lib/api/handle";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return handleSubmission(req, "volunteer", volunteerSchema);
}
