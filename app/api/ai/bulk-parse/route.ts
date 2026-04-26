import { NextResponse } from "next/server";
import { anthropic, cached, MODEL } from "@/lib/ai/client";
import { BULK_PARSE_SYSTEM } from "@/lib/ai/prompts/bulkParse";
import { BulkParseTool } from "@/lib/ai/schemas";
import { requireUserId } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { text: string };

export async function POST(req: Request) {
  await requireUserId();
  const { text } = (await req.json()) as Body;
  if (!text?.trim()) return NextResponse.json({ error: "text required" }, { status: 400 });

  const res = await anthropic().messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: [cached(BULK_PARSE_SYSTEM)],
    tools: [BulkParseTool],
    tool_choice: { type: "tool", name: BulkParseTool.name },
    messages: [{ role: "user", content: text }],
  });

  const toolUse = res.content.find((c) => c.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    return NextResponse.json({ error: "no tool use returned" }, { status: 500 });
  }

  const input = toolUse.input as { jobs: unknown[] };
  return NextResponse.json({ jobs: input.jobs ?? [] });
}
