import type { Metadata } from "next";
import Link from "next/link";
import { getAllJobs } from "@/lib/data";
import { Nav, Footer } from "@/components/Nav";
import { BRANCH_ENUM_TO_SLUG } from "@/lib/branch";

export const metadata: Metadata = {
  title: "Database stats",
  description: "Live coverage stats for the EveryMOS database.",
};

export default function StatsPage() {
  const jobs = getAllJobs();

  const byBranch: Record<
    string,
    { display: string; slug: string; count: number; verified: number; uncertain: number; fields: Set<string> }
  > = {};
  for (const j of jobs) {
    byBranch[j.branch] ??= {
      display: j.branch_display,
      slug: BRANCH_ENUM_TO_SLUG[j.branch],
      count: 0,
      verified: 0,
      uncertain: 0,
      fields: new Set(),
    };
    byBranch[j.branch].count++;
    if (j.confidence === "verified") byBranch[j.branch].verified++;
    if (j.confidence === "uncertain" || j.confidence === "incomplete") byBranch[j.branch].uncertain++;
    byBranch[j.branch].fields.add(j.occupational_field.code);
  }

  const withCareerPath = jobs.filter((j) => !!j.career_path).length;
  const enlisted = jobs.filter((j) => j.personnel_category === "enlisted").length;
  const officer = jobs.filter((j) => j.personnel_category === "officer").length;
  const warrant = jobs.filter((j) => j.personnel_category === "warrant_officer").length;

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-12">
          <h1>Database stats</h1>
          <p className="mt-4 opacity-80">
            Live coverage. Every number here is computed at build time from the JSON data files.
            No guessing.
          </p>
        </header>

        <section className="mb-16">
          <h2>Overall</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-4">
            <Stat label="Total entries" value={String(jobs.length)} />
            <Stat label="With career roadmap" value={String(withCareerPath)} />
            <Stat label="Verified" value={String(jobs.filter((j) => j.confidence === "verified").length)} />
            <Stat label="Draft / uncertain" value={String(jobs.filter((j) => j.confidence !== "verified" && j.confidence !== "probable").length)} />
          </dl>
        </section>

        <section className="mb-16">
          <h2>By personnel category</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat label="Enlisted" value={String(enlisted)} />
            <Stat label="Officer" value={String(officer)} />
            <Stat label="Warrant officer" value={String(warrant)} />
          </dl>
        </section>

        <section className="mb-16">
          <h2>By branch</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-[color:var(--color-rule)] bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
                  <th className="p-3 text-left mono text-xs uppercase opacity-60">Branch</th>
                  <th className="p-3 text-right mono text-xs uppercase opacity-60">Entries</th>
                  <th className="p-3 text-right mono text-xs uppercase opacity-60">Fields</th>
                  <th className="p-3 text-right mono text-xs uppercase opacity-60">Verified</th>
                  <th className="p-3 text-right mono text-xs uppercase opacity-60">Draft / uncertain</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(byBranch)
                  .sort((a, b) => b.count - a.count)
                  .map((b) => (
                    <tr key={b.display} className="border-b border-[color:var(--color-rule)] last:border-b-0">
                      <td className="p-3">
                        <Link href={`/jobs/${b.slug}`} className="no-underline hover:underline">
                          {b.display}
                        </Link>
                      </td>
                      <td className="p-3 text-right mono">{b.count}</td>
                      <td className="p-3 text-right mono">{b.fields.size}</td>
                      <td className="p-3 text-right mono" style={{ color: b.verified > 0 ? "var(--color-ok)" : "inherit" }}>
                        {b.verified}
                      </td>
                      <td className="p-3 text-right mono" style={{ color: b.uncertain > 0 ? "var(--color-warn)" : "inherit" }}>
                        {b.uncertain}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-[color:var(--color-rule)] bg-white p-6 text-sm">
          <h2 className="text-lg">Reading the stats</h2>
          <p className="mt-3 opacity-80">
            <strong>Verified</strong> entries have been confirmed against a current official source
            within 90 days. <strong>Draft / uncertain</strong> entries are either pending
            verification, have conflicting sources, or are stubs created to support cross-branch
            comparisons. Read the notes on each entry before relying on specific numbers.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[color:var(--color-rule)] bg-white p-4">
      <dt className="mono text-xs uppercase tracking-wide opacity-60">{label}</dt>
      <dd className="mono mt-1 text-3xl font-semibold text-[color:var(--color-ink-900)]">
        {value}
      </dd>
    </div>
  );
}
