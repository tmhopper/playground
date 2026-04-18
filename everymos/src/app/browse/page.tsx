import type { Metadata } from "next";
import Link from "next/link";
import { getAllJobs } from "@/lib/data";
import {
  allCivilianSlugs,
  allGtThresholds,
  allLocationSlugs,
} from "@/lib/seo-slugs";
import { Nav, Footer } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Browse by location, ASVAB, and civilian career",
  description:
    "Auto-generated index pages: military jobs at every base, by ASVAB score, and by civilian translation.",
};

export default function BrowseHub() {
  const jobs = getAllJobs();
  const locations = allLocationSlugs(jobs).sort((a, b) => a.label.localeCompare(b.label));
  const civilians = allCivilianSlugs(jobs).sort((a, b) => a.label.localeCompare(b.label));
  const gts = allGtThresholds();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-12">
          <h1>Browse</h1>
          <p className="mt-4 max-w-2xl opacity-80">
            Pre-built index pages built from the data. Useful if you know the answer you
            want before you know the question.
          </p>
        </header>

        <section className="mb-16">
          <h2>By duty station</h2>
          <p className="mt-2 text-sm opacity-70">
            Jobs that list each installation as a common duty station.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/jobs-at/${l.slug}`}
                  className="rounded-md border border-[color:var(--color-rule)] bg-white px-3 py-1.5 text-sm no-underline hover:border-[color:var(--color-signal)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2>By ASVAB GT minimum</h2>
          <p className="mt-2 text-sm opacity-70">
            Army / Marine Corps GT composite thresholds.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {gts.map((t) => (
              <li key={t}>
                <Link
                  href={`/asvab/gt/${t}`}
                  className="mono rounded-md border border-[color:var(--color-rule)] bg-white px-3 py-1.5 text-sm no-underline hover:border-[color:var(--color-signal)]"
                >
                  GT {t}+
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2>By civilian career</h2>
          <p className="mt-2 text-sm opacity-70">
            Military jobs that translate to civilian careers.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {civilians.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/translates-to/${c.slug}`}
                  className="rounded-md border border-[color:var(--color-rule)] bg-white px-3 py-1.5 text-sm no-underline hover:border-[color:var(--color-signal)]"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
