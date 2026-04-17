export type Sponsor = { name: string; city: string; amount: number; date: string };

export const supporterWall: Sponsor[] = [
  { name: "Sarah P.", city: "Tracy", amount: 50, date: "2026-04-15" },
  { name: "Mike R.", city: "Manteca", amount: 250, date: "2026-04-14" },
  { name: "Anonymous", city: "Stockton", amount: 25, date: "2026-04-13" },
  { name: "The Martinez Family", city: "Modesto", amount: 500, date: "2026-04-10" },
  { name: "Derek P.", city: "Lodi", amount: 100, date: "2026-04-09" },
  { name: "Anonymous", city: "Elk Grove", amount: 50, date: "2026-04-07" },
  { name: "Jess W.", city: "Manteca", amount: 25, date: "2026-04-06" },
  { name: "Valley Plumbing", city: "Stockton", amount: 800, date: "2026-04-03" },
  { name: "Rachel D.", city: "Tracy", amount: 250, date: "2026-04-01" },
  { name: "Eduardo L.", city: "Fresno", amount: 50, date: "2026-03-30" },
  { name: "Anonymous", city: "Ripon", amount: 100, date: "2026-03-28" },
  { name: "The Carter Family", city: "Lodi", amount: 500, date: "2026-03-26" },
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
