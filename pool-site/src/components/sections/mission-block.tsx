import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { brand } from "@/lib/data/brand";

export function MissionBlock() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-center">
        <FadeIn className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={brand.founderPhoto}
            alt={`${brand.founder}, founder of ${brand.companyName}`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-ocean-950 via-ocean-950/70 to-transparent">
            <p className="text-xs uppercase tracking-widest text-ice-300">{brand.founderTitle}</p>
            <p className="mt-1 text-xl font-display font-bold">{brand.founder}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-xs uppercase tracking-widest text-ice-400 mb-4">The mission</p>
          <h2>Why I'm doing this.</h2>
          <div className="mt-6 space-y-5 text-white/75 text-lg leading-relaxed">
            <p>
              Every neighborhood has that pool. The one that's been green for years because the owner got sick, got old, or got priced out. I grew up near one. I'm a pool guy now. So I'm fixing them — for free, on camera, with the owner's permission.
            </p>
            <p>
              The paid side of the business funds the free side. Paying clients keep the lights on. Affiliate partners help cover supplies. And viewers who want to fund a specific clean can do that directly.
            </p>
            <p className="text-white/90 font-medium">
              That's the whole model. No donation drives, no sob-story merch, no &ldquo;subscribe for the next one&rdquo; hostage plays. Just transformations — and a business structured to keep doing more of them.
            </p>
          </div>
          <p className="mt-8 text-sm italic text-white/60">— {brand.founder}, Founder</p>
        </FadeIn>
      </div>
    </section>
  );
}
