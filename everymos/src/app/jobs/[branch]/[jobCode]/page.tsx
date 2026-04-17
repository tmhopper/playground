import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobParams, getJob } from "@/lib/data";

type Params = { branch: string; jobCode: string };

export function generateStaticParams(): Params[] {
  return getAllJobParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { branch, jobCode } = await params;
  const job = getJob(branch, jobCode);
  if (!job) return { title: "Not found" };
  return {
    title: `${job.job_code} ${job.job_title}`,
    description: job.description_tldr,
  };
}

const CONFIDENCE_COLOR: Record<string, string> = {
  verified: "var(--color-ok)",
  probable: "var(--color-ink-900)",
  uncertain: "var(--color-warn)",
  incomplete: "var(--color-warn)",
};

export default async function JobDetail({ params }: { params: Promise<Params> }) {
  const { branch, jobCode } = await params;
  const job = getJob(branch, jobCode);
  if (!job) notFound();

  return (
    <main id="main" className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <nav className="mono mb-8 text-xs uppercase tracking-wide opacity-60">
        <Link href="/">Home</Link> / <Link href="/">Jobs</Link> /{" "}
        <span>{job.branch_display}</span> / <span>{job.job_code}</span>
      </nav>

      <header className="mb-12 border-b border-[color:var(--color-rule)] pb-8">
        <div className="flex items-center gap-3">
          <span className="mono rounded bg-[color:var(--color-ink-900)] px-3 py-1 text-lg font-semibold text-white">
            {job.job_code}
          </span>
          <span
            className="mono text-xs uppercase tracking-wide"
            style={{ color: CONFIDENCE_COLOR[job.confidence] ?? "inherit" }}
          >
            {job.confidence}
          </span>
        </div>
        <h1 className="mt-4">{job.job_title}</h1>
        <p className="mono mt-3 text-sm opacity-70">
          {job.branch_display} &middot;{" "}
          {job.personnel_category.replace("_", " ")} &middot;{" "}
          {job.occupational_field.name} ({job.occupational_field.code}) &middot; {job.status}
        </p>
      </header>

      <section className="mb-12">
        <p className="rounded-lg bg-white p-6 text-xl leading-relaxed text-[color:var(--color-ink-900)]">
          {job.description_tldr}
        </p>
      </section>

      <section className="mb-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg">Official</h2>
          <p className="mt-3 text-sm">{job.description_official}</p>
        </div>
        <div>
          <h2 className="text-lg">Plain English</h2>
          <p className="mt-3 text-sm">{job.description_plain}</p>
        </div>
      </section>

      <section className="mb-12">
        <h2>Requirements</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="mono text-xs uppercase opacity-60">ASVAB</dt>
            <dd className="mt-1 mono">{job.asvab.raw_requirement}</dd>
          </div>
          <div>
            <dt className="mono text-xs uppercase opacity-60">Security clearance</dt>
            <dd className="mt-1">{job.security_clearance.replace("_", " ")}</dd>
          </div>
          <div>
            <dt className="mono text-xs uppercase opacity-60">Citizenship</dt>
            <dd className="mt-1">{job.citizenship_required ? "Required" : "Not required"}</dd>
          </div>
          <div>
            <dt className="mono text-xs uppercase opacity-60">Eligible</dt>
            <dd className="mt-1">{job.eligible_genders.replace("_", " ")}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-12">
        <h2>Training pipeline</h2>
        <ol className="mt-4 space-y-4">
          {job.training_pipeline.map((stage, i) => (
            <li
              key={i}
              className="rounded-lg border border-[color:var(--color-rule)] bg-white p-4"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-semibold text-[color:var(--color-ink-900)]">
                  {stage.stage}
                </span>
                <span className="mono text-xs opacity-60">{stage.duration_weeks} weeks</span>
              </div>
              <p className="mt-1 text-sm opacity-80">
                {stage.school_name} &middot; {stage.location}
              </p>
              {stage.description && <p className="mt-2 text-sm">{stage.description}</p>}
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <h2>Compensation</h2>
        <p className="mt-3 text-sm">
          <strong>Entry rank:</strong> {job.compensation.typical_entry_rank}
        </p>
        <p className="mt-1 text-sm">
          <strong>Range:</strong> {job.compensation.typical_rank_range}
        </p>
        {job.compensation.special_pay.length > 0 && (
          <ul className="mt-3 space-y-2 text-sm">
            {job.compensation.special_pay.map((p, i) => (
              <li key={i}>
                <strong>{p.pay_type}</strong> — {p.amount}. {p.conditions}.
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-12">
        <h2>Duty stations</h2>
        <p className="mono mt-3 text-xs uppercase opacity-60">Types</p>
        <p className="mt-1 text-sm">{job.duty_station_types.join(" · ")}</p>
        <p className="mono mt-4 text-xs uppercase opacity-60">Common installations</p>
        <ul className="mt-1 text-sm">
          {job.common_duty_stations.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2>Civilian crosswalk</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {job.civilian_equivalents.map((c, i) => (
            <li
              key={i}
              className="rounded-lg border border-[color:var(--color-rule)] bg-white p-4 text-sm"
            >
              <strong className="text-[color:var(--color-ink-900)]">{c.title}</strong>
              <p className="opacity-70">{c.industry}</p>
              {c.onet_code && (
                <p className="mono mt-1 text-xs opacity-60">O*NET {c.onet_code}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-[color:var(--color-rule)] pt-8 text-sm">
        <h2 className="text-base">Sources</h2>
        <ul className="mt-3 space-y-2 opacity-80">
          {job.sources.map((s, i) => (
            <li key={i}>
              {s.url ? <a href={s.url}>{s.name}</a> : s.name}{" "}
              <span className="mono text-xs opacity-60">
                (accessed {s.accessed_date})
              </span>
            </li>
          ))}
        </ul>
        <p className="mono mt-6 text-xs opacity-60">
          Confidence: {job.confidence} &middot; Last updated: {job.last_updated}
        </p>
        {job.notes && (
          <p className="mt-3 rounded bg-[color:var(--color-paper)] p-3 text-xs opacity-80">
            <strong>Notes:</strong> {job.notes}
          </p>
        )}
      </footer>
    </main>
  );
}
