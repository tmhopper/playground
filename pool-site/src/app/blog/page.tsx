import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { posts } from "@/lib/data/posts";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/card";
import { asset, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "How-tos, gear reviews, case files, and pool-owner basics. Everything I've learned in 3 years of service work.",
};

const categoryLabel = {
  "how-to": "How-to",
  "gear-review": "Gear Review",
  "case-file": "Case File",
  "owner-101": "Owner 101",
} as const;

export default function BlogIndex() {
  const [hero, ...rest] = posts;
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Field notes from the truck."
        description="Real troubleshooting, honest gear reviews, and the case files behind the videos."
      />
      <section className="pb-20">
        <div className="container-page space-y-16">
          {/* Hero post */}
          <Link
            href={`/blog/${hero.slug}`}
            className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-ice-500/40 transition"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={asset(hero.coverImage)}
                  alt={hero.title}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-[1.03] transition duration-700"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-white/50 uppercase tracking-wider">
                  <Badge tone="ice">{categoryLabel[hero.category]}</Badge>
                  <span>{formatDate(hero.publishedAt)}</span>
                  <span>· {hero.readMins} min read</span>
                </div>
                <h2 className="mt-4">{hero.title}</h2>
                <p className="mt-4 text-white/70 text-lg leading-relaxed">{hero.excerpt}</p>
                <p className="mt-6 text-ice-300 font-semibold">Read →</p>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-ice-500/40 transition"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={asset(p.coverImage)}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-700"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-white/50 uppercase tracking-wider">
                    <Badge tone="ice">{categoryLabel[p.category]}</Badge>
                    <span>{p.readMins} min</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl leading-snug">{p.title}</h3>
                  <p className="mt-3 text-sm text-white/65 line-clamp-3">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
