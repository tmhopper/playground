import type { FetchResult } from "./types";

export async function fetchViaJina(careersUrl: string, companyName: string): Promise<FetchResult> {
  const readerUrl = `https://r.jina.ai/${encodeURIComponent(careersUrl)}`;
  const headers: Record<string, string> = { Accept: "text/plain" };
  const apiKey = process.env.JINA_API_KEY;
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  const res = await fetch(readerUrl, { headers, next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`Jina Reader returned ${res.status}`);
  const text = await res.text();
  if (!text.trim()) throw new Error("Jina returned empty content");

  return { jobs: [{ title: "Raw page", company: companyName, description: text }], source: "jina-raw" };
}
