import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Footer } from "@/components/Nav";

type Guide = {
  slug: string;
  title: string;
  price: string;
  status: "Available" | "Coming soon";
  hook: string;
  who_for: string;
  inside: string[];
  preview: string;
};

const GUIDES: Guide[] = [
  {
    slug: "asvab-study-framework",
    title: "The 30-day ASVAB study framework",
    price: "Free",
    status: "Available",
    hook: "You have a month. The ASVAB decides what jobs you qualify for. Most study books are 400 pages of review for sections you'll barely use. This framework cuts it to what matters.",
    who_for:
      "You've enlisted or you're about to. You have 30 days before the test. You want your AFQT as high as possible without burning out.",
    inside: [
      "The 4 AFQT sections that decide your overall score — how to drill them.",
      "A week-by-week study calendar with targeted daily practice.",
      "Which line scores matter for which branches.",
      "Two full-length practice tests with scoring guides.",
      "A post-test plan: what to do if you need to retest.",
    ],
    preview:
      "The AFQT is computed from four subtests: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics Knowledge. That's it. Raise those four, raise your AFQT. Nothing else changes it.\n\nIf you're shooting for a specific job that requires a composite line score (GT for Army/Marines, EL for comms, M/A/G/E for Air Force), those subtests matter too — but only on top of the AFQT floor.\n\nThe mistake most people make: they spread 30 days across all nine subtests evenly. That's the wrong move. Front-load the four AFQT subtests. Get your AFQT into the percentile you need first. Then layer in line-score work in the second half.",
  },
  {
    slug: "usmc-reclass-playbook",
    title: "The USMC reclass playbook",
    price: "$29",
    status: "Coming soon",
    hook: "Reclassing out of infantry isn't automatic. The classification board needs to approve it, and packages get rejected for reasons nobody tells you about until it's too late.",
    who_for:
      "You're a Marine thinking about reclassing at your next re-enlistment. You want your package to land the first time.",
    inside: [
      "Timeline: when to start the package (hint: a year before your EAS).",
      "The forms your admin shop actually needs.",
      "How to get your ASVAB composites re-scored if they're under the target MOS minimum.",
      "What classification reps look for in a reclass package.",
      "The five most common reasons packages get rejected.",
      "How 'needs of the Marine Corps' actually affects your chances.",
    ],
    preview: "Not yet available. Join the newsletter to be notified when this ships.",
  },
  {
    slug: "mos-to-resume",
    title: "MOS → resume: translating without bullshit",
    price: "$19",
    status: "Coming soon",
    hook: "A resume that says 'infantry squad leader' and nothing else won't get past the HR filter. Here's how to translate what you actually did into what civilians understand.",
    who_for:
      "You're transitioning or about to. You know the usual advice doesn't quite land. You want specifics.",
    inside: [
      "The three patterns that make any MOS readable: responsibility, scope, outcome.",
      "Before/after examples for 10 MOSs across infantry, comms, logistics, intel.",
      "What to do with service awards (almost nothing).",
      "How to handle security clearance on a resume.",
      "When to lead with education, when to lead with experience.",
    ],
    preview: "Not yet available. Join the newsletter to be notified when this ships.",
  },
];

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES.find((g) => g.slug === slug);
  if (!g) return { title: "Not found" };
  return { title: g.title, description: g.hook };
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <nav className="mono mb-6 text-xs uppercase tracking-wide opacity-60">
          <Link href="/guides">Guides</Link> / <span>{guide.title}</span>
        </nav>

        <header className="rounded-2xl border border-[color:var(--color-rule)] bg-white p-6 md:p-10">
          <div className="flex items-baseline justify-between">
            <p className="mono text-xs uppercase tracking-wide opacity-60">{guide.status}</p>
            <span className="mono text-lg font-semibold text-[color:var(--color-ink-900)]">
              {guide.price}
            </span>
          </div>
          <h1 className="mt-3">{guide.title}</h1>
          <p className="mt-6 text-lg">{guide.hook}</p>
        </header>

        <section className="mt-12">
          <h2 className="text-xl">Who it&rsquo;s for</h2>
          <p className="mt-3 opacity-80">{guide.who_for}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl">What&rsquo;s inside</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            {guide.inside.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl">Preview</h2>
          <div className="mt-4 whitespace-pre-wrap rounded-lg border border-[color:var(--color-rule)] bg-white p-6 text-sm">
            {guide.preview}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-8 text-center">
          {guide.status === "Available" ? (
            <>
              <h2 className="text-xl">Get it free</h2>
              <p className="mt-3 opacity-80">
                Drop your email and I&rsquo;ll send you the PDF plus a short follow-up
                sequence with the practice tests.
              </p>
              <Link
                href="/newsletter"
                className="mt-6 inline-block rounded-md bg-[color:var(--color-ink-900)] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-[color:var(--color-signal)]"
              >
                Get the guide
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-xl">Not yet available</h2>
              <p className="mt-3 opacity-80">
                Join the newsletter and I&rsquo;ll tell you when this ships.
              </p>
              <Link
                href="/newsletter"
                className="mt-6 inline-block rounded-md bg-[color:var(--color-ink-900)] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-[color:var(--color-signal)]"
              >
                Notify me
              </Link>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
