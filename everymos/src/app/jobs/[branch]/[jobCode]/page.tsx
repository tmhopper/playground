import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobParams, getJob } from "@/lib/data";
import { Nav, Footer } from "@/components/Nav";
import { TrainingTimeline } from "@/components/TrainingTimeline";

type Params = { branch: string; jobCode: string };

export function generateStaticParams(): Params[] {
  return getAllJobParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { branch, jobCode } = await params;
  const job = getJob(branch, jobCode);
  if (!job) return { title: "Not found" };
  return {
    title: `${job.job_code} ${job.job_title}`,
    description: job.description_tldr,
  };
}

const CONFIDENCE_COLOR: Record<string, string> = {
  verified: "var(--color-ok)",
  probable: "var(--color-ink-900)",
  uncertain: "var(--color-warn)",
  incomplete: "var(--color-warn)",
};

const CONFIDENCE_COPY: Record<string, string> = {
  verified: "Verified against current official source within the last 90 days.",
  probable: "Drawn from a reputable source but not directly confirmed on an official branch site.",
  uncertain: "Sources conflict or only older/third-party data is available. Read the notes before relying on specific numbers.",
  incomplete: "Stub entry. Most fields are placeholders until a full review is completed.",
};

function SectionLink({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      className="text-sm no-underline opacity-70 hover:text-[color:var(--color-signal)] hover:opacity-100"
    >
      {label}
    </a>
  );
}

export default async function JobDetail({ params }: { params: Promise<Params> }) {
  const { branch, jobCode } = await params;
  const job = getJob(branch, jobCode);
  if (!job) notFound();

  const confColor = CONFIDENCE_COLOR[job.confidence] ?? "inherit";
  const totalTrainingWeeks = job.training_pipeline.reduce(
    (sum, s) => sum + s.duration_weeks,
    0,
  );

  const sections: { id: string; label: string; show: boolean }[] = [
    { id: "overview", label: "Overview", show: true },
    { id: "requirements", label: "Requirements", show: true },
    { id: "training", label: "Training pipeline", show: true },
    { id: "career-roadmap", label: "Career roadmap", show: !!job.career_path },
    { id: "compensation", label: "Compensation", show: true },
    { id: "duty-stations", label: "Duty stations", show: true },
    { id: "civilian", label: "Civilian crosswalk", show: true },
    { id: "sources", label: "Sources", show: true },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:5000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Occupation",
    name: `${job.job_code} ${job.job_title}`,
    description: job.description_tldr,
    occupationalCategory: `${job.occupational_field.code} ${job.occupational_field.name}`,
    hiringOrganization: {
      "@type": "Organization",
      name: job.branch_display,
    },
    qualifications: job.asvab.raw_requirement,
    skills: job.civilian_equivalents.map((c) => c.title).join(", "),
    estimatedSalary: job.compensation.typical_rank_range,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Jobs", item: `${baseUrl}/jobs` },
      { "@type": "ListItem", position: 3, name: job.branch_display, item: `${baseUrl}/jobs/${branch}` },
      { "@type": "ListItem", position: 4, name: `${job.job_code} ${job.job_title}`, item: `${baseUrl}/jobs/${branch}/${jobCode}` },
    ],
  };

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main id="main" className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <nav className="mono mb-6 text-xs uppercase tracking-wide opacity-60" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/jobs">Jobs</Link> /{" "}
          <span>{job.branch_display}</span> / <span>{job.job_code}</span>
        </nav>

        {/* HERO */}
        <header className="mb-12 rounded-2xl border border-[color:var(--color-rule)] bg-white p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mono rounded bg-[color:var(--color-ink-900)] px-3 py-1 text-lg font-semibold text-white">
              {job.job_code}
            </span>
            <span className="mono text-xs uppercase tracking-wide opacity-60">
              {job.classification_term}
            </span>
            <span
              className="mono rounded border px-2 py-0.5 text-xs uppercase tracking-wide"
              style={{ color: confColor, borderColor: confColor }}
              title={CONFIDENCE_COPY[job.confidence]}
            >
              {job.confidence}
            </span>
          </div>
          <h1 className="mt-4">{job.job_title}</h1>
          <p className="mono mt-3 text-sm opacity-70">
            {job.branch_display} &middot;{" "}
            {job.personnel_category.replace("_", " ")} &middot;{" "}
            {job.occupational_field.name} ({job.occupational_field.code}) &middot; {job.status}
          </p>
          <p className="mt-6 text-xl leading-relaxed text-[color:var(--color-ink-900)]">
            {job.description_tldr}
          </p>

          {/* At-a-glance tiles */}
          <dl className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <Tile label="ASVAB" value={job.asvab.raw_requirement.replace(/\s*\(.*?\)\s*/g, "")} />
            <Tile label="Clearance" value={job.security_clearance.replace("_", " ")} />
            <Tile label="Training" value={`${totalTrainingWeeks} weeks`} />
            <Tile label="Entry rank" value={job.compensation.typical_entry_rank.split(" (")[0]} />
          </dl>
        </header>

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* STICKY TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-6 space-y-2" aria-label="On this page">
              <p className="mono text-xs uppercase tracking-wide opacity-60">On this page</p>
              <ul className="mt-2 space-y-1">
                {sections
                  .filter((s) => s.show)
                  .map((s) => (
                    <li key={s.id}>
                      <SectionLink id={s.id} label={s.label} />
                    </li>
                  ))}
              </ul>
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="space-y-16">
            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-8">
              <h2>Overview</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="mono text-xs uppercase tracking-wide opacity-60">Official description</p>
                  <p className="mt-2 text-sm">{job.description_official}</p>
                </div>
                <div>
                  <p className="mono text-xs uppercase tracking-wide opacity-60">Plain english</p>
                  <p className="mt-2 text-sm">{job.description_plain}</p>
                </div>
              </div>
            </section>

            {/* REQUIREMENTS */}
            <section id="requirements" className="scroll-mt-8">
              <h2>Requirements</h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                <Req label="ASVAB">
                  <span className="mono">{job.asvab.raw_requirement}</span>
                  {job.asvab.notes && <p className="mt-2 text-xs opacity-70">{job.asvab.notes}</p>}
                </Req>
                <Req label="Security clearance">
                  <span>{job.security_clearance.replace("_", " ")}</span>
                </Req>
                <Req label="Citizenship">
                  <span>{job.citizenship_required ? "U.S. citizen required" : "Not required"}</span>
                </Req>
                <Req label="Eligibility">
                  <span>{job.eligible_genders === "all" ? "Open to all Marines" : job.eligible_genders.replace("_", " ")}</span>
                </Req>
                <Req label="Physical">
                  <span>{job.physical_requirements.details}</span>
                  {job.physical_requirements.swim_qualified && (
                    <p className="mt-1 text-xs opacity-70">Swim qualification required.</p>
                  )}
                </Req>
              </dl>
            </section>

            {/* TRAINING */}
            <section id="training" className="scroll-mt-8">
              <h2>Training pipeline</h2>
              <p className="mt-2 text-sm opacity-70">
                Total time from enlistment to MOS-qualified: ~{totalTrainingWeeks} weeks.
              </p>
              <div className="mt-6">
                <TrainingTimeline pipeline={job.training_pipeline} />
              </div>
            </section>

            {/* CAREER ROADMAP */}
            {job.career_path && (
              <section id="career-roadmap" className="scroll-mt-8">
                <h2>Career roadmap</h2>
                <p className="mt-2 max-w-3xl text-sm opacity-80">
                  The standard progression shows where a career {job.job_title.toLowerCase()} goes by rank. B-billets are
                  special-duty assignments outside the typical operational unit. Lateral moves are other jobs in the
                  same occupational field. Reclass options are paths out of this MOS entirely.
                </p>

                {/* Rank progression */}
                <div className="mt-10">
                  <h3 className="text-xl">Standard progression</h3>
                  <p className="mt-2 text-sm opacity-70">
                    Time-in-service ranges are typical, not guaranteed. Actual promotion depends on promotion zones,
                    cutting scores, and billet availability.
                  </p>
                  <ol className="mt-6 space-y-3">
                    {job.career_path.standard_progression.map((step, i) => (
                      <li
                        key={step.paygrade}
                        className="grid gap-4 rounded-lg border border-[color:var(--color-rule)] bg-white p-4 sm:grid-cols-[120px_1fr_auto]"
                      >
                        <div className="flex items-baseline gap-2 sm:block">
                          <span className="mono text-lg font-bold text-[color:var(--color-ink-900)]">
                            {step.paygrade}
                          </span>
                          <p className="mono text-xs opacity-60 sm:mt-1">{step.rank_abbreviation}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[color:var(--color-ink-900)]">{step.rank_name}</p>
                          <p className="mt-1 text-sm opacity-80">
                            Typical billets: {step.typical_billets.join(", ")}
                          </p>
                          {step.notes && <p className="mt-2 text-xs opacity-70">{step.notes}</p>}
                        </div>
                        <div className="mono text-xs opacity-60 sm:text-right">
                          {step.typical_years_in_service}
                        </div>
                      </li>
                    ))}
                  </ol>
                  {job.career_path.career_capstone_notes && (
                    <p className="mt-4 rounded-lg border-l-4 border-[color:var(--color-signal)] bg-white p-4 text-sm">
                      <span className="mono text-xs uppercase tracking-wide opacity-60">Career capstone</span>
                      <br />
                      {job.career_path.career_capstone_notes}
                    </p>
                  )}
                </div>

                {/* B-billets */}
                {job.career_path.b_billets.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl">B-billets &amp; special duty</h3>
                    <p className="mt-2 text-sm opacity-70">
                      Typically 3-year tours outside your operational unit. Often career-enhancing for promotion.
                    </p>
                    <ul className="mt-6 grid gap-4 md:grid-cols-2">
                      {job.career_path.b_billets.map((opt, i) => (
                        <PathCard key={i} opt={opt} />
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lateral moves */}
                {job.career_path.lateral_moves.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl">Lateral moves within {job.occupational_field.name}</h3>
                    <p className="mt-2 text-sm opacity-70">
                      Related MOS in the same occupational field. Some are true laterals via school; others are assigned
                      out of initial training.
                    </p>
                    <ul className="mt-6 grid gap-4 md:grid-cols-2">
                      {job.career_path.lateral_moves.map((opt, i) => (
                        <PathCard key={i} opt={opt} />
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reclass */}
                {job.career_path.reclass_options.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl">Reclassification</h3>
                    <p className="mt-2 text-sm opacity-70">
                      Paths out of this MOS. Usually gated on re-enlistment and classification approval.
                    </p>
                    <ul className="mt-6 space-y-4">
                      {job.career_path.reclass_options.map((opt, i) => (
                        <PathCard key={i} opt={opt} wide />
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* COMPENSATION */}
            <section id="compensation" className="scroll-mt-8">
              <h2>Compensation</h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <Req label="Typical entry rank">{job.compensation.typical_entry_rank}</Req>
                <Req label="Typical range">{job.compensation.typical_rank_range}</Req>
              </dl>
              {job.compensation.special_pay.length > 0 && (
                <>
                  <p className="mono mt-8 text-xs uppercase tracking-wide opacity-60">Special pay</p>
                  <ul className="mt-3 space-y-3">
                    {job.compensation.special_pay.map((p, i) => (
                      <li key={i} className="rounded-lg border border-[color:var(--color-rule)] bg-white p-4 text-sm">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <strong className="text-[color:var(--color-ink-900)]">{p.pay_type}</strong>
                          <span className="mono">{p.amount}</span>
                        </div>
                        <p className="mt-1 opacity-80">{p.conditions}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            {/* DUTY STATIONS */}
            <section id="duty-stations" className="scroll-mt-8">
              <h2>Duty stations</h2>
              <p className="mono mt-4 text-xs uppercase tracking-wide opacity-60">Environments</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {job.duty_station_types.map((t) => (
                  <li key={t} className="mono rounded border border-[color:var(--color-rule)] bg-white px-3 py-1 text-xs uppercase">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mono mt-6 text-xs uppercase tracking-wide opacity-60">Common installations</p>
              <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
                {job.common_duty_stations.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>

            {/* CIVILIAN */}
            <section id="civilian" className="scroll-mt-8">
              <h2>Civilian crosswalk</h2>
              <p className="mt-2 text-sm opacity-70">
                Civilian roles that translate from this MOS. O*NET codes link to Department of Labor occupational data.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {job.civilian_equivalents.map((c, i) => (
                  <li key={i} className="rounded-lg border border-[color:var(--color-rule)] bg-white p-4 text-sm">
                    <strong className="text-[color:var(--color-ink-900)]">{c.title}</strong>
                    <p className="opacity-70">{c.industry}</p>
                    {c.onet_code && <p className="mono mt-1 text-xs opacity-60">O*NET {c.onet_code}</p>}
                  </li>
                ))}
              </ul>
              {job.transferable_certifications && job.transferable_certifications.length > 0 && (
                <>
                  <p className="mono mt-8 text-xs uppercase tracking-wide opacity-60">Transferable certifications</p>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {job.transferable_certifications.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            {/* SOURCES */}
            <section id="sources" className="scroll-mt-8 border-t border-[color:var(--color-rule)] pt-8">
              <h2>Sources &amp; confidence</h2>
              <p className="mt-2 text-sm" style={{ color: confColor }}>
                Confidence: <strong>{job.confidence}</strong> &mdash; {CONFIDENCE_COPY[job.confidence]}
              </p>
              <ul className="mt-4 space-y-2 text-sm opacity-80">
                {job.sources.map((s, i) => (
                  <li key={i}>
                    {s.url ? <a href={s.url}>{s.name}</a> : s.name}{" "}
                    <span className="mono text-xs opacity-60">(accessed {s.accessed_date})</span>
                  </li>
                ))}
              </ul>
              <p className="mono mt-6 text-xs opacity-60">Last updated {job.last_updated}</p>
              {job.notes && (
                <p className="mt-4 rounded-lg border-l-4 border-[color:var(--color-warn)] bg-white p-4 text-sm">
                  <span className="mono text-xs uppercase tracking-wide opacity-60">Editor notes</span>
                  <br />
                  {job.notes}
                </p>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-3">
      <p className="mono text-xs uppercase tracking-wide opacity-60">{label}</p>
      <p className="mono mt-1 text-sm font-semibold text-[color:var(--color-ink-900)]">{value}</p>
    </div>
  );
}

function Req({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mono text-xs uppercase tracking-wide opacity-60">{label}</dt>
      <dd className="mt-1 text-sm">{children}</dd>
    </div>
  );
}

function PathCard({
  opt,
  wide = false,
}: {
  opt: {
    title: string;
    code: string | null;
    description: string;
    eligibility: string;
    typical_timeline: string | null;
    duration: string | null;
    notes: string | null;
  };
  wide?: boolean;
}) {
  return (
    <li
      className={
        "rounded-lg border border-[color:var(--color-rule)] bg-white p-5 text-sm" +
        (wide ? " md:col-span-2" : "")
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <strong className="text-[color:var(--color-ink-900)]">{opt.title}</strong>
        {opt.code && <span className="mono text-xs opacity-60">{opt.code}</span>}
      </div>
      <p className="mt-2 opacity-90">{opt.description}</p>
      <dl className="mt-3 grid gap-2 text-xs opacity-80 sm:grid-cols-2">
        <div>
          <dt className="mono uppercase opacity-60">Eligibility</dt>
          <dd>{opt.eligibility}</dd>
        </div>
        {opt.typical_timeline && (
          <div>
            <dt className="mono uppercase opacity-60">Typical timing</dt>
            <dd>{opt.typical_timeline}</dd>
          </div>
        )}
        {opt.duration && (
          <div>
            <dt className="mono uppercase opacity-60">Duration</dt>
            <dd>{opt.duration}</dd>
          </div>
        )}
      </dl>
      {opt.notes && <p className="mt-3 text-xs opacity-70">{opt.notes}</p>}
    </li>
  );
}
