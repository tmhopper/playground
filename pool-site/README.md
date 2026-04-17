# Troy Cleans · Pool Site

Demo marketing site for Troy Burdett's creator-driven pool cleaning business (**Burdett Blue Pool Co.**). Built with Next.js 15, Tailwind v4, and Motion. All content is mock data — designed to feel real, easy to swap for production content.

## One-tap deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmhopper%2Fplayground&project-name=troy-cleans&repository-name=troy-cleans&root-directory=pool-site&branch=claude%2Fpool-business-website-55KeX)

Tap the button → sign in with GitHub (you already have one) → click Deploy. Vercel sets the root directory to `pool-site` and branch to `claude/pool-business-website-55KeX` automatically. You'll have a live URL in ~90 seconds.

## Quickstart

```bash
cd pool-site
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build (all routes statically generated where possible) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Routes

**Marketing:** `/` · `/about` · `/services` · `/book` · `/nominate` · `/sponsor` · `/videos` · `/gallery` · `/reviews` · `/faq` · `/shop` · `/merch` · `/blog` · `/blog/[slug]` · `/areas` · `/areas/[city]` · `/success`

**Legal:** `/privacy` · `/terms` · `/disclosure` · `/accessibility`

**System:** `/sitemap.xml` · `/robots.txt` · `/api/out?product=[id]` · `not-found` · `error`

## File layout

```
src/
├── app/                  # Next.js App Router — one folder per route
├── components/
│   ├── site/             # Header, Footer, Logo, MobileCTA
│   ├── sections/         # Landing-page sections (Hero, Mission, etc.)
│   ├── ui/               # Button, Input, Card, Badge, Accordion
│   ├── media/            # VideoCard, BeforeAfter, ProductCard
│   ├── forms/            # All form components (zod-validated)
│   └── motion/           # FadeIn, Stagger, Marquee
└── lib/
    ├── data/             # All mock content — swap here for real data
    ├── seo.ts            # LocalBusiness, FAQ, Review JSON-LD
    ├── nav.ts            # Header + footer navigation
    ├── validators.ts     # Zod schemas for forms
    └── utils.ts          # cn(), formatViews(), formatDate()
```

## Where to swap in real content

Everything lives in **`src/lib/data/`**. See `CONTENT.md` for a field-by-field guide.

| Data file | What's in it |
|---|---|
| `brand.ts` | Name, tagline, founder, contact, socials, service area |
| `stats.ts` | Hero counter values + marquee ticker |
| `videos.ts` | Video gallery items (platform, thumbnail, URL, views) |
| `gallery.ts` | Before/after pairs with locations + stories |
| `services.ts` | Pricing tiers |
| `products.ts` | Affiliate shop items |
| `testimonials.ts` | Reviews + aggregate rating |
| `faqs.ts` | FAQ entries (drive FAQPage schema) |
| `posts.ts` | Blog posts (structured content blocks) |
| `cities.ts` | Geo landing pages |
| `sponsors.ts` | Supporter wall + funding progress |
| `press.ts` | "As seen on" logos |

## Forms

All forms are client-side with `react-hook-form` + `zod` validation. They currently log to console and redirect to `/success`. To wire up real submissions:

- **Booking / Nominate / Contact**: integrate Resend or Formspree — see comments in each form component.
- **Sponsor**: integrate Stripe Checkout — see `SponsorForm`.

Env var placeholders are in `.env.example`.

## Deployment

**Vercel (recommended):**
1. Import this repo in Vercel.
2. Set the **Root Directory** to `pool-site`.
3. Add any env vars from `.env.example` you want enabled.
4. Deploy.

**Other hosts:** any platform that supports Next.js 15 App Router will work.

## Browser support

Modern evergreen browsers. Uses `backdrop-filter`, `color-mix()`, and `clamp()` — all supported in Chrome, Safari, Firefox, Edge.

## Accessibility

- Skip-to-content link
- Visible focus rings
- Reduced-motion respected
- All form fields labelled
- AAA contrast on primary text
- Semantic HTML, proper heading hierarchy

## License

All rights reserved. This is a demo scaffold for a specific business — the brand, copy, and mock content are not licensed for reuse.
