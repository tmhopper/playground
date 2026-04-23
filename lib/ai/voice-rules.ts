import { anthropic, MODEL } from "@/lib/ai/client";
import { prisma } from "@/lib/db";
import { truncate } from "@/lib/utils";

const VOICE_EXTRACTION_PROMPT = `You are a writing coach analyzing a specific person's voice.

Read their pinned writing samples and extract a concise, actionable "voice rules" style sheet that another writer could follow to match their tone exactly. Focus on observable patterns only; do not invent rules.

Output format:
- 6 to 12 bullet points
- Each bullet is one concrete rule (e.g. "Avoids em-dashes", "Uses short declarative sentences", "Opens with a hook, not a greeting")
- Call out vocabulary preferences, sentence rhythm, punctuation habits, opener/closer patterns, level of formality, humor style if any
- End with a "Never:" section listing 3-5 things that would sound off
- Markdown only. No preamble, no sign-off.`;

export async function generateVoiceRules(userId: string): Promise<string> {
  const samples = await prisma.writingSample.findMany({
    where: { userId, isVoicePinned: true },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  if (!samples.length) {
    return "(No pinned writing samples yet. Pin 2-3 samples that best represent your voice to auto-generate rules.)";
  }

  const combined = samples
    .map((s, i) => `### Sample ${i + 1}: ${s.title}\n${truncate(s.content, 6000)}`)
    .join("\n\n");

  const res = await anthropic().messages.create({
    model: MODEL,
    max_tokens: 1200,
    system: VOICE_EXTRACTION_PROMPT,
    messages: [{ role: "user", content: combined }],
  });

  const text = res.content
    .filter((c) => c.type === "text")
    .map((c) => ("text" in c ? c.text : ""))
    .join("\n")
    .trim();

  await prisma.profile.update({
    where: { userId },
    data: { voiceRules: text, voiceRulesUpdatedAt: new Date() },
  });

  return text;
}
