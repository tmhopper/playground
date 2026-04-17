import type { Metadata } from "next";
import { getAllJobs } from "@/lib/data";
import { JobCard } from "@/components/JobCard";
import { Nav, Footer } from "@/components/Nav";

export const metadata: Metadata = {
  title: "All military jobs",
  description:
    "Browse every job in the EveryMOS database across all six U.S. military branches.",
};

export default function JobsIndex() {
  const jobs = getAllJobs();

  const byBranch = jobs.reduce<Record<string, typeof jobs>>((acc, job) => {
    const key = job.branch_display;
    (acc[key] ??= []).push(job);
    return acc;
  }, {});

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-12">
          <h1>All military jobs</h1>
          <p className="mt-4 max-w-2xl opacity-80">
            Browse the database by branch. Every entry has sources cited and a confidence
            level. Entries marked <span className="mono">stub</span> or{" "}
            <span className="mono">uncertain</span> are drafts — read the notes before
            relying on them.
          </p>
          <p className="mono mt-4 text-sm opacity-60">
            {jobs.length} entries published · {Object.keys(byBranch).length} branch
            {Object.keys(byBranch).length === 1 ? "" : "es"}
          </p>
        </header>

        {Object.entries(byBranch).map(([branch, list]) => (
          <section key={branch} className="mb-12">
            <h2 className="mb-4 text-xl">{branch}</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((job) => (
                <li key={job.id}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
