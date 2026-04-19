"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { JobEntry } from "@schemas/job";
import { JobCard } from "./JobCard";
import { BRANCH_ENUM_TO_SLUG } from "@/lib/branch";

type Props = { jobs: JobEntry[] };

const BRANCH_ORDER: JobEntry["branch"][] = [
  "marine_corps",
  "army",
  "air_force",
  "navy",
  "coast_guard",
  "space_force",
];

const CLEARANCE_ORDER = ["none", "confidential", "secret", "top_secret", "ts_sci"] as const;
type Clearance = (typeof CLEARANCE_ORDER)[number];

type Sort = "relevance" | "code" | "title" | "training" | "updated";
type Density = "compact" | "medium" | "expanded";

function setToCsv(s: Set<string>): string {
  return [...s].sort().join(",");
}
function csvToSet(s: string | null): Set<string> {
  if (!s) return new Set();
  return new Set(s.split(",").filter(Boolean));
}

export function JobsIndexFilter({ jobs }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [branches, setBranches] = useState<Set<string>>(csvToSet(params.get("b")));
  const [categories, setCategories] = useState<Set<string>>(csvToSet(params.get("c")));
  const [fields, setFields] = useState<Set<string>>(csvToSet(params.get("f")));
  const [clearance, setClearance] = useState<Clearance | "any">(
    (params.get("cl") as Clearance | "any") ?? "any",
  );
  const [gtMin, setGtMin] = useState<number>(Number(params.get("gt") ?? 0));
  const [envs, setEnvs] = useState<Set<string>>(csvToSet(params.get("env")));
  const [sort, setSort] = useState<Sort>((params.get("s") as Sort) ?? "relevance");
  const [density, setDensity] = useState<Density>(
    (params.get("d") as Density) ?? "medium",
  );

  // Sync state → URL
  useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (branches.size) next.set("b", setToCsv(branches));
    if (categories.size) next.set("c", setToCsv(categories));
    if (fields.size) next.set("f", setToCsv(fields));
    if (clearance !== "any") next.set("cl", clearance);
    if (gtMin > 0) next.set("gt", String(gtMin));
    if (envs.size) next.set("env", setToCsv(envs));
    if (sort !== "relevance") next.set("s", sort);
    if (density !== "medium") next.set("d", density);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [query, branches, categories, fields, clearance, gtMin, envs, sort, density, pathname, router]);

  const branchesWithCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const j of jobs) counts.set(j.branch, (counts.get(j.branch) ?? 0) + 1);
    return BRANCH_ORDER.filter((b) => counts.has(b)).map((b) => ({
      value: b,
      label: jobs.find((j) => j.branch === b)!.branch_display,
      count: counts.get(b)!,
    }));
  }, [jobs]);

  const availableFields = useMemo(() => {
    const pool = branches.size > 0 ? jobs.filter((j) => branches.has(j.branch)) : jobs;
    const map = new Map<string, { code: string; name: string; count: number }>();
    for (const j of pool) {
      const key = j.occupational_field.code;
      const cur = map.get(key);
      if (cur) cur.count++;
      else map.set(key, { code: key, name: j.occupational_field.name, count: 1 });
    }
    return [...map.values()].sort((a, b) => a.code.localeCompare(b.code));
  }, [jobs, branches]);

  const availableEnvs = useMemo(() => {
    const all = new Set<string>();
    for (const j of jobs) for (const e of j.duty_station_types) all.add(e);
    return [...all].sort();
  }, [jobs]);

  const clearanceRank = (c: JobEntry["security_clearance"]): number => {
    const order: JobEntry["security_clearance"][] = [
      "none",
      "confidential",
      "secret",
      "top_secret",
      "ts_sci",
      "other",
    ];
    return order.indexOf(c);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = jobs.filter((j) => {
      if (branches.size > 0 && !branches.has(j.branch)) return false;
      if (categories.size > 0 && !categories.has(j.personnel_category)) return false;
      if (fields.size > 0 && !fields.has(j.occupational_field.code)) return false;
      if (clearance !== "any") {
        const need = clearanceRank(clearance);
        const have = clearanceRank(j.security_clearance);
        if (have < need) return false;
      }
      if (gtMin > 0) {
        const gt = j.asvab.composites.GT ?? 0;
        if (gt < gtMin) return false;
      }
      if (envs.size > 0) {
        if (!j.duty_station_types.some((e) => envs.has(e))) return false;
      }
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

    const trainingWeeks = (j: JobEntry) =>
      j.training_pipeline.reduce((s, t) => s + t.duration_weeks, 0);

    switch (sort) {
      case "code":
        list = [...list].sort((a, b) => a.job_code.localeCompare(b.job_code));
        break;
      case "title":
        list = [...list].sort((a, b) => a.job_title.localeCompare(b.job_title));
        break;
      case "training":
        list = [...list].sort((a, b) => trainingWeeks(a) - trainingWeeks(b));
        break;
      case "updated":
        list = [...list].sort((a, b) => b.last_updated.localeCompare(a.last_updated));
        break;
      default:
        break;
    }
    return list;
  }, [jobs, query, branches, categories, fields, clearance, gtMin, envs, sort]);

  function toggle(set: Set<string>, value: string, setter: (s: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  }

  // (helpers rendered below)
  const anyFilterActive =
    query ||
    branches.size > 0 ||
    categories.size > 0 ||
    fields.size > 0 ||
    clearance !== "any" ||
    gtMin > 0 ||
    envs.size > 0 ||
    sort !== "relevance";

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
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

          {availableFields.length > 0 && (
            <div>
              <p className="mono text-xs uppercase tracking-wide opacity-60">
                Occupational field
              </p>
              <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto">
                {availableFields.map((f) => (
                  <li key={f.code}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={fields.has(f.code)}
                        onChange={() => toggle(fields, f.code, setFields)}
                        className="h-4 w-4"
                      />
                      <span className="mono text-xs opacity-60">{f.code}</span>
                      <span className="flex-1">{f.name}</span>
                      <span className="mono text-xs opacity-60">{f.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label htmlFor="cl" className="mono text-xs uppercase tracking-wide opacity-60">
              Clearance (minimum)
            </label>
            <select
              id="cl"
              value={clearance}
              onChange={(e) => setClearance(e.target.value as Clearance | "any")}
              className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3 text-sm"
            >
              <option value="any">Any</option>
              <option value="none">None</option>
              <option value="confidential">Confidential+</option>
              <option value="secret">Secret+</option>
              <option value="top_secret">Top Secret+</option>
              <option value="ts_sci">TS/SCI</option>
            </select>
          </div>

          <div>
            <label htmlFor="gt" className="mono text-xs uppercase tracking-wide opacity-60">
              GT ≥ {gtMin || "any"}
            </label>
            <input
              id="gt"
              type="range"
              min={0}
              max={130}
              step={5}
              value={gtMin}
              onChange={(e) => setGtMin(Number(e.target.value))}
              className="mt-2 w-full"
            />
            <p className="mono text-xs opacity-60">Army / USMC GT composite</p>
          </div>

          {availableEnvs.length > 0 && (
            <div>
              <p className="mono text-xs uppercase tracking-wide opacity-60">Environment</p>
              <ul className="mt-2 space-y-1">
                {availableEnvs.map((env) => (
                  <li key={env}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={envs.has(env)}
                        onChange={() => toggle(envs, env, setEnvs)}
                        className="h-4 w-4"
                      />
                      <span className="capitalize">{env.replace("_", " ")}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {anyFilterActive && (
            <button
              onClick={() => {
                setQuery("");
                setBranches(new Set());
                setCategories(new Set());
                setFields(new Set());
                setClearance("any");
                setGtMin(0);
                setEnvs(new Set());
                setSort("relevance");
              }}
              className="mono text-xs text-[color:var(--color-signal)] underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </aside>

      <div>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <p className="mono text-sm opacity-70" aria-live="polite">
            Showing {filtered.length} of {jobs.length} job{jobs.length === 1 ? "" : "s"}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-md border border-[color:var(--color-rule)] bg-white p-1 text-xs">
              {(["compact", "medium", "expanded"] as Density[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDensity(d)}
                  className={
                    "mono rounded px-2 py-1 capitalize " +
                    (density === d
                      ? "bg-[color:var(--color-ink-900)] text-white"
                      : "opacity-70 hover:opacity-100")
                  }
                  aria-pressed={density === d}
                >
                  {d}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="mono text-xs uppercase tracking-wide opacity-60">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-9 rounded-md border border-[color:var(--color-rule)] bg-white px-2 text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="code">Job code</option>
                <option value="title">Title</option>
                <option value="training">Training length</option>
                <option value="updated">Recently updated</option>
              </select>
            </label>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-[color:var(--color-rule)] bg-white p-8 text-center text-sm opacity-70">
            No jobs match these filters. Try loosening the search or clearing filters.
          </div>
        ) : density === "compact" ? (
          <CompactTable jobs={filtered} />
        ) : density === "expanded" ? (
          <ul className="space-y-4">
            {filtered.map((job) => (
              <li key={job.id}>
                <ExpandedRow job={job} />
              </li>
            ))}
          </ul>
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

function CompactTable({ jobs }: { jobs: JobEntry[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[color:var(--color-rule)] bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
            <th className="p-2 text-left mono text-xs uppercase tracking-wide opacity-60">Code</th>
            <th className="p-2 text-left mono text-xs uppercase tracking-wide opacity-60">Title</th>
            <th className="hidden p-2 text-left mono text-xs uppercase tracking-wide opacity-60 sm:table-cell">Branch</th>
            <th className="hidden p-2 text-left mono text-xs uppercase tracking-wide opacity-60 md:table-cell">Field</th>
            <th className="hidden p-2 text-right mono text-xs uppercase tracking-wide opacity-60 md:table-cell">ASVAB</th>
            <th className="hidden p-2 text-right mono text-xs uppercase tracking-wide opacity-60 lg:table-cell">Clearance</th>
            <th className="p-2 text-right mono text-xs uppercase tracking-wide opacity-60">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b border-[color:var(--color-rule)] last:border-b-0">
              <td className="p-2">
                <Link
                  href={`/jobs/${BRANCH_ENUM_TO_SLUG[job.branch]}/${job.job_code.toLowerCase()}`}
                  className="mono font-semibold no-underline"
                >
                  {job.job_code}
                </Link>
              </td>
              <td className="p-2">
                <Link
                  href={`/jobs/${BRANCH_ENUM_TO_SLUG[job.branch]}/${job.job_code.toLowerCase()}`}
                  className="no-underline"
                >
                  {job.job_title}
                </Link>
              </td>
              <td className="hidden p-2 mono text-xs opacity-70 sm:table-cell">{job.branch_display}</td>
              <td className="hidden p-2 opacity-80 md:table-cell">{job.occupational_field.name}</td>
              <td className="hidden p-2 text-right mono text-xs opacity-80 md:table-cell">
                {job.asvab.raw_requirement.split(" (")[0]}
              </td>
              <td className="hidden p-2 text-right mono text-xs capitalize opacity-70 lg:table-cell">
                {job.security_clearance.replace("_", " ")}
              </td>
              <td className="p-2 text-right mono text-xs uppercase opacity-70">{job.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExpandedRow({ job }: { job: JobEntry }) {
  const totalWeeks = job.training_pipeline.reduce((s, t) => s + t.duration_weeks, 0);
  return (
    <Link
      href={`/jobs/${BRANCH_ENUM_TO_SLUG[job.branch]}/${job.job_code.toLowerCase()}`}
      className="block rounded-lg border border-[color:var(--color-rule)] bg-white p-5 no-underline hover:border-[color:var(--color-signal)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="mono text-lg font-semibold text-[color:var(--color-ink-900)]">
            {job.job_code}
          </span>
          <span className="text-lg text-[color:var(--color-ink-900)]">{job.job_title}</span>
        </div>
        <span className="mono text-xs uppercase tracking-wide opacity-60">
          {job.branch_display}
        </span>
      </div>
      <p className="mt-3 text-sm">{job.description_tldr}</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-4">
        <Cell label="ASVAB">{job.asvab.raw_requirement.split(" (")[0]}</Cell>
        <Cell label="Clearance">{job.security_clearance.replace("_", " ")}</Cell>
        <Cell label="Training">{totalWeeks} wk</Cell>
        <Cell label="Category">{job.personnel_category.replace("_", " ")}</Cell>
      </dl>
      {Object.keys(job.asvab.composites).length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {Object.entries(job.asvab.composites).map(([k, v]) => (
            <span
              key={k}
              className="mono rounded border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-2 py-0.5 text-xs"
            >
              {k} ≥ {v}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mono text-xs uppercase tracking-wide opacity-60">{label}</dt>
      <dd className="mono text-sm capitalize text-[color:var(--color-ink-900)]">{children}</dd>
    </div>
  );
}
