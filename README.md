# Elite Maison — Marketing Consultancies

Bilingual (Arabic / English) marketing site for Elite Maison Marketing Consultancies.
Client-rendered React 19 app with build-time prerendered canonical pages.
38 canonical full-content HTML pages, no browser required for production build.

Built from the Visual Identity Guidelines, Website Content Direction and Company Profile.
Every name, figure and service shown here is source-backed — see
[docs/source-references.md](docs/source-references.md).

---

## Requirements

- **Node.js >= 22.18** — the build imports TypeScript modules directly via Node's
  native type stripping (no extra toolchain).

## Run locally

```bash
npm install
npm run dev          # http://127.0.0.1:5173
```

The dev server binds to `127.0.0.1` (see `vite.config.ts`). Change `server.host`
if you need to reach it from another machine or a container.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Browserless production build: client build → SSR bundle → head prerender → React static body → verification |
| `npm run build:client` | Vite client build only |
| `npm run build:ssr` | Vite SSR bundle (`src/entry-server.tsx` → `.ssr/`) |
| `npm run prerender` | Re-run head prerender against an existing `dist/` |
| `npm run ssg` | Re-run React static body generation against an existing `dist/` |
| `npm run verify:ssg` | Browserless static output verification |
| `npm run qa:install-browser` | Install Playwright Chromium for local browser QA |
| `npm run qa` / `npm run qa:round4` | Playwright walkthroughs (Chromium must be installed separately via `qa:install-browser`) |

## Routes

Every route is language-prefixed. `/` redirects to the saved language, defaulting
to Arabic (`ar`).

| Page | Arabic | English |
| --- | --- | --- |
| Home | `/ar` | `/en` |
| About | `/ar/about` | `/en/about` |
| Consulting | `/ar/consulting` | `/en/consulting` |
| Execution solutions | `/ar/execution` | `/en/execution` |
| Sector experience | `/ar/sectors` | `/en/sectors` |
| Proof / cases | `/ar/cases` | `/en/cases` |
| Case detail | `/ar/cases/:id` | `/en/cases/:id` |
| Insights | `/ar/insights` | `/en/insights` |
| Insight detail | `/ar/insights/:id` | `/en/insights/:id` |
| Contact | `/ar/contact` | `/en/contact` |

Legacy prototype URLs (`case.html?id=patchouli`, `about.html`, …) are mapped to the
routes above by `src/lib/routes.ts`, so old links keep working.

Current ids — cases: `attractive-smile`, `bloom`, `bin-ablan`, `patchouli`, `ai-brains`;
insights: `growth-guide`, `sales-article`, `expansion-brief`, `gcc-market-entry-readiness`, `ai-insight`, `cx-check`.

## Where content lives

**`src/data/em.js` is the single source of content.** Pages are presentation only.

| Key | Holds |
| --- | --- |
| `EM.CONFIG` | publication switches, site URL, contact channels |
| `EM.I18N` | UI strings, `ar` and `en` (111 keys each, kept in parity) |
| `EM.COPY` | page copy by group: `home`, `about`, `consulting`, `execution`, `sectors`, `cases`, `insights`, `contact` |
| `EM.PAGES` | per-page SEO title and description |
| `EM.CONSULTING` / `EM.EXECUTION` | the 8 consulting capabilities and 6 execution solutions |
| `EM.SECTORS` | the 6 sectors, each linked to relevant capabilities |
| `EM.CASES` / `EM.INSIGHTS` | proof stories and insight pieces |
| `EM.CASE_LINKS` / `EM.RELATED_PATHS` | cross-linking between capabilities, sectors, cases and insights |
| `EM.METHOD` / `EM.PILLARS` / `EM.ABOUT` / `EM.ENGAGE` / `EM.CHALLENGES` | home and about building blocks |

To add a case: append to `EM.CASES`, then add its id to `public/sitemap.xml`
(or just build — the prerender step regenerates `dist/sitemap.xml` and warns if the
committed copy drifted).

## Language and direction

`src/context/LanguageProvider.tsx` derives the language from the URL prefix, then
`?lang=`, then `localStorage["em-lang"]`, then `ar`. It sets `document.documentElement`
`lang` and `dir` on every change. Prerendered pages already carry the correct
`<html lang dir>`, so there is no direction flash on first paint.

## Architecture

### Production build (browserless)

```
npm run build
  → vite build (client assets)
  → vite build --ssr src/entry-server.tsx (server render bundle)
  → scripts/prerender.mjs (head: title, meta, JSON-LD, canonical, hreflang)
  → scripts/prerender-static.mjs (React static body via renderToString)
  → scripts/verify-static.mjs (38/38 verification without browser)
```

No Chromium. No Playwright. No browser binaries.

### Runtime

```
npm start
  → server.mjs (Node.js static server)
  → serves 38 canonical HTML pages + assets
  → client hydrates with hydrateRoot on canonical pages
```

### Fonts

All fonts are self-hosted via Fontsource packages:
- Source Serif 4
- Work Sans
- Noto Naskh Arabic
- IBM Plex Sans Arabic

No Google Fonts requests in production.

The `prerender-static.mjs` step uses `renderToString` under `StaticRouter` to generate
the complete `#root` markup at build time. No browser is launched during production
build.

### Hosting

The selected deployment is GoDaddy Node.js Hosting connected to GitHub repository
`MoOmranIT/Elite-Maison-marketing`, branch `main`, using Node.js 22. GoDaddy runs
`npm install`, `npm run build`, and `npm start`; `server.mjs` binds to
`process.env.PORT` on `0.0.0.0` and serves only the verified `dist/` artifact.

The production server directly resolves the finite prerendered route files,
normalizes trailing slashes, handles the documented legacy aliases, returns the
branded `dist/404.html` with HTTP 404, and applies narrow production-host
normalization. It does not provide an API, form proxy, database, authentication,
or SPA fallback. FormSubmit remains a browser-to-provider flow.

| Host | Configuration |
| --- | --- |
| GoDaddy Node.js Hosting | `server.mjs`, `npm run build`, `npm start` |

See [HOSTING_REDIRECTS.md](HOSTING_REDIRECTS.md) for the Node route contract and
[PRODUCTION_RELEASE.md](PRODUCTION_RELEASE.md) for the owner-controlled preview
and release workflow. `EM_RELEASE_APPROVED` must be set explicitly in the environment
for `dist/robots.txt` to be generated in open-crawler mode with `Allow: /` and the
sitemap directive. In local development it is intentionally unset, producing a
closed `robots.txt`.

`npm run preview` remains a Vite-only development convenience. Use `npm start`
and `npm run qa:hosting` to verify the actual production server behavior.

## Publication gate

Client names and commercial figures are **real** and require legal/commercial sign-off
before a public launch. Two switches in `src/data/em.js` control this:

```js
EM.CONFIG.publicationApproved = true;   // sign-off is final
EM.CONFIG.anonymizeCases      = false;  // force anonymous names, hide standalone metrics
```

While either keeps names public, `npm run check:release` prints exactly what would be
published and exits non-zero if the approval environment variable is absent:

```bash
npm run check:release                        # exit 2 (governance OPEN) without EM_RELEASE_APPROVED
EM_RELEASE_APPROVED=1 npm run check:release  # explicit sign-off (exit 0)
```

`npm run build` does not set `EM_RELEASE_APPROVED` automatically. The exit codes remain:
`0` = PASS, `1` = script/config failure, `2` = approval absent / governance OPEN.

## Design system

- `assets/css/site.css` — tokens, typography, layout primitives
- `assets/css/folio.css`, `round2.css`, `round3.css`, `round4.css`, `hero-live.css` —
  layered feature styles, imported from `src/main.tsx`
- Tailwind 4 is configured in `src/index.css` via `@theme inline` and is used for
  utilities and the `src/components/ui/*` widgets
- `public/assets/images/` — logo lockup, logo mark, favicon, hero image, OG share card
  (regenerate the OG PNG from its SVG with `node scripts/og-png.mjs`)

Tokens: Ink `#06182D` · Gold `#D9A537` · Ivory `#F2ECE6` · Plum `#32102E`.
Gold is an accent colour, never body text.

## Current limitations

- The contact form validates in the browser and submits inquiries through the configured FormSubmit AJAX endpoint.
  Required fields: name, email, message. Optional: company, phone.
- Consultation requests are followed up manually by the team; there is no calendar, date selection, or time-slot booking flow.
- No approved editorial photography yet — image slots carry a note instead.
- Case names and figures remain subject to final commercial and legal approval.
- All production fonts are self-hosted via Fontsource packages (Source Serif 4, Work Sans, Noto Naskh Arabic, IBM Plex Sans Arabic).
- Insights have no topic filter. Each of the six pieces currently has a unique
  topic, so a filter would show one item per option; revisit once topics repeat.

## Pre-production checklist

See [docs/prototype-commitments.md](docs/prototype-commitments.md) for the full list.
Headline items: approve the publication switches, activate FormSubmit with the owner,
complete privacy policy/legal review, confirm target markets,
and have the Arabic and English copy edited.

## Documents

- [Source references](docs/source-references.md)
- [Website architecture](docs/website-architecture.md)
- [Brand guidelines](docs/brand-guidelines.md)
- [Design system](docs/design-system.md)
- [Implementation map](docs/implementation-map.md)
- [Prototype commitments](docs/prototype-commitments.md)
- [UX and accessibility](docs/ux-accessibility.md)
- [Content and copy rules](docs/content-and-copy.md)
