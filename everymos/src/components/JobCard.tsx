import Link from "next/link";
import type { JobEntry } from "@schemas/job";
import { BRANCH_ENUM_TO_SLUG } from "@/lib/branch";

const CONFIDENCE_LABEL: Record<string, { label: string; color: string }> = {
  verified: { label: "verified", color: "var(--color-ok)" },
  probable: { label: "probable", color: "var(--color-ink-900)" },
  uncertain: { label: "uncertain", color: "var(--color-warn)" },
  incomplete: { label: "stub", color: "var(--color-warn)" },
};

const BRANCH_ACCENT: Record<JobEntry["branch"], string> = {
  marine_corps: "#8B0000",
  army: "#4B5320",
  air_force: "#00308F",
  navy: "#1C3F7C",
  coast_guard: "#CC5500",
  space_force: "#1D2951",
};

const CATEGORY_LABEL: Record<JobEntry["personnel_category"], string> = {
  enlisted: "Enlisted",
  officer: "Officer",
  warrant_officer: "Warrant Officer",
};

export function JobCard({ job }: { job: JobEntry }) {
  const conf = CONFIDENCE_LABEL[job.confidence];
  const accent = BRANCH_ACCENT[job.branch];
  return (
    <Link
      href={`/jobs/${BRANCH_ENUM_TO_SLUG[job.branch]}/${job.job_code.toLowerCase()}`}
      className="group relative block overflow-hidden rounded-lg border border-[color:var(--color-rule)] bg-white no-underline transition hover:border-[color:var(--color-signal)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1"
        style={{ background: accent }}
      />
      <div className="p-5 pl-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="mono text-base font-semibold text-[color:var(--color-ink-900)]">
            {job.job_code}
          </span>
          <span className="mono text-xs uppercase tracking-wide opacity-60">
            {job.branch_display}
          </span>
        </div>
        <h3 className="mt-2 text-lg">{job.job_title}</h3>
        <p className="mt-2 text-sm opacity-80">{job.description_tldr}</p>
        <div className="mt-4 flex items-center justify-between gap-2 text-xs">
          <span className="mono opacity-60">
            {CATEGORY_LABEL[job.personnel_category]} · {job.occupational_field.name}
          </span>
          <span className="mono uppercase" style={{ color: conf.color }}>
            {conf.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
