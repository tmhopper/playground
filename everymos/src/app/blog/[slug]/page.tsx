import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "../../../../data/posts";
import { Nav, Footer } from "@/components/Nav";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function renderParagraph(text: string, i: number) {
  if (text.startsWith("## ")) {
    return (
      <h2 key={i} className="mt-12 text-2xl">
        {text.slice(3)}
      </h2>
    );
  }
  if (text.startsWith("- ")) {
    const items = text.split("\n").filter((l) => l.startsWith("- "));
    return (
      <ul key={i} className="mt-4 list-disc space-y-2 pl-6">
        {items.map((item, j) => (
          <li key={j}>{renderInline(item.slice(2))}</li>
        ))}
      </ul>
    );
  }
  if (text === "---") {
    return <hr key={i} className="mt-10 border-[color:var(--color-rule)]" />;
  }
  return (
    <p key={i} className="mt-5 leading-relaxed">
      {renderInline(text)}
    </p>
  );
}

function renderInline(text: string): (string | React.ReactElement)[] {
  const parts: (string | React.ReactElement)[] = [];
  const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) parts.push(text.slice(lastIdx, match.index));
    if (match[1]) parts.push(<strong key={key++}>{match[1]}</strong>);
    else if (match[2]) parts.push(<em key={key++}>{match[2]}</em>);
    else if (match[3]) parts.push(<code key={key++}>{match[3]}</code>);
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  // Split body into blocks: paragraphs, headings, lists, dividers
  const blocks: string[] = [];
  const lines = post.body.split("\n");
  let current: string[] = [];
  let inList = false;
  for (const line of lines) {
    if (line.startsWith("- ")) {
      if (!inList) {
        if (current.length) blocks.push(current.join("\n").trim());
        current = [line];
        inList = true;
      } else {
        current.push(line);
      }
    } else if (line.trim() === "") {
      if (current.length) {
        blocks.push(current.join("\n").trim());
        current = [];
      }
      inList = false;
    } else {
      if (inList) {
        blocks.push(current.join("\n").trim());
        current = [line];
        inList = false;
      } else {
        current.push(line);
      }
    }
  }
  if (current.length) blocks.push(current.join("\n").trim());

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <nav className="mono mb-6 text-xs uppercase tracking-wide opacity-60">
          <Link href="/blog">Blog</Link> / <span>{post.title}</span>
        </nav>

        <article>
          <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-signal)]">
            {post.category}
          </p>
          <h1 className="mt-2">{post.title}</h1>
          <p className="mono mt-3 text-xs opacity-60">
            {post.date} · {post.read_time} · Marc Hopper
          </p>

          <div className="mt-10 text-base">
            {blocks.map((block, i) => renderParagraph(block, i))}
          </div>
        </article>

        {(() => {
          const related = POSTS.filter(
            (p) => p.slug !== post.slug && p.category === post.category,
          ).slice(0, 3);
          if (related.length === 0) return null;
          return (
            <section className="mt-16 border-t border-[color:var(--color-rule)] pt-8">
              <p className="mono text-xs uppercase tracking-wide opacity-60">
                More in {post.category}
              </p>
              <ul className="mt-4 space-y-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="no-underline">
                      <strong className="text-[color:var(--color-ink-900)]">{p.title}</strong>
                    </Link>
                    <p className="mt-1 text-sm opacity-70">{p.excerpt}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })()}

        <footer className="mt-16 border-t border-[color:var(--color-rule)] pt-8">
          <Link href="/blog" className="text-sm">
            ← All posts
          </Link>
        </footer>
      </main>
      <Footer />
    </>
  );
}
