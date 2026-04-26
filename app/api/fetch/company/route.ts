import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { fetchJobsFromUrl } from "@/lib/fetchers";
import { safeJsonParse } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  companyId: string;
};

export async function POST(req: Request) {
  const userId = await requireUserId();
  const { companyId } = (await req.json()) as Body;

  if (!companyId) {
    return NextResponse.json({ error: "companyId required" }, { status: 400 });
  }

  const company = await prisma.company.findFirst({ where: { id: companyId, userId } });
  if (!company) return NextResponse.json({ error: "company not found" }, { status: 404 });

  const careersUrls = safeJsonParse<{ label: string; url: string }[]>(company.careersUrls, []);
  if (!careersUrls.length) {
    return NextResponse.json({ error: "No careers URLs configured for this company." }, { status: 400 });
  }

  const url = careersUrls[0].url;
  const result = await fetchJobsFromUrl(url, company.name);

  const prevSeen = safeJsonParse<string[]>(company.seenJobUrls, []);
  const newUrls = result.jobs.map((j) => j.url).filter(Boolean) as string[];
  const freshUrls = newUrls.filter((u) => !prevSeen.includes(u));

  await prisma.company.update({
    where: { id: company.id },
    data: { lastCheckedAt: new Date(), seenJobUrls: JSON.stringify(newUrls) },
  });

  return NextResponse.json({ ...result, freshUrls });
}
