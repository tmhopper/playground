# Toe Dirt

A PG-13 satire website for the fictional Toe Dirt brand — a classy,
down-to-earth construction guy with a camera, a schedule, and a mascot named
Bob. Every checkout is a working bit; every DM lands on a clipboard.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS (custom construction-site palette in `tailwind.config.ts`)
- Zustand for the mock cart (`src/lib/cart-store.ts`)
- Framer Motion, lucide-react, clsx/tailwind-merge
- Fonts: Bungee (display), Roboto Slab (body), Permanent Marker (accent)

## Run it

```bash
npm install
npm run dev
# http://localhost:3000
```

## Sitemap

- `/` — Home (hero, featured services, testimonials, package of the month, newsletter)
- `/about` — The Dirt (origin, Bob, Associates, milestones)
- `/portfolio` — Six categories w/ gated Kinky POV tab
- `/packages` — Bronze → Concrete Club + add-ons, filter tabs
- `/shop` + `/shop/[slug]` — Merch catalog and PDPs
- `/bob` — Bob's Corner (tips, playlist)
- `/contact` — Slide In My DMs form
- `/api/newsletter`, `/api/dm` — form endpoints (currently log-only)

## Design tokens

Palette: dirt brown, hazard orange, caution yellow, rust red, concrete gray,
bone white. Defined in `tailwind.config.ts` under the `dirt`, `hazard`,
`caution`, `rust`, `concrete`, `bone` color scales.

## Notes

- All commerce is parody. The cart + checkout + DM form show a gag
  confirmation and never hit a real payment processor.
- The age gate is both a UX affordance and the joke.
- Imagery is placeholder gradients + SVG; real assets slot into the same
  components without shape changes.
