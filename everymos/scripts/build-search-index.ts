import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { JobFile } from "../schemas/job";
import { buildSearchDocs } from "../src/lib/search-docs";
import { POSTS } from "../data/posts";

const DATA_DIR = join(process.cwd(), "data");
const PUBLIC_DIR = join(process.cwd(), "public");

const BRANCH_FILES = [
  "marine-corps.json",
  "army.json",
  "air-force.json",
  "navy.json",
  "coast-guard.json",
  "space-force.json",
];

function loadAllJobs() {
  const all = [] as ReturnType<typeof JobFile.parse>;
  for (const file of BRANCH_FILES) {
    try {
      const raw = readFileSync(join(DATA_DIR, file), "utf8");
      const entries = JobFile.parse(JSON.parse(raw));
      all.push(...entries);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw e;
    }
  }
  return all;
}

const jobs = loadAllJobs();
const docs = buildSearchDocs(jobs, POSTS);

mkdirSync(PUBLIC_DIR, { recursive: true });
writeFileSync(
  join(PUBLIC_DIR, "search-index.json"),
  JSON.stringify({ generated_at: new Date().toISOString(), docs }),
  "utf8",
);

console.log(`Wrote public/search-index.json — ${docs.length} docs (${jobs.length} jobs + ${POSTS.length} posts + static)`);
