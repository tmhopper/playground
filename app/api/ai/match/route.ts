import { NextResponse } from "next/server";
import { anthropic, cached, MODEL } from "@/lib/ai/client";
import { MATCH_SYSTEM } from "@/lib/ai/prompts/match";
import { buildProfileBlock } from "@/lib/ai/profile-context";
import { MatchScoreSchema, MatchScoreTool } from "@/lib/ai/schemas";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  jobDescription: string;
  jobTitle?: string;
  company?: string;
  jobId?: string; // if provided, persist score against the job
};

export async function POST(req: Request) {
  const userId = await requireUserId();
  const body = (await req.json()) as Body;

  let jobTitle = body.jobTitle;
  let company = body.company;
  let description = body.jobDescription?.trim() || "";

  if (body.jobId && !description) {
    const job = await prisma.job.findFirst({
      where: { id: body.jobId, userId },
      include: { company: true },
    });
    if (!job) {
      return NextResponse.json({ error: "job not found" }, { status: 404 });
    }
    jobTitle = jobTitle || job.title;
    company = company || job.company.name;
    description = job.description;
  }

  if (!description) {
    return NextResponse.json({ error: "jobDescription required" }, { status: 400 });
  }

  const profileBlock = await buildProfileBlock(userId);

  const userMessage = [
    jobTitle && `# Job title\n${jobTitle}`,
    company && `# Company\n${company}`,
    `# Job description\n${description}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const res = await anthropic().messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: [cached(MATCH_SYSTEM), cached(profileBlock)],
    tools: [MatchScoreTool],
    tool_choice: { type: "tool", name: MatchScoreTool.name },
    messages: [{ role: "user", content: userMessage }],
  });

  const toolUse = res.content.find((c) => c.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    return NextResponse.json({ error: "no tool use returned" }, { status: 500 });
  }
  const parsed = MatchScoreSchema.safeParse(toolUse.input);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid score shape", details: parsed.error.issues }, { status: 500 });
  }
  const score = parsed.data;

  if (body.jobId) {
    const job = await prisma.job.findFirst({ where: { id: body.jobId, userId } });
    if (job) {
      await prisma.matchScore.upsert({
        where: { jobId: body.jobId },
        create: {
          jobId: body.jobId,
          overall: score.overall,
          skills: score.skills,
          experience: score.experience,
          domain: score.domain,
          culture: score.culture,
          logistics: score.logistics,
          reasoning: JSON.stringify(score.reasoning),
          gaps: JSON.stringify(score.gaps),
          strengths: JSON.stringify(score.strengths),
          model: MODEL,
          inputTokens: res.usage.input_tokens,
          outputTokens: res.usage.output_tokens,
          cacheReadTokens: res.usage.cache_read_input_tokens ?? 0,
          cacheCreationTokens: res.usage.cache_creation_input_tokens ?? 0,
        },
        update: {
          overall: score.overall,
          skills: score.skills,
          experience: score.experience,
          domain: score.domain,
          culture: score.culture,
          logistics: score.logistics,
          reasoning: JSON.stringify(score.reasoning),
          gaps: JSON.stringify(score.gaps),
          strengths: JSON.stringify(score.strengths),
          inputTokens: res.usage.input_tokens,
          outputTokens: res.usage.output_tokens,
          cacheReadTokens: res.usage.cache_read_input_tokens ?? 0,
          cacheCreationTokens: res.usage.cache_creation_input_tokens ?? 0,
        },
      });
    }
  }

  return NextResponse.json({
    score,
    usage: {
      input: res.usage.input_tokens,
      output: res.usage.output_tokens,
      cacheRead: res.usage.cache_read_input_tokens ?? 0,
      cacheCreation: res.usage.cache_creation_input_tokens ?? 0,
    },
  });
}
