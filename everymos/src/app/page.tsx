import Link from "next/link";
import { getAllJobs } from "@/lib/data";
import { JobCard } from "@/components/JobCard";
import { Nav, Footer } from "@/components/Nav";
import { BranchSeal } from "@/components/BranchSeal";
import { HeroSearch } from "@/components/HeroSearch";
import { BRANCH_ENUM_TO_SLUG } from "@/lib/branch";
import type { Branch } from "@schemas/job";
import { POSTS } from "../../data/posts";

const BRANCH_ORDER: Branch[] = [
  "marine_corps",
  "army",
  "air_force",
  "navy",
  "coast_guard",
  "space_force",
];

// Illustrative "popular" codes per branch — surfaces one flagship entry each.
const POPULAR_CODES: Record<Branch, string[]> = {
  marine_corps: ["0311", "0317", "0621", "5811", "0302"],
  army: ["11B", "68W"],
  air_force: ["1D7X1", "1C4X1"],
  navy: ["BM", "HM"],
  coast_guard: ["ME", "AST"],
  space_force: ["5C0X1"],
};

export default function HomePage() {
  const jobs = getAllJobs();
  const verifiedCount = jobs.filter((j) => j.confidence === "verified").length;

  // One representative entry per branch
  const perBranchFeature: Record<string, typeof jobs[number] | null> = {};
  for (const b of BRANCH_ORDER) {
    perBranchFeature[b] = jobs.find((j) => j.branch === b) ?? null;
  }

  return (
    <>
      <Nav />
      <main id="main">
        {/* HERO */}
        <section className="border-b border-[color:var(--color-rule)]">
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-16 md:px-8 md:pt-24 md:pb-20">
            <p className="mono text-sm text-[color:var(--color-signal)]">
              The military jobs reference.
            </p>
            <h1 className="mt-4">
              Every military job.
              <br />
              Every branch.
              <br />
              Explained straight.
            </h1>
            <p className="mt-8 max-w-2xl text-lg opacity-80">
              I&rsquo;m Marc. I spent years in the Marine Corps and more years trying to
              explain to civilians what I actually did. This site is the reference I wish
              existed — sources cited, no recruiter spin, rank ladder to pay range in one
              place.
            </p>
            <div className="mt-10">
              <HeroSearch />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="rounded-md bg-[color:var(--color-ink-900)] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-[color:var(--color-signal)]"
              >
                Browse all jobs
              </Link>
              <Link
                href="/jobs/marine-corps/0311"
                className="rounded-md border border-[color:var(--color-rule)] bg-white px-5 py-3 text-sm font-medium text-[color:var(--color-ink-900)] no-underline hover:border-[color:var(--color-signal)]"
              >
                See a full entry — 0311 Rifleman
              </Link>
            </div>
            <p className="mono mt-10 text-sm opacity-60">
              {jobs.length} entries · 6 branches · {verifiedCount} verified · sources cited
              on every entry
            </p>
          </div>
        </section>

        {/* BRANCH GRID */}
        <section className="border-b border-[color:var(--color-rule)] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <h2>Pick a branch</h2>
            <p className="mt-2 max-w-2xl text-sm opacity-70">
              Every branch uses different terms for its jobs — MOS, AFSC, Rating, SFSC.
              Same idea, different names. Click a seal to open the branch overview.
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BRANCH_ORDER.map((branch) => {
                const slug = BRANCH_ENUM_TO_SLUG[branch];
                const count = jobs.filter((j) => j.branch === branch).length;
                const any = perBranchFeature[branch];
                return (
                  <li key={branch}>
                    <Link
                      href={`/jobs/${slug}`}
                      className="flex gap-4 rounded-lg border border-[color:var(--color-rule)] bg-white p-5 no-underline transition hover:border-[color:var(--color-signal)]"
                    >
                      <BranchSeal branch={branch} size={72} />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg">{any?.branch_display ?? branch}</h3>
                        <p className="mono mt-1 text-xs opacity-60">
                          {count} entr{count === 1 ? "y" : "ies"} in database
                        </p>
                        {any && (
                          <p className="mt-2 text-sm opacity-80">
                            e.g. <span className="mono">{any.job_code}</span>{" "}
                            {any.job_title}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* POPULAR JOBS LIST */}
        <section className="border-b border-[color:var(--color-rule)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <div className="flex items-baseline justify-between">
              <h2>Popular jobs</h2>
              <Link href="/jobs" className="text-sm">
                See all {jobs.length} →
              </Link>
            </div>
            <p className="mt-2 max-w-2xl text-sm opacity-70">
              Most-viewed entries across all branches. Click any to open the full entry
              with career roadmap, pay, and civilian translations.
            </p>
            <div className="mt-8 overflow-x-auto rounded-lg border border-[color:var(--color-rule)] bg-white">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
                    <th className="p-3 text-left mono text-xs uppercase tracking-wide opacity-60">Branch</th>
                    <th className="p-3 text-left mono text-xs uppercase tracking-wide opacity-60">Code</th>
                    <th className="p-3 text-left mono text-xs uppercase tracking-wide opacity-60">Job</th>
                    <th className="hidden p-3 text-left mono text-xs uppercase tracking-wide opacity-60 md:table-cell">
                      Category
                    </th>
                    <th className="hidden p-3 text-right mono text-xs uppercase tracking-wide opacity-60 md:table-cell">
                      ASVAB
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BRANCH_ORDER.flatMap((b) =>
                    (POPULAR_CODES[b] ?? [])
                      .map((code) =>
                        jobs.find(
                          (j) =>
                            j.branch === b &&
                            j.job_code.toLowerCase() === code.toLowerCase(),
                        ),
                      )
                      .filter((j): j is NonNullable<typeof j> => !!j),
                  ).map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-[color:var(--color-rule)] last:border-b-0"
                    >
                      <td className="p-3">
                        <Link
                          href={`/jobs/${BRANCH_ENUM_TO_SLUG[job.branch]}`}
                          className="mono text-xs opacity-70 no-underline hover:text-[color:var(--color-signal)]"
                        >
                          {job.branch_display}
                        </Link>
                      </td>
                      <td className="p-3">
                        <Link
                          href={`/jobs/${BRANCH_ENUM_TO_SLUG[job.branch]}/${job.job_code.toLowerCase()}`}
                          className="mono font-semibold no-underline"
                        >
                          {job.job_code}
                        </Link>
                      </td>
                      <td className="p-3">
                        <Link
                          href={`/jobs/${BRANCH_ENUM_TO_SLUG[job.branch]}/${job.job_code.toLowerCase()}`}
                          className="no-underline"
                        >
                          {job.job_title}
                        </Link>
                      </td>
                      <td className="hidden p-3 capitalize opacity-80 md:table-cell">
                        {job.personnel_category.replace("_", " ")}
                      </td>
                      <td className="hidden p-3 text-right mono text-xs opacity-80 md:table-cell">
                        {job.asvab.raw_requirement.split(" (")[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WHAT EVERY PAGE HAS */}
        <section className="border-b border-[color:var(--color-rule)] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <h2>What&rsquo;s on every job page</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Feature label="The job, plain" body="Official description from branch sources, plus a plain-English version of what you actually do day-to-day." />
              <Feature label="Every ASVAB composite" body="Not just the primary — all composites the branch publishes for this specialty, plus AFQT where applicable." />
              <Feature label="Training pipeline" body="Every stage from entry to MOS-qualified, with school name, location, and duration." />
              <Feature label="Career roadmap" body="Rank-by-rank progression, B-billets (recruiter, drill instructor, MSG), lateral moves, reclass paths." />
              <Feature label="Rank-up speed" body="How fast you pick up rank. Typical time-in-service to E-4, E-5, E-7 with notes on what accelerates and slows it." />
              <Feature label="Real pay" body="DFAS base pay by paygrade across 0, 4, 10, 20 years in service, visualized as bars." />
              <Feature label="Civilian crosswalk" body="Civilian jobs that translate, with O*NET codes and real salary ranges from BLS." />
              <Feature label="Notable holders" body="Historical and well-known figures who held this MOS. Because knowing who came before matters." />
              <Feature label="Sources cited" body="Every entry is linked to marines.mil, COOL.osd.mil, classification manuals. No anonymous claims." />
            </div>
          </div>
        </section>

        {/* FROM THE LOG */}
        <section className="border-b border-[color:var(--color-rule)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <div className="flex items-baseline justify-between">
              <h2>From the log</h2>
              <Link href="/blog" className="text-sm">
                All posts →
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {[...POSTS]
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 3)
                .map((p) => (
                  <li
                    key={p.slug}
                    className="rounded-lg border border-[color:var(--color-rule)] bg-white p-5"
                  >
                    <p className="mono text-xs uppercase tracking-wide opacity-60">
                      {p.category}
                    </p>
                    <h3 className="mt-2 text-lg">
                      <Link href={`/blog/${p.slug}`} className="no-underline">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mono mt-1 text-xs opacity-60">{p.read_time}</p>
                    <p className="mt-3 text-sm opacity-80">{p.excerpt}</p>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="border-b border-[color:var(--color-rule)] bg-white">
          <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 text-center">
            <h2>Get new entries in your inbox</h2>
            <p className="mt-4 opacity-80">
              One email a week. New job entries, a deep-dive, and the occasional tool. No
              spam, no recruiter handoffs.
            </p>
            <div className="mt-8">
              <Link
                href="/newsletter"
                className="inline-block rounded-md bg-[color:var(--color-ink-900)] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-[color:var(--color-signal)]"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </section>

        {/* TRUST ROW */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
            <ul className="grid gap-6 text-center sm:grid-cols-2 md:grid-cols-4">
              <TrustItem label="Sources cited on every entry" />
              <TrustItem label="No recruiter referrals" />
              <TrustItem label="Veteran-owned (USMC)" />
              <TrustItem label="Free to use" />
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Feature({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-signal)]">
        {label}
      </p>
      <p className="mt-2 text-sm opacity-80">{body}</p>
    </div>
  );
}

function TrustItem({ label }: { label: string }) {
  return <li className="mono text-xs uppercase tracking-wide opacity-70">{label}</li>;
}
