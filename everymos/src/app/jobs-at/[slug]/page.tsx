import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobs } from "@/lib/data";
import { allLocationSlugs, jobsAtLocation } from "@/lib/seo-slugs";
import { JobCard } from "@/components/JobCard";
import { Nav, Footer } from "@/components/Nav";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allLocationSlugs(getAllJobs()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = allLocationSlugs(getAllJobs()).find((l) => l.slug === slug);
  if (!match) return { title: "Not found" };
  return {
    title: `Military jobs at ${match.label}`,
    description: `Every military job in the EveryMOS database that lists ${match.label} as a common duty station.`,
  };
}

export default async function JobsAtLocation({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const jobs = getAllJobs();
  const match = allLocationSlugs(jobs).find((l) => l.slug === slug);
  if (!match) notFound();
  const matching = jobsAtLocation(jobs, slug);

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <nav className="mono mb-6 text-xs uppercase tracking-wide opacity-60">
          <Link href="/jobs">All jobs</Link> / <span>Jobs at {match.label}</span>
        </nav>
        <header className="mb-10">
          <p className="mono text-sm text-[color:var(--color-signal)]">Location</p>
          <h1 className="mt-2">Military jobs at {match.label}</h1>
          <p className="mt-4 max-w-2xl opacity-80">
            Every job in the EveryMOS database that lists {match.label} as a common duty
            station. Useful if you&rsquo;re PCSing, you already live in the area, or
            you&rsquo;re choosing a community around a base.
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
