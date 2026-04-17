export type City = {
  slug: string;
  name: string;
  state: string;
  population: string;
  neighborhoods: string[];
  localNote: string;
  climateSeason: string;
  calciumLevel: "low" | "moderate" | "high" | "very high";
  responseTime: string;
};

export const cities: City[] = [
  {
    slug: "manteca",
    name: "Manteca",
    state: "CA",
    population: "88k",
    neighborhoods: ["Del Webb at Woodbridge", "Oakwood Estates", "Yosemite Estates", "Union Ranch", "Mayors Park"],
    localNote:
      "Manteca is home base — I live here. Response times are same-day, and I know the water chemistry in every neighborhood. From the newer builds in Woodbridge to the older places off Louise, I've probably worked on a pool near yours.",
    climateSeason: "Hot summers Jun–Sep",
    calciumLevel: "high",
    responseTime: "Same day",
  },
  {
    slug: "stockton",
    name: "Stockton",
    state: "CA",
    population: "325k",
    neighborhoods: ["Brookside", "Spanos Park", "Weston Ranch", "Lincoln Village", "Morada"],
    localNote:
      "Stockton's older neighborhoods have lots of 1970s–80s plaster pools — Pebble Tec restorations and tile-line calcium work make up most of my runs out here. I cover all of Stockton, same-week.",
    climateSeason: "Hot summers Jun–Sep",
    calciumLevel: "high",
    responseTime: "1–2 days",
  },
  {
    slug: "sacramento",
    name: "Sacramento",
    state: "CA",
    population: "525k",
    neighborhoods: ["Land Park", "Natomas", "Arden-Arcade", "Elk Grove", "Roseville", "Folsom"],
    localNote:
      "Sacramento is a 45-minute drive but worth it. Hotter summers than Manteca = faster algae bloom, so weekly service makes a real difference out here. Elk Grove and Folsom are my biggest Sacramento-area routes.",
    climateSeason: "Hot summers May–Sep",
    calciumLevel: "moderate",
    responseTime: "2–3 days",
  },
  {
    slug: "modesto",
    name: "Modesto",
    state: "CA",
    population: "220k",
    neighborhoods: ["Del Rio", "Village I", "La Loma", "Empire", "Hughson"],
    localNote:
      "Modesto's the heart of the 209 — lots of shaded backyard pools under big valley oaks, which means a lot of leaf and tannin work. I run Modesto twice a week.",
    climateSeason: "Hot summers Jun–Sep",
    calciumLevel: "moderate",
    responseTime: "1–2 days",
  },
  {
    slug: "tracy",
    name: "Tracy",
    state: "CA",
    population: "96k",
    neighborhoods: ["Ellis", "Edgewood", "Mountain House", "Redbridge", "Kagehiro"],
    localNote:
      "Tracy is the first stop for Bay Area commuters — lots of newer pools in Mountain House and Ellis. Wind off the Altamont Pass means more dust and debris than inland cities. Weekly service is the move here.",
    climateSeason: "Hot summers Jun–Sep",
    calciumLevel: "moderate",
    responseTime: "Same week",
  },
  {
    slug: "fresno",
    name: "Fresno",
    state: "CA",
    population: "545k",
    neighborhoods: ["Clovis", "Woodward Park", "Fig Garden", "Sunnyside", "Old Fig"],
    localNote:
      "Fresno is my southernmost regular — I batch-schedule two days a month there for deep cleans and rescues. Longer turnaround than Manteca but same quality, same fair pricing.",
    climateSeason: "Hot summers May–Oct",
    calciumLevel: "very high",
    responseTime: "2–3 weeks",
  },
];
