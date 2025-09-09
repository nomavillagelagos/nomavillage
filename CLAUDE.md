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
- **Analytics**: Vercel Analytics

### Key Architecture Patterns

**App Router Structure**: Uses Next.js 13+ app directory structure with page-based routing:
- `/app/page.tsx` - Homepage
- `/app/coliving/page.tsx` - Coliving information
- `/app/coworking/page.tsx` - Coworking spaces
- `/app/rooms/page.tsx` - Room listings
- `/app/community/page.tsx` - Community features
- `/app/join/page.tsx` - Application/signup form

**Component Organization**:
- `/components/navigation.tsx` - Main site navigation with mobile responsive design
- `/components/footer.tsx` - Site footer
- `/components/ui/` - shadcn/ui components (Button, Card, Input, etc.)
- `/components/theme-provider.tsx` - Theme management

**Styling System**:
- Custom Lagos color palette defined in `app/globals.css`:
  - `--lagos-pink: #e151af`
  - `--lagos-aquamarine: #b8eaf9` 
  - `--lagos-amber: #edb75f`
  - `--lagos-blue-green: #3eb4af`
- Three custom font families: Caveat (headings), Montserrat (buttons/labels), Nunito (body text)
- Tailwind CSS v4 with custom utility classes for Lagos theme colors

**Path Aliases**: Uses `@/*` for absolute imports pointing to project root

**Development Notes**:
- ESLint and TypeScript errors are ignored during builds (configured in `next.config.mjs`)
- Images are unoptimized for deployment compatibility
- Uses client-side components where interactivity is needed (Navigation)

The site promotes a Portuguese coastal coliving experience targeting digital nomads and remote workers, with emphasis on community, authentic Portuguese culture, and work-life balance.