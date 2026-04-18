import type { JobEntry } from "@schemas/job";

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[,.()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function allLocationSlugs(jobs: JobEntry[]): { slug: string; label: string }[] {
  const seen = new Map<string, string>();
  for (const j of jobs) {
    for (const station of j.common_duty_stations) {
      const slug = slugify(station);
      if (slug && !seen.has(slug)) seen.set(slug, station);
    }
  }
  return [...seen.entries()].map(([slug, label]) => ({ slug, label }));
}

export function jobsAtLocation(jobs: JobEntry[], slug: string): JobEntry[] {
  return jobs.filter((j) => j.common_duty_stations.some((s) => slugify(s) === slug));
}

export function allGtThresholds(): number[] {
  return [80, 90, 100, 110, 120];
}

export function jobsByGtThreshold(jobs: JobEntry[], threshold: number): JobEntry[] {
  return jobs.filter((j) => (j.asvab.composites.GT ?? 0) >= threshold);
}

export function allCivilianSlugs(
  jobs: JobEntry[],
): { slug: string; label: string; industry: string }[] {
  const seen = new Map<string, { label: string; industry: string }>();
  for (const j of jobs) {
    for (const c of j.civilian_equivalents) {
      const slug = slugify(c.title);
      if (slug && !seen.has(slug)) seen.set(slug, { label: c.title, industry: c.industry });
    }
  }
  return [...seen.entries()].map(([slug, { label, industry }]) => ({ slug, label, industry }));
}

export function jobsForCivilian(jobs: JobEntry[], slug: string): JobEntry[] {
  return jobs.filter((j) =>
    j.civilian_equivalents.some((c) => slugify(c.title) === slug),
  );
}
