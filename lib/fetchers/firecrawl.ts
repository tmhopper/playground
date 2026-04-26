import type { FetchResult } from "./types";

export async function fetchViaFirecrawl(careersUrl: string, companyName: string): Promise<FetchResult> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) throw new Error("FIRECRAWL_API_KEY not set");

  const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ url: careersUrl, formats: ["markdown"] }),
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Firecrawl returned ${res.status}`);
  const data = await res.json();
  const markdown: string = data.data?.markdown ?? data.markdown ?? "";
  if (!markdown) throw new Error("Firecrawl returned empty content");

  return { jobs: [{ title: "Raw page", company: companyName, description: markdown }], source: "firecrawl-raw" };
}
