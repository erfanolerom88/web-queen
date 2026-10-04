SvelteKit UI Library — Pipeline & Build Prompt  
1. Decisions locked in from your answers  
  
2. Three open decisions I defaulted on (tell me if you want these changed)  
**Strapi integration depth** — I went with a **typed API client + dynamic-zone mapper** (Strapi's flexible content blocks get auto-mapped to your components by name/schema), rather than just a bare fetch wrapper. This is the standard way to get "attach to a headless CMS fast" without building a full visual page-builder.  
**Monorepo tooling** — **pnpm workspaces + Turborepo**. Fastest install/build caching, plays well with SvelteKit.  
**Docs/preview tool** — **Histoire** (Vite-native, Storybook-equivalent for Svelte/SvelteKit, much faster cold-start than Storybook).  
3. Recommended stack  
**Framework**: SvelteKit + TypeScript (strict)  
**Package manager / monorepo**: pnpm workspaces + Turborepo  
**Styling**: Tailwind CSS (utility layer, fast to write) + CSS custom properties for the theming/design-token layer (so runtime theme swaps don't need a rebuild, and output CSS stays small)  
**Component base**: shadcn-svelte (built on Bits UI) — copy components straight into `packages/core`, then re-skin with your tokens/custom CSS. For anything shadcn-svelte doesn't cover, drop to raw Bits UI or Melt UI primitives directly  
**Animation**: GSAP core + ScrollTrigger, wrapped as Svelte actions/stores (`use:animate`, `useTimeline()`), so animations are declarative at the component-usage site  
**3D / voxel / low-poly**: Threlte (Svelte + Three.js integration) — matches your speed-over-fidelity requirement much better than raw Three.js boilerplate  
**Particles / lightweight shader FX**: tsParticles for cheap 2D particle fields; small custom WebGL/GLSL shaders wrapped as Threlte components for anything 3D — avoid heavy postprocessing stacks, they fight your performance goal  
**CMS**: Strapi (headless), typed client generated from Strapi's schema  
**Docs/playground**: Histoire  
4. Monorepo layout  

ui-library/
├── packages/
│   ├── tokens/           # design tokens: colors, spacing, motion curves, z-index — source of truth, exports CSS vars + TS types
│   ├── core/              # base components (Button, Input, Modal, Menu, Tabs, Clock, Calendar, Weather...) — shadcn-svelte components copied in and re-skinned, plus hand-built ones
│   ├── motion/            # GSAP wrappers: actions, stores, timeline helpers, scroll-trigger presets
│   ├── fx/                # particle + shader effects, background systems
│   ├── three/             # Threlte-based 3D/voxel/low-poly components (scenes, voxel-grid, model-viewer, etc.)
│   ├── strapi-client/     # typed Strapi API client + dynamic-zone → component mapper
│   └── seo/               # SeoHead component, JSON-LD builders, sitemap/robots helpers
├── apps/
│   ├── docs/               # Histoire playground, all packages registered
│   └── sandbox/            # scratch SvelteKit app for manual testing
├── turbo.json
├── pnpm-workspace.yaml
└── package.json

  
5. Merging components (your clock+calendar+weather example) — copy-paste, no CLI  
No generator tooling here — it's the same copy-paste logic as pulling in a shadcn-svelte component in the first place:  
To combine components, create a new component (e.g. `WeatherDashboard.svelte`) inside `packages/core` that imports and composes the existing ones (`Clock`, `Calendar`, `Weather`) directly — same as any other Svelte component composition  
It lives as a normal file in `core`, gets its own Histoire story, and is themeable through the same `tokens` CSS variables as everything else — nothing special needed for it to pick up styling or motion  
If a combo component needs its own layout/animation choices beyond what its children already do, write that directly in the combo component itself (e.g. a `gsapAnimate` action on the wrapper, staggering the children in)  
This keeps the mental model simple for junior devs: "need a new combined component → write a `.svelte` file that renders the pieces you need" — no scaffolding command, no registration step, no extra package to manage  
6. Prompt + task list for Copilot / Claude Code  
Copy everything in the box below as the initial instruction.
**PROJECT BRIEF — SvelteKit Animated UI Library**  
Build an internal, TypeScript-strict SvelteKit component library monorepo. Priorities in order: (1) developer speed for the team building with it, (2) runtime/load performance, (3) visual richness (animation, particles, light 3D). This is NOT a public package — internal use only, by a small team including junior developers. Merging components is copy-paste based, not CLI-based: to combine two components, write a new component that composes them — keep this workflow dead simple, no scaffolding tooling.  
Stack: pnpm workspaces + Turborepo, SvelteKit, Tailwind CSS + CSS custom properties for theming, shadcn-svelte (built on Bits UI) as the component base — copy components in and re-skin them, falling back to raw Bits UI/Melt UI primitives when shadcn-svelte doesn't have something — GSAP for animation, Threlte (Three.js) for 3D/voxel/low-poly graphics, tsParticles for lightweight particle effects, a typed Strapi API client, Histoire for the component playground.  
**Task list — execute in order, confirm each phase before moving to the next:**  
**Scaffold the monorepo**  
Init pnpm workspace + Turborepo (`turbo.json`, root `package.json`, shared `tsconfig.base.json`, shared ESLint/Prettier config)  
Create empty packages: `tokens`, `core`, `motion`, `fx`, `three`, `strapi-client`, `seo`  
Create `apps/docs` (Histoire) and `apps/sandbox` (SvelteKit)  
**Design tokens (**`packages/tokens`**)**  
Define color, spacing, radius, shadow, and motion-curve tokens in TypeScript  
Emit both TS exports and a generated `tokens.css` (CSS custom properties) so consumers get runtime-swappable theming without rebuilds  
Add a light/dark theme example to prove the override mechanism works  
**Core components (**`packages/core`**)**  
Init shadcn-svelte, copy in the base set: Button, Input, Select, Dialog/Modal, Tabs, Tooltip, Menu, Card, Badge  
Re-skin each copied component to use `tokens` CSS variables instead of shadcn-svelte's defaults, and add a `variant`/`animation` prop that hooks into `packages/motion`  
For anything shadcn-svelte doesn't provide, build directly on raw Bits UI/Melt UI primitives following the same pattern  
Every component must be themeable purely via CSS custom properties from `tokens`, no hardcoded values  
Demonstrate the merge pattern here too: build at least one combo component (e.g. compose two existing ones together) so the convention is established from the start  
**Motion layer (**`packages/motion`**)**  
Wrap GSAP as: a Svelte action `use:gsapAnimate={config}`, a `createTimeline()` helper, and ScrollTrigger presets (fade-in, stagger-in, parallax)  
Document the API so any `core` component can opt into animation with one prop/action, not custom code per component  
**FX layer (**`packages/fx`**)**  
tsParticles wrapper component (`<ParticleField preset="..." />`) with 2–3 lightweight presets tuned for performance (low particle count, capped FPS)  
A couple of lightweight custom GLSL shader components (e.g. gradient noise background, hover-distortion) wrapped for Svelte  
**3D/voxel layer (**`packages/three`**)**  
Set up Threlte in a SvelteKit-safe way (SSR-safe mounting, lazy-loaded canvas)  
Build: a voxel-grid component, a low-poly model viewer component, a lightweight 3D background scene component  
Enforce a performance budget (target draw calls / poly count) in code comments so it stays "light 3D" by default  
**Strapi client (**`packages/strapi-client`**)**  
Generate typed request functions from a sample Strapi schema (REST or GraphQL, your call)  
Build a dynamic-zone → component mapper: given a Strapi page's dynamic zone content, resolve each block to the matching component from `core`/`fx`/`three` by a naming convention  
Include a minimal example SvelteKit page in `apps/sandbox` that pulls content from Strapi and renders through the mapper  
**SEO package (**`packages/seo`**)**  
`SeoHead.svelte`: takes a meta object (`title`, `description`, `ogImage`, `canonical`, `noIndex`) and renders it into `<svelte:head>` — standard `<title>`/`<meta>` tags plus Open Graph and Twitter Card tags
`schema.ts`: small builder functions for common JSON-LD types you'll actually need — `Organization`, `WebSite`, `BreadcrumbList`, `Article` — output as a `<script type="application/ld+json">` block from `SeoHead`  
`sitemap.ts` / `robots.ts`: helpers for generating `sitemap.xml` and `robots.txt` from a list of published slugs — the actual SvelteKit `+server.ts` routes calling these live in whichever app serves the public site, not in this package  
Every content type that gets its own page (Strapi's `page` type, later Medusa products) should carry `metaTitle`/`metaDescription`/`ogImage`/`canonicalUrl` fields so `SeoHead` has real data to render, not placeholders  
**Docs/playground (**`apps/docs`**)**  
Wire every package's components into Histoire with at least one interactive story each  
Add a "theming" story demonstrating token overrides live  
**CI baseline**  
Turborepo pipeline: lint → typecheck → build → (optional) visual snapshot tests  
Keep it fast — this is an internal tool, don't over-engineer CI at this stage  
**Constraints for every task:** strict TypeScript, no component may hardcode colors/spacing (tokens only), every animated/3D component must have a "reduced motion" fallback, keep bundle size front-of-mind (lazy-load Three.js/Threlte code, never import it eagerly at the root).  
  
7a. How this connects to Studio and the Commerce module  
This library is the foundation both later phases build on, not a standalone deliverable:  
**Studio** (page builder) consumes `packages/core`, `motion`, `fx`, `three` directly — every component needs the `.meta.ts` sibling file Studio's Task 1 adds, so keep prop names/types consistent once Studio work starts  
**Commerce module** adds `packages/commerce-ui` alongside `core`, built on the same `tokens`/`motion`/`fx` — no changes needed here for it, just be aware another package will sit next to `core` later  
7. Suggested build order for your team (not just Copilot)  
Tokens + monorepo skeleton (foundation, low risk)  
Core components, starting from shadcn-svelte (biggest surface area, unblocks everything else) — build the first combo component here too, so the copy-paste merge pattern is established before the team scales up the component count  
Motion layer (high visual payoff, moderate effort)  
FX + 3D layers (highest complexity, most fun, least urgent)  
Strapi client + dynamic-zone mapper (can be built in parallel by a second dev)  
8. One-week timeline with Claude Code  
A working v1 of every layer in a week is realistic if you keep each day's scope tight and treat FX/3D as "a couple of solid components," not an open-ended exploration. The risk isn't Claude Code's speed — it's scope creep on the visual layers, since those are the ones that invite "just one more effect."  
**Day 1 — Foundation** Give Claude Code the full project brief from §6 as the opening prompt, then have it execute Task 1 (monorepo scaffold) and Task 2 (tokens). Review the generated `tokens.ts`/`tokens.css` pair by hand before moving on — everything downstream depends on this being right.  
**Day 2 — Core components** Task 3 in full: shadcn-svelte init, copy in the base set, re-skin to tokens, build the first combo component. This is the largest single day — expect to review/correct component APIs (prop names, variant conventions) since this sets the pattern every later component follows.  
**Day 3 — Motion** Task 4: GSAP wrapper (action + timeline helper + ScrollTrigger presets), then retrofit animation props onto 2–3 of Day 2's components as a working example. Confirm the "reduced motion" fallback works before moving on.  
**Day 4 — FX + start of 3D** Task 5 in full (particles + shader components), then start Task 6 (Threlte setup, SSR-safe mounting). Keep the shader/particle count to what's in the brief (2–3 presets) — this is the day most likely to overrun if scope isn't held.  
**Day 5 — Finish 3D** Finish Task 6: voxel-grid, low-poly model viewer, lightweight 3D background. Sanity-check the performance budget on your actual dev machine, not just that it compiles.
**Day 6 — Strapi + SEO + docs** Task 7 (typed client + dynamic-zone mapper), Task 8 (SEO package — small, an hour or two, not a full day on its own), and Task 9 (Histoire stories). Good day to split across two people if you have one free — none of these three depend on each other.  
**Day 7 — CI + buffer** Task 10 (CI baseline) plus a full pass fixing whatever Claude Code got wrong earlier in the week — component APIs that drifted, missing token references, un-reviewed 3D/shader code. Budget this day as buffer, not new work; something will need it.  
**Running it**: start each day's Claude Code session by re-pasting the relevant task block from §6 rather than relying on it remembering yesterday's context, and do a quick human review at the end of each day before the next day's work builds on top of it — catching a bad pattern on Day 2 is cheap, catching it on Day 6 is not.  
9. Install checklist — everything to pull in, by layer  
Run these yourself (or hand this section to Claude Code as part of Task 1–7) — grouped in the same order as the task list in §6.  
**Prerequisites**  
Node.js (LTS) and pnpm installed  
A Strapi instance running somewhere (local or hosted) if you want Task 7 to work against real data from Day 1  
**Monorepo scaffold (Task 1)**  

mkdir ui-library && cd ui-library
pnpm init
pnpm add -D turbo -w
# create pnpm-workspace.yaml listing packages/* and apps/*

  
**SvelteKit apps (Task 1)**  

# inside apps/sandbox and apps/docs
npx sv create .   # or: npm create svelte@latest .

  
**Tailwind (Task 1, before shadcn-svelte init)**  

pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

  
**shadcn-svelte — component base (Task 3)**  

# from the app/package that will hold packages/core
npx shadcn-svelte@latest init
# then add each component you want copied in, e.g.:
npx shadcn-svelte@latest add button input select dialog tabs tooltip dropdown-menu card badge

  
This copies component source directly into your repo (under the alias you set during `init`, typically `$lib/components/ui`) — no runtime package, so nothing further to "install" per component. Re-run `add` any time you want another one.  
**Bits UI / Melt UI — fallback primitives (Task 3, as needed)**  

pnpm add bits-ui
# or, if you prefer Melt UI instead for a given component:
pnpm add @melt-ui/svelte

  
**GSAP — animation (Task 4)**  

pnpm add gsap

  
ScrollTrigger ships inside the `gsap` package itself — no separate install, just `import { ScrollTrigger } from 'gsap/ScrollTrigger'` and register it.  
**tsParticles — particle FX (Task 5)**  

pnpm add @tsparticles/svelte @tsparticles/engine
pnpm add tsparticles   # full bundle — or swap for @tsparticles/slim if you want a smaller build
# optional ready-made presets, add only what you'll use:
pnpm add @tsparticles/preset-snow @tsparticles/preset-stars @tsparticles/preset-confetti

  
**Threlte — 3D/voxel/low-poly (Task 6)**  

pnpm add three @threlte/core @threlte/extras
pnpm add -D @types/three

  
In `vite.config.ts`, add `ssr: { noExternal: ['three'] }` so SvelteKit's SSR doesn't choke on it — this is what "SSR-safe mounting" in Task 6 refers to.  
**Strapi client (Task 7)**  

pnpm add qs   # for building query strings against Strapi's REST filters

  
There's no universal official Strapi type-generator — either hand-write the TS interfaces matching your content-type schemas, or generate them from your Strapi instance's schema JSON with a small script. Either way this lives in `packages/strapi-client`.  
**SEO package (Task 8)** — no new dependencies, it's hand-written using data already available; `qs` above covers any Strapi filtering it needs.  
**Histoire — docs/playground (Task 9)**  

pnpm add -D histoire @histoire/plugin-svelte

  
Add a `histoire.config.ts` with the Svelte plugin registered, and a `story` script (`histoire dev` / `histoire build`) in `apps/docs/package.json`.  
**CI baseline (Task 10)** Nothing extra to install — this task wires the packages already installed above (`turbo`, plus whatever lint/typecheck tooling you use) into a pipeline script/CI config.
