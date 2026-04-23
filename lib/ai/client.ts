import Anthropic from "@anthropic-ai/sdk";

export const MODEL = "claude-opus-4-7";

let client: Anthropic | null = null;
export function anthropic(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set. Add it to .env.local");
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}

export type CachedSystemBlock =
  | { type: "text"; text: string }
  | { type: "text"; text: string; cache_control: { type: "ephemeral" } };

export function cached(text: string): CachedSystemBlock {
  return { type: "text", text, cache_control: { type: "ephemeral" } };
}

export function plain(text: string): CachedSystemBlock {
  return { type: "text", text };
}
