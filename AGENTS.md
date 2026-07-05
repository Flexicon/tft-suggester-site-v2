# AGENTS.md

## Project Notes

- Source for the TFT Suggester PWA at `https://tft-suggester.nerfthis.xyz/`.
- The app helps Teamfight Tactics players pick champions and see matching team comps, tiers, playstyles, and item recommendations.
- Keep changes small and practical; this is a compact SvelteKit app, not a large framework-heavy codebase.

## Architecture

- SvelteKit 2 + Svelte 4 + TypeScript, styled mostly with Tailwind utility classes.
- Static output via `@sveltejs/adapter-static`; `src/routes/+layout.ts` sets `prerender = true`.
- PWA support lives in `vite.config.ts` via `@vite-pwa/sveltekit`; image runtime caching is configured there.
- Main page data is loaded in `src/routes/+page.server.ts` from `src/lib/server/data.ts`.
- Data comes from `https://tft-suggester-api.nerfthis.xyz`; the frontend maps item recommendations onto comp champions before rendering.
- Core comp sorting/filtering logic is in `src/lib/data/comps.ts`; tests are in `src/lib/data/comps.test.ts`.
- Reusable UI components are under `src/lib/components/`; shared types are under `src/lib/types/`.

## Working Conventions

- Use tabs, single quotes, trailing commas, and 100-column Prettier formatting.
- Prefer existing Svelte component patterns and Tailwind classes over adding new abstractions.
- Be careful with server-only code: `src/lib/server/data.ts` and `+*.server.ts` can use server APIs; client components cannot.
- Selected champions are encoded in the `selected` query param on the home page.
- The build footer reads `git rev-parse HEAD` in `src/routes/+layout.server.ts`, so builds expect a git checkout.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Type/check: `npm run check`
- Lint/format check: `npm run lint`
- Tests: `npm test`
- Production build: `npm run build`
