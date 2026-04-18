import Link from "next/link";
import { getAllJobs } from "@/lib/data";
import { JobCard } from "@/components/JobCard";
import { Nav, Footer } from "@/components/Nav";

export default function HomePage() {
  const jobs = getAllJobs();
  const verifiedCount = jobs.filter((j) => j.confidence === "verified").length;
  const usmcJobs = jobs.filter((j) => j.branch === "marine_corps");
  const featured = usmcJobs.slice(0, 6);

  const fieldsByBranch = jobs.reduce<Record<string, Set<string>>>((acc, j) => {
    (acc[j.branch_display] ??= new Set()).add(j.occupational_field.code);
    return acc;
  }, {});

  return (
    <>
      <Nav />
      <main id="main">
        {/* HERO */}
        <section className="border-b border-[color:var(--color-rule)]">
          <div className="mx-auto max-w-5xl px-4 pt-16 pb-16 md:px-8 md:pt-24 md:pb-24">
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
              existed — for people thinking about enlisting, service members figuring out
              their next move, and veterans translating their experience to a resume that
              makes sense.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
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
              {jobs.length} entries &middot; 6 branches &middot; {verifiedCount} verified
              &middot; sources cited on every entry
            </p>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="border-b border-[color:var(--color-rule)] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <h2>What&rsquo;s on every job page</h2>
            <p className="mt-2 max-w-2xl text-sm opacity-70">
              Not a recruiting blurb. A complete reference built the way I wish someone had
              written it for me.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Feature
                label="What the job actually is"
                body="Official description from branch sources, plus a plain-English version of what the day-to-day looks like."
              />
              <Feature
                label="Requirements"
                body="ASVAB composites, clearance, physical standards, citizenship, and any MOS-specific prerequisites."
              />
              <Feature
                label="Training pipeline"
                body="Every stage from entry through MOS-qualified, with school name, location, and duration."
              />
              <Feature
                label="Career roadmap"
                body="Rank-by-rank progression, B-billets (recruiter, drill instructor, MSG), lateral moves, and reclass paths."
              />
              <Feature
                label="Compensation"
                body="Typical entry rank, pay range, and special pay — hostile-fire, hazardous duty, bonuses."
              />
              <Feature
                label="Civilian crosswalk"
                body="Civilian jobs that translate, with O*NET codes and certification paths through DoD COOL."
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-b border-[color:var(--color-rule)]">
          <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
            <h2>How this site works</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div>
                <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-signal)]">
                  01 Look it up
                </p>
                <p className="mt-2 text-sm">
                  Every MOS, AFSC, rating, and SFSC across six branches, with official
                  sources cited.
                </p>
              </div>
              <div>
                <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-signal)]">
                  02 See where it goes
                </p>
                <p className="mt-2 text-sm">
                  Lateral moves, reclass paths, cross-branch equivalents, and civilian
                  jobs that actually translate.
                </p>
              </div>
              <div>
                <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-signal)]">
                  03 No recruiter spin
                </p>
                <p className="mt-2 text-sm">
                  I&rsquo;ll tell you what the job is, what training looks like, and what
                  it&rsquo;s like to live with. That&rsquo;s it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED CAREERS */}
        <section className="border-b border-[color:var(--color-rule)] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
            <div className="flex items-baseline justify-between">
              <h2>Featured entries</h2>
              <Link href="/jobs" className="text-sm">
                See all {jobs.length} →
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((job) => (
                <li key={job.id}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* BRANCHES */}
        <section className="border-b border-[color:var(--color-rule)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
            <h2>Browse by branch</h2>
            <p className="mt-2 text-sm opacity-70">
              Marine Corps is the priority — it&rsquo;s where I served and where the
              deepest content lives. Other branches are in progress.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { slug: "marine-corps", display: "U.S. Marine Corps", term: "MOS" },
                { slug: "army", display: "U.S. Army", term: "MOS" },
                { slug: "air-force", display: "U.S. Air Force", term: "AFSC" },
                { slug: "navy", display: "U.S. Navy", term: "Rating" },
                { slug: "coast-guard", display: "U.S. Coast Guard", term: "Rating" },
                { slug: "space-force", display: "U.S. Space Force", term: "SFSC" },
              ].map((b) => {
                const fieldCount = fieldsByBranch[b.display]?.size ?? 0;
                const jobCount = jobs.filter((j) => j.branch_display === b.display).length;
                return (
                  <li key={b.slug}>
                    <Link
                      href={`/jobs/${b.slug}`}
                      className="block rounded-lg border border-[color:var(--color-rule)] bg-white p-5 no-underline hover:border-[color:var(--color-signal)]"
                    >
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-lg">{b.display}</h3>
                        <span className="mono text-xs opacity-60">{b.term}</span>
                      </div>
                      <p className="mono mt-3 text-xs opacity-70">
                        {jobCount} entr{jobCount === 1 ? "y" : "ies"} &middot; {fieldCount}{" "}
                        field{fieldCount === 1 ? "" : "s"}
                      </p>
                    </Link>
                  </li>
                );
              })}
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
  return (
    <li className="mono text-xs uppercase tracking-wide opacity-70">
      {label}
    </li>
  );
}
