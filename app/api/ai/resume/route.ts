import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { anthropic, cached, MODEL } from "@/lib/ai/client";
import { RESUME_SYSTEM } from "@/lib/ai/prompts/resume";
import { ResumeTool, ResumeSchema } from "@/lib/ai/schemas";
import { buildProfileBlock } from "@/lib/ai/profile-context";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DiffEntry = z.object({
  section: z.string(),
  before: z.string(),
  after: z.string(),
  reason: z.string(),
});

export async function POST(req: Request) {
  const userId = await requireUserId();
  const { jobId } = (await req.json()) as { jobId: string };

  const job = await prisma.job.findFirst({
    where: { id: jobId, userId },
    include: { company: true },
  });
  if (!job) return NextResponse.json({ error: "not found" }, { status: 404 });

  const profileBlock = await buildProfileBlock(userId);
  const userMessage = `# Job\n${job.title} at ${job.company.name}\n\n# Description\n${
    job.description || "(no description)"
  }`;

  const res = await anthropic().messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: [cached(RESUME_SYSTEM), cached(profileBlock)],
    tools: [ResumeTool],
    tool_choice: { type: "tool", name: ResumeTool.name },
    messages: [{ role: "user", content: userMessage }],
  });

  const toolUse = res.content.find((c) => c.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    return NextResponse.json({ error: "no tool use" }, { status: 500 });
  }

  const Wrapped = z.object({ resume: ResumeSchema, diff: z.array(DiffEntry) });
  const parsed = Wrapped.safeParse(toolUse.input);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid resume shape", details: parsed.error.issues }, { status: 500 });
  }

  const version = await prisma.resumeVariant.count({ where: { jobId } });
  const variant = await prisma.resumeVariant.create({
    data: {
      jobId,
      version: version + 1,
      structuredJson: JSON.stringify(parsed.data.resume),
      diffFromBase: JSON.stringify(parsed.data.diff),
    },
  });

  return NextResponse.json({ variantId: variant.id, resume: parsed.data.resume, diff: parsed.data.diff });
}
