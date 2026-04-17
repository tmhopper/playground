export type City = {
  slug: string;
  name: string;
  state: string;
  population: string;
  neighborhoods: string[];
  localNote: string;
  monsoonSeason: string;
  calciumLevel: "low" | "moderate" | "high" | "very high";
  responseTime: string;
};

export const cities: City[] = [
  {
    slug: "phoenix",
    name: "Phoenix",
    state: "AZ",
    population: "1.6M",
    neighborhoods: ["Arcadia", "Central Phoenix", "North Central", "Ahwatukee", "Desert Ridge"],
    localNote:
      "Phoenix pools deal with the classic triple threat: dust storms, 115°F summers, and hard water. Most of my week is spent here — response times are the fastest in the valley.",
    monsoonSeason: "Jul–Sep",
    calciumLevel: "very high",
    responseTime: "Usually same week",
  },
  {
    slug: "tempe",
    name: "Tempe",
    state: "AZ",
    population: "195k",
    neighborhoods: ["Lakes", "Warner Ranch", "Optimist Park", "Rural/Southern"],
    localNote:
      "Tempe's older neighborhoods have a lot of 1970s and 80s plaster pools — Pebble Tec restorations are a big part of what I do out here.",
    monsoonSeason: "Jul–Sep",
    calciumLevel: "very high",
    responseTime: "Usually same week",
  },
  {
    slug: "mesa",
    name: "Mesa",
    state: "AZ",
    population: "510k",
    neighborhoods: ["Red Mountain Ranch", "Las Sendas", "Dobson Ranch", "Eastmark"],
    localNote:
      "Mesa is huge — east Mesa in particular is where a lot of retirees live, and where a good chunk of my nominated cleans come from. Service area covers all of Mesa.",
    monsoonSeason: "Jul–Sep",
    calciumLevel: "very high",
    responseTime: "1–3 days",
  },
  {
    slug: "chandler",
    name: "Chandler",
    state: "AZ",
    population: "285k",
    neighborhoods: ["Ocotillo", "Fulton Ranch", "Sunbird", "Sun Lakes"],
    localNote:
      "Chandler/Sun Lakes has a big senior community and some of the highest-quality neighborhood builds. Weekly service + quarterly equipment audits is the sweet spot here.",
    monsoonSeason: "Jul–Sep",
    calciumLevel: "very high",
    responseTime: "1–3 days",
  },
];
