import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { brand } from "@/lib/data/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${brand.companyName}.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" description="Last updated: April 2026" />
      <section className="pb-24">
        <div className="container-page max-w-3xl prose prose-invert space-y-5 text-white/80 leading-relaxed">
          <p>
            By using this site or booking a service you agree to these terms. This is template language for a demo site — replace before launch.
          </p>
          <h2>Services</h2>
          <p>
            Service pricing is honored as published. Pricing may change; changes never apply retroactively to a confirmed booking. We reserve the right to decline service for any reason.
          </p>
          <h2>Cancellations</h2>
          <p>
            Weekly service can be cancelled any time with 48 hours notice. One-time cleans can be rescheduled once at no charge. No-shows are billed the full service rate.
          </p>
          <h2>Nominated cleans</h2>
          <p>
            Nominated cleans are performed at our discretion, only with written homeowner consent, and never on a guaranteed timeline. Submitting a nomination does not create an obligation to perform the service.
          </p>
          <h2>Filming &amp; content rights</h2>
          <p>
            Paid clients are never filmed without explicit written consent. Nominated-clean subjects may opt in to be shown on camera — addresses and license plates are always obscured.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            Standard service-business limitation language. In no event will our liability exceed the amount paid for the service in question. We carry $2M general liability insurance.
          </p>
          <h2>Governing law</h2>
          <p>State of California.</p>
          <h2>Contact</h2>
          <p>{brand.legalName} · {brand.email}</p>
        </div>
      </section>
    </>
  );
}
