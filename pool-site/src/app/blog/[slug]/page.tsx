import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts } from "@/lib/data/posts";
import { Badge } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/page-header";
import { asset, formatDate } from "@/lib/utils";
import { brand } from "@/lib/data/brand";

const categoryLabel = {
  "how-to": "How-to",
  "gear-review": "Gear Review",
  "case-file": "Case File",
  "owner-101": "Owner 101",
} as const;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = posts[idx - 1];
  const next = posts[idx + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: brand.founder },
    publisher: { "@type": "Organization", name: brand.companyName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="pt-32 md:pt-40 pb-24">
        <div className="container-page max-w-3xl">
          <Breadcrumbs
            trail={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
          />
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/50">
            <Badge tone="ice">{categoryLabel[post.category]}</Badge>
            <span>{formatDate(post.publishedAt)}</span>
            <span>· {post.readMins} min read</span>
          </div>
          <h1 className="mt-5">{post.title}</h1>
          <p className="mt-6 text-xl text-white/75 leading-relaxed">{post.excerpt}</p>
        </div>
        <div className="container-page max-w-5xl mt-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={asset(post.coverImage)}
              alt={post.title}
              fill
              priority
              sizes="(min-width:1024px) 72rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="container-page max-w-3xl mt-12">
          <div className="space-y-6 text-white/80 leading-relaxed text-lg">
            {post.content.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={i} className="mt-10 text-3xl">
                      {block.value as string}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={i} className="mt-8 text-xl">
                      {block.value as string}
                    </h3>
                  );
                case "ul":
                  return (
                    <ul key={i} className="list-disc list-outside ml-6 space-y-2 text-white/75">
                      {(block.value as string[]).map((li, j) => (
                        <li key={j}>{li}</li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return (
                    <blockquote
                      key={i}
                      className="border-l-4 border-lime pl-6 text-xl italic text-white/85 my-6"
                    >
                      {block.value as string}
                    </blockquote>
                  );
                case "callout":
                  return (
                    <aside
                      key={i}
                      className="rounded-xl bg-ice-500/10 border border-ice-500/30 p-5 text-ice-100 text-base"
                    >
                      {block.value as string}
                    </aside>
                  );
                default:
                  return <p key={i}>{block.value as string}</p>;
              }
            })}
          </div>
        </div>

        <nav className="container-page max-w-3xl mt-20 grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="rounded-xl border border-white/10 p-5 hover:border-ice-500/40 transition"
            >
              <div className="text-xs uppercase tracking-widest text-white/50 flex items-center gap-1">
                <ArrowLeft size={12} /> Previous
              </div>
              <div className="mt-2 font-semibold">{prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="rounded-xl border border-white/10 p-5 hover:border-ice-500/40 transition sm:text-right"
            >
              <div className="text-xs uppercase tracking-widest text-white/50 flex items-center gap-1 sm:justify-end">
                Next <ArrowRight size={12} />
              </div>
              <div className="mt-2 font-semibold">{next.title}</div>
            </Link>
          ) : null}
        </nav>
      </article>
    </>
  );
}
