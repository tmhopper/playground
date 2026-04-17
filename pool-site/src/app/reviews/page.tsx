import type { Metadata } from "next";
import { Star } from "lucide-react";
import { testimonials, aggregateRating } from "@/lib/data/testimonials";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { reviewJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What paid clients and nominated homeowners say about working with Troy.",
};

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <PageHeader
        eyebrow="Reviews"
        title={`${aggregateRating.value} / ${aggregateRating.outOf} across ${aggregateRating.count} reviews`}
        description="Every review here is from a paid client or nominated homeowner who signed off on being quoted. No paid testimonials."
      >
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={28} className="fill-lime text-lime" />
          ))}
        </div>
      </PageHeader>
      <section className="pb-24">
        <div className="container-page grid md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <Card key={t.id} className="flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-lime text-lime" />
                ))}
              </div>
              <blockquote className="text-white/85 text-lg leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
                  <Image src={t.avatar} alt="" fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-white/55">
                    {t.role} · {t.location} · {formatDate(t.date)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
