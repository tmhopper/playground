import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobs, BRANCH_ENUM_TO_SLUG } from "@/lib/data";
import type { Branch, JobEntry } from "@schemas/job";
import { JobCard } from "@/components/JobCard";
import { Nav, Footer } from "@/components/Nav";
import { themeFor } from "@/lib/branch-theme";

const BRANCH_META: Record<Branch, { display: string; term: string; take: string }> = {
  marine_corps: {
    display: "U.S. Marine Corps",
    term: "Jobs are called MOS — Military Occupational Specialties. Four-digit codes.",
    take: "The Marine Corps is the priority branch on EveryMOS because that's where I served. USMC MOS structure is four digits: the first two are the occupational field, the last two are the specialty within it. Every Marine is a rifleman first — so the infantry (03) field casts a long shadow over every other field.",
  },
  army: {
    display: "U.S. Army",
    term: "Jobs are called MOS. Two digits plus a letter for enlisted; branch codes for officers.",
    take: "The Army is the largest branch and carries the most jobs. Career management field (CMF) groups related MOSs. Officers are coded by branch rather than MOS.",
  },
  air_force: {
    display: "U.S. Air Force",
    term: "Jobs are called AFSC — Air Force Specialty Codes. Five alphanumeric characters for enlisted.",
    take: "AFSCs have more technical-specialty breakdowns than other branches. Shredouts (the final character) narrow a specialty further.",
  },
  navy: {
    display: "U.S. Navy",
    term: "Enlisted jobs are called Ratings. 2–3 letter abbreviations. Navy Enlisted Classifications (NECs) add specialty layers on top.",
    take: "Navy careers layer a Rating with NECs — so two Sailors in the same Rating can have very different specialties depending on NEC and community (Surface, Submarine, Aviation, Special Warfare).",
  },
  coast_guard: {
    display: "U.S. Coast Guard",
    term: "Enlisted jobs are called Ratings. Similar structure to the Navy.",
    take: "Smallest branch with the most diverse missions — search and rescue, law enforcement, environmental response, port security.",
  },
  space_force: {
    display: "U.S. Space Force",
    term: "Jobs are called SFSC — Space Force Specialty Codes. Structure mirrors AFSC.",
    take: "Newest branch. Jobs and structure are still being finalized. Heavy focus on cyber, space operations, and intelligence.",
  },
};

const BRANCH_SLUG_TO_ENUM: Record<string, Branch> = {
  "marine-corps": "marine_corps",
  army: "army",
  "air-force": "air_force",
  navy: "navy",
  "coast-guard": "coast_guard",
  "space-force": "space_force",
};

type Params = { branch: string };

export function generateStaticParams(): Params[] {
  return Object.keys(BRANCH_SLUG_TO_ENUM).map((branch) => ({ branch }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { branch } = await params;
  const b = BRANCH_SLUG_TO_ENUM[branch];
  if (!b) return { title: "Not found" };
  return {
    title: BRANCH_META[b].display,
    description: `Every ${BRANCH_META[b].display} job in the EveryMOS database.`,
  };
}

export default async function BranchPage({ params }: { params: Promise<Params> }) {
  const { branch } = await params;
  const b = BRANCH_SLUG_TO_ENUM[branch];
  if (!b) notFound();

  const meta = BRANCH_META[b];
  const allJobs = getAllJobs();
  const branchJobs = allJobs.filter((j) => j.branch === b);

  if (branchJobs.length === 0) {
    return (
      <>
        <Nav />
        <main id="main" className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
          <nav className="mono mb-6 text-xs uppercase tracking-wide opacity-60">
            <Link href="/jobs">All jobs</Link> / <span>{meta.display}</span>
          </nav>
          <h1>{meta.display}</h1>
          <p className="mt-6 text-lg opacity-80">{meta.take}</p>
          <div className="mt-12 rounded-lg border border-[color:var(--color-rule)] bg-white p-8 text-center">
            <p className="mono text-xs uppercase tracking-wide opacity-60">
              No entries yet
            </p>
            <p className="mt-3 text-sm opacity-80">
              Entries for {meta.display} haven&rsquo;t been added to the database yet.
              Marine Corps is the priority — the rest of the branches come after USMC is
              fully populated.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Group by occupational field
  const byField = branchJobs.reduce<Record<string, { code: string; name: string; jobs: JobEntry[] }>>((acc, job) => {
    const key = `${job.occupational_field.code}_${job.occupational_field.name}`;
    acc[key] ??= {
      code: job.occupational_field.code,
      name: job.occupational_field.name,
      jobs: [],
    };
    acc[key].jobs.push(job);
    return acc;
  }, {});

  const sortedFields = Object.values(byField).sort((a, b) => a.code.localeCompare(b.code));

  const verifiedCount = branchJobs.filter((j) => j.confidence === "verified").length;
  const uncertainCount = branchJobs.filter((j) => j.confidence === "uncertain").length;
  const theme = themeFor(b);

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <nav className="mono mb-6 text-xs uppercase tracking-wide opacity-60">
          <Link href="/jobs">All jobs</Link> / <span>{meta.display}</span>
        </nav>

        <header
          className="relative mb-12 overflow-hidden rounded-2xl border border-[color:var(--color-rule)] bg-white p-6 md:p-10"
          style={{ borderTopWidth: 8, borderTopColor: theme.accent }}
        >
          <p
            className="mono text-xs uppercase tracking-wide"
            style={{ color: theme.accent }}
          >
            {theme.termLong}
          </p>
          <h1 className="mt-2">{meta.display}</h1>
          <p className="mono mt-3 text-sm opacity-70">{meta.term}</p>
          <p className="mt-6 max-w-3xl text-lg">{meta.take}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-4">
            <Stat label="Total entries" value={String(branchJobs.length)} />
            <Stat label="Occupational fields" value={String(sortedFields.length)} />
            <Stat label="Verified" value={String(verifiedCount)} />
            <Stat label="Draft / uncertain" value={String(uncertainCount)} />
          </dl>
        </header>

        <section>
          <h2>Occupational fields</h2>
          <p className="mt-2 text-sm opacity-70">
            Jobs are grouped by the first two digits of the MOS code (the occupational field).
          </p>

          <div className="mt-8 space-y-12">
            {sortedFields.map((field) => (
              <div key={field.code}>
                <div className="flex items-baseline justify-between border-b border-[color:var(--color-rule)] pb-2">
                  <h3 className="text-xl">
                    <span className="mono mr-3 text-[color:var(--color-signal)]">
                      {field.code}
                    </span>
                    {field.name}
                  </h3>
                  <span className="mono text-xs opacity-60">
                    {field.jobs.length} entr{field.jobs.length === 1 ? "y" : "ies"}
                  </span>
                </div>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {field.jobs.map((job) => (
                    <li key={job.id}>
                      <JobCard job={job} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mono text-xs uppercase tracking-wide opacity-60">{label}</dt>
      <dd className="mono mt-1 text-2xl font-semibold text-[color:var(--color-ink-900)]">
        {value}
      </dd>
    </div>
  );
}
