# Deploying pool-site

## Vercel (recommended — 5 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repo
3. In the project settings:
   - **Root Directory:** `pool-site`
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
4. Add environment variables (all optional — see `.env.example`)
5. Click Deploy

Vercel will auto-deploy on every push to the configured branch. Preview URLs are generated for every PR.

## Custom domain

1. In Vercel → Project → Settings → Domains, add your domain
2. Update your DNS to the CNAME / A record Vercel provides
3. Update `NEXT_PUBLIC_SITE_URL` env var to the production URL — this drives the sitemap, canonical URLs, and OG image URLs

## Other hosts

Any Node host that supports Next.js 15 App Router works: Netlify, Railway, Fly.io, AWS Amplify, self-hosted.

If self-hosting:
```bash
npm run build
npm run start  # runs on PORT env var, default 3000
```

## Environment variables

All optional. The site works without any of them (forms log to console, no payments processed).

Copy `.env.example` to `.env` and fill in:

| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | Real email delivery for form submissions |
| `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Sponsor-a-Clean payment processing |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics (privacy-friendly alternative to GA) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_SITE_URL` | Your production URL — drives canonical URLs, sitemap |

## Post-deploy checklist

- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Verify OG images render: paste your URL into [opengraph.xyz](https://opengraph.xyz)
- [ ] Test mobile: open on a phone, test the sticky CTA bar
- [ ] Test one form end-to-end
- [ ] Run Lighthouse against the live domain
- [ ] Set up Google Business Profile (if not already) with the same NAP (name, address, phone) as `brand.ts` — consistency is a local SEO signal
- [ ] Add the site to your TikTok/YouTube/Instagram bios
