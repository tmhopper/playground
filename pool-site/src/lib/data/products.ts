export type ProductCategory =
  | "chemicals"
  | "tools"
  | "safety"
  | "testing"
  | "pumps";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: string;
  image: string;
  review: string;
  url: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "hth-tabs",
    name: "HTH 3\" Chlorine Tabs (25 lb)",
    category: "chemicals",
    price: "$129",
    image:
      "https://images.unsplash.com/photo-1585687433492-9fcd8a8e7ae2?w=600&q=80",
    review:
      "The only tabs I buy. Dissolve slowly, don't bleach plaster. Has kept 4/5 of my weekly clients stable through two Phoenix summers.",
    url: "https://www.amazon.com/dp/B000BQSOE6?tag=troycleans-20",
    featured: true,
  },
  {
    id: "pool-blaster",
    name: "Pool Blaster Max CG",
    category: "tools",
    price: "$199",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    review:
      "Battery vacuum, 2 hours per charge. Saved my back on the Ramirez job. Gets 90% of what a full pressure vac does.",
    url: "https://www.amazon.com/dp/B004OHOJMW?tag=troycleans-20",
    featured: true,
  },
  {
    id: "taylor-k2006",
    name: "Taylor K-2006 Test Kit",
    category: "testing",
    price: "$85",
    image:
      "https://images.unsplash.com/photo-1532634896-26909d0d4c6d?w=600&q=80",
    review:
      "Strips lie. Drops don't. If you care about balance — this is the kit. Lasts a full season, and you'll know exactly what's going on.",
    url: "https://www.amazon.com/dp/B001A8UK3U?tag=troycleans-20",
    featured: true,
  },
  {
    id: "algaecide-60",
    name: "HTH Super Algae Guard (60%)",
    category: "chemicals",
    price: "$38",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    review:
      "60% copper-free. Pre-treat once a month in summer. Preventing algae is way cheaper than fixing it.",
    url: "https://www.amazon.com/dp/B00MV9B84W?tag=troycleans-20",
    featured: true,
  },
  {
    id: "telescopic-pole",
    name: "Telescopic Pool Pole · 6–18ft",
    category: "tools",
    price: "$62",
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80",
    review:
      "Aluminum, external cam lock. Cheap poles flex and break. This one's in my truck every day.",
    url: "https://www.amazon.com/dp/B07L91GFG4?tag=troycleans-20",
  },
  {
    id: "vac-head",
    name: "Weighted Triangular Vac Head",
    category: "tools",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1629905607580-9d68c4f8d35f?w=600&q=80",
    review:
      "Gets into corners that a round head never will. The weighted version stays on the floor — no more chasing.",
    url: "https://www.amazon.com/dp/B085KDMZZQ?tag=troycleans-20",
  },
  {
    id: "brush-nylon",
    name: "22\" Nylon Pool Brush",
    category: "tools",
    price: "$19",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    review:
      "Nylon for vinyl and fiberglass. Wire brushes will destroy those surfaces. Pebble Tec gets the stainless stiff brush instead.",
    url: "https://www.amazon.com/dp/B09PJTP2KQ?tag=troycleans-20",
  },
  {
    id: "saftron-rail",
    name: "Saftron Safety Rail",
    category: "safety",
    price: "$349",
    image:
      "https://images.unsplash.com/photo-1576484100175-1977e3d0c9f1?w=600&q=80",
    review:
      "For older swimmers getting in and out. Rust-proof. I've installed four of these for elderly clients and it's been life-changing.",
    url: "https://www.amazon.com/dp/B074BNZXMT?tag=troycleans-20",
  },
  {
    id: "life-ring",
    name: "USCG-Approved Life Ring · 24\"",
    category: "safety",
    price: "$48",
    image:
      "https://images.unsplash.com/photo-1562511211-68f30ca83fa3?w=600&q=80",
    review:
      "If kids are around, this is a $48 insurance policy. Mount it visible, not decorative.",
    url: "https://www.amazon.com/dp/B08F7M5C4G?tag=troycleans-20",
  },
  {
    id: "baquacil-cleanser",
    name: "Cell Cleaner for Salt Chlorinators",
    category: "chemicals",
    price: "$22",
    image:
      "https://images.unsplash.com/photo-1585687433492-9fcd8a8e7ae2?w=600&q=80",
    review:
      "Run through your salt cell every 3 months and it'll last twice as long. Skip the expensive cell replacements.",
    url: "https://www.amazon.com/dp/B00Q5ZHS0A?tag=troycleans-20",
  },
  {
    id: "hayward-pump",
    name: "Hayward Super Pump VS (1.5 HP)",
    category: "pumps",
    price: "$729",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    review:
      "Variable speed. Pays for itself in one season vs. a single-speed. I won't install anything else anymore.",
    url: "https://www.amazon.com/dp/B0855QM8WL?tag=troycleans-20",
  },
  {
    id: "filter-cartridge",
    name: "Pleatco Replacement Cartridge · PA90",
    category: "pumps",
    price: "$68",
    image:
      "https://images.unsplash.com/photo-1629905607580-9d68c4f8d35f?w=600&q=80",
    review:
      "OEM quality at half the price. Lasts 2 seasons with proper quarterly cleans.",
    url: "https://www.amazon.com/dp/B001D24KOK?tag=troycleans-20",
  },
];

export const featuredProducts = products.filter((p) => p.featured);
