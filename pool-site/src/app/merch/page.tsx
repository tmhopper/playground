import type { Metadata } from "next";
import { WaitlistForm } from "@/components/forms/simple-forms";
import { PageHeader } from "@/components/page-header";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Burdett Blue · Coming Soon",
  description: "Troy's line of pool chemicals and tools, built from real-world field testing. Dropping late 2026.",
};

const waitlistFaqs = [
  {
    q: "Why build your own line?",
    a: "Because I'm tired of recommending other people's chemistry and having clients pay retail markup on the same stuff I buy in bulk. I want a line priced fairly for actual pool owners — not for distributor margins. And I want formulations tuned for Arizona conditions (calcium-heavy, hot, dusty).",
  },
  {
    q: "Where will it be sold?",
    a: "Direct online at burdettblue.com (launches alongside). Select local pool stores in the Phoenix metro. Not Amazon for year one — I want to control the customer experience before scaling.",
  },
  {
    q: "Will it be cheaper than the big brands?",
    a: "Roughly on par for day-to-day chemistry, meaningfully cheaper on specialty items (algaecides, stain treatments, metal sequestering). Quality-per-dollar is the promise.",
  },
  {
    q: "What's in the first release?",
    a: "Standard chlorinating tabs, a shock formulation, a multi-purpose algaecide/clarifier, and a Pebble Tec-safe stain treatment. Plus one stainless brush I spec'd myself.",
  },
];

export default function MerchPage() {
  return (
    <>
      <section className="relative pt-32 md:pt-44 pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(125,211,252,0.12),transparent)]" />
        <div className="container-page text-center">
          <p className="text-xs uppercase tracking-widest text-ice-400 mb-6">
            Next chapter
          </p>
          <h1 className="text-display">BURDETT BLUE</h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            A line of pool chemicals and tools built from two years of field notes. Priced fair. Formulated for the real conditions I work in every day.
          </p>
          <p className="mt-4 text-sm uppercase tracking-widest text-lime font-bold">
            Dropping late 2026
          </p>
          <div className="mt-10 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <section className="py-20 bg-ocean-900/40 border-y border-white/10">
        <div className="container-page grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { label: "Chlorine", sub: "Slow-dissolve tabs" },
            { label: "Shock", sub: "Cal-hypo, AZ-tuned" },
            { label: "Algaecide", sub: "60% copper-free" },
          ].map((m) => (
            <Card key={m.label} className="aspect-[3/4] flex flex-col justify-end items-center text-center">
              <div className="h-40 w-16 rounded-md bg-gradient-to-b from-ice-400 via-ice-500 to-ocean-800 mb-6 opacity-80 blur-[1px]" />
              <p className="font-display text-xl">{m.label}</p>
              <p className="text-sm text-white/60 mt-1">{m.sub}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-page max-w-3xl">
          <PageHeader eyebrow="FAQ" title="Questions people are asking." />
          <Accordion items={waitlistFaqs} />
        </div>
      </section>
    </>
  );
}
