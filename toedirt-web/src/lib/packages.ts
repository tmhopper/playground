export type PackageTier = {
  id: string;
  name: string;
  headline: string;
  price: number;
  priceLabel?: string;
  features: string[];
  categories: PackageCategory[];
  featured?: boolean;
  cta: string;
};

export type PackageCategory =
  | "construction"
  | "furries"
  | "fetish"
  | "tootling"
  | "pov"
  | "comedy";

export const categoryLabels: Record<PackageCategory, string> = {
  construction: "Construction Toes",
  furries: "Toe Furries",
  fetish: "Hard Fetishes",
  tootling: "Tootling",
  pov: "Kinky POV",
  comedy: "Comedy Skits",
};

export const packages: PackageTier[] = [
  {
    id: "bronze",
    name: "Bronze — Starter Kit",
    headline: "Dip a toe in.",
    price: 99.99,
    features: ["1 high-res photo", "Standard jobsite lighting", "Watermark-free", "Delivered in 3 business days"],
    categories: ["construction", "tootling"],
    cta: "Start Small",
  },
  {
    id: "silver",
    name: "Silver — Jobsite Special",
    headline: "Two toes are better than one.",
    price: 159.99,
    features: ["2 high-res photos", "Macro lens option", "Dirt-level color grading", "Delivered in 2 business days"],
    categories: ["construction", "fetish", "tootling"],
    cta: "Book Silver",
  },
  {
    id: "gold",
    name: "Gold — The Full Toe",
    headline: "The one you've been dreaming about.",
    price: 259.99,
    features: [
      "2 high-res photos",
      "1 vertical video (up to 90s)",
      "Background of your choice",
      "Bob cameo (non-speaking)",
      "Delivered in 48 hours",
    ],
    categories: ["construction", "furries", "fetish", "tootling", "pov"],
    featured: true,
    cta: "Go Gold",
  },
  {
    id: "platinum",
    name: "Platinum — Toe Dirt Deluxe",
    headline: "The whole jobsite experience.",
    price: 599.99,
    features: [
      "5 high-res photos",
      "2 vertical videos",
      "Bob speaking cameo",
      "Custom prop request",
      "Signed digital polaroid",
      "Delivered in 24 hours",
    ],
    categories: ["construction", "furries", "fetish", "tootling", "pov", "comedy"],
    cta: "Go Platinum",
  },
  {
    id: "concrete",
    name: "Concrete Club — Custom",
    headline: "Pour your own mold.",
    price: 1200,
    priceLabel: "Starting at $1,200",
    features: [
      "Fully bespoke brief",
      "Unlimited revisions within scope",
      "Direct line to Bob",
      "NDA-optional",
      "Turnaround negotiated in DMs",
    ],
    categories: ["construction", "furries", "fetish", "tootling", "pov", "comedy"],
    cta: "Slide In My DMs",
  },
];

export const addOns = [
  { id: "pov-shot", name: "POV Shot", price: 49 },
  { id: "boxer-peek", name: "Boxer Peek", price: 69 },
  { id: "toe-tidy-whitey", name: "Toe Tidy Whitey Feature", price: 89 },
  { id: "bob-collab", name: "Bob Collaboration", price: 199 },
  { id: "handwritten-note", name: "Handwritten Dirt Note", price: 19 },
  { id: "mud-upgrade", name: "Premium Mud Upgrade", price: 39 },
];
