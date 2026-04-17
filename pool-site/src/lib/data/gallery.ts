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

export const gallery: BeforeAfter[] = [
  {
    id: "ramirez",
    title: "Mrs. Ramirez's pool",
    beforeImg:
      "https://images.unsplash.com/photo-1571269608263-14ff2ba4b7c2?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200&q=80",
    location: "Tempe, AZ",
    date: "2026-04-02",
    category: "elderly",
    story:
      "Untouched for 4 years. Mrs. Ramirez's husband used to do it — he passed in 2022. Her grandkids visit every summer.",
    serviceDays: 1,
  },
  {
    id: "mesa-foreclosure",
    title: "Foreclosed property",
    beforeImg:
      "https://images.unsplash.com/photo-1566840547093-a8e4abe9180c?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1572839150175-e75a91e2ed17?w=1200&q=80",
    location: "Mesa, AZ",
    date: "2026-03-26",
    category: "foreclosure",
    story:
      "Volunteered by 14 neighbors. Bank-owned. We got written permission from the asset manager before touching it.",
    serviceDays: 3,
  },
  {
    id: "chandler-veteran",
    title: "Veteran homeowner · Chandler",
    beforeImg:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=1200&q=80",
    location: "Chandler, AZ",
    date: "2026-03-18",
    category: "elderly",
    story:
      "95-year-old Korean War vet. His daughter emailed me. We scheduled it for Veterans Day weekend.",
    serviceDays: 2,
  },
  {
    id: "phoenix-rental",
    title: "Abandoned short-term rental",
    beforeImg:
      "https://images.unsplash.com/photo-1629905607580-9d68c4f8d35f?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    location: "Phoenix, AZ",
    date: "2026-03-04",
    category: "abandoned",
    story:
      "Owner moved out of state, property manager ghosted. Neighbors had been dealing with the mosquitoes for two summers.",
    serviceDays: 2,
  },
  {
    id: "monsoon-damage",
    title: "Monsoon debris recovery",
    beforeImg:
      "https://images.unsplash.com/photo-1576484100175-1977e3d0c9f1?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200&q=80",
    location: "Scottsdale, AZ",
    date: "2026-02-22",
    category: "storm-damage",
    story:
      "Giant mesquite came down during monsoon season. Owner is disabled, couldn't clear it. We did tree + pool.",
    serviceDays: 1,
  },
  {
    id: "gilbert-widow",
    title: "Mrs. Nakamura's pool",
    beforeImg:
      "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
    location: "Gilbert, AZ",
    date: "2026-02-14",
    category: "elderly",
    story:
      "Her husband built this pool in 1974. It hadn't run in 6 years. She didn't think it could be saved.",
    serviceDays: 4,
  },
  {
    id: "glendale-neglect",
    title: "Year-long neglect",
    beforeImg:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1562511211-68f30ca83fa3?w=1200&q=80",
    location: "Glendale, AZ",
    date: "2026-01-28",
    category: "green-to-clean",
    story:
      "Homeowner went through chemo in 2025. Recovery took priority. Community rallied and submitted the nomination.",
    serviceDays: 2,
  },
  {
    id: "peoria-abandoned",
    title: "Peoria · vacant 3 years",
    beforeImg:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1572839150175-e75a91e2ed17?w=1200&q=80",
    location: "Peoria, AZ",
    date: "2026-01-10",
    category: "abandoned",
    story:
      "Owner moved abroad for work. Kept the house but forgot the pool. Neighbors submitted the nomination together.",
    serviceDays: 3,
  },
];
