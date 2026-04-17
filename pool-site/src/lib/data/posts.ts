export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "how-to" | "gear-review" | "case-file" | "owner-101";
  coverImage: string;
  publishedAt: string;
  readMins: number;
  content: { type: "p" | "h2" | "h3" | "ul" | "quote" | "callout"; value: string | string[] }[];
};

export const posts: Post[] = [
  {
    slug: "rescue-a-green-pool-72-hours",
    title: "How I rescue a 4-year-old green pool in 72 hours",
    excerpt:
      "The full process for taking a pool that's been abandoned for years back to swimmable — chemicals, equipment, sequencing, and what to skip.",
    category: "how-to",
    coverImage:
      "https://images.unsplash.com/photo-1572839150175-e75a91e2ed17?w=1600&q=80",
    publishedAt: "2026-04-10",
    readMins: 9,
    content: [
      { type: "p", value: "People assume a green pool is a lost cause. It almost never is. The water itself costs about $400 to replace — and in California Central Valley, that's 15,000 gallons of drinking water you'd be dumping down a storm drain. So the first rule of rescue is: don't drain if you can help it." },
      { type: "h2", value: "Day 1 — triage and filtration" },
      { type: "p", value: "Before a drop of chemical goes in, I do three things: skim the surface of debris (gross but critical), inspect the pump and filter, and backwash or clean the cartridges. A dirty filter can't clean green water. You're just circulating soup." },
      { type: "callout", value: "If the pump won't prime, stop everything and fix that first. I have a whole video on diagnosing prime issues — link below." },
      { type: "h2", value: "Day 2 — shock and hold" },
      { type: "p", value: "Triple-shock or quadruple-shock depending on severity. For the Ramirez pool I used four pounds of calcium hypochlorite per 10,000 gallons. Dissolve it in a bucket of pool water first — never dump granular shock directly on Pebble Tec or plaster." },
      { type: "ul", value: [
        "Brush aggressively every 4–6 hours",
        "Run the pump 24/7 — no exceptions",
        "Clean the filter every 8–12 hours",
        "Add a 60% algaecide at hour 24",
      ]},
      { type: "h2", value: "Day 3 — clarify and balance" },
      { type: "p", value: "By day three you should see blue — maybe cloudy, but blue. This is when I add a clarifier (polymer flocculant) to pull the dead algae out of suspension. Then balance: alkalinity first, then pH, then calcium, then cyanuric acid. In that order, always." },
      { type: "quote", value: "The hardest part of a rescue isn't the chemistry. It's patience. If you shock-and-go, the algae comes right back. You have to hold the chlorine high for 72 hours minimum." },
      { type: "h2", value: "What I charge for a rescue vs. what I spend" },
      { type: "p", value: "Paid Green-to-Clean Rescues run $450–$800 depending on size and severity. Chemicals usually eat $80–$160 of that. The rest covers 10–14 hours on site, filter deep-clean labor, and a month of follow-up. It is not a high-margin service. It's the most satisfying one." },
    ],
  },
  {
    slug: "test-kit-strips-vs-drops",
    title: "The $85 test kit vs. the $6 strips — 60 days of data",
    excerpt:
      "I ran both on the same pools for two months. The results weren't close. Here's the data and the recommendation.",
    category: "gear-review",
    coverImage:
      "https://images.unsplash.com/photo-1532634896-26909d0d4c6d?w=1600&q=80",
    publishedAt: "2026-03-28",
    readMins: 7,
    content: [
      { type: "p", value: "Strips vs. drops is the pool-nerd equivalent of film vs. digital. Everyone has an opinion, almost no one has data. I wanted data." },
      { type: "h2", value: "The setup" },
      { type: "p", value: "Five client pools, two months, same sampling time each day. I took two readings every visit: one from a $6 strip pack and one from a Taylor K-2006 drop kit. I logged every reading." },
      { type: "h2", value: "The findings" },
      { type: "ul", value: [
        "Strips were within ±0.4 pH on 68% of readings",
        "Strips were wildly off on chlorine above 5 ppm (they max out visually)",
        "Strips missed total alkalinity trends until they'd already caused cloudy water",
        "Drops were accurate across every range, every time",
      ]},
      { type: "h2", value: "What I actually recommend" },
      { type: "p", value: "If you have a salt pool or you're dealing with an ongoing issue, buy the Taylor kit. It'll pay for itself inside of two months of not-buying-unneeded-chemicals. If your pool is stable and you're just checking it once a week, strips are fine. Just don't trust them for anything out of normal range." },
    ],
  },
  {
    slug: "why-your-pump-wont-prime",
    title: "Why your pump won't prime (and how to fix it without calling anyone)",
    excerpt:
      "Nine times out of ten it's one of three things. Here's the diagnostic ladder.",
    category: "how-to",
    coverImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80",
    publishedAt: "2026-03-15",
    readMins: 6,
    content: [
      { type: "p", value: "A pump that won't prime is the number-one reason I get panic texts. It's also almost always a five-minute fix that doesn't require anyone to come out." },
      { type: "h2", value: "The three usual suspects" },
      { type: "ul", value: [
        "The pump basket lid O-ring is dry, cracked, or missing",
        "The skimmer basket or pump basket is jammed with debris",
        "There's an air leak on the suction side (usually a cracked valve)",
      ]},
      { type: "h2", value: "The five-minute diagnostic" },
      { type: "p", value: "Turn the pump off. Open the lid. Lube the O-ring with silicone pool lube (not petroleum jelly — it eats O-rings). Empty the basket. Close it up, prime it full of water from a garden hose, and fire it up. If it still won't hold prime, check your multiport valve and the air relief on the filter. One of those is your leak." },
    ],
  },
  {
    slug: "pebble-tec-stain-removal",
    title: "Pebble Tec stain removal — what actually works (and what wrecks it)",
    excerpt:
      "Ascorbic acid, sequestering agents, and the muriatic mistake people regret. A practical guide.",
    category: "how-to",
    coverImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80",
    publishedAt: "2026-02-28",
    readMins: 8,
    content: [
      { type: "p", value: "Pebble Tec is the best finish on the market and the hardest to repair if you mess it up. Before you touch a stain, figure out what it is. Metal stains (brown/blue/green) are chemistry. Organic stains (pink/black) are biology. You treat them totally differently." },
      { type: "h2", value: "Metal stains — the ascorbic treatment" },
      { type: "p", value: "Lower your chlorine to zero. Lower pH to 7.0. Broadcast ascorbic acid powder at one pound per 10,000 gallons. Circulate for 24 hours. You should see the stain lift. Then add a sequestering agent to keep the metal suspended so it can be filtered out." },
      { type: "h2", value: "Organic stains — chlorine, not acid" },
      { type: "p", value: "Reverse everything above. High chlorine, high pH, and brush aggressively. Most organic staining lifts in a shock cycle." },
      { type: "callout", value: "Never pour muriatic acid directly on Pebble Tec to 'spot treat' — it'll etch the pebbles permanently. I've seen this mistake cost homeowners $14,000 in resurfacing." },
    ],
  },
  {
    slug: "case-file-ramirez",
    title: "Case File: Mrs. Ramirez's pool — 4 years, $0, one weekend",
    excerpt:
      "The full story behind the video that went viral. What it actually took, what I spent, and what I learned.",
    category: "case-file",
    coverImage:
      "https://images.unsplash.com/photo-1571269608263-14ff2ba4b7c2?w=1600&q=80",
    publishedAt: "2026-02-12",
    readMins: 11,
    content: [
      { type: "p", value: "The video has 842,000 views. But the video is 18 minutes. The actual clean was 11 hours spread over a Saturday and Sunday. This is the version that didn't fit in the cut." },
      { type: "h2", value: "How she got on the list" },
      { type: "p", value: "Her granddaughter submitted a nomination. Three paragraphs. The one that got me was: 'It's the only place my grandpa ever looked relaxed.' I called the next day." },
      { type: "h2", value: "The walk-through" },
      { type: "p", value: "It was bad. Black-green, ankle-deep in leaves, frogs, a dead bird, a rusted pump that hadn't been powered on since 2022. I told her straight: I think we can save it, but no promises on the pump." },
      { type: "h2", value: "What it cost" },
      { type: "p", value: "Chemicals: $112. New pump basket and O-rings: $38. Filter cartridge replacement: $68. Two tanks of gas, an Uber Eats order, and 11 hours on site. I did not replace the pump — we got it running after 45 minutes of troubleshooting. Total out-of-pocket: about $230." },
      { type: "h2", value: "What we found after the clean" },
      { type: "p", value: "Once the water cleared, the plaster was in way better shape than either of us expected. A little stain treatment the following weekend and it looked like a 2-year-old pool. Her grandkids swam in it the next Saturday." },
      { type: "quote", value: "She said 'I didn't know I was waiting for this.' I think about that every time someone asks if this business model is sustainable." },
    ],
  },
  {
    slug: "pool-owner-101-chemistry-cheatsheet",
    title: "Pool Owner 101: The chemistry cheatsheet I send every new client",
    excerpt:
      "Alkalinity, pH, chlorine, cyanuric — in plain English, with the target ranges and what to do if you're out of range.",
    category: "owner-101",
    coverImage:
      "https://images.unsplash.com/photo-1585687433492-9fcd8a8e7ae2?w=1600&q=80",
    publishedAt: "2026-01-30",
    readMins: 5,
    content: [
      { type: "p", value: "If I could only teach a new pool owner one thing, it'd be this: the four numbers you care about are alkalinity, pH, chlorine, and cyanuric acid. Balance them in that order, always." },
      { type: "h2", value: "The four numbers" },
      { type: "ul", value: [
        "Alkalinity: 80–120 ppm — fix first, it stabilizes pH",
        "pH: 7.4–7.6 — fix second, affects chlorine efficacy",
        "Free chlorine: 1–3 ppm — your sanitizer",
        "Cyanuric acid: 30–50 ppm — stabilizer, protects chlorine from UV",
      ]},
      { type: "h2", value: "Why order matters" },
      { type: "p", value: "Chasing pH before you've fixed alkalinity is like trying to balance a ball on water. Fix the foundation first and pH will often settle on its own." },
      { type: "h2", value: "When to test" },
      { type: "p", value: "Twice a week in summer, once a week in winter, and always after a hard rain or a pool party. Anything more than that is overkill unless you're troubleshooting a problem." },
    ],
  },
];
