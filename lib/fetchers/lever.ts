import type { FetchedJob, FetchResult } from "./types";

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJob(item: any, companyName: string): FetchedJob {
  const location: string = item.categories?.location ?? item.workplaceType ?? "";
  let workMode: string | undefined;
  const wt = (item.workplaceType ?? "").toLowerCase();
  if (wt === "remote") workMode = "remote";
  else if (wt === "hybrid") workMode = "hybrid";
  else if (wt === "onsite" || wt === "in-person") workMode = "onsite";

  const descParts: string[] = [];
  if (item.description) descParts.push(stripHtml(item.description));
  if (item.descriptionBody) descParts.push(stripHtml(item.descriptionBody));
  if (item.lists) {
    for (const l of item.lists) {
      descParts.push(l.text ? `${l.text}\n${(l.content ?? "")}` : (l.content ?? ""));
    }
  }

  return {
    title: item.text ?? "Untitled",
    company: companyName,
    location,
    workMode,
    url: item.hostedUrl ?? item.applyUrl ?? undefined,
    description: stripHtml(descParts.join("\n\n")),
    reqNumber: item.id ?? undefined,
  };
}

export async function fetchLever(slug: string, companyName: string): Promise<FetchResult> {
  const url = `https://api.lever.co/v0/postings/${encodeURIComponent(slug)}?mode=json`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`Lever API returned ${res.status} for slug "${slug}"`);
  }
  const data = await res.json();
  const items = Array.isArray(data) ? data : data.data ?? [];
  const jobs: FetchedJob[] = items.map((j: unknown) => parseJob(j, companyName));
  return { jobs, source: "lever" };
}
