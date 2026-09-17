# Contact Endpoint Contract

The site is a Vite/React static application. No server runtime, function configuration, mail transport, CRM, or provider credentials are present in this repository. The browser therefore keeps submission disabled until `VITE_CONTACT_ENDPOINT` points at a real deployed endpoint.

## Request

`POST` JSON with `Content-Type: application/json` and `Accept: application/json`:

```json
{
  "lead": "consultation",
  "locale": "en",
  "name": "...",
  "email": "...",
  "phone": "...",
  "company": "...",
  "industry": "...",
  "market": "...",
  "challenge": "...",
  "inquiry": "",
  "outcome": "...",
  "timeline": "soon",
  "source": "case:patchouli",
  "website": ""
}
```

The endpoint must validate the payload server-side using the same limits and enums in `src/lib/contact-contract.js`. Unknown fields, control characters, invalid email addresses, invalid enums, unsafe source values, oversized values, and a non-empty `website` honeypot must be rejected without logging the complete payload.

The endpoint must accept only the production origin, reject unexpected content types, use POST, avoid cookie-based authentication, and return a 2xx response only after the delivery system has accepted the message. The frontend treats any non-2xx or timeout as failure and never shows success optimistically.

## Delivery

This repository intentionally selects no email provider. A deployment owner must provide the server-side transport, recipient, sender/domain, and allowed origin as deployment secrets/configuration. Provider credentials must not be placed in `VITE_*`, source files, HTML, localStorage, or client bundles.

Use a fixed subject such as `Elite Maison website — Initial inquiry` or `Elite Maison website — Consultation request`. If supported, build `Reply-To` from the validated email with the provider API rather than concatenating raw headers. Do not use the visitor email as `From`.

## Protection

The client includes a low-friction honeypot and duplicate-submit lock. The deployed endpoint must add reliable server-side payload-size enforcement, request rate limiting backed by shared storage when available, and safe generic responses for 429/5xx. Do not claim local in-memory rate limiting protects a multi-instance deployment.

## Activation

Set `VITE_CONTACT_ENDPOINT` only after the endpoint is deployed and tested with a non-production transport. Rebuild the static site after changing it. Until then, the UI intentionally remains in the approved generic error state and does not show production success copy.
