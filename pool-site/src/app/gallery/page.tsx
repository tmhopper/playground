import type { Metadata } from "next";
import { gallery } from "@/lib/data/gallery";
import { BeforeAfter } from "@/components/media/before-after";
import { PageHeader } from "@/components/page-header";
import { NominateCTA } from "@/components/sections/nominate-cta";

export const metadata: Metadata = {
  title: "Before & After",
  description: "Every transformation, drag-to-compare. Real pools, real families, real stories.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proof"
        title="Before & after. Drag the slider."
        description={`${gallery.length} pools. Every clean filmed. Every homeowner permitted. Every family kept informed.`}
      />
      <section className="pb-24">
        <div className="container-page grid md:grid-cols-2 gap-6">
          {gallery.map((item) => (
            <BeforeAfter
              key={item.id}
              before={item.beforeImg}
              after={item.afterImg}
              title={item.title}
              location={item.location}
              story={item.story}
            />
          ))}
        </div>
      </section>
      <NominateCTA />
    </>
  );
}
