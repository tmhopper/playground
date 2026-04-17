# EveryMOS — Operating Rules

This file governs every Claude Code session on this repo. Read it before any data or copy work.

## What this project is

EveryMOS is a reference database for every military occupational specialty across the six U.S. military branches. Public-facing, not a recruiting tool. Three pillars: structured job data, 1–2 minute video scripts, career mapping.

Owner: Marc Hopper, USMC veteran.

## Non-negotiable rules

1. **Marine Corps first, always.** USMC entries are the priority. Never reorder branches without explicit approval.
2. **Never call a Navy rating an "MOS."** Use correct branch terminology:
   - Army → MOS
   - Marine Corps → MOS (4-digit)
   - Air Force → AFSC (5-alphanumeric)
   - Navy → Rating
   - Coast Guard → Rating
   - Space Force → SFSC
3. **Never guess.** When sources conflict or data is missing, set `confidence: "uncertain"` or `"incomplete"` and note the discrepancy.
4. **Every entry cites its sources.** Official branch sites first (marines.mil, army.mil, etc.), then classification manuals, then reputable third-party. No anonymous sourcing.
5. **No recruiting language.** Direct, no-fluff, informative. No exclamation points. No cheerleading. No sugarcoating.
6. **No stock military photos** as hero imagery. Data viz + typography + public-domain insignia only.
7. **Validation is a gate.** `npm run validate` must pass before any commit touching data.

## Voice and tone

- First-person from Marc where voice appears ("I spent years in the Marine Corps…").
- Plain, direct. No corporate jargon. No "leverage," "empower," "synergy."
- Military-literate but accessible. Don't over-explain basics; don't assume civilians know acronyms.
- Four audiences: prospects, current service members, veterans in transition, civilians/family.
- Feels like a knowledgeable friend breaking it down, not a recruiting pamphlet or a government factsheet.
- Point things out; don't tell Marc what to do.

## Source priority

1. Official branch websites
2. Classification manuals (NAVMC 1200 series, DA PAM 611-21, AFECD/AFOCD)
3. COOL.osd.mil
4. MOSDb.com, veteran.com, military.com, operationmilitarykids.org
5. O*NET, BLS for civilian crosswalks

If a `.mil` source disagrees with a third-party source, the `.mil` source wins and the discrepancy goes in `notes`.

## Schema

Single source of truth: `schemas/job.ts`. Never edit a data file without reading the schema first. If a field is genuinely missing from the schema but needed, propose a schema change — don't jam it into `notes`.

**Locked decisions:**
- ASVAB: structured composites + raw display string + source system (see `schemas/job.ts`)
- Branch-specific data: universal core + `branch_specific` object per branch

## Confidence levels

- `verified` — Data confirmed against current official source (`.mil` or classification manual) within 90 days.
- `probable` — Data from reputable source but not directly confirmed on `.mil`.
- `uncertain` — Sources conflict or only older/third-party data available. Flag in `notes`.
- `incomplete` — Stub entry. Code + title present, most fields empty.

## Data edits

1. Read `schemas/job.ts` first.
2. Read the existing entry you're editing, if any.
3. Make the edit.
4. Run `npm run validate`.
5. Commit with a message referencing the job ID: e.g., `data(usmc_0311): update training pipeline durations from NAVMC 1200.1E`.

## PR review

Marc reviews every data PR. GitHub's diff view IS the authoring interface. Don't batch 50 entries into one PR — one branch per PR, readable diffs.

## Do NOT

- Invent data to fill gaps.
- Use exclamation points in user-facing copy.
- Add features, refactors, or abstractions beyond what the current task requires.
- Add ER handling or fallbacks for scenarios that can't happen.
- Add comments that describe what the code does. Only comment the non-obvious why.
- Commit without running validate + typecheck.
