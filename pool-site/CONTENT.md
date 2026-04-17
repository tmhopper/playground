# Content Guide

Every piece of text, image, and number on this site lives in `src/lib/data/`. Swap these files and the site updates — no other code changes needed.

## Photos Troy needs to shoot / source

Replace these Unsplash URLs with real photos. Keep the same aspect ratios.

### Hero (site landing)
- **File:** referenced in `src/components/sections/hero.tsx`
- **What:** Looping ~10 second video of a green-to-clean transformation, or a single striking image.
- **Aspect:** 16:9, 1920px wide minimum
- **Current placeholder:** Unsplash pool image

### Founder portrait
- **File:** referenced in `src/components/sections/mission-block.tsx` and `src/app/about/page.tsx`
- **What:** Troy holding a skimmer or tools, friendly but professional, outdoor natural light.
- **Aspect:** 4:5 (portrait), 1200px tall minimum

### Before/after pairs (8 of them)
- **File:** `src/lib/data/gallery.ts`
- **What:** Matched pairs of the same pool shot from the same angle, before and after clean.
- **Aspect:** 4:3, same dimensions for both
- **Tip:** Shoot the before photo FIRST — phones in pockets get forgotten when the excitement starts.

### Video thumbnails (12+)
- **File:** `src/lib/data/videos.ts`
- **What:** Custom thumbnails with bold text overlay — "4 YEARS OF ALGAE" style.
- **Aspect:** 16:9

### Founder action shots (4)
- For the about page story section.
- **What:** Troy brushing, testing water, loading the truck, talking to a homeowner.
- **Aspect:** Mixed, any size

### Product photos
- **File:** `src/lib/data/products.ts`
- Currently using Unsplash — replace with actual product images OR keep Unsplash if licensing is uncomfortable, OR use Amazon product API images (requires PA-API credentials).

## Text content to update

### `brand.ts`
All static brand info: phone, email, address, license number, founder title, socials. Start here.

### `services.ts`
Your four pricing tiers with real numbers. Includes lists, durations, taglines.

### `faqs.ts`
The FAQ page and the structured data come from this file. Keep answers 2–4 sentences.

### `posts.ts`
Replace the 6 seed posts with real how-to / case-file content as Troy publishes. Each post is a structured array of content blocks (`p`, `h2`, `h3`, `ul`, `quote`, `callout`) — no MDX required.

### `testimonials.ts`
Replace with real quotes. Update `aggregateRating.value` and `.count` — these feed review schema markup.

### `cities.ts`
Add or remove cities. Each city generates its own SEO-optimized landing page at `/areas/[slug]`.

### `sponsors.ts`
Update `fundingProgress` with current numbers. `supporterWall` is mocked — in production this would come from your Stripe checkout webhook.

### `products.ts`
Replace with real Amazon affiliate URLs (with your `tag=xxxxx-20` parameter). The affiliate redirect route at `/api/out?product=[id]` handles outbound tracking.

## Going live checklist

1. Update every file in `src/lib/data/`
2. Replace all Unsplash image URLs with your own assets (put files in `public/images/`)
3. Update `NEXT_PUBLIC_SITE_URL` in `.env`
4. Configure `RESEND_API_KEY` + wire up form submissions (see comments in `components/forms/*`)
5. Configure `STRIPE_SECRET_KEY` + wire up the Sponsor form
6. Test every form end to end
7. Run `npm run build` — fix any errors
8. Run Lighthouse — should be 90+ across the board
9. Test with VoiceOver or NVDA on the landing page and one form
10. Deploy to Vercel with root directory set to `pool-site`
