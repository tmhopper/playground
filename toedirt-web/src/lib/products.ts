export type Product = {
  slug: string;
  name: string;
  price: number;
  tagline: string;
  description: string;
  reviews: { author: string; rating: number; body: string }[];
  bobApproved?: boolean;
};

export const products: Product[] = [
  {
    slug: "toe-tidy-whities",
    name: "Toe Tidy Whities",
    price: 38,
    tagline: "The novelty underwear with a surprise bulge.",
    description:
      "Hand-cut, screen-printed, and certified ridiculous. Comfortable enough for laundry day, memorable enough for everything else. Machine wash cold with feelings.",
    reviews: [
      { author: "Travis", rating: 5, body: "Wife laughed. Wife kept them. Unclear outcome." },
      { author: "Doreen", rating: 4, body: "Docked a star because the toe is a little too realistic." },
    ],
    bobApproved: true,
  },
  {
    slug: "magtoe-mount",
    name: "MagToe Mount™",
    price: 59,
    tagline: "The magnetic plate attachment for the toe you love.",
    description:
      "Engineered-grade magnets, food-safe finish, entirely nonsensical premise. Comes with a calligraphed card that reads \"Eat off my toe, but only once.\"",
    reviews: [
      { author: "Ryan", rating: 5, body: "My charcuterie boards have never been more conversational." },
      { author: "Samira", rating: 5, body: "Sticks to the fridge. Sticks to the heart." },
    ],
    bobApproved: true,
  },
  {
    slug: "toe-mold-stand",
    name: "Toe Mold Stand",
    price: 24,
    tagline: "A phone stand cast from a real big toe. Allegedly.",
    description:
      "Molded polymer. Holds phones up to 7 inches and dignity down to zero. Each unit ships with a numbered certificate of toe-uthenticity.",
    reviews: [
      { author: "Meg", rating: 5, body: "Finally, a phone stand that makes eye contact with me." },
    ],
  },
  {
    slug: "bobs-hard-hat-tee",
    name: "Bob's Hard Hat Tee",
    price: 32,
    tagline: "Heavyweight cotton, jobsite-soft.",
    description:
      "Rust-red hard-hat graphic, caution-tape stripe at the hem. Cut for a roomy fit. Bob wore one once and now he owns seven.",
    reviews: [
      { author: "Terrence", rating: 5, body: "Soft as a freshly poured foundation." },
    ],
    bobApproved: true,
  },
  {
    slug: "dms-hoodie",
    name: "\"I Slid Into His DMs\" Hoodie",
    price: 68,
    tagline: "A confession you can wear.",
    description:
      "Mid-weight fleece, kangaroo pocket big enough for a truthful secret. Embroidered tagline across the chest in marker font.",
    reviews: [
      { author: "Alyssa", rating: 5, body: "Ex saw me wearing it. Texted me. We don't talk about it." },
    ],
  },
  {
    slug: "dirt-sticker-pack",
    name: "Dirt-Under-the-Nail Sticker Pack",
    price: 12,
    tagline: "Six weatherproof vinyl stickers. Fully unregulated.",
    description:
      "Slap them on your toolbox, your laptop, your landlord's mailbox. Fade-resistant for up to one (1) real Midwest summer.",
    reviews: [
      { author: "Casey", rating: 5, body: "I put one on my hard hat. Supervisor asked. I got a raise." },
    ],
  },
  {
    slug: "big-toe-trophy",
    name: "Big Toe Trophy",
    price: 149,
    tagline: "Mantle-ready. Conversation-starting. Legally not a foot.",
    description:
      "Cold-cast in polystone with a real walnut base. Engraved plaque reads \"Recipient of the Annual Toe Dirt Distinction.\"",
    reviews: [
      { author: "Everett", rating: 5, body: "I gave this to my dad. We don't speak anymore, but in a respectful way." },
    ],
    bobApproved: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
