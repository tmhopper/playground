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

// All images are Unsplash placeholders. Replace with Troy's actual photos — see CONTENT.md.
// Target aspect ratio: 4:3 for both before and after of each pair.
export const gallery: BeforeAfter[] = [
  {
    id: "ramirez",
    title: "Mrs. Ramirez's backyard pool",
    beforeImg:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200&q=80",
    location: "Manteca, CA",
    date: "2026-04-02",
    category: "elderly",
    story:
      "Untouched for 4 years. Mrs. Ramirez's husband used to do it — he passed in 2022. Her grandkids visit every summer.",
    serviceDays: 1,
  },
  {
    id: "stockton-foreclosure",
    title: "Foreclosed property",
    beforeImg:
      "https://images.unsplash.com/photo-1574283617292-42f7c6cdcd50?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=1200&q=80",
    location: "Stockton, CA",
    date: "2026-03-26",
    category: "foreclosure",
    story:
      "Volunteered by 14 neighbors. Bank-owned. We got written permission from the asset manager before touching it.",
    serviceDays: 3,
  },
  {
    id: "modesto-veteran",
    title: "Veteran homeowner · Modesto",
    beforeImg:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&q=80",
    location: "Modesto, CA",
    date: "2026-03-18",
    category: "elderly",
    story:
      "95-year-old Korean War vet. His daughter emailed me. We scheduled it for Veterans Day weekend.",
    serviceDays: 2,
  },
  {
    id: "tracy-rental",
    title: "Abandoned rental property",
    beforeImg:
      "https://images.unsplash.com/photo-1551601651-bc60f254d532?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1200&q=80",
    location: "Tracy, CA",
    date: "2026-03-04",
    category: "abandoned",
    story:
      "Owner moved out of state, property manager ghosted. Neighbors had been dealing with mosquitoes for two summers.",
    serviceDays: 2,
  },
  {
    id: "lodi-storm",
    title: "Storm debris recovery",
    beforeImg:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
    location: "Lodi, CA",
    date: "2026-02-22",
    category: "storm-damage",
    story:
      "Giant valley oak came down during the January wind event. Owner is disabled, couldn't clear it. We did tree + pool.",
    serviceDays: 1,
  },
  {
    id: "sacramento-widow",
    title: "Mrs. Nakamura's pool",
    beforeImg:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    location: "Elk Grove, CA",
    date: "2026-02-14",
    category: "elderly",
    story:
      "Her husband built this pool in 1974. It hadn't run in 6 years. She didn't think it could be saved.",
    serviceDays: 4,
  },
  {
    id: "ripon-neglect",
    title: "Year-long neglect",
    beforeImg:
      "https://images.unsplash.com/photo-1562511211-68f30ca83fa3?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1572839150175-e75a91e2ed17?w=1200&q=80",
    location: "Ripon, CA",
    date: "2026-01-28",
    category: "green-to-clean",
    story:
      "Homeowner went through chemo in 2025. Recovery took priority. Community rallied and submitted the nomination.",
    serviceDays: 2,
  },
  {
    id: "fresno-abandoned",
    title: "Fresno · vacant 3 years",
    beforeImg:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=1200&q=80",
    location: "Fresno, CA",
    date: "2026-01-10",
    category: "abandoned",
    story:
      "Owner moved abroad for work. Kept the house but forgot the pool. Neighbors submitted the nomination together.",
    serviceDays: 3,
  },
];
