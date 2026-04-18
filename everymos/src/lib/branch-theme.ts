import type { Branch } from "@schemas/job";

export type BranchTheme = {
  accent: string;
  accentDark: string;
  onAccent: string;
  subjectLabel: string;
  termAbbrev: string;
  termLong: string;
};

export const BRANCH_THEME: Record<Branch, BranchTheme> = {
  marine_corps: {
    accent: "#8B0000",
    accentDark: "#5F0000",
    onAccent: "#FFD700",
    subjectLabel: "Marine Corps",
    termAbbrev: "MOS",
    termLong: "Military Occupational Specialty",
  },
  army: {
    accent: "#4B5320",
    accentDark: "#2F3814",
    onAccent: "#FFD700",
    subjectLabel: "Army",
    termAbbrev: "MOS",
    termLong: "Military Occupational Specialty",
  },
  air_force: {
    accent: "#00308F",
    accentDark: "#001F5E",
    onAccent: "#C0C0C0",
    subjectLabel: "Air Force",
    termAbbrev: "AFSC",
    termLong: "Air Force Specialty Code",
  },
  navy: {
    accent: "#1C3F7C",
    accentDark: "#0A2552",
    onAccent: "#FFD700",
    subjectLabel: "Navy",
    termAbbrev: "Rating",
    termLong: "Navy enlisted rating",
  },
  coast_guard: {
    accent: "#CC5500",
    accentDark: "#8A3A00",
    onAccent: "#FFFFFF",
    subjectLabel: "Coast Guard",
    termAbbrev: "Rating",
    termLong: "Coast Guard enlisted rating",
  },
  space_force: {
    accent: "#1D2951",
    accentDark: "#0A1232",
    onAccent: "#C0C0C0",
    subjectLabel: "Space Force",
    termAbbrev: "SFSC",
    termLong: "Space Force Specialty Code",
  },
};

export function themeFor(branch: Branch): BranchTheme {
  return BRANCH_THEME[branch];
}
