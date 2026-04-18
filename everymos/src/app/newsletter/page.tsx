import { Nav, Footer } from "@/components/Nav";

export const metadata = {
  title: "Newsletter",
  description: "One email a week. New job entries, a deep-dive, and the occasional tool.",
};

export default function NewsletterPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
        <h1>The EveryMOS newsletter.</h1>
        <p className="mt-6 text-lg opacity-80">
          One email a week. New job entries, a deep-dive, and the occasional tool. No spam,
          no recruiter handoffs.
        </p>

        <form
          className="mt-10 space-y-4"
          action="/api/newsletter"
          method="post"
          aria-label="Newsletter signup"
        >
          <div>
            <label htmlFor="email" className="mono block text-xs uppercase tracking-wide opacity-60">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 h-12 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-4 text-base"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="h-12 w-full rounded-md bg-[color:var(--color-ink-900)] px-5 text-sm font-medium text-white hover:bg-[color:var(--color-signal)] sm:w-auto"
          >
            Subscribe
          </button>
        </form>

        <p className="mono mt-6 text-xs opacity-60">
          Submissions go to <code>/api/newsletter</code>, which currently logs
          server-side. Wire to ConvertKit or Beehiiv when going live.
        </p>
      </main>
      <Footer />
    </>
  );
}
