import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth";
import { fetchJobsFromUrl } from "@/lib/fetchers";
import { prisma } from "@/lib/db";
import { safeJsonParse } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  url: string;
  companyName: string;
  companyId?: string; // if set, update lastCheckedAt + seenJobUrls on the company
};

export async function POST(req: Request) {
  const userId = await requireUserId();
  const body = (await req.json()) as Body;

  if (!body.url || !body.companyName) {
    return NextResponse.json({ error: "url and companyName required" }, { status: 400 });
  }

  const result = await fetchJobsFromUrl(body.url, body.companyName);

  if (body.companyId) {
    // Verify ownership
    const company = await prisma.company.findFirst({ where: { id: body.companyId, userId } });
    if (company) {
      const prevSeen = safeJsonParse<string[]>(company.seenJobUrls, []);
      const newUrls = result.jobs.map((j) => j.url).filter(Boolean) as string[];
      const freshUrls = newUrls.filter((u) => !prevSeen.includes(u));

      await prisma.company.update({
        where: { id: company.id },
        data: {
          lastCheckedAt: new Date(),
          seenJobUrls: JSON.stringify(newUrls),
        },
      });

      return NextResponse.json({ ...result, freshUrls });
    }
  }

  return NextResponse.json(result);
}
