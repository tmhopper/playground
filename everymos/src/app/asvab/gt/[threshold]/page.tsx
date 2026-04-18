import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobs } from "@/lib/data";
import { allGtThresholds, jobsByGtThreshold } from "@/lib/seo-slugs";
import { JobCard } from "@/components/JobCard";
import { Nav, Footer } from "@/components/Nav";

type Params = { threshold: string };

export function generateStaticParams(): Params[] {
  return allGtThresholds().map((t) => ({ threshold: String(t) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { threshold } = await params;
  const n = Number(threshold);
  return {
    title: `Military jobs with GT ${n}+`,
    description: `Every job in the EveryMOS database that requires a GT composite of ${n} or higher.`,
  };
}

export default async function GtPage({ params }: { params: Promise<Params> }) {
  const { threshold } = await params;
  const n = Number(threshold);
  if (!allGtThresholds().includes(n)) notFound();
  const jobs = getAllJobs();
  const matching = jobsByGtThreshold(jobs, n);

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <nav className="mono mb-6 text-xs uppercase tracking-wide opacity-60">
          <Link href="/asvab">ASVAB tool</Link> / <span>GT {n}+</span>
        </nav>
        <header className="mb-10">
          <p className="mono text-sm text-[color:var(--color-signal)]">ASVAB target</p>
          <h1 className="mt-2">Military jobs with GT {n} or higher</h1>
          <p className="mt-4 max-w-2xl opacity-80">
            A high GT composite opens a wider range of MOS options. Here&rsquo;s every job
            in the database that lists GT ≥ {n} as a requirement. (Army and Marine Corps
            primarily; other branches use different composite systems.)
          </p>
          <p className="mono mt-4 text-sm opacity-60">
            {matching.length} job{matching.length === 1 ? "" : "s"} match
          </p>
        </header>
        {matching.length === 0 ? (
          <p className="rounded-lg border border-[color:var(--color-rule)] bg-white p-8 text-center text-sm opacity-70">
            No jobs in the database currently list a GT minimum of {n} or higher.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matching.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-12 rounded-lg border border-[color:var(--color-rule)] bg-white p-6 text-sm">
          <p className="mono text-xs uppercase tracking-wide opacity-60">Other GT thresholds</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {allGtThresholds().map((t) => (
              <li key={t}>
                <Link
                  href={`/asvab/gt/${t}`}
                  className="mono rounded border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-3 py-1 text-xs no-underline hover:border-[color:var(--color-signal)]"
                >
                  GT {t}+
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
