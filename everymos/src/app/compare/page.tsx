import type { Metadata } from "next";
import { getAllJobs } from "@/lib/data";
import { CompareClient } from "@/components/CompareClient";
import { Nav, Footer } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Compare military jobs",
  description: "Side-by-side comparison of any jobs in the EveryMOS database.",
};

export default function ComparePage() {
  const jobs = getAllJobs();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-10">
          <h1>Compare</h1>
          <p className="mt-4 max-w-2xl opacity-80">
            Pick up to four jobs and compare them side-by-side. Useful for cross-branch
            comparisons (e.g. Army 11B vs. Marine 0311 vs. Air Force 1D7X1) or comparing
            two specialties within the same branch.
          </p>
        </header>
        <CompareClient jobs={jobs} />
      </main>
      <Footer />
    </>
  );
}
