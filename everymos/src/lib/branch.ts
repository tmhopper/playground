import type { Branch } from "@schemas/job";

export const BRANCH_ENUM_TO_SLUG: Record<Branch, string> = {
  marine_corps: "marine-corps",
  army: "army",
  air_force: "air-force",
  navy: "navy",
  coast_guard: "coast-guard",
  space_force: "space-force",
};

export const BRANCH_SLUG_TO_ENUM: Record<string, Branch> = {
  "marine-corps": "marine_corps",
  army: "army",
  "air-force": "air_force",
  navy: "navy",
  "coast-guard": "coast_guard",
  "space-force": "space_force",
};
