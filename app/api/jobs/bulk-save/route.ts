import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type JobInput = {
  title: string;
  company: string;
  location?: string;
  workMode?: string;
  url?: string;
  description?: string;
  reqNumber?: string;
  source?: string;
};

export async function POST(req: Request) {
  const userId = await requireUserId();
  const { jobs } = (await req.json()) as { jobs: JobInput[] };

  if (!Array.isArray(jobs) || !jobs.length) {
    return NextResponse.json({ error: "jobs array required" }, { status: 400 });
  }

  const saved: string[] = [];

  for (const j of jobs) {
    if (!j.title || !j.company) continue;

    // Match company by normalized name (lowercased) to avoid duplicates
    const normalizedName = j.company.trim();
    const allCompanies = await prisma.company.findMany({ where: { userId }, select: { id: true, name: true } });
    const existing = allCompanies.find((c) => c.name.toLowerCase() === normalizedName.toLowerCase()) ?? null;
    const companyRow =
      existing
        ? await prisma.company.findUniqueOrThrow({ where: { id: existing.id } })
        : await prisma.company.create({ data: { userId, name: normalizedName } });

    const job = await prisma.job.create({
      data: {
        userId,
        companyId: companyRow.id,
        title: j.title,
        location: j.location || null,
        workMode: j.workMode || null,
        url: j.url || null,
        description: j.description || "",
        reqNumber: j.reqNumber || null,
        stage: "Saved",
        source: j.source ?? "bulk",
      },
    });
    saved.push(job.id);
  }

  return NextResponse.json({ saved });
}
