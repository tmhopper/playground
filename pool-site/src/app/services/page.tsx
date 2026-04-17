import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { PageHeader } from "@/components/page-header";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Testimonials } from "@/components/sections/testimonials";
import { brand } from "@/lib/data/brand";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Paid services that fund the free work. No contracts, all chemicals included, full transparency.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Paid services"
        title="How the free work stays free."
        description="Paying clients and a little affiliate revenue are what make the charitable side of this business possible. Here are the four ways people hire me."
      />

      <section className="pb-20">
        <div className="container-page grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <Card key={s.id} className="flex flex-col relative">
              {s.popular && (
                <div className="absolute -top-3 left-5">
                  <Badge tone="lime">Most popular</Badge>
                </div>
              )}
              <h3 className="font-display text-xl">{s.name}</h3>
              <p className="text-sm text-white/60 mt-1.5">{s.duration}</p>
              <div className="my-5 text-4xl font-display font-bold text-ice-400">
                {s.price}
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{s.tagline}</p>
              <ul className="mt-5 space-y-2 text-sm flex-1">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex gap-2">
                    <Check size={16} className="text-lime shrink-0 mt-0.5" />
                    <span className="text-white/75">{inc}</span>
                  </li>
                ))}
              </ul>
              <Button href={`/book?service=${s.id}`} variant="lime" className="mt-6 w-full">
                {s.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 bg-ocean-900/30 border-y border-white/10">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { k: "License", v: brand.licenseNumber },
            { k: "Insurance", v: "$2M liability" },
            { k: "Avg rating", v: "4.9 / 5" },
            { k: "Service area", v: "Manteca + 209 + Sacramento + Fresno" },
          ].map((c) => (
            <div key={c.k}>
              <p className="text-xs uppercase tracking-widest text-white/50">{c.k}</p>
              <p className="mt-2 font-display text-xl">{c.v}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials heading="What clients say" />

      <section className="py-20 text-center">
        <div className="container-page">
          <h2 className="max-w-3xl mx-auto">Ready to book?</h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            I reply to every request personally within 24 hours. If I can't help, I'll tell you who can.
          </p>
          <div className="mt-8">
            <Button href="/book" variant="lime" size="lg">
              Book a Clean →
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/50">
            Also serving: <Link href="/areas/manteca" className="underline hover:text-ice-300">Manteca</Link> ·{" "}
            <Link href="/areas/stockton" className="underline hover:text-ice-300">Stockton</Link> ·{" "}
            <Link href="/areas/sacramento" className="underline hover:text-ice-300">Sacramento</Link> ·{" "}
            <Link href="/areas/modesto" className="underline hover:text-ice-300">Modesto</Link> ·{" "}
            <Link href="/areas/tracy" className="underline hover:text-ice-300">Tracy</Link> ·{" "}
            <Link href="/areas/fresno" className="underline hover:text-ice-300">Fresno</Link>
          </p>
        </div>
      </section>
    </>
  );
}
