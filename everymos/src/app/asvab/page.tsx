import { Nav, Footer } from "@/components/Nav";

export const metadata = {
  title: "ASVAB scores → jobs you qualify for",
  description:
    "Coming soon — enter your ASVAB composite scores to see every military job you qualify for across all six branches.",
};

export default function AsvabPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <p className="mono text-sm text-[color:var(--color-signal)]">Coming soon</p>
        <h1 className="mt-3">Find every job you qualify for.</h1>
        <p className="mt-6 text-lg opacity-80">
          Drop your ASVAB composite scores below and I&rsquo;ll send you a full, ranked
          list of military jobs you qualify for across all six branches — Army, Marine
          Corps, Air Force, Navy, Coast Guard, Space Force — as soon as the tool ships.
        </p>

        <form className="mt-12 space-y-6" action="/newsletter/thanks" method="get">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="afqt" className="mono block text-xs uppercase tracking-wide opacity-60">
                AFQT (required)
              </label>
              <input
                id="afqt"
                name="afqt"
                type="number"
                min={0}
                max={99}
                required
                placeholder="0–99"
                className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3"
              />
            </div>
            <div>
              <label htmlFor="gt" className="mono block text-xs uppercase tracking-wide opacity-60">
                GT (Army / USMC)
              </label>
              <input id="gt" name="gt" type="number" min={0} max={200} placeholder="optional" className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3" />
            </div>
            <div>
              <label htmlFor="el" className="mono block text-xs uppercase tracking-wide opacity-60">
                EL (Electronics)
              </label>
              <input id="el" name="el" type="number" min={0} max={200} placeholder="optional" className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3" />
            </div>
            <div>
              <label htmlFor="mm" className="mono block text-xs uppercase tracking-wide opacity-60">
                MM (Mechanical)
              </label>
              <input id="mm" name="mm" type="number" min={0} max={200} placeholder="optional" className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3" />
            </div>
            <div>
              <label htmlFor="cl" className="mono block text-xs uppercase tracking-wide opacity-60">
                CL (Clerical)
              </label>
              <input id="cl" name="cl" type="number" min={0} max={200} placeholder="optional" className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mono block text-xs uppercase tracking-wide opacity-60">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="h-12 rounded-md bg-[color:var(--color-ink-900)] px-5 text-sm font-medium text-white hover:bg-[color:var(--color-signal)]"
          >
            Notify me when the tool ships
          </button>
        </form>

        <div className="mono mt-12 rounded-lg border border-[color:var(--color-rule)] bg-white p-6 text-xs opacity-70">
          <p className="uppercase tracking-wide">What&rsquo;s the ASVAB?</p>
          <p className="mt-3 font-sans normal-case opacity-100">
            The Armed Services Vocational Aptitude Battery is the standardized test every
            branch uses to determine what jobs you qualify for. The AFQT is the overall
            score (percentile 1–99); the line scores are branch-specific combinations of
            subtests. Army and Marine Corps use composites like GT, EL, MM, and CL. Air
            Force uses four aptitude composites (M, A, G, E). Navy combines its own line
            scores. Coast Guard mostly uses the AFQT minimum.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
