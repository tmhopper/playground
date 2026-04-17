import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { SponsorForm } from "@/components/forms/sponsor-form";
import { supporterWall, fundingProgress } from "@/lib/data/sponsors";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sponsor a Clean",
  description: "Fund a free pool clean. $50 covers chemicals. $250 underwrites a full job. Every dollar goes to supplies and families.",
};

export default function SponsorPage() {
  const percent = Math.round(
    (fundingProgress.nextCleanRaised / fundingProgress.nextCleanGoal) * 100,
  );

  return (
    <>
      <PageHeader
        eyebrow={<span className="inline-flex items-center gap-2"><Heart size={14} /> Fund a free clean</span>}
        title="Sponsor a clean. Make the next transformation possible."
        description="Sponsorships are the third leg of the business. Every dollar goes directly to chemicals, supplies, and a family that needs it. I'll send you photos + a video link when your sponsored job goes up."
      />

      <section className="pb-20">
        <div className="container-page grid lg:grid-cols-[1.2fr_1fr] gap-10">
          <Card className="p-6 md:p-8">
            <SponsorForm />
          </Card>

          <div className="space-y-6">
            <Card glass>
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
                  className="h-full bg-gradient-to-r from-ice-400 to-lime"
                  style={{ width: `${percent}%` }}
                  role="progressbar"
                  aria-valuenow={percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-white/10">
                <Stat label="Cleans funded this year" value={fundingProgress.cleansFundedThisYear} />
                <Stat label="Raised all-time" value={`$${fundingProgress.raised.toLocaleString()}`} />
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-display mb-2">How this money is spent</h3>
              <ul className="text-sm text-white/75 space-y-2.5">
                <li>→ ~50% chemicals &amp; consumables</li>
                <li>→ ~30% filter cartridges, O-rings, small parts</li>
                <li>→ ~15% fuel, consumable equipment (brushes, hoses)</li>
                <li>→ ~5% filming supplies (batteries, SD cards, incidentals)</li>
              </ul>
              <p className="text-xs text-white/50 mt-4 leading-relaxed">
                I don't pay myself from sponsorship dollars. Paying clients cover labor. Sponsors cover supplies.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="supporters" className="py-20 border-t border-white/10">
        <div className="container-page">
          <p className="text-xs uppercase tracking-widest text-ice-400">Supporter wall</p>
          <h2 className="mt-2">Recent contributions.</h2>
          <p className="mt-4 text-white/65 max-w-2xl">
            Names appear here with permission. Leave the display-name field blank to stay anonymous.
          </p>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {supporterWall.map((s, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/10"
              >
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-white/50">{s.city} · {formatDate(s.date)}</div>
                </div>
                <div className="font-display font-bold text-ice-400">${s.amount}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-3xl font-display font-bold text-ice-400">{value}</div>
      <div className="text-xs uppercase tracking-widest text-white/55 mt-1">{label}</div>
    </div>
  );
}
