import Link from "next/link";
import { Nav, Footer } from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-2xl px-4 py-24 md:px-8 md:py-32 text-center">
        <p className="mono text-sm text-[color:var(--color-signal)]">404</p>
        <h1 className="mt-4">This page isn&rsquo;t in the database.</h1>
        <p className="mt-6 opacity-80">
          Try the jobs index, or tell me what you were looking for.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/jobs"
            className="rounded-md bg-[color:var(--color-ink-900)] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-[color:var(--color-signal)]"
          >
            Browse jobs
          </Link>
          <Link
            href="/"
            className="rounded-md border border-[color:var(--color-rule)] bg-white px-5 py-3 text-sm font-medium text-[color:var(--color-ink-900)] no-underline hover:border-[color:var(--color-signal)]"
          >
            Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
