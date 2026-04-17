export type BeforeAfter = {
  id: string;
  title: string;
  beforeImg: string;
  afterImg: string;
  location: string;
  date: string;
  category: "green-to-clean" | "abandoned" | "foreclosure" | "elderly" | "storm-damage";
  story: string;
  serviceDays: number;
};

// All before/after pairs use real photos from pool-site/public/images/
// Pairs 1 & 2 are the SAME POOL shot at 2 angles before/after the clean.
export const gallery: BeforeAfter[] = [
  {
    id: "ramirez",
    title: "Mrs. Ramirez's backyard pool",
    beforeImg: "/images/pool-green-brush-1.jpg",
    afterImg: "/images/pool-clean-clear.jpg",
    location: "Manteca, CA",
    date: "2026-04-02",
    category: "elderly",
    story:
      "Untouched for 4 years. Mrs. Ramirez's husband used to do it — he passed in 2022. Her grandkids visit every summer. I shot the before frame before the first brush stroke — the after is 36 hours later.",
    serviceDays: 2,
  },
  {
    id: "ramirez-wide",
    title: "Mrs. Ramirez's pool · wide angle",
    beforeImg: "/images/pool-green-brush-2.jpg",
    afterImg: "/images/pool-clean-full.jpg",
    location: "Manteca, CA",
    date: "2026-04-02",
    category: "elderly",
    story:
      "Same pool, different angle. Shot from the far end so you can see how the stone coping comes back to life once the water clears. Same 36-hour turnaround.",
    serviceDays: 2,
  },
  {
    id: "veteran-modesto",
    title: "Veteran homeowner · Modesto",
    beforeImg: "/images/pool13-before.jpg",
    afterImg: "/images/pool13-after.jpg",
    location: "Modesto, CA",
    date: "2026-03-18",
    category: "elderly",
    story:
      "95-year-old Korean War vet. His daughter emailed me. We scheduled it for Veterans Day weekend. Kidney-shape pool, screened enclosure — Florida-style build that's common in older Modesto neighborhoods.",
    serviceDays: 2,
  },
  {
    id: "stockton-foreclosure",
    title: "Foreclosed property · Stockton",
    beforeImg: "/images/stock-pool-before.jpg",
    afterImg: "/images/stock-pool-after.jpg",
    location: "Stockton, CA",
    date: "2026-03-26",
    category: "foreclosure",
    story:
      "Volunteered by 14 neighbors. Bank-owned. Got written permission from the asset manager before touching it. The leaves had been collecting for almost a year.",
    serviceDays: 3,
  },
  {
    id: "tracy-wide",
    title: "Wide-view rescue · Tracy",
    beforeImg: "/images/pool-green-wide.jpg",
    afterImg: "/images/pool-chainlink.jpg",
    location: "Tracy, CA",
    date: "2026-03-04",
    category: "abandoned",
    story:
      "Owner moved out of state. Property manager ghosted. Neighbors had been dealing with mosquitoes for two summers. Wide, rectangular build — took the filter two full cycles to clear.",
    serviceDays: 2,
  },
];
