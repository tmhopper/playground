import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Branch, JobEntry } from "../../schemas/job";
import { JobFile } from "../../schemas/job";
import { BRANCH_ENUM_TO_SLUG, BRANCH_SLUG_TO_ENUM } from "./branch";

export { BRANCH_ENUM_TO_SLUG };

const DATA_DIR = join(process.cwd(), "data");

const BRANCH_TO_FILE: Record<Branch, string> = {
  marine_corps: "marine-corps.json",
  army: "army.json",
  air_force: "air-force.json",
  navy: "navy.json",
  coast_guard: "coast-guard.json",
  space_force: "space-force.json",
};

function loadBranch(branch: Branch): JobEntry[] {
  const path = join(DATA_DIR, BRANCH_TO_FILE[branch]);
  try {
    const raw = readFileSync(path, "utf8");
    return JobFile.parse(JSON.parse(raw));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

export function getAllJobs(): JobEntry[] {
  return (Object.keys(BRANCH_TO_FILE) as Branch[]).flatMap(loadBranch);
}

export function getJob(branchSlug: string, jobCode: string): JobEntry | null {
  const branch = BRANCH_SLUG_TO_ENUM[branchSlug];
  if (!branch) return null;
  const entries = loadBranch(branch);
  const target = jobCode.toLowerCase();
  return entries.find((e) => e.job_code.toLowerCase() === target) ?? null;
}

export function getAllJobParams(): { branch: string; jobCode: string }[] {
  return (Object.keys(BRANCH_TO_FILE) as Branch[]).flatMap((branch) =>
    loadBranch(branch).map((e) => ({
      branch: BRANCH_ENUM_TO_SLUG[branch],
      jobCode: e.job_code.toLowerCase(),
    })),
  );
}
