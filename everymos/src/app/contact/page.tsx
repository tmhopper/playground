import { Nav, Footer } from "@/components/Nav";

export const metadata = {
  title: "Contact",
  description: "Send Marc a correction, partnership request, or media inquiry.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
        <h1>Contact</h1>
        <p className="mt-6 opacity-80">
          Corrections, partnership requests, press, or anything else. I read everything.
        </p>

        <form className="mt-10 space-y-5" action="#" method="post" aria-label="Contact form">
          <div>
            <label htmlFor="name" className="mono block text-xs uppercase tracking-wide opacity-60">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3 text-base"
            />
          </div>
          <div>
            <label htmlFor="email" className="mono block text-xs uppercase tracking-wide opacity-60">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3 text-base"
            />
          </div>
          <div>
            <label htmlFor="topic" className="mono block text-xs uppercase tracking-wide opacity-60">
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              className="mt-2 h-11 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3 text-base"
              defaultValue="Correction"
            >
              <option>Correction</option>
              <option>Partnership</option>
              <option>Media</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mono block text-xs uppercase tracking-wide opacity-60">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="mt-2 w-full rounded-md border border-[color:var(--color-rule)] bg-white px-3 py-2 text-base"
            />
            <p className="mono mt-2 text-xs opacity-60">
              For corrections, please include the entry URL, the specific claim, and your source.
            </p>
          </div>
          <button
            type="submit"
            className="h-12 rounded-md bg-[color:var(--color-ink-900)] px-5 text-sm font-medium text-white hover:bg-[color:var(--color-signal)]"
          >
            Send
          </button>
        </form>

        <p className="mono mt-10 text-xs opacity-60">
          Form is a stub — wire up the API route <code>/api/contact</code> to send via Resend.
          Direct email: <a href="mailto:marc@everymos.com">marc@everymos.com</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
