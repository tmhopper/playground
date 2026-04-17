import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { brand } from "@/lib/data/brand";

export const metadata: Metadata = {
  title: "Affiliate & Sponsorship Disclosure",
  description: "FTC-compliant disclosure on affiliate links, sponsorships, and filming consent.",
};

export default function DisclosurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Disclosures."
        description="Full transparency on how I make money, what I'll take money for, and what I won't."
      />
      <section className="pb-24">
        <div className="container-page max-w-3xl prose prose-invert space-y-5 text-white/80 leading-relaxed">
          <h2>Affiliate links</h2>
          <p>
            The Shop page and several blog posts contain affiliate links — primarily to Amazon. When you buy through one, I earn a small commission at no cost to you. Those commissions go directly into the free-clean fund (chemicals, filter parts, fuel). Every product I recommend is something I currently use on real service calls. Nothing is on this site because a brand paid to be there.
          </p>
          <p>
            As an Amazon Associate I earn from qualifying purchases.
          </p>
          <h2>Sponsorships</h2>
          <p>
            Viewer-funded sponsorships are collected via Stripe. Funds are used exclusively for supplies for free cleans — never for labor, never for overhead, never for anything that isn't chemicals, consumables, or filming supplies. Monthly allocation reports available on request.
          </p>
          <h2>Business sponsorships</h2>
          <p>
            Local businesses can sponsor a month of cleans in exchange for a thank-you mention at the end of each video. These are marked clearly on-screen. Business sponsorships never change which pools I clean or how.
          </p>
          <h2>Filming consent</h2>
          <p>
            Every filmed clean — paid or free — is subject to a written photo/video release signed by the homeowner or authorized representative. Addresses, license plates, and personally identifying details are blurred in post. Homeowners can opt out of appearing on camera; many do.
          </p>
          <h2>Things I won't take money for</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Changing the order of nominations based on how much someone pays</li>
            <li>Reviewing a product I don't personally use</li>
            <li>Endorsing a chemical I wouldn't put in my own pool</li>
            <li>Hiding a homeowner's situation or identity against their wishes</li>
          </ul>
          <h2>Questions</h2>
          <p>Email {brand.email}. I'll answer personally.</p>
        </div>
      </section>
    </>
  );
}
