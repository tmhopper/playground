# EveryMOS

Every military job, explained straight. A reference database covering every occupational specialty across all six U.S. military branches — Army, Marine Corps, Air Force, Navy, Coast Guard, Space Force.

Built by Marc Hopper, USMC veteran.

## This is a scaffold

This folder is a starter scaffold. It is currently nested inside another project (`playground/`) as a preview. The intended home is its own GitHub repo.

### Lift into its own repo

```bash
# From inside the everymos/ folder
cd everymos
git init
git add .
git commit -m "Initial scaffold from plan"
git branch -M main
gh repo create <your-org>/everymos --public --source=. --push
# Then deploy on Vercel: `vercel --prod` after `npm install`.
```

## Quick start

```bash
cd everymos
npm install
npm run dev
# Visit http://localhost:3000
# Visit http://localhost:3000/jobs/marine-corps/0311
```

## Commands

```bash
npm run dev        # Dev server (Turbopack)
npm run build      # Production build
npm run validate   # Validate all data/*.json against Zod schemas
npm run typecheck  # TypeScript strict check
npm run lint       # ESLint
```

## What's in this scaffold

- Zod schema for job entries (`schemas/job.ts`)
- Sample 0311 Rifleman entry (`data/marine-corps.json`)
- Job detail page reading from data (`src/app/jobs/[branch]/[jobCode]/page.tsx`)
- Minimal landing page (`src/app/page.tsx`)
- Design tokens + Tailwind config
- `CLAUDE.md` with operating rules for any AI working on this repo

## What's missing (build next)

Per the full plan, v1 demo still needs:
- 7 more USMC entries for career-map demonstration
- Career map graph component + data
- Compare page
- Index + filters
- Blog, guides, newsletter, contact
- Legal pages
- SEO plumbing (sitemap, robots, JSON-LD, OG)
- Analytics

See the full build plan for scope and cut-priority list.

## License

All rights reserved, Marc Hopper, 2026.
