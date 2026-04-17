import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { fundingProgress } from "@/lib/data/sponsors";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";

export function SponsorBlock() {
  const percent = Math.round(
    (fundingProgress.nextCleanRaised / fundingProgress.nextCleanGoal) * 100,
  );
  return (
    <section className="py-24 md:py-28 bg-ocean-900/40 border-y border-white/10">
      <div className="container-page grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-ice-400 flex items-center gap-2">
            <Heart size={14} /> Fund a free clean
          </p>
          <h2 className="mt-2">Love the videos? Help me do the next one.</h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl">
            Viewer-funded cleans are the third leg of the business. $25 covers chemicals. $250 underwrites a full standard clean. $800 sponsors a full rescue. You'll get a photo + video link when your sponsored job goes up.
          </p>
          <div className="mt-8">
            <Button href="/sponsor" variant="lime" size="lg">
              Sponsor a Clean <ArrowRight size={18} />
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card glass className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-white/60">
                  Next clean funded
                </span>
                <span className="text-sm font-mono text-ice-300">
                  ${fundingProgress.nextCleanRaised} / ${fundingProgress.nextCleanGoal}
                </span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-ice-400 to-lime transition-all duration-700"
                  style={{ width: `${percent}%` }}
                  role="progressbar"
                  aria-valuenow={percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-3xl font-display font-bold text-ice-400">
                  {fundingProgress.cleansFundedThisYear}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/55 mt-1">
                  Community-funded cleans this year
                </div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-lime">
                  ${fundingProgress.raised.toLocaleString()}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/55 mt-1">
                  Raised all-time
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <Link href="/sponsor#supporters" className="text-sm text-ice-300 hover:text-ice-400 transition">
                See the supporter wall →
              </Link>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
