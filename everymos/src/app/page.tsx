import Link from "next/link";
import { getAllJobs } from "@/lib/data";
import { JobCard } from "@/components/JobCard";
import { Nav, Footer } from "@/components/Nav";

export default function HomePage() {
  const jobs = getAllJobs();
  const verifiedCount = jobs.filter((j) => j.confidence === "verified").length;
  const featured = jobs.slice(0, 6);

  return (
    <>
      <Nav />
      <main id="main">
        <section className="mx-auto max-w-5xl px-4 pt-16 pb-12 md:px-8 md:pt-24 md:pb-16">
          <p className="mono text-sm text-[color:var(--color-signal)]">
            The military jobs reference.
          </p>
          <h1 className="mt-4">
            Every military job. Every branch.
            <br />
            Explained straight.
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-80">
            I&rsquo;m Marc. I spent years in the Marine Corps and more years trying to
            explain to civilians what I actually did. This site is the reference I wish
            existed — for people thinking about enlisting, people already in trying to
            figure out their next move, and veterans translating their experience to a
            resume that makes sense.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="rounded-md bg-[color:var(--color-ink-900)] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-[color:var(--color-signal)]"
            >
              Browse all jobs
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-[color:var(--color-rule)] bg-white px-5 py-3 text-sm font-medium text-[color:var(--color-ink-900)] no-underline hover:border-[color:var(--color-signal)]"
            >
              How this site works
            </Link>
          </div>
          <p className="mono mt-8 text-sm opacity-60">
            {jobs.length} entries · 6 branches · {verifiedCount} verified · sources cited
            on every entry
          </p>
        </section>

        <section className="border-t border-[color:var(--color-rule)] bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
            <h2>How it works</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div>
                <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-signal)]">
                  Look it up
                </p>
                <p className="mt-2 text-sm">
                  Every MOS, AFSC, rating, and SFSC across six branches, with official
                  sources cited.
                </p>
              </div>
              <div>
                <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-signal)]">
                  See where it goes
                </p>
                <p className="mt-2 text-sm">
                  Lateral moves, reclass paths, cross-branch equivalents, and civilian
                  jobs that actually translate.
                </p>
              </div>
              <div>
                <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-signal)]">
                  No recruiter spin
                </p>
                <p className="mt-2 text-sm">
                  I&rsquo;ll tell you what the job is, what training looks like, and what
                  it&rsquo;s like to live with. That&rsquo;s it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <div className="flex items-baseline justify-between">
            <h2>Featured entries</h2>
            <Link href="/jobs" className="text-sm">
              See all →
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
