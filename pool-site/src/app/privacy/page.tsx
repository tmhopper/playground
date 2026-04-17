import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { brand } from "@/lib/data/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${brand.companyName}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: April 2026" />
      <section className="pb-24">
        <div className="container-page max-w-3xl prose prose-invert space-y-5 text-white/80 leading-relaxed">
          <p>
            This is a demo site. In production this page would be replaced with a real privacy policy. Below is template language that covers the data this site collects by default.
          </p>
          <h2>What we collect</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Information you submit in forms (booking, nomination, sponsorship, newsletter)</li>
            <li>Basic analytics (page views, referrer) if analytics keys are configured</li>
            <li>Cookies for session and preference storage</li>
          </ul>
          <h2>How we use it</h2>
          <p>
            To reply to your inquiry, schedule service, send requested emails, and improve the site. We never sell your data. We never share it with third parties beyond the processors we need to run the business (email, payments, analytics).
          </p>
          <h2>Your rights</h2>
          <p>
            You can request a copy of your data, correction of inaccurate data, or deletion of your data at any time. Email {brand.email}.
          </p>
          <h2>Contact</h2>
          <p>{brand.legalName} · {brand.address.street}, {brand.address.city}, {brand.address.state} {brand.address.zip}</p>
        </div>
      </section>
    </>
  );
}
