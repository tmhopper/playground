import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NominateCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-lime" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_50%,rgba(11,31,58,0.15),transparent)]" />
      </div>
      <div className="container-page grid md:grid-cols-[2fr_1fr] items-center gap-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-ocean-950/70">The ask</p>
          <h2 className="mt-2 text-ocean-950 max-w-3xl">
            Know a pool that needs saving?
          </h2>
          <p className="mt-6 max-w-2xl text-ocean-950/80 text-lg leading-relaxed">
            Abandoned property? Elderly neighbor? Family mid-medical-crisis? Tell me where — I'll review every submission personally and follow up on the ones that fit. Owner permission, always.
          </p>
        </div>
        <div className="flex md:justify-end">
          <Button href="/nominate" variant="primary" size="lg" className="bg-ocean-950 text-lime hover:bg-ocean-800">
            Nominate a Pool <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
