"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { JobEntry } from "@schemas/job";
import { BRANCH_ENUM_TO_SLUG } from "@/lib/branch";

type Props = { jobs: JobEntry[] };

export function CompareClient({ jobs }: Props) {
  const [picks, setPicks] = useState<string[]>(() => {
    const usmc = jobs.find((j) => j.id === "marine_corps_0311");
    const army = jobs.find((j) => j.id === "army_11b");
    const af = jobs.find((j) => j.id === "air_force_1d7x1");
    return [usmc?.id, army?.id, af?.id].filter(Boolean) as string[];
  });

  const selectedJobs = picks
    .map((id) => jobs.find((j) => j.id === id))
    .filter((j): j is JobEntry => !!j);

  function updatePick(index: number, id: string) {
    const next = [...picks];
    if (id) next[index] = id;
    else next.splice(index, 1);
    setPicks(next);
  }

  function addPick() {
    if (picks.length >= 4) return;
    const firstUnselected = jobs.find((j) => !picks.includes(j.id));
    if (firstUnselected) setPicks([...picks, firstUnselected.id]);
  }

  const rows = useMemo<{ label: string; values: string[] }[]>(() => {
    if (selectedJobs.length === 0) return [];
    return [
      { label: "Branch", values: selectedJobs.map((j) => j.branch_display) },
      { label: "Classification", values: selectedJobs.map((j) => j.classification_term) },
      { label: "Category", values: selectedJobs.map((j) => j.personnel_category.replace("_", " ")) },
      { label: "Occupational field", values: selectedJobs.map((j) => `${j.occupational_field.code} · ${j.occupational_field.name}`) },
      { label: "TL;DR", values: selectedJobs.map((j) => j.description_tldr) },
      { label: "ASVAB", values: selectedJobs.map((j) => j.asvab.raw_requirement) },
      { label: "Clearance", values: selectedJobs.map((j) => j.security_clearance.replace("_", " ")) },
      { label: "Swim qualified", values: selectedJobs.map((j) => j.physical_requirements.swim_qualified === true ? "Yes" : j.physical_requirements.swim_qualified === false ? "No" : "—") },
      { label: "Training weeks (total)", values: selectedJobs.map((j) => String(j.training_pipeline.reduce((s, t) => s + t.duration_weeks, 0))) },
      { label: "Entry rank", values: selectedJobs.map((j) => j.compensation.typical_entry_rank) },
      { label: "Rank range", values: selectedJobs.map((j) => j.compensation.typical_rank_range) },
      { label: "Duty environments", values: selectedJobs.map((j) => j.duty_station_types.join(", ")) },
      { label: "Civilian equivalents", values: selectedJobs.map((j) => j.civilian_equivalents.map((c) => c.title).join(", ") || "—") },
      { label: "Confidence", values: selectedJobs.map((j) => j.confidence) },
    ];
  }, [selectedJobs]);

  return (
    <>
      {/* Pickers */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {picks.map((id, i) => (
          <div key={i} className="rounded-lg border border-[color:var(--color-rule)] bg-white p-3">
            <label className="mono block text-xs uppercase tracking-wide opacity-60">
              Column {i + 1}
            </label>
            <select
              value={id}
              onChange={(e) => updatePick(i, e.target.value)}
              className="mt-1 w-full bg-transparent text-sm"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.branch_display} · {j.job_code} {j.job_title}
                </option>
              ))}
            </select>
            {picks.length > 1 && (
              <button
                onClick={() => updatePick(i, "")}
                className="mono mt-2 text-xs text-[color:var(--color-signal)] underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {picks.length < 4 && (
          <button
            onClick={addPick}
            className="rounded-lg border border-dashed border-[color:var(--color-rule)] p-3 text-sm opacity-70 hover:border-[color:var(--color-signal)] hover:opacity-100"
          >
            + Add column
          </button>
        )}
      </div>

      {/* Table */}
      {selectedJobs.length === 0 ? (
        <p className="rounded-lg border border-[color:var(--color-rule)] bg-white p-6 text-sm opacity-70">
          Pick at least one job to compare.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[color:var(--color-rule)] bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
                <th scope="col" className="w-48 p-3 text-left mono text-xs uppercase tracking-wide opacity-60">
                  Field
                </th>
                {selectedJobs.map((j) => (
                  <th key={j.id} scope="col" className="p-3 text-left">
                    <Link
                      href={`/jobs/${BRANCH_ENUM_TO_SLUG[j.branch]}/${j.job_code.toLowerCase()}`}
                      className="no-underline"
                    >
                      <div className="mono text-xs opacity-60">{j.branch_display}</div>
                      <div className="mono mt-1 text-base font-semibold text-[color:var(--color-ink-900)]">
                        {j.job_code}
                      </div>
                      <div className="text-sm">{j.job_title}</div>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-[color:var(--color-paper)]"}>
                  <th scope="row" className="p-3 text-left align-top mono text-xs uppercase tracking-wide opacity-60">
                    {row.label}
                  </th>
                  {row.values.map((v, j) => (
                    <td key={j} className="p-3 align-top text-sm">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
