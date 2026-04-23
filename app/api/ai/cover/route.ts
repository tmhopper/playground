import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { anthropic, cached, MODEL } from "@/lib/ai/client";
import { COVER_SYSTEM } from "@/lib/ai/prompts/cover";
import { buildProfileBlock } from "@/lib/ai/profile-context";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const userId = await requireUserId();
  const { jobId, save = true } = (await req.json()) as { jobId: string; save?: boolean };

  const job = await prisma.job.findFirst({
    where: { id: jobId, userId },
    include: { company: true },
  });
  if (!job) return new Response("not found", { status: 404 });

  const profileBlock = await buildProfileBlock(userId);
  const userMessage = [
    `# Job\n${job.title} at ${job.company.name}${job.location ? " (" + job.location + ")" : ""}`,
    job.url && `URL: ${job.url}`,
    `\n# Description\n${job.description || "(no description)"}`,
  ]
    .filter(Boolean)
    .join("\n");

  const encoder = new TextEncoder();
  let fullText = "";

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const iter = await anthropic().messages.stream({
          model: MODEL,
          max_tokens: 1200,
          system: [cached(COVER_SYSTEM), cached(profileBlock)],
          messages: [{ role: "user", content: userMessage }],
        });

        for await (const event of iter) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            const text = event.delta.text;
            fullText += text;
            controller.enqueue(encoder.encode(text));
          }
        }

        if (save && fullText.trim()) {
          const version = await prisma.coverLetter.count({ where: { jobId } });
          await prisma.coverLetter.create({
            data: { jobId, version: version + 1, text: fullText.trim() },
          });
        }
      } catch (e) {
        controller.enqueue(encoder.encode("\n\n[error: " + (e instanceof Error ? e.message : "unknown") + "]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
