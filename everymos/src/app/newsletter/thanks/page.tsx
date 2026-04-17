import Link from "next/link";
import { Nav, Footer } from "@/components/Nav";

export const metadata = { title: "Thanks" };

export default function ThanksPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24 text-center">
        <h1>You&rsquo;re on the list.</h1>
        <p className="mt-6 text-lg opacity-80">
          Check your email for a confirmation. If it didn&rsquo;t arrive, check spam and
          mark it &ldquo;not spam&rdquo; — future issues will land cleanly.
        </p>
        <Link
          href="/jobs"
          className="mt-10 inline-block rounded-md bg-[color:var(--color-ink-900)] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-[color:var(--color-signal)]"
        >
          Browse jobs while you wait
        </Link>
      </main>
      <Footer />
    </>
  );
}
