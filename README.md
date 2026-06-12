# Noma Village Website

Modern coliving & coworking website for Noma Village (Lagos, Portugal) built with Next.js (App Router). Includes analytics, A/B testing, and integrations for marketing and CRM.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://www.nomavillage.com)

## Overview
-mnpm
- Next.js 15 App Router with TypeScript and Tailwind CSS 4
- Edge Middleware for A/B testing of landing pages (`/landing-a` and `/landing-b`)
- PostHog analytics with SPA pageview tracking and server fallback endpoint
- Google Tag Manager, Google Ads, Meta Pixel, TikTok Pixel, and Vercel Analytics
- CRM and marketing integrations (Brevo, Make.com webhook), Google Places API (reviews)

## Tech Stack

- Framework: Next.js 15 (React 18), App Router
- Language: TypeScript (strict), path alias `@/*`
- Styling: Tailwind CSS v4, tailwindcss-animate, class-variance-authority, tailwind-merge
- UI: Radix UI primitives, lucide-react, Embla carousel, Geist
- Analytics: PostHog (`posthog-js`), Vercel Analytics, GTM/GA, Meta Pixel, TikTok Pixel
- A/B Testing: Edge Middleware + cookie (`ab_test_variant`), 30-day persistence
- Build: PostCSS (`@tailwindcss/postcss`), next-sitemap
- Misc: date-fns, recharts, react-hook-form + zod

## Getting Started

Prerequisites:
- Node.js 18+ (recommended 20+)
- pnpm, npm or yarn

Install dependencies and run the dev server:

```bash
npm install
npm run dev
# App runs on http://localhost:3000
```

## Environment Variables

Copy `env.example` to `.env.local` and fill as needed:

- NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_GTM_ID (optional to enable GTM locally)
- POSTHOG_SERVER_KEY (recommended for `/api/track`)
- POSTHOG_HOST (optional; defaults to EU PostHog)
- NEXT_PUBLIC_GA_MEASUREMENT_ID (optional)
- BREVO_API_KEY, BREVO_DEFAULT_LIST_ID, BREVO_GUIDE_LIST_ID
- MAKE_WEBHOOK_URL (fallback, optional)
- GOOGLE_PLACES_API_KEY, GOOGLE_PLACES_PLACE_ID
- WEBHOOK_SECRET (optional)

## Scripts

- `npm run dev` – Start Next.js dev server
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Next.js lint (build ignores lint/type errors per `next.config.mjs`)

## Analytics & Experimentation

- PostHog initialized in `lib/posthog.js`
- Client tracking wrapper `components/PostHogProvider.tsx` handles SPA pageviews and UTM attribution (`lib/utm.ts`)
- Server fallback endpoint at `app/api/track/route.ts`
- A/B test routing and cookie assignment in `middleware.ts`

## Images Configuration

`next.config.mjs` whitelists remote image hosts (Unsplash, a.cdn-hotels.com, Contentful) and sets device/image sizes.

## Deployment

- Designed for Vercel (uses `@vercel/analytics` and Next.js features compatible with Vercel Edge)
- Redirects and rewrites configured in `next.config.mjs`

## Project Structure

```
app/                 # App Router pages, layouts, API routes
  api/track/         # Server-side PostHog capture fallback
  layout.tsx         # Global layout, fonts, pixels, analytics providers
components/          # UI and analytics-related components
lib/                 # posthog, attribution (UTM), tracking helpers
middleware.ts        # A/B testing and canonical host logic
public/              # Static assets
tailwind, postcss    # Tailwind v4 via @tailwindcss/postcss
```

## Notes

- Some dependencies in `package.json` (e.g., Svelte/Vue/Remix) are not used by the Next.js app and could be removed to slim the install if desired.

## License

Proprietary – All rights reserved.
