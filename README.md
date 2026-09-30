# Northline — Starter Kit

> This is the **starter** scaffold for the tutorial. The full project
> structure, routing, dependencies, and config match the finished site
> exactly — components and pages are stripped down to minimal markup with
> `TODO` comments marking what you'll build during the tutorial. Data
> arrays (team members, features, articles, etc.) are kept with one
> placeholder entry each so the shape is visible.

Built for the Field. A Next.js + TypeScript + Tailwind CSS marketing site for
Northline, a fictional field-recording gear and software brand.

Built with [Script Valley](#).

## Stack

- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS (only styling system — see below)
- GSAP + Framer Motion + Lenis for animation/scroll, carried over as-is from
  the source template this project was adapted from

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To validate the project:

```bash
npm run build
npx tsc --noEmit
npm run lint
```

## Project structure

- `src/app/` — routes (`/`, `/about`, `/gear`, `/field-notes`, `/contact`),
  each a thin server component exporting page metadata
- `src/views/` — the actual page bodies (client components, since they use
  GSAP/Framer/Lenis hooks)
- `src/components/` — `Menu`, `Footer`, `ParallaxImage`, `SamplePlayer`,
  `PageTransition`, `SmoothScroll`
- `src/app/globals.css` — intentionally minimal: only `@font-face`
  placeholders and the html/body base reset live here. Everything else is
  Tailwind utility classes.

## Fonts

The original template bundled two licensed commercial typefaces (a condensed
display face and a serif editorial face). Those font files aren't included
here, so this build ships with close system-font fallbacks
(`tailwind.config.ts` → `theme.extend.fontFamily.display` / `.editorial`) so
the project builds without a network font fetch.

To use real display/editorial faces:

1. Add the font files to `public/fonts/`.
2. Uncomment the `@font-face` blocks in `src/app/globals.css` and point them
   at your files.
3. Update `fontFamily.display` / `fontFamily.editorial` in
   `tailwind.config.ts` to reference the new font-family names.

## Placeholder imagery

Every photo in `public/` is a generated placeholder (dark background, rust
accent bar, and a caption naming what the image is for) — the source
template's stock photography didn't match Northline's outdoor/field-recording
subject matter, so it was replaced rather than reused. Required images:

| Path | Suggested size | Purpose |
| --- | --- | --- |
| `public/home/hero.jpg` | 1600×2000 | Home hero — recorder in a field setting |
| `public/home/cover.jpg` | 1200×1500 | "Built for weather" section |
| `public/home/site-intro.jpg` | 1200×1200 | Product-in-use shot |
| `public/about/hero.jpg` | 1600×1000 | About hero |
| `public/about/sign-up-card.jpg` | 800×600 | Newsletter card |
| `public/about/team-bg.jpg` | 1920×1080 | Team section background |
| `public/about/team1–4.jpg` | 800×1000 | Team portraits |
| `public/about/banner.jpg` | 1200×800 | Workshop banner |
| `public/gear/hero.jpg` | 1600×1000 | Gear hero |
| `public/gear/banner.jpg`, `banner2.jpg` | 1200×800 | Product banners |
| `public/gear/callout-bg.jpg` | 1920×1080 | "Reliable in the field" background |
| `public/field-notes/article1–7.jpg` | 800×600 | Article thumbnails |
| `public/field-notes/banner.jpg` | 1200×800 | Banner |
| `public/contact/hero.jpg` | 1600×1000 | Contact hero |
| `public/contact/banner.jpg` | 1200×800 | Banner |
| `public/footer/footer.jpg` | 1920×1080 | Footer background |
| `public/samples/tidepool.png`, `ridge-wind.png` | 800×800 | Sample-player art |

Audio in `public/samples/*.mp3` is carried over from the source template
as placeholder sample audio for the `SamplePlayer` component.

## Animation fidelity

All animation code (GSAP timelines/ScrollTrigger config, the Framer Motion
page-wipe transition, the Lenis-driven parallax lerp, and the vinyl-flip
tween) was ported with identical durations, easings, delays, and trigger
values — only the wiring was adapted to fit the App Router (e.g. the
per-page `Transition()` HOC became a single layout-level `PageTransition`
keyed by `usePathname()`).
