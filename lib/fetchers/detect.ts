export type AtsType =
  | "greenhouse"
  | "lever"
  | "ashby"
  | "workable"
  | "smartrecruiters"
  | "workday"
  | "other";

type Detection = { ats: AtsType; slug: string };

export function detectAts(url: string): Detection | null {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    const path = u.pathname;

    // Greenhouse: boards.greenhouse.io/slug or job-boards.greenhouse.io/slug
    if (host === "boards.greenhouse.io" || host === "job-boards.greenhouse.io") {
      const slug = path.split("/").filter(Boolean)[0];
      if (slug) return { ats: "greenhouse", slug };
    }

    // Lever: jobs.lever.co/slug
    if (host === "jobs.lever.co") {
      const slug = path.split("/").filter(Boolean)[0];
      if (slug) return { ats: "lever", slug };
    }

    // Ashby: jobs.ashbyhq.com/slug
    if (host === "jobs.ashbyhq.com") {
      const slug = path.split("/").filter(Boolean)[0];
      if (slug) return { ats: "ashby", slug };
    }

    // Workable: apply.workable.com/slug
    if (host === "apply.workable.com") {
      const slug = path.split("/").filter(Boolean)[0];
      if (slug) return { ats: "workable", slug };
    }

    // SmartRecruiters: careers.smartrecruiters.com/slug
    if (host === "careers.smartrecruiters.com") {
      const slug = path.split("/").filter(Boolean)[0];
      if (slug) return { ats: "smartrecruiters", slug };
    }

    // Workday: *.myworkdayjobs.com
    if (host.endsWith(".myworkdayjobs.com")) {
      return { ats: "workday", slug: host };
    }

    return { ats: "other", slug: url };
  } catch {
    return null;
  }
}

// Given a company record's stored ATS type + a careers URL, pick the right slug.
export function slugFromCareersUrl(ats: string, careersUrls: string[]): string | null {
  for (const url of careersUrls) {
    const d = detectAts(url);
    if (d && d.ats === ats) return d.slug;
  }
  return null;
}
