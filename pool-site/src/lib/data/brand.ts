export const brand = {
  name: "Troy Cleans",
  companyName: "Burdett Blue Pool Co.",
  tagline: "Reviving forgotten pools. One backyard at a time.",
  founder: "Troy Burdett",
  founderTitle: "Founder · Licensed Pool Technician",
  foundedYear: 2026,
  licenseNumber: "AZ-PC-28471",
  insuranceCarrier: "Hartford Business Insurance · $2M liability",
  email: "hello@troycleans.com",
  pressEmail: "press@troycleans.com",
  phone: "(602) 555-0199",
  primaryCity: "Phoenix, AZ",
  serviceArea: ["Phoenix", "Tempe", "Mesa", "Chandler", "Scottsdale", "Gilbert"],
  address: {
    street: "PO Box 4421",
    city: "Phoenix",
    state: "AZ",
    zip: "85003",
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
} as const;
