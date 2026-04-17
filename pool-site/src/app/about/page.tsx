import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { brand } from "@/lib/data/brand";
import { PageHeader } from "@/components/page-header";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VolunteerForm, MediaContactForm } from "@/components/forms/simple-forms";

export const metadata: Metadata = {
  title: "About Troy",
  description: `About ${brand.founder}, founder of ${brand.companyName}. The story, the mission, press, and how to get in touch.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>I&apos;m {brand.founder}. I clean pools for a living — and sometimes for nothing at all.</>}
      />

      <section className="pb-20">
        <div className="container-page grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
          <div className="prose prose-invert prose-lg max-w-none space-y-5 text-white/80 leading-relaxed">
            <p>
              I grew up two streets over from a pool that was green for six summers. A neighbor's house, fenced in, quiet, always the same thing. The owner had lost her husband and couldn't keep up. Every time I walked past I thought someone should fix that.
            </p>
            <p>
              I got my pool-tech license in 2023. Built a small paying route. Started filming myself on weekends, cleaning the kinds of pools no one wants to touch — at first just to learn the hardest cases. Then I realized people wanted to watch those.
            </p>
            <p>
              The whole business is structured around keeping the free work sustainable. Paying clients cover labor. Affiliate partners cover consumables for the videos. Viewers who want to fund a specific job can do that directly. Three legs, one mission.
            </p>
            <p>
              I film with full homeowner permission. I don't show addresses. I don't surprise people. I don't monetize anyone's hardship. These are collaborations, not content grabs.
            </p>
          </div>

          <Card className="aspect-[4/5] relative overflow-hidden p-0">
            <Image
              src="https://images.unsplash.com/photo-1519075677053-39a76c8519c6?w=1200&q=85"
              alt={`${brand.founder}, founder of ${brand.companyName}`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Card>
        </div>
      </section>

      <StatsStrip />

      <section className="py-20">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <Card>
            <h3 className="text-xl font-display mb-2">Press &amp; media</h3>
            <p className="text-white/70 text-sm mb-5">
              Writing about this? Here's a press kit with logos, founder photos, and an approved bio. For interviews, use the form below.
            </p>
            <Button href="/press-kit.zip" variant="secondary">
              <Download size={16} /> Download press kit
            </Button>
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="font-display text-lg mb-3">Media inquiries</h4>
              <MediaContactForm />
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-display mb-2">Volunteer with us</h3>
            <p className="text-white/70 text-sm mb-5">
              Community Days happen one weekend a month. We need extra hands for filming, gear-carrying, and keeping the day moving. No pool experience required.
            </p>
            <VolunteerForm />
          </Card>
        </div>
      </section>

      <section className="py-20 border-t border-white/10 bg-ocean-900/30">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <Info label="Email" value={brand.email} />
          <Info label="Press" value={brand.pressEmail} />
          <Info label="Phone" value={brand.phone} />
          <Info label="Service area" value={brand.serviceArea.join(", ")} />
        </div>
      </section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-white/50">{label}</p>
      <p className="mt-1.5 text-white font-medium break-words">{value}</p>
    </div>
  );
}
