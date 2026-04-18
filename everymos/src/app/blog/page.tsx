import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "../../../data/posts";
import { Nav, Footer } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Deep-dives, transition guides, and tools from Marc Hopper at EveryMOS.",
};

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-12">
          <h1>The EveryMOS log</h1>
          <p className="mt-4 max-w-2xl opacity-80">
            Deep-dives on jobs, career moves, and translating military experience to a
            resume that makes sense.
          </p>
        </header>

        {featured && (
          <article className="mb-16 rounded-2xl border border-[color:var(--color-rule)] bg-white p-6 md:p-10">
            <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-signal)]">
              Featured · {featured.category}
            </p>
            <h2 className="mt-2 text-2xl">
              <Link href={`/blog/${featured.slug}`} className="no-underline">
                {featured.title}
              </Link>
            </h2>
            <p className="mono mt-2 text-xs opacity-60">
              {featured.date} · {featured.read_time}
            </p>
            <p className="mt-4 opacity-80">{featured.excerpt}</p>
          </article>
        )}

        <ul className="grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <li
              key={p.slug}
              className="rounded-lg border border-[color:var(--color-rule)] bg-white p-5"
            >
              <p className="mono text-xs uppercase tracking-wide opacity-60">
                {p.category}
              </p>
              <h3 className="mt-2 text-lg">
                <Link href={`/blog/${p.slug}`} className="no-underline">
                  {p.title}
                </Link>
              </h3>
              <p className="mono mt-1 text-xs opacity-60">
                {p.date} · {p.read_time}
              </p>
              <p className="mt-3 text-sm opacity-80">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
