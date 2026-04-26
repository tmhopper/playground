import type { FetchedJob, FetchResult } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJob(item: any, companyName: string): FetchedJob {
  const loc = item.location?.city
    ? [item.location.city, item.location.country].filter(Boolean).join(", ")
    : "";
  let workMode: string | undefined;
  if (item.workplace === "FULLY_REMOTE") workMode = "remote";
  else if (item.workplace === "PARTIALLY_REMOTE") workMode = "hybrid";
  else if (item.workplace === "OFFICE") workMode = "onsite";

  return {
    title: item.name ?? "Untitled",
    company: companyName,
    location: loc,
    workMode,
    url: item.ref ?? undefined,
    description: item.jobAd?.sections?.jobDescription?.text ?? "",
    reqNumber: item.id ?? undefined,
  };
}

export async function fetchSmartRecruiters(slug: string, companyName: string): Promise<FetchResult> {
  const url = `https://api.smartrecruiters.com/v1/companies/${encodeURIComponent(slug)}/postings?limit=100`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`SmartRecruiters API returned ${res.status} for slug "${slug}"`);
  }
  const data = await res.json();
  const items = data.content ?? [];
  const jobs: FetchedJob[] = items.map((j: unknown) => parseJob(j, companyName));
  return { jobs, source: "smartrecruiters" };
}
