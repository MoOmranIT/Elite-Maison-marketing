# Hosting Redirects

The production host is currently unspecified. Do not add Netlify, Vercel, Apache, nginx, or Cloudflare files until the owner selects the host.

Configure the selected host's native 301 rules with these mappings. Each must be a single hop to the canonical localized route and must preserve only safe context such as the known case/insight identifier.

| Legacy alias | Arabic canonical | English canonical |
|---|---|---|
| `/index.html` | `/ar` | `/en` |
| `/about.html` | `/ar/about` | `/en/about` |
| `/consulting.html` | `/ar/consulting` | `/en/consulting` |
| `/execution.html` | `/ar/execution` | `/en/execution` |
| `/sectors.html` | `/ar/sectors` | `/en/sectors` |
| `/cases.html` | `/ar/cases` | `/en/cases` |
| `/insights.html` | `/ar/insights` | `/en/insights` |
| `/contact.html` | `/ar/contact` | `/en/contact` |
| `/case.html?id={id}` | `/ar/cases/{id}` | `/en/cases/{id}` |
| `/insight.html?id={id}` | `/ar/insights/{id}` | `/en/insights/{id}` |

The language variant for legacy aliases must follow the selected default language or an explicitly supported legacy language signal. Do not create redirect chains. Unknown URLs must return the generated `404.html` with HTTP 404. Apply HTTPS and www/non-www normalization at the same host layer.
