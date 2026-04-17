import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { services } from "@/lib/data/services";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";

export function ServicesTeaser() {
  return (
    <section className="py-24 md:py-28">
      <div className="container-page">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-ice-400">Paid services</p>
          <h2 className="mt-2 max-w-3xl">How the free work stays free.</h2>
          <p className="mt-4 max-w-2xl text-white/65">
            Paying clients fund the charitable side. Here are the four ways people hire me. No contracts, no upsells, no surprise line items.
          </p>
        </FadeIn>
        <Stagger className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <StaggerItem key={s.id}>
              <Card className="h-full flex flex-col relative">
                {s.popular && (
                  <div className="absolute -top-3 left-5">
                    <Badge tone="lime">Most popular</Badge>
                  </div>
                )}
                <h3 className="font-display text-xl">{s.name}</h3>
                <p className="text-sm text-white/60 mt-1.5">{s.duration}</p>
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold text-ice-400">{s.price}</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{s.tagline}</p>
                <ul className="mt-5 space-y-2 text-sm flex-1">
                  {s.includes.slice(0, 4).map((inc) => (
                    <li key={inc} className="flex gap-2">
                      <Check size={16} className="text-lime shrink-0 mt-0.5" />
                      <span className="text-white/75">{inc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <Link
                    href={`/book?service=${s.id}`}
                    className="text-ice-300 hover:text-ice-400 font-semibold inline-flex items-center gap-1"
                  >
                    {s.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 text-center">
          <Button href="/services" variant="secondary" size="lg">
            See full service details
          </Button>
        </div>
      </div>
    </section>
  );
}
