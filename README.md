# Job Search

A personal, AI-powered job-search web app. Scores jobs against your background, generates voice-matched cover letters, tailors résumés, and tracks everything in one Kanban/table view modeled on a spreadsheet tracker.

Powered by Claude Opus 4.7 via the Anthropic API with prompt caching on your profile block.

## Features (Phase 1)

- **Profile**: upload résumé (PDF/DOCX), paste writing samples, auto-generate voice rules — all fed into every AI call as a cached context block.
- **Match scorer**: paste a job description, get per-dimension scores (skills / experience / domain / culture / logistics) with strengths and honest gaps.
- **Cover letter**: streamed, voice-matched, editable. Multiple versions per job.
- **Résumé tailor**: returns structured résumé JSON + a diff view. Export DOCX and PDF.
- **Jobs**: table and drag-and-drop Kanban views, stage tracking with auto-stamped dates.
- **Companies + Watchlist**: cadence flags (daily / fast / alert), "mark checked" buttons.
- **Contacts**: track recruiters + hiring managers, link them to companies and jobs, one-click LinkedIn/RocketReach/Apollo search URLs from any job page.
- **Today**: queue of next-actions, due watchlist, recent jobs, top matches.
- **Templates**: reusable cover letters / cold emails / follow-ups with `{{variables}}`.

## Local setup

Requires Node.js 20+.

```bash
npm install
cp .env.local .env.local  # already present; edit values
npx prisma migrate dev     # creates SQLite dev.db
npm run dev
```

Visit http://localhost:3000 and log in with the password set in `.env.local` (default: `changeme`).

### Environment variables

```
DATABASE_URL="file:./dev.db"     # SQLite for local; swap for Postgres URL in prod
APP_PASSWORD="changeme"           # your login password
APP_USER_EMAIL="you@example.com"  # used to key your single-user account
NEXTAUTH_SECRET="..."             # long random string
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="sk-ant-..."    # required for AI features
FIRECRAWL_API_KEY=""              # optional, Phase 2 scraping fallback
JINA_API_KEY=""                   # optional, Phase 2 scraping fallback
```

## First run

1. Go to **Profile**. Upload your résumé, fill in background / skills / goals / salary / location / portfolio links.
2. Paste 2–3 writing samples. Pin them for voice. Click **Regenerate** to generate voice rules.
3. Go to **Match**. Paste a real JD. Get a score. Save as a job.
4. Open the job. Generate a cover letter. Tailor a résumé. Download DOCX/PDF.
5. Go to **Jobs**, switch to Kanban, drag through stages.
6. Add a few companies and set watch cadence.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import into Vercel.
3. Add a Postgres database (Neon has a free tier): set `DATABASE_URL` to the Neon connection string.
4. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`, commit, and redeploy so migrations run.
5. Set the other env vars in Vercel's dashboard.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS · Prisma + SQLite (local) / Postgres (prod) · NextAuth v5 (credentials) · Anthropic SDK · `@hello-pangea/dnd` · `docx` / `@react-pdf/renderer` · `unpdf` · `mammoth`

## Phase 2 / 3 (not yet built)

- ATS fetchers (Greenhouse, Lever, Ashby, Workable, SmartRecruiters)
- Firecrawl / Jina Reader fallback for non-ATS careers pages
- Bulk paste → parsed and scored job list
- Watchlist auto-rescan with diff-since-last-run
- Advisor chat with tool-use over the tracker
- Apollo / RocketReach contact enrichment
- Gmail auto-detection of application confirmations
