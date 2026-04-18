import { Nav, Footer } from "@/components/Nav";

export const metadata = {
  title: "Editorial standards",
  description: "How EveryMOS sources, verifies, and flags data.",
};

export default function EditorialStandardsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <h1>Editorial standards</h1>
        <p className="mt-6 text-lg opacity-80">
          Every entry on EveryMOS is sourced, cited, and flagged with a confidence level.
          Here&rsquo;s how I decide what to publish.
        </p>

        <h2 className="mt-16 text-2xl">Source priority</h2>
        <p className="mt-4">I rank sources in this order. When a lower source disagrees with a higher one, the higher one wins.</p>
        <ol className="mt-4 list-decimal space-y-2 pl-6">
          <li>Official branch websites (<code>marines.mil</code>, <code>army.mil</code>, <code>af.mil</code>, <code>navy.mil</code>, <code>uscg.mil</code>, <code>spaceforce.mil</code>).</li>
          <li>Branch classification manuals — NAVMC 1200 series, DA PAM 611-21, AFECD / AFOCD, Navy Enlisted Community Managers, and their equivalents.</li>
          <li><a href="https://www.cool.osd.mil/">DoD COOL</a> for credentialing and civilian translation.</li>
          <li>Established third-party sites: MOSDb.com, veteran.com, military.com, operationmilitarykids.org.</li>
          <li>O*NET and the BLS for civilian job translations.</li>
        </ol>

        <h2 className="mt-16 text-2xl">Confidence levels</h2>
        <dl className="mt-6 space-y-6">
          <Item
            label="Verified"
            color="var(--color-ok)"
            body="Confirmed against a current official branch source within the last 90 days. The default confidence I aim for."
          />
          <Item
            label="Probable"
            color="var(--color-ink-900)"
            body="Drawn from reputable third-party sources but not directly confirmed on .mil. Expect the general shape to be right; specific numbers may need verification."
          />
          <Item
            label="Uncertain"
            color="var(--color-warn)"
            body="Sources conflict, are older than 12 months, or only third-party data is available. Read the notes before relying on specific numbers."
          />
          <Item
            label="Incomplete / stub"
            color="var(--color-warn)"
            body="Code and title are confirmed; most fields are placeholders awaiting full review. The entry exists mainly so the URL resolves and cross-branch comparisons work."
          />
        </dl>

        <h2 className="mt-16 text-2xl">What I won&rsquo;t do</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Fill in gaps with guesses. If I don&rsquo;t know, the field is blank and flagged.</li>
          <li>Paraphrase to obscure a source — direct quotes get citations.</li>
          <li>Take payment to promote a specific MOS, branch, or civilian employer. The affiliate disclosure covers the ways I do make money.</li>
          <li>Accept recruiter-written copy.</li>
        </ul>

        <h2 className="mt-16 text-2xl">Corrections</h2>
        <p className="mt-4">
          If you see something wrong, email <a href="mailto:marc@everymos.com">marc@everymos.com</a>{" "}
          or use the <a href="/contact">contact form</a> with the topic set to
          &ldquo;Correction.&rdquo; Tell me the entry, the specific claim, what&rsquo;s wrong,
          and what you think the right answer is. Corrections with sources get priority.
        </p>
      </main>
      <Footer />
    </>
  );
}

function Item({ label, color, body }: { label: string; color: string; body: string }) {
  return (
    <div>
      <dt>
        <span
          className="mono rounded border px-2 py-0.5 text-xs uppercase tracking-wide"
          style={{ color, borderColor: color }}
        >
          {label}
        </span>
      </dt>
      <dd className="mt-2 text-sm opacity-80">{body}</dd>
    </div>
  );
}
