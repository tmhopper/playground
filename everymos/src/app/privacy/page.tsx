import { Nav, Footer } from "@/components/Nav";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <h1>Privacy</h1>
        <p className="mt-6 opacity-80">Last updated: April 17, 2026</p>
        <h2 className="mt-10 text-xl">What I collect.</h2>
        <p className="mt-3">
          When you visit EveryMOS, basic analytics (page views, referrer, device category)
          are collected via Google Analytics 4. If you subscribe to the newsletter or send
          a contact form, I collect your email address and whatever else you type.
        </p>
        <h2 className="mt-10 text-xl">What I don&rsquo;t do.</h2>
        <p className="mt-3">
          I don&rsquo;t sell your email. I don&rsquo;t share it with recruiters. I
          don&rsquo;t use tracking pixels in the newsletter beyond what the newsletter
          service itself reports.
        </p>
        <h2 className="mt-10 text-xl">Your data.</h2>
        <p className="mt-3">
          Email me at <a href="mailto:marc@everymos.com">marc@everymos.com</a> to see, edit,
          or delete anything I have on file.
        </p>
        <p className="mono mt-12 text-xs opacity-60">
          Stub — replace with final legal copy before public launch.
        </p>
      </main>
      <Footer />
    </>
  );
}
