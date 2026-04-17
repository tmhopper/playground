export const brand = {
  name: "Troy Cleans",
  companyName: "Burdett Blue Pool Co.",
  tagline: "Reviving forgotten pools. One backyard at a time.",
  founder: "Troy Burdett",
  founderTitle: "Founder · Licensed Pool Technician",
  foundedYear: 2026,
  licenseNumber: "CA-PC-44812",
  insuranceCarrier: "Hartford Business Insurance · $2M liability",
  email: "hello@troycleans.com",
  pressEmail: "press@troycleans.com",
  phone: "(209) 555-0199",
  primaryCity: "Manteca, CA",
  serviceArea: [
    "Manteca",
    "Stockton",
    "Tracy",
    "Lodi",
    "Modesto",
    "Ripon",
    "Lathrop",
    "Sacramento",
    "Fresno",
    "Bay Area",
  ],
  address: {
    street: "PO Box 1428",
    city: "Manteca",
    state: "CA",
    zip: "95336",
  },
  socials: {
    tiktok: "https://tiktok.com/@troycleans",
    youtube: "https://youtube.com/@troycleans",
    instagram: "https://instagram.com/troycleans",
  },
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://troycleans.com",
  legalName: "Burdett Blue Pool Co. LLC",
  missionShort:
    "I clean neglected pools for free and film the work. Paying clients and affiliate partners fund the free side.",
  // To replace with Troy's real photo: upload to pool-site/public/images/troy.jpg
  // then change this to "/images/troy.jpg" (basePath is added automatically).
  founderPhoto:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=85",
  founderPhotoSmall:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
} as const;
