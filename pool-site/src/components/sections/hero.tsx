import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { brand } from "@/lib/data/brand";
import { asset } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] grid items-end overflow-hidden grain">
      {/* Background imagery */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={asset("/images/action-large-pool.jpg")}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/85 to-ocean-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_20%,rgba(34,211,238,0.15),transparent)]" />
      </div>

      <div className="container-page pt-36 pb-16 md:pb-24">
        <Badge tone="ice" className="mb-6">
          {brand.companyName} · Founded by {brand.founder}
        </Badge>
        <h1 className="text-display font-display max-w-4xl">
          Reviving forgotten pools.
          <span className="block text-ice-400">One backyard at a time.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed">
          I clean abandoned and neglected pools for free — and film every transformation. Watch the work, nominate a pool, or book a paid clean that keeps the free ones going.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/videos" variant="lime" size="lg">
            <PlayCircle size={20} /> Watch the Latest
          </Button>
          <Button href="/nominate" variant="outline" size="lg">
            Nominate a Pool <ArrowRight size={18} />
          </Button>
        </div>
        <p className="mt-10 text-sm text-white/50 uppercase tracking-widest">
          ↓ 27 pools revived · 4.2M views · just getting started
        </p>
      </div>
    </section>
  );
}
