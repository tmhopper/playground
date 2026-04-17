export type Sponsor = { name: string; city: string; amount: number; date: string };

export const supporterWall: Sponsor[] = [
  { name: "Sarah P.", city: "Chandler", amount: 50, date: "2026-04-15" },
  { name: "Mike R.", city: "Phoenix", amount: 250, date: "2026-04-14" },
  { name: "Anonymous", city: "Tempe", amount: 25, date: "2026-04-13" },
  { name: "The Martinez Family", city: "Mesa", amount: 500, date: "2026-04-10" },
  { name: "Derek P.", city: "Scottsdale", amount: 100, date: "2026-04-09" },
  { name: "Anonymous", city: "Gilbert", amount: 50, date: "2026-04-07" },
  { name: "Jess W.", city: "Phoenix", amount: 25, date: "2026-04-06" },
  { name: "North Valley Plumbing", city: "Phoenix", amount: 800, date: "2026-04-03" },
  { name: "Rachel D.", city: "Tempe", amount: 250, date: "2026-04-01" },
  { name: "Eduardo L.", city: "Mesa", amount: 50, date: "2026-03-30" },
  { name: "Anonymous", city: "Glendale", amount: 100, date: "2026-03-28" },
  { name: "The Carter Family", city: "Scottsdale", amount: 500, date: "2026-03-26" },
];

export const sponsorTiers = [
  {
    amount: 25,
    label: "Bucket of Chlorine",
    description: "Covers consumables for one standard clean.",
  },
  {
    amount: 50,
    label: "Half a Clean",
    description: "Chemicals and filter supplies for one small-pool revival.",
  },
  {
    amount: 250,
    label: "Full Clean",
    description: "Fully underwrites a standard nominated clean.",
    recommended: true,
  },
  {
    amount: 800,
    label: "Green-to-Clean Rescue",
    description: "Sponsors a full multi-day rescue for a severe case.",
  },
] as const;

export const fundingProgress = {
  raised: 4247,
  goal: 5000,
  nextCleanGoal: 250,
  nextCleanRaised: 147,
  cleansFundedThisYear: 11,
};
