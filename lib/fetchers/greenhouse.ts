import type { FetchedJob, FetchResult } from "./types";

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function inferWorkMode(text: string): string | undefined {
  const t = text.toLowerCase();
  if (t.includes("remote")) return "remote";
  if (t.includes("hybrid")) return "hybrid";
  if (t.includes("on-site") || t.includes("onsite") || t.includes("in office")) return "onsite";
  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJob(item: any, companyName: string): FetchedJob {
  const location: string =
    item.location?.name ?? item.offices?.map((o: { name: string }) => o.name).join(", ") ?? "";
  const description = item.content ? stripHtml(item.content) : "";
  return {
    title: item.title ?? "Untitled",
    company: companyName,
    location,
    workMode: inferWorkMode(location + " " + description),
    url: item.absolute_url ?? undefined,
    description,
    reqNumber: String(item.id ?? ""),
  };
}

export async function fetchGreenhouse(slug: string, companyName: string): Promise<FetchResult> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(slug)}/jobs?content=true`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`Greenhouse API returned ${res.status} for slug "${slug}"`);
  }
  const data = await res.json();
  const jobs: FetchedJob[] = (data.jobs ?? []).map((j: unknown) => parseJob(j, companyName));
  return { jobs, source: "greenhouse" };
}
