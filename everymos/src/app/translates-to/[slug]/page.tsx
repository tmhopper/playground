import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobs } from "@/lib/data";
import { allCivilianSlugs, jobsForCivilian } from "@/lib/seo-slugs";
import { JobCard } from "@/components/JobCard";
import { Nav, Footer } from "@/components/Nav";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allCivilianSlugs(getAllJobs()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = allCivilianSlugs(getAllJobs()).find((c) => c.slug === slug);
  if (!match) return { title: "Not found" };
  return {
    title: `Military jobs that translate to ${match.label}`,
    description: `Every military job in the EveryMOS database that lists ${match.label} as a civilian equivalent.`,
  };
}

export default async function CivilianPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const jobs = getAllJobs();
  const match = allCivilianSlugs(jobs).find((c) => c.slug === slug);
  if (!match) notFound();
  const matching = jobsForCivilian(jobs, slug);

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <nav className="mono mb-6 text-xs uppercase tracking-wide opacity-60">
          <Link href="/jobs">All jobs</Link> / <span>Translates to {match.label}</span>
        </nav>
        <header className="mb-10">
          <p className="mono text-sm text-[color:var(--color-signal)]">Civilian translation</p>
          <h1 className="mt-2">Military jobs that translate to {match.label}</h1>
          <p className="mono mt-2 text-sm opacity-60">Industry: {match.industry}</p>
          <p className="mt-4 max-w-2xl opacity-80">
            Every job in the EveryMOS database that lists <strong>{match.label}</strong> as
            a civilian equivalent. Useful if you&rsquo;re planning a transition from this
            career track and want to see which military jobs could have gotten you there.
          </p>
          <p className="mono mt-4 text-sm opacity-60">
            {matching.length} job{matching.length === 1 ? "" : "s"} match
          </p>
        </header>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matching.map((job) => (
            <li key={job.id}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
