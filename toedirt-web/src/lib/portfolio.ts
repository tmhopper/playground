export type PortfolioCategory = {
  slug: string;
  name: string;
  description: string;
  items: PortfolioItem[];
  gated?: boolean;
};

export type PortfolioItem = {
  id: string;
  title: string;
  caption: string;
  palette: [string, string];
};

const p = (a: string, b: string): [string, string] => [a, b];

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "construction",
    name: "Construction Toes",
    description: "Jobsite-first compositions. Boots, dust, peek-out.",
    items: [
      { id: "c1", title: "Framer's Friday", caption: "Steel-toes off. Soul on.", palette: p("#4A3728", "#FF6B1A") },
      { id: "c2", title: "Rebar Repose", caption: "A portrait of a man at rest, but his toe is working.", palette: p("#3B2C20", "#F5C518") },
      { id: "c3", title: "The 4pm Whistle", caption: "Finally, release. Also, the toe.", palette: p("#8B2C1F", "#F4EDE0") },
      { id: "c4", title: "Dust-Up", caption: "Composition in brown, brown, and brown.", palette: p("#2C2018", "#A48353") },
    ],
  },
  {
    slug: "furries",
    name: "Toe Furries",
    description: "Crossover aesthetics. Plush meets plaster.",
    items: [
      { id: "f1", title: "Paws & Pause", caption: "A gentle meeting of fiber arts and foot.", palette: p("#4A3728", "#F5C518") },
      { id: "f2", title: "Woolen Whistle", caption: "Knit to please.", palette: p("#A48353", "#8B2C1F") },
      { id: "f3", title: "The Mascot Mingle", caption: "Bob approved this one.", palette: p("#FF6B1A", "#2C2018") },
    ],
  },
  {
    slug: "fetish",
    name: "Hard Fetishes",
    description: "Hardware-staged, suggestively composed, entirely PG-13.",
    items: [
      { id: "h1", title: "Hammer & Tongs", caption: "Only one of these is allowed near the toe.", palette: p("#7A7A78", "#FF6B1A") },
      { id: "h2", title: "Drill Bit Dialogue", caption: "The toe listens more than it speaks.", palette: p("#1D1510", "#F5C518") },
      { id: "h3", title: "Socket Wrench Sonnet", caption: "Torque, tenderly applied.", palette: p("#4A3728", "#F4EDE0") },
    ],
  },
  {
    slug: "tootling",
    name: "Tootling",
    description: "Leisurely strolls, cuddled toes, post-shift ease.",
    items: [
      { id: "t1", title: "Sunday Shuffle", caption: "The toe has nowhere to be.", palette: p("#F5C518", "#4A3728") },
      { id: "t2", title: "Porch Light Pilgrimage", caption: "A quiet walk, and a toe in thought.", palette: p("#A48353", "#F4EDE0") },
      { id: "t3", title: "Toe Cuddle Pile", caption: "Consenting toes at rest.", palette: p("#FF6B1A", "#2C2018") },
    ],
  },
  {
    slug: "pov",
    name: "Kinky POV",
    description: "Point-of-view staging. Members-only preview.",
    gated: true,
    items: [
      { id: "p1", title: "Over the Shoulder", caption: "A vantage. A vibe. A vague violation of HR policy.", palette: p("#2C2018", "#FF6B1A") },
      { id: "p2", title: "Keyhole Nine", caption: "You see what you see, and the toe sees you back.", palette: p("#1D1510", "#F5C518") },
      { id: "p3", title: "The Witness", caption: "Framed by a safety helmet. Narrated by Bob.", palette: p("#8B2C1F", "#F4EDE0") },
    ],
  },
  {
    slug: "macro",
    name: "Macro Shots",
    description: "Extreme close-ups. Cinema-grade. Toe-textured.",
    items: [
      { id: "m1", title: "The Ridge", caption: "A cuticle like a coastline.", palette: p("#4A3728", "#F4EDE0") },
      { id: "m2", title: "The Delta", caption: "Where dust meets destiny.", palette: p("#A48353", "#FF6B1A") },
      { id: "m3", title: "Monolith", caption: "One toe. One monument.", palette: p("#2C2018", "#F5C518") },
    ],
  },
];

export function getCategory(slug: string) {
  return portfolioCategories.find((c) => c.slug === slug);
}
