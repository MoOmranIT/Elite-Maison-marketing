# Elite Maison — Marketing Consultancies

Bilingual (Arabic / English) marketing site for Elite Maison Marketing Consultancies.
Client-rendered React SPA with a build-time prerender step that writes one static,
fully-tagged HTML file per indexable route.

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
| `npm run build` | `vite build` **then** the prerender step — this is the production build |
| `npm run build:spa` | `vite build` only, without prerendered routes |
| `npm run prerender` | Re-run the prerender step against an existing `dist/` |
| `npm run preview` | Serve `dist/`, resolving prerendered routes the way a static host does |
| `npm run start` | Start production Node server (`server.mjs`) |
| `npm run typecheck` | `tsc --noEmit` for `src/` and for `vite.config.ts` |
| `npm run check:release` | Publication gate — blocks a public deploy while client names are unapproved |
| `npm run qa:hosting` | Local Node hosting QA (routes, redirects, 404, MIME, HEAD, 405, traversal) |
| `npm run qa:http` | Alias for `qa:hosting`; supports `--host=https://...` for live preview |
| `npm run qa` / `npm run qa:round4` | Playwright walkthroughs (Chromium auto-installed via `prebuild`) |

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
insights: `growth-guide`, `sales-article`, `expansion-brief`, `ai-insight`, `cx-check`.

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

## SEO and prerendering

The app is client-rendered, so `vite build` alone emits one HTML shell whose metadata
describes the Arabic home page. Crawlers that do not run JavaScript — WhatsApp, X,
LinkedIn, Facebook, and basic indexers — would show that for every URL in the sitemap.

`scripts/prerender.mjs` fixes this. After `vite build` it writes
`dist/<lang>/<route>/index.html` for all 36 indexable URLs (18 routes × 2 languages),
each with the correct:

- `<html lang>` and `dir`
- `<title>` and `meta[name=description]`
- `meta[name=robots]`
- `link[rel=canonical]` and `hreflang` alternates (`ar`, `en`, `x-default`)
- Open Graph and Twitter cards
- JSON-LD (`Organization`, `Service`, `Article`, `CreativeWork`,
  `BreadcrumbList`, `WebSite`)

It also writes `dist/sitemap.xml` and `dist/404.html`.

Two things to know:

1. **Values come from the app's own modules.** The script imports
   `src/lib/seo.ts` and `src/lib/schema.ts` through a small Node loader
   (`scripts/lib/`) that understands the `@/` alias. Nothing is re-implemented, so
   prerendered markup and runtime markup cannot drift. Every tag is emitted with the
   same selector `src/components/seo/SeoHead.tsx` later upserts, so hydration updates
   in place instead of duplicating tags.
2. **Full browser-rendered body is snapshotted into every canonical page.** The
   prerender step drives the real browser to scroll position, lets scroll-triggered
   reveals finish, then captures the rendered `#root` inner HTML and injects it into
   each static page. Prerendered pages therefore ship content without requiring
   JavaScript execution on first paint.

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
and release workflow. The pre-release build keeps `robots.txt` closed with
`Disallow: /` until live validation and a separate release decision.

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
published and exits non-zero:

```bash
npm run check:release                        # blocked
EM_RELEASE_APPROVED=1 npm run check:release  # explicit sign-off
```

It is deliberately **not** part of `npm run build`, so the prototype keeps building for
internal client review with named cases visible. Run it in CI before any public deploy.

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

## Prototype limits

- The contact form validates in the browser and submits inquiries through the configured FormSubmit AJAX endpoint.
- Consultation requests are followed up manually by the team; there is no calendar, date selection, or time-slot booking flow.
- No approved editorial photography yet — image slots carry a note instead.
- Case names and figures remain subject to final commercial and legal approval.
- Typeface files are loaded from Google Fonts. **Production must self-host**
  Source Serif 4, Work Sans, Noto Naskh Arabic and IBM Plex Sans Arabic.
- Insights have no topic filter. Each of the five pieces currently has a unique
  topic, so a filter would show one item per option; revisit once topics repeat.

## Pre-production checklist

See [docs/prototype-commitments.md](docs/prototype-commitments.md) for the full list.
Headline items: approve the publication switches, connect the form to a CRM or inbox,
self-host fonts, add a privacy policy and contact consent, confirm target markets,
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
