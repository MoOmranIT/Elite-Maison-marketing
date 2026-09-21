# خريطة التنفيذ الحالية

## المعمارية

تطبيق React أحادي الصفحة (SPA) يُبنى عبر Vite، مع خطوة prerender بعد البناء
تكتب ملف HTML ثابتًا لكل مسار قابل للأرشفة. الإصدار الحالي يعتمد بنية SSG بدون متصفح:
38 صفحة ثابتة مولّدة عبر React renderToString + StaticRouter في Node.js، مع التحقق
بدون متصفح.

```
index.html                     غلاف التطبيق (نقطة الدخول)
src/main.tsx                   الإقلاع + استيراد طبقات CSS
src/App.tsx                    جدول المسارات + طبقة التوافق مع الروابط القديمة
src/data/em.js                 المصدر الوحيد للمحتوى (نصوص، خدمات، قطاعات، قصص، رؤى، ترجمة، SEO)
src/context/                   سياق اللغة والاتجاه
src/lib/                       المسارات، i18n، SEO، JSON-LD، أدوات المحتوى
src/components/                الهيكل، الواجهة، SEO، عناصر folio وui
src/pages/                     صفحات العرض — تقرأ من em.js فقط
assets/css/                    طبقات نظام التصميم (site, folio, round2-4, hero-live)
public/                        أصول ثابتة + robots.txt + sitemap.xml
scripts/                       prerender، SSG، تحقق، فحوصات Playwright
```

## الوحدات السلوكية

| الوظيفة | التنفيذ الحالي |
|---|---|
| اللغة والاتجاه | `src/context/LanguageProvider.tsx` — بادئة المسار ثم `?lang=` ثم `localStorage["em-lang"]` ثم `ar` |
| المسارات | `src/App.tsx` (React Router 7) + `src/lib/routes.ts` |
| التوافق مع الروابط القديمة | `mapHref()` في `src/lib/routes.ts` يحوّل `case.html?id=` إلى `/ar/cases/:id` |
| المحتوى | `src/data/em.js` — كل النصوص والبيانات |
| عناوين ووسوم الصفحات | `src/lib/seo.ts` + `src/components/seo/SeoHead.tsx` |
| البيانات المنظمة | `src/lib/schema.ts` (JSON-LD) |
| prerender | `scripts/prerender.mjs` + `scripts/lib/` (loader يفهم alias `@/`) |
| بوابة النشر | `scripts/check-release.mjs` (`npm run check:release`) |
| فهرس الخدمات/القطاعات | `src/hooks/useHashSelect.ts` — فهرس ثابت على سطح المكتب، accordion على الهاتف |
| التمرير عند التنقل | `src/hooks/useRouteScroll.ts` |
| حركة الـhero | `src/hooks/useHeroLive.ts` + `src/components/Skyfield.tsx` |
| كشف العناصر عند الظهور | `observeReveals()` في `src/components/layout/Layout.tsx` |
| النموذج | `src/pages/ContactPage.tsx` + `src/components/folio/FormField.tsx` |
| الوصول | skip link، `aria-current`، `dialog` أصلي، `aria-invalid`/`aria-describedby`، `prefers-reduced-motion` |

## أوامر التحقق

| الأمر | ماذا يفحص |
|---|---|
| `npm run typecheck` | `tsc --noEmit` على `src/` وعلى `vite.config.ts` |
| `npm run build` | `vite build` ثم prerender (38 صفحة ثابتة) |
| `npm run preview` | يخدم `dist/` مع احترام الملفات المولّدة |
| `npm run check:release` | بوابة نشر الأسماء والأرقام |
| `npm run qa:copy` | يطابق النص المعتمد مع المصدر الحالي |
| `npm run qa:inquiry` | يختبر التحقق والإرسال والمهل والأخطاء لنموذج FormSubmit |
| `npm run qa:seo` | يفحص 38 صفحة ثابتة، metadata، JSON-LD، sitemap، 404 وrobots |
| `npm run qa` | جولة Playwright للغات والمسارات وaxe والتدفقات والـoverflow؛ اعتراض FormSubmit محلي |
| `npm run qa:hosting` | يشغّل `server.mjs` الحقيقي ويفحص HTTP، التحويلات، 404، الأصول، الرؤوس وأمن المسارات |
| `npm run qa:http` | اسم توافق لنفس فحص Node hosting، ويدعم `--host=https://...` لفحص preview خارجي |
| `npm run qa:nojs` | جولة Playwright بدون JavaScript للتحقق من التقدم التدريجي |


## ملاحظات

- طبقة CSS الأصلية `assets/js/site.js` و`assets/js/content.js` وملفات `legacy/*.html`
  حُذفت — كانت تنفيذ ما قبل React ولا يستهلكها التطبيق.
- `assets/css/rebuild.css` حُذف كذلك؛ لم يكن مُشارًا إليه من أي ملف.
- الصور المكرّرة في `assets/images/` حُذفت؛ النسخة المعتمدة في `public/assets/images/`.
- البنية الحالية تعتمد SSG بدون متصفح: React renderToString + StaticRouter.
- الخطوط مُستضافة ذاتيًا عبر Fontsource ولا توجد طلبات إلى Google Fonts.
