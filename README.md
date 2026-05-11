# ToolWools.com

Luxury-minimal landing page for a 100+ tool portal — built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

This commit delivers the **UI/UX shell** (no tool backends yet). Every surface is production-grade: cinematic animations, parallax depth, 3D mouse-tilt hero, filterable tool grid, animated SEO score, draggable before/after slider, counters, and a dark CTA.

## Run locally

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`.

## Scripts

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Dev server with HMR             |
| `npm run build`     | Production build                |
| `npm run start`     | Serve the production build      |
| `npm run typecheck` | Strict TypeScript check         |
| `npm run lint`      | Next.js / ESLint checks         |

## Architecture

```
app/
  layout.tsx           ← Inter font, root metadata
  page.tsx             ← Homepage composition
  globals.css          ← CSS variables, grain, shimmer, reduced-motion

components/
  layout/
    Nav.tsx            ← Glass sticky header + mobile overlay
    Footer.tsx         ← Columns, newsletter, legal row
  marketing/
    Hero.tsx           ← Word-stagger H1 + 3D tilt card + parallax
    CompressorPreview.tsx   ← UI-only tool shell
    ToolsExplorer.tsx  ← Category pills + filterable grid
    ToolCard.tsx       ← Hover-lift card with gold overlay
    FeatureShowcase.tsx ← SEO ring + before/after slider
    StatsStrip.tsx     ← Counter cards
    CTASection.tsx     ← Dark rounded CTA with animated blobs
  ui/
    Logo.tsx
    ScrollProgress.tsx ← Thin gold progress bar, top of viewport

lib/
  tools-registry.ts    ← Central tool definitions
  useCountUp.ts        ← Reusable rAF counter hook
```

## Design tokens

All tokens live in `app/globals.css` and `tailwind.config.ts`.

- **Cream** `#FAF9F6` base, secondary `#F3F1EC`, tertiary `#EAE7E0`
- **Gold** `#B8962E` with `gold-light`, `gold-bg`, `gold-border`
- **Ink** four-stop neutral scale from `#111110` → `#9A9A97`
- **Radii** 8 / 12 / 16 / 20 / 28 / 40 px
- **Easing** `ease-lux` (material), `ease-spring` (overshoot)

## Next phases

1. Build real tool logic behind each UI shell (Image Compressor, Meta Tag Generator, etc.)
2. Individual tool pages at `/tools/[category]/[slug]` using the shared `ToolShell`
3. SEO metadata per tool (already stubbed in `lib/tools-registry.ts`)
4. `next-sitemap` config + `robots.txt`
5. AdSense placeholder slots on tool pages

---

Phase 1. Built for a $100M feel, one fadeIn at a time.
