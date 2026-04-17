import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/data/cities";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas",
  description: "Cities I serve across the Central Valley, the Bay Area, and greater Sacramento.",
};

export default function AreasIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Where I work"
        title="Service areas."
        description="I'm based in Manteca and run the 209 six days a week. I also do Sacramento-area routes, Bay Area bedroom communities, and batch-schedule Fresno twice a month. Not seeing your city? Message me — I'll tell you honestly whether I can make it."
      />
      <section className="pb-24">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cities.map((c) => (
            <Link key={c.slug} href={`/areas/${c.slug}`} className="group">
              <Card className="h-full hover:border-ice-500/40 transition">
                <p className="text-xs uppercase tracking-widest text-ice-400">{c.state}</p>
                <h3 className="mt-2 font-display text-2xl">{c.name}</h3>
                <p className="mt-3 text-sm text-white/65 line-clamp-3">{c.localNote}</p>
                <p className="mt-6 text-ice-300 font-semibold inline-flex items-center gap-1">
                  View details <ArrowRight size={14} />
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
