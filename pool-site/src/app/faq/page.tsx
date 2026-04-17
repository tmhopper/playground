import type { Metadata } from "next";
import { faqs } from "@/lib/data/faqs";
import { Accordion } from "@/components/ui/accordion";
import { PageHeader } from "@/components/page-header";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions I get most often — nominations, paid services, the free-clean model, and chemistry.",
};

export default function FAQPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        eyebrow="FAQ"
        title="Answers to the questions I hear most."
        description="If something isn't covered here, email hello@troycleans.com — I reply personally."
      />
      <section className="pb-24">
        <div className="container-page max-w-3xl space-y-12">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="text-2xl mb-4">{cat}</h2>
              <Accordion items={faqs.filter((f) => f.category === cat)} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
