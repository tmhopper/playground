import Link from "next/link";
import { getAllJobs, BRANCH_ENUM_TO_SLUG } from "@/lib/data";

export default function HomePage() {
  const jobs = getAllJobs();
  const verifiedCount = jobs.filter((j) => j.confidence === "verified").length;

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <header className="mb-16">
        <p className="mono text-sm text-[color:var(--color-ink-700)] opacity-70">
          EveryMOS
        </p>
        <h1 className="mt-4">Every military job. Every branch. Explained straight.</h1>
        <p className="mt-6 max-w-2xl">
          I&rsquo;m Marc. I spent years in the Marine Corps and more years trying to explain to
          civilians what I actually did. This site is the reference I wish existed &mdash;
          for people thinking about enlisting, people already in trying to figure out their
          next move, and veterans translating their experience to a resume that makes sense.
        </p>
        <p className="mono mt-6 text-sm opacity-60">
          {jobs.length} job{jobs.length === 1 ? "" : "s"} published &middot; 6 branches
          &middot; {verifiedCount} verified &middot; sources cited on every entry
        </p>
      </header>

      <section className="mb-16">
        <h2>Currently published</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link
                href={`/jobs/${BRANCH_ENUM_TO_SLUG[job.branch]}/${job.job_code.toLowerCase()}`}
                className="block rounded-lg border border-[color:var(--color-rule)] bg-white p-4 no-underline hover:border-[color:var(--color-signal)]"
              >
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
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-24 border-t border-[color:var(--color-rule)] pt-8 text-sm opacity-70">
        <p>
          Scaffold build. Full v1 demo per the plan: landing polish, jobs index, career map,
          compare, blog, guides, newsletter, legal.
        </p>
      </footer>
    </main>
  );
}
