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
  const loc = item.location ?? item.locationName ?? "";
  let workMode: string | undefined;
  const remote = item.isRemote ?? item.locationIsRemote;
  if (remote === true) workMode = "remote";
  else if (item.employmentType === "Hybrid") workMode = "hybrid";

  return {
    title: item.title ?? item.jobTitle ?? "Untitled",
    company: companyName,
    location: loc,
    workMode,
    url: item.jobUrl ?? item.applyUrl ?? undefined,
    description: item.descriptionHtml ? stripHtml(item.descriptionHtml) : (item.description ?? ""),
    reqNumber: item.id ?? undefined,
  };
}

export async function fetchAshby(slug: string, companyName: string): Promise<FetchResult> {
  const url = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`Ashby API returned ${res.status} for slug "${slug}"`);
  }
  const data = await res.json();
  const items = data.jobs ?? data.data?.jobs ?? [];
  const jobs: FetchedJob[] = items.map((j: unknown) => parseJob(j, companyName));
  return { jobs, source: "ashby" };
}
