import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { JobFile } from "../schemas/job";
import { CareerMapFile } from "../schemas/career-map";

const DATA_DIR = join(process.cwd(), "data");

const BRANCH_FILES = [
  "marine-corps.json",
  "army.json",
  "air-force.json",
  "navy.json",
  "coast-guard.json",
  "space-force.json",
];

let hadError = false;

function validateFile(filename: string, schema: { safeParse: (x: unknown) => { success: boolean; error?: unknown } }) {
  const path = join(DATA_DIR, filename);
  try {
    const raw = readFileSync(path, "utf8");
    const parsed = JSON.parse(raw);
    const result = schema.safeParse(parsed);
    if (!result.success) {
      console.error(`FAIL ${filename}`);
      console.error(result.error);
      hadError = true;
    } else {
      const count = Array.isArray(parsed) ? parsed.length : 0;
      console.log(`ok   ${filename} (${count} entries)`);
    }
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      console.log(`skip ${filename} (not present yet)`);
      return;
    }
    console.error(`FAIL ${filename} — could not read/parse`);
    console.error(e);
    hadError = true;
  }
}

for (const f of BRANCH_FILES) {
  validateFile(f, JobFile);
}

if (readdirSync(DATA_DIR).includes("career-maps.json")) {
  validateFile("career-maps.json", CareerMapFile);
}

process.exit(hadError ? 1 : 0);
