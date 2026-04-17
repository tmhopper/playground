import { Star } from "lucide-react";
import Image from "next/image";
import { testimonials, aggregateRating } from "@/lib/data/testimonials";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { Card } from "@/components/ui/card";

export function Testimonials({
  heading = "People who've worked with me",
  showAll = false,
}: {
  heading?: string;
  showAll?: boolean;
}) {
  const items = showAll ? testimonials : testimonials.slice(0, 3);
  return (
    <section className="py-24 md:py-28 bg-ocean-900/30">
      <div className="container-page">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-ice-400">Reviews</p>
          <div className="mt-2 flex flex-wrap items-end gap-6 justify-between">
            <h2 className="max-w-3xl">{heading}</h2>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5" aria-label={`${aggregateRating.value} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} className="fill-lime text-lime" />
                ))}
              </div>
              <span className="text-white/70">
                <span className="text-white font-bold">{aggregateRating.value}</span> avg ·{" "}
                {aggregateRating.count} reviews
              </span>
            </div>
          </div>
        </FadeIn>
        <Stagger className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t) => (
            <StaggerItem key={t.id}>
              <Card className="h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-lime text-lime" />
                  ))}
                </div>
                <blockquote className="text-white/85 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 bg-white/10">
                    <Image src={t.avatar} alt="" fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-white/95">{t.name}</div>
                    <div className="text-xs text-white/55">
                      {t.role} · {t.location}
                    </div>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
