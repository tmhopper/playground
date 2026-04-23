import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { MatchScoreSchema } from "@/lib/ai/schemas";
import { z } from "zod";

const BodySchema = z.object({
  title: z.string(),
  company: z.string(),
  description: z.string(),
  url: z.string().optional(),
  score: MatchScoreSchema,
});

export async function POST(req: Request) {
  const userId = await requireUserId();
  const body = await req.json();
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }
  const { title, company, description, url, score } = parsed.data;

  const existing = await prisma.company.findFirst({ where: { userId, name: company } });
  const companyRow = existing ?? (await prisma.company.create({ data: { userId, name: company } }));

  const job = await prisma.job.create({
    data: {
      userId,
      companyId: companyRow.id,
      title,
      description,
      url,
      stage: "Saved",
      source: "paste",
      matchScore: {
        create: {
          overall: score.overall,
          skills: score.skills,
          experience: score.experience,
          domain: score.domain,
          culture: score.culture,
          logistics: score.logistics,
          reasoning: JSON.stringify(score.reasoning),
          gaps: JSON.stringify(score.gaps),
          strengths: JSON.stringify(score.strengths),
        },
      },
    },
  });

  return NextResponse.json({ jobId: job.id });
}
