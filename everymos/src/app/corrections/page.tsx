import Link from "next/link";
import { Nav, Footer } from "@/components/Nav";

export const metadata = {
  title: "Corrections log",
  description: "Public log of corrections to EveryMOS entries.",
};

export default function CorrectionsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <h1>Corrections log</h1>
        <p className="mt-6 opacity-80">
          Every correction to a published entry gets logged here. This page exists because
          transparency is a trust feature. If a policy changed or I got something wrong,
          you should be able to see what changed and when.
        </p>

        <section className="mt-16">
          <h2 className="text-xl">How to submit a correction</h2>
          <p className="mt-3 text-sm">
            Use the <Link href="/contact">contact form</Link> with topic{" "}
            <strong>Correction</strong>. Tell me the entry, the claim, what&rsquo;s wrong,
            and your source. Corrections with primary sources (<code>.mil</code>{" "}
            directives, classification manuals) get priority.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl">Log</h2>
          <p className="mt-3 text-sm opacity-70">
            No corrections logged yet. The database is in draft — once entries are verified
            and marked <strong>verified</strong> or <strong>probable</strong>, any
            substantive change to them will appear here.
          </p>
        </section>

        <section className="mt-12 rounded-lg border border-[color:var(--color-rule)] bg-white p-6 text-sm">
          <p className="mono text-xs uppercase tracking-wide opacity-60">Log entry format</p>
          <pre className="mt-3 overflow-x-auto whitespace-pre text-xs opacity-80">{`2026-MM-DD  usmc_0311  training_pipeline[1].duration_weeks
  was: 14 weeks (source: veteran.com, Mar 2024)
  now: 11 weeks (source: marines.mil IMC page, Apr 2026)
  submitted by: reader@example.com
  verified by: Marc`}
          </pre>
        </section>
      </main>
      <Footer />
    </>
  );
}
