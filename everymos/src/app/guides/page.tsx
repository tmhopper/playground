import type { Metadata } from "next";
import Link from "next/link";
import { Nav, Footer } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Longer-form EveryMOS guides: ASVAB prep, reclass playbooks, transition kits.",
};

const GUIDES = [
  {
    slug: "asvab-study-framework",
    title: "The 30-day ASVAB study framework",
    price: "Free",
    summary:
      "A week-by-week plan that targets the AFQT subtests first, then layers in the composites you care about. No fluff, no 400-page study book.",
    status: "Available",
  },
  {
    slug: "usmc-reclass-playbook",
    title: "The USMC reclass playbook",
    price: "$29",
    summary:
      "How to time your reclass package, the paperwork that actually matters, what classification reps look for, and the common mistakes that kill packages at the board.",
    status: "Coming soon",
  },
  {
    slug: "mos-to-resume",
    title: "MOS → resume: translating without bullshit",
    price: "$19",
    summary:
      "Turn a four-digit code into a resume a hiring manager actually reads. Includes 10 before/after examples across infantry, comms, logistics, and intel.",
    status: "Coming soon",
  },
];

export default function GuidesIndex() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-12">
          <h1>Guides</h1>
          <p className="mt-4 max-w-2xl opacity-80">
            Longer-form material that&rsquo;s too dense for the blog and too specific for
            a job page. Some are free; some are paid. The paid ones fund the free ones
            staying free.
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-2">
          {GUIDES.map((g) => (
            <li
              key={g.slug}
              className="rounded-2xl border border-[color:var(--color-rule)] bg-white p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="mono text-xs uppercase tracking-wide opacity-60">
                  {g.status}
                </p>
                <span className="mono text-sm font-semibold text-[color:var(--color-ink-900)]">
                  {g.price}
                </span>
              </div>
              <h3 className="mt-3 text-xl">
                <Link href={`/guides/${g.slug}`} className="no-underline">
                  {g.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm opacity-80">{g.summary}</p>
            </li>
          ))}
        </ul>

        <section className="mt-16 rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-8 text-center">
          <h2 className="text-xl">Get guides in your inbox</h2>
          <p className="mt-3 opacity-80">
            New guide announcements go out through the newsletter. One email a week.
          </p>
          <Link
            href="/newsletter"
            className="mt-6 inline-block rounded-md bg-[color:var(--color-ink-900)] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-[color:var(--color-signal)]"
          >
            Subscribe
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
