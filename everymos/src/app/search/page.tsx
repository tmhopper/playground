import { Suspense } from "react";
import type { Metadata } from "next";
import { Nav, Footer } from "@/components/Nav";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every job, branch, blog post, and guide in EveryMOS.",
};

export default function SearchPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <Suspense fallback={<p className="mono text-sm opacity-60">Loading search…</p>}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
