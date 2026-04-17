import { brand } from "@/lib/data/brand";
import { services } from "@/lib/data/services";
import { aggregateRating, testimonials } from "@/lib/data/testimonials";
import { faqs } from "@/lib/data/faqs";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${brand.siteUrl}#business`,
  name: brand.companyName,
  alternateName: brand.name,
  description: brand.missionShort,
  url: brand.siteUrl,
  telephone: brand.phone,
  email: brand.email,
  priceRange: "$85 – $800",
  foundingDate: `${brand.foundedYear}-01-01`,
  founder: { "@type": "Person", name: brand.founder },
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.address.street,
    addressLocality: brand.address.city,
    addressRegion: brand.address.state,
    postalCode: brand.address.zip,
    addressCountry: "US",
  },
  areaServed: brand.serviceArea.map((city) => ({
    "@type": "City",
    name: city,
  })),
  sameAs: Object.values(brand.socials),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: aggregateRating.value,
    reviewCount: aggregateRating.count,
    bestRating: aggregateRating.outOf,
  },
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    name: s.name,
    price: s.price.replace(/[^0-9]/g, "") || undefined,
    priceCurrency: "USD",
    description: s.tagline,
  })),
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: brand.companyName,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: aggregateRating.value,
    reviewCount: aggregateRating.count,
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: 5,
    },
    reviewBody: t.quote,
    datePublished: t.date,
  })),
};
