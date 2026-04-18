"use client";

import { useMemo, useState } from "react";
import type { JobEntry } from "@schemas/job";
import { JobCard } from "./JobCard";

type Props = { jobs: JobEntry[] };

const BRANCH_ORDER: JobEntry["branch"][] = [
  "marine_corps",
  "army",
  "air_force",
  "navy",
  "coast_guard",
  "space_force",
];

export function JobsIndexFilter({ jobs }: Props) {
  const [query, setQuery] = useState("");
  const [branches, setBranches] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<Set<string>>(new Set());

  const branchesWithCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const j of jobs) counts.set(j.branch, (counts.get(j.branch) ?? 0) + 1);
    return BRANCH_ORDER.filter((b) => counts.has(b)).map((b) => ({
      value: b,
      label: jobs.find((j) => j.branch === b)!.branch_display,
      count: counts.get(b)!,
    }));
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (branches.size > 0 && !branches.has(j.branch)) return false;
      if (categories.size > 0 && !categories.has(j.personnel_category)) return false;
      if (!q) return true;
      const hay = [
        j.job_code,
        j.job_title,
        j.description_tldr,
        j.description_plain,
        j.occupational_field.name,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [jobs, query, branches, categories]);

  function toggle<T extends string>(set: Set<T>, value: T, setter: (s: Set<T>) => void) {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    setter(next);
  }

  const anyFilterActive = query || branches.size > 0 || categories.size > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside>
        <div className="sticky top-6 space-y-6">
          <div>
            <label htmlFor="q" className="mono text-xs uppercase tracking-wide opacity-60">
              Search
            </label>
            <input
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="code, title, keyword"
              className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3 text-sm"
            />
          </div>

          <div>
            <p className="mono text-xs uppercase tracking-wide opacity-60">Branch</p>
            <ul className="mt-2 space-y-1">
              {branchesWithCounts.map((b) => (
                <li key={b.value}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={branches.has(b.value)}
                      onChange={() => toggle(branches, b.value, setBranches)}
                      className="h-4 w-4"
                    />
                    <span className="flex-1">{b.label}</span>
                    <span className="mono text-xs opacity-60">{b.count}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono text-xs uppercase tracking-wide opacity-60">Category</p>
            <ul className="mt-2 space-y-1">
              {(["enlisted", "officer", "warrant_officer"] as const).map((cat) => (
                <li key={cat}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={categories.has(cat)}
                      onChange={() => toggle(categories, cat, setCategories)}
                      className="h-4 w-4"
                    />
                    <span className="capitalize">{cat.replace("_", " ")}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {anyFilterActive && (
            <button
              onClick={() => {
                setQuery("");
                setBranches(new Set());
                setCategories(new Set());
              }}
              className="mono text-xs text-[color:var(--color-signal)] underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </aside>

      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <p className="mono text-sm opacity-70" aria-live="polite">
            Showing {filtered.length} of {jobs.length} job{jobs.length === 1 ? "" : "s"}
          </p>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-[color:var(--color-rule)] bg-white p-8 text-center text-sm opacity-70">
            No jobs match these filters. Try loosening the search or clearing branches.
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filtered.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
