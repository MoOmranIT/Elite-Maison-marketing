# Elite Maison Prototype

Multi-page bilingual prototype for Elite Maison, built from the Visual Identity Guidelines, Website Content Direction, and Company Profile.

## Run locally

Open the files over HTTP so language persistence, page transitions, and asset paths behave as they will in review:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then visit [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

Opening `index.html` directly in the browser still works for a first look. Cross-document view transitions require a local server.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| About | `about.html` |
| Consulting | `consulting.html` |
| Execution Solutions | `execution.html` |
| Sector Experience | `sectors.html` |
| Case Studies | `cases.html` |
| Case detail | `case.html?id=` |
| Insights | `insights.html` |
| Insight detail | `insight.html?id=` |
| Contact | `contact.html` |

Shared design system: `assets/css/site.css`, `assets/js/content.js`, `assets/js/site.js`.

To regenerate HTML chrome after template edits:

```bash
node scripts/build-pages.mjs
```

## Documents

- [Source references](docs/source-references.md)
- [Website architecture](docs/website-architecture.md)
- [Brand guidelines](docs/brand-guidelines.md)
- [Design system](docs/design-system.md)
- [Prototype commitments](docs/prototype-commitments.md)
- [UX and accessibility](docs/ux-accessibility.md)

## Prototype limits

The contact form validates in the browser and does not send data to a backend. Case names and figures remain subject to final commercial and legal approval (`EM.CONFIG.anonymizeCases`). Production should self-host the typefaces currently loaded from Google Fonts.
