# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server
- **Build**: `npm run build` - Creates production build  
- **Lint**: `npm run lint` - Runs ESLint for code quality
- **Production server**: `npm start` - Runs production build

## Project Architecture

This is a Next.js 15 coliving/coworking website for "Noma Village" in Lagos, Portugal, built with:

- **Framework**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS v4 with custom Lagos-themed color palette
- **UI Components**: shadcn/ui with Radix UI primitives
- **Fonts**: Custom Google Fonts (Caveat, Montserrat, Nunito)
- **Analytics**: Vercel Analytics, PostHog, Google Analytics
- **Backend**: Supabase for database (signup forms, blog posts)
- **Forms**: React Hook Form with Zod validation

### Key Architecture Patterns

**App Router Structure**: Uses Next.js 13+ app directory structure with page-based routing:
- `/app/page.tsx` - Homepage
- `/app/coliving/page.tsx` - Coliving information
- `/app/coworking/page.tsx` - Coworking spaces
- `/app/rooms/page.tsx` - Room listings
- `/app/community/page.tsx` - Community features
- `/app/join/page.tsx` - Application/signup form
- `/app/apply/page.tsx` - Application form
- `/app/blog/page.tsx` - Blog listing
- `/app/blog/[slug]/page.tsx` - Individual blog posts
- `/app/landing/page.tsx`, `/app/landing-a/page.tsx`, `/app/landing-b/page.tsx` - A/B test landing pages
- `/app/affiliate/page.tsx` - Affiliate program
- `/app/contact/page.tsx`, `/app/faq/page.tsx`, `/app/terms/page.tsx` - Static pages

**Component Organization**:
- `/components/navigation.tsx` - Main site navigation with mobile responsive design
- `/components/footer.tsx` - Site footer
- `/components/ui/` - shadcn/ui components (Button, Card, Input, etc.)
- `/components/theme-provider.tsx` - Theme management
- `/components/GoogleAnalytics.tsx` - Google Analytics integration

**Services & Utilities**:
- `/lib/supabaseClient.ts` - Supabase client setup with `NomaSignupRow` type definition
- `/lib/blogService.ts` - Blog service with in-memory demo posts (BlogPost type from `/types/blog`)
- `/lib/track.ts` - Event tracking wrapper that integrates PostHog and Google Analytics with UTM attribution
- `/lib/utm.ts` - UTM parameter handling and storage
- `/lib/posthog-api.ts` - PostHog analytics client
- `/lib/gtag.ts` - Google Analytics gtag integration
- `/lib/utils.ts` - Shared utility functions (likely cn() for className merging)

**Styling System**:
- Custom Lagos color palette defined in `app/globals.css`:
  - `--lagos-pink: #3db4af` (note: actual value differs from old comment)
  - `--lagos-aquamarine: #b8eaf9`
  - `--lagos-amber: #edb75f`
  - `--lagos-blue-green: #3eb4af`
- Three custom font families: Caveat (headings), Montserrat (buttons/labels), Nunito (body text)
- Tailwind CSS v4 with custom utility classes (`.text-lagos-pink`, `.bg-lagos-pink`, etc.)
- Uses `tw-animate-css` package for animations
- Custom Tailwind theme configuration in `@theme inline` section of globals.css

**Path Aliases**: Uses `@/*` for absolute imports pointing to project root

**Development Notes**:
- ESLint and TypeScript errors are ignored during builds (configured in `next.config.mjs`)
- Images from external domains are allowed: `images.unsplash.com`, `a.cdn-hotels.com`, `images.ctfassets.net`
- Uses client-side components where interactivity is needed (Navigation)
- URL redirects configured: `/october` → `/landing`, `/october-a` → `/landing-a`, `/october-b` → `/landing-b`

**Analytics & Tracking**:
- Triple analytics setup: Vercel Analytics, PostHog, and Google Analytics
- A/B testing infrastructure for landing page variants (A/B)
- UTM parameter tracking and attribution stored in cookies
- Event tracking via `captureWithAttribution()` and `trackEventWithAttribution()` from `/lib/track.ts`
- Variant detection based on URL path or cookie (`ab_test_variant`)

**Environment Variables Required**:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- PostHog and Google Analytics keys (in respective config files)

The site promotes a Portuguese coastal coliving experience targeting digital nomads and remote workers, with emphasis on community, authentic Portuguese culture, and work-life balance.