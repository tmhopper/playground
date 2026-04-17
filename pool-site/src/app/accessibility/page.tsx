import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { brand } from "@/lib/data/brand";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Commitment to accessible design and contact for accessibility issues.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Accessibility Statement" description="Last updated: April 2026" />
      <section className="pb-24">
        <div className="container-page max-w-3xl prose prose-invert space-y-5 text-white/80 leading-relaxed">
          <p>
            We aim to meet WCAG 2.1 AA across the site. If you encounter anything that makes it harder to use this site, please tell us — we'll fix it.
          </p>
          <h2>What we do</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Keyboard navigation for all interactive elements</li>
            <li>Visible focus rings and a skip-to-content link</li>
            <li>Color contrast audited at AAA levels on primary text</li>
            <li>Respect for <code>prefers-reduced-motion</code></li>
            <li>Alternative text on all informational images</li>
            <li>Semantic HTML, proper heading hierarchy, labelled form fields</li>
          </ul>
          <h2>Report an issue</h2>
          <p>
            If something isn't working for you, email {brand.email} with the page URL and a description. We treat these as high priority.
          </p>
        </div>
      </section>
    </>
  );
}
