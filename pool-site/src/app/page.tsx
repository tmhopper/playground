import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/motion/marquee";
import { MissionBlock } from "@/components/sections/mission-block";
import { FeaturedVideos } from "@/components/sections/featured-videos";
import { BeforeAfterPreview } from "@/components/sections/before-after-preview";
import { SponsorBlock } from "@/components/sections/sponsor-block";
import { NominateCTA } from "@/components/sections/nominate-cta";
import { ServicesTeaser } from "@/components/sections/services-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { AffiliatePreview } from "@/components/sections/affiliate-preview";
import { PressStrip } from "@/components/sections/press-strip";
import { NewsletterBlock } from "@/components/sections/newsletter-block";
import { marqueeItems } from "@/lib/data/stats";
import { localBusinessJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Hero />
      <Marquee items={marqueeItems} />
      <MissionBlock />
      <FeaturedVideos />
      <BeforeAfterPreview />
      <NominateCTA />
      <ServicesTeaser />
      <Testimonials />
      <SponsorBlock />
      <AffiliatePreview />
      <PressStrip />
      <NewsletterBlock />
    </>
  );
}
