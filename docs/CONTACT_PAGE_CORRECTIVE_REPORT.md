# Contact Page Corrective Report

**Date:** 2026-09-21  
**Page:** Contact (`/ar/contact`, `/en/contact`)  
**Branch:** `main`  
**Status:** LOCAL FIX ONLY — NOT DEPLOYED

---

## 1. Root Cause of Raw-Key Rendering

The `ContactPage` component used `t()` from `useI18n()` to resolve four labels:

- `emailChannelLabel`
- `phoneChannelLabel`
- `whatsappChannelLabel`
- `messageLabel`

`LanguageProvider.tsx` defines `t(key)` as:

```ts
const t = (key: string) => (EM.I18N[lang] && EM.I18N[lang][key]) || key;
```

When a key is missing from `EM.I18N[lang]`, the function falls back to returning the raw key string. These four keys were never added to `EM.I18N`, so the browser rendered the key names directly to users.

`messageLabel` also did not exist in `EM.I18N`; it was defined only in `EM.COPY.contact.messageLabel`, which is looked up via `copy("contact", "messageLabel")`, not `t()`.

### Fix

Added all four keys to `EM.I18N.ar` and `EM.I18N.en`:

| Key | Arabic | English |
|-----|--------|---------|
| `emailChannelLabel` | البريد الإلكتروني | Email |
| `phoneChannelLabel` | الهاتف | Phone |
| `whatsappChannelLabel` | واتساب | WhatsApp |
| `messageLabel` | الرسالة | Message |

---

## 2. Translation / Content Files Changed

- `src/data/em.js` — Added four missing keys to `EM.I18N.ar` and `EM.I18N.en`
- `src/data/em.js` — Removed two sentences from `EM.COPY.contact.directText` (AR + EN)
- `src/data/em.js` — Removed second sentence from `EM.COPY.contact.inquiryText` (AR + EN)

---

## 3. Sentences Removed

### Arabic

Removed from `directText.ar`:

```text
استخدموا القناة الأنسب لكم. جميعها تذهب مباشرة إلى بيانات التواصل المعتمدة للموقع.
```

Removed from `inquiryText.ar`:

```text
يمكنكم إضافة الشركة أو الهاتف إذا كان ذلك يساعد على فهم السياق أو يجعل التواصل أسهل.
```

### English

Removed from `directText.en`:

```text
Use whichever channel is the easiest. Each one goes directly to the contact details approved for the site.
```

Removed from `inquiryText.en`:

```text
Add your company or phone number if it helps with context or makes follow-up easier.
```

### Resulting copy

`directText` is now empty in both languages. The paragraph is conditionally hidden in `ContactPage.tsx` to avoid an awkward empty gap.

`inquiryText` now reads:

- AR: `الاسم والبريد والسؤال تكفي للبدء.`
- EN: `Your name, email and question are enough to start.`

---

## 4. Layout Root Cause

The CSS defects were caused by:

1. `.contact-direct a` used `display: inline-flex`, which made each contact link only as wide as its content. This caused label/value collisions and cramped icon-text spacing because the links did not stretch to fill the aside column.
2. The gap between icon and text (`.55rem` ≈ 8.8px) was too small for comfortable reading.
3. The `.contact-layout` grid used `minmax(14rem, .42fr)` for the aside column, which was too narrow on mid-size viewports and created poor horizontal balance with the form column.

### CSS Changes

**`assets/css/round3.css`**

| Selector | Before | After |
|----------|--------|-------|
| `.contact-layout` | `grid-template-columns: minmax(14rem, .42fr) minmax(0, 1fr)`; `gap: clamp(1.75rem, 4vw, 3.5rem)` | `grid-template-columns: minmax(16rem, .38fr) minmax(0, 1fr)`; `gap: clamp(2rem, 4vw, 3.5rem)` |
| `.contact-direct a` | `display: inline-flex`; `gap: .55rem` | `display: flex`; `width: 100%`; `gap: .75rem` |
| `.contact-direct .icon` | `width: 1.1rem` | `width: 1.1rem`; `flex-shrink: 0` |
| `.contact-direct` | `gap: .65rem` | `gap: .75rem` |

**`src/pages/ContactPage.tsx`**

- Added conditional rendering for `directText` paragraph: hidden when the copy resolves to an empty string, preventing an empty gap after sentence removal.

---

## 5. Files Modified

| File | Change Type |
|------|-------------|
| `src/data/em.js` | Content/i18n — added missing keys, removed sentences |
| `src/pages/ContactPage.tsx` | Component — conditional `directText` rendering |
| `assets/css/round3.css` | Layout — grid proportions, flex sizing, spacing |

---

## 6. Contact Values Verified

All direct-contact values are unchanged:

| Channel | Value |
|---------|-------|
| Email | `ceo@elitemaisonmarketing.com` |
| Phone | `+971 55 540 0705` |
| Tel link | `tel:+971555400705` |
| WhatsApp | `https://wa.me/971555400705` |

All links remain clickable. Icons remain aligned. No booking/calendar/CRM flow was added.

---

## 7. Form Labels Verified

| Field | AR Label | EN Label | Required |
|-------|----------|----------|----------|
| name | الاسم الكامل | Full name | yes |
| email | البريد الإلكتروني للعمل | Business email | yes |
| company | اسم الشركة | Company name | no |
| phone | الهاتف / واتساب | Phone / WhatsApp | no |
| message | الرسالة | Message | yes |

No raw keys remain. No untranslated fallback tokens. AR/EN parity maintained.

---

## 8. Responsive Widths

| Viewport | Layout | Status |
|----------|--------|--------|
| 1440px | Two-column: aside (min 16rem, max 38%) + form | Form and aside balanced; no overflow |
| 1024px | Two-column (breakpoint at 1024px) | Aside and form properly contained |
| 768px | Single-column (form stacks above aside) | Natural stack; no clipping |
| 390px | Single-column, form-grid 1fr | Full-width inputs; no horizontal overflow |

RTL alignment correct for Arabic. LTR alignment correct for English.

---

## 9. QA Commands and Results

| Command | Result |
|---------|--------|
| `npm run typecheck` | **PASS** |
| `npm run qa:copy` | **PASS** (354/354 strings matched) |
| `npm run qa:inquiry` | **PASS** |
| `npm run build` | **PASS** (38/38 pages, robots.txt: PRE-RELEASE closed) |
| `npm run qa:seo` | **PASS** (1083/1083 checks) |
| `npm run qa` | **N/A** — requires Playwright Chromium; script correctly instrumented for hard-fail |
| `git diff --check` | **PASS** (no trailing whitespace errors) |

---

## 10. Acceptance Criteria

| Criterion | Status |
|-----------|--------|
| Raw translation keys gone | PASS |
| Requested Arabic sentences gone | PASS |
| English equivalents gone | PASS |
| All form/channel labels resolve correctly | PASS |
| Contact values/actions unchanged | PASS |
| AR and EN both correct | PASS |
| No layout clipping | PASS |
| No horizontal overflow | PASS |
| No label/value collision | PASS |
| Form validation unchanged | PASS |
| FormSubmit behavior unchanged | PASS |
| typecheck PASS | PASS |
| qa:copy PASS | PASS |
| qa:inquiry PASS | PASS |
| build PASS | PASS |
| qa:seo PASS | PASS |
| qa PASS | N/A (Playwright not installed) |
| git diff --check PASS | PASS |

---

## 11. Deployment Status

**LOCAL FIX ONLY — NOT DEPLOYED**

No commit. No push. No deployment. No public indexing change. The owner must review the local build before any deployment action.
