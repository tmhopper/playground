import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllJobs } from "@/lib/data";
import { JobsIndexFilter } from "@/components/JobsIndexFilter";
import { Nav, Footer } from "@/components/Nav";

export const metadata: Metadata = {
  title: "All military jobs",
  description:
    "Browse every job in the EveryMOS database across all six U.S. military branches.",
};

export default function JobsIndex() {
  const jobs = getAllJobs();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-10">
          <h1>All military jobs</h1>
          <p className="mt-4 max-w-2xl opacity-80">
            Browse the database. Every entry has sources cited and a confidence level.
            Entries marked <span className="mono">stub</span> or{" "}
            <span className="mono">uncertain</span> are drafts — read the notes before
            relying on them.
          </p>
        </header>
        <Suspense fallback={<p className="mono text-sm opacity-60">Loading filters…</p>}>
          <JobsIndexFilter jobs={jobs} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
