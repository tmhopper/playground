import type { FetchedJob, FetchResult } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJob(item: any, companyName: string): FetchedJob {
  const loc = item.location?.city
    ? [item.location.city, item.location.country].filter(Boolean).join(", ")
    : "";
  let workMode: string | undefined;
  if (item.remote === true) workMode = "remote";
  else if (item.workplace?.toLowerCase().includes("hybrid")) workMode = "hybrid";

  return {
    title: item.title ?? "Untitled",
    company: companyName,
    location: loc,
    workMode,
    url: item.url ?? undefined,
    description: item.description ?? item.requirements ?? "",
    reqNumber: item.shortcode ?? item.id ?? undefined,
  };
}

export async function fetchWorkable(slug: string, companyName: string): Promise<FetchResult> {
  const url = `https://apply.workable.com/api/v3/accounts/${encodeURIComponent(slug)}/jobs`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "", location: [], department: [], worktype: [], remote: [] }),
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error(`Workable API returned ${res.status} for slug "${slug}"`);
  }
  const data = await res.json();
  const items = data.results ?? [];
  const jobs: FetchedJob[] = items.map((j: unknown) => parseJob(j, companyName));
  return { jobs, source: "workable" };
}
