import type { Metadata } from "next";
import { Check } from "lucide-react";
import { NominateForm } from "@/components/forms/nominate-form";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Nominate a Pool",
  description: "Know a pool that needs saving? Submit a nomination — we'll review every one personally.",
};

export default function NominatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Nominate"
        title="Nominate a pool. Change someone's week."
        description="Every transformation starts with someone noticing. If you know a pool that's been abandoned, neglected, or left behind because the owner can't keep up — tell me about it. I review every submission personally."
      />

      <section className="pb-24">
        <div className="container-page grid lg:grid-cols-[2fr_3fr] gap-10">
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-display">Who qualifies</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                {[
                  "Elderly homeowners who can't physically keep up",
                  "Families mid-medical-crisis",
                  "Foreclosed or bank-owned properties (with asset-manager permission)",
                  "Abandoned short-term rentals affecting a neighborhood",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check size={16} className="text-lime shrink-0 mt-0.5" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-display">What I won't do</h3>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                I won't clean a pool without explicit permission from the owner or authorized representative. Ever. Nominations without a path to consent just go on the waitlist until we figure one out together.
              </p>
            </Card>
            <Card glass>
              <h3 className="text-lg font-display">How fast?</h3>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                I do 2–3 free cleans a month. Waitlist runs 4–8 weeks. Severe cases (mosquito hazards, child-safety concerns) get prioritized.
              </p>
            </Card>
          </div>

          <div>
            <Card className="p-6 md:p-8">
              <NominateForm />
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
