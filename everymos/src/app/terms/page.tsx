import { Nav, Footer } from "@/components/Nav";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <h1>Terms</h1>
        <p className="mt-6 opacity-80">Last updated: April 17, 2026</p>
        <h2 className="mt-10 text-xl">Use of this site.</h2>
        <p className="mt-3">
          EveryMOS is a reference. The information here is drawn from official branch
          sources and verified as best I can, but it is not legal, military, career, or
          medical advice. Verify current policy with your branch, recruiter, or classifier
          before making a decision based on what you read here.
        </p>
        <h2 className="mt-10 text-xl">No warranty.</h2>
        <p className="mt-3">
          Military policy changes. Pay tables, training durations, and MOS status all
          shift. I do my best to keep things current; I can&rsquo;t guarantee any specific
          entry reflects this morning&rsquo;s policy.
        </p>
        <p className="mono mt-12 text-xs opacity-60">
          Stub — replace with final legal copy before public launch.
        </p>
      </main>
      <Footer />
    </>
  );
}
