import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "legacy");

const pages = [
  ["index.html", "home", "Elite Maison | Four I's. One Vision.", "بيت استشاري استراتيجي للتأثير التسويقي والأثر التجاري."],
  ["about.html", "about", "من نحن | Elite Maison", "خبرة، طريقة تفكير، ونظام نمو يربط الاستراتيجية بالتنفيذ."],
  ["consulting.html", "consulting", "الاستشارات | Elite Maison", "من تشخيص التحديات إلى خارطة نمو قابلة للتنفيذ."],
  ["execution.html", "execution", "الحلول التنفيذية | Elite Maison", "تنفيذ يربط التسويق والأنظمة والتفعيل بنتائج قابلة للقياس."],
  ["sectors.html", "sectors", "خبرة القطاعات | Elite Maison", "منهجية نمو متكاملة، وواقع مختلف لكل قطاع."],
  ["cases.html", "cases", "قصص النجاح | Elite Maison", "من التحدي إلى نتيجة قابلة للقياس."],
  ["case.html", "case", "قصة نجاح | Elite Maison", "تحدٍ، استراتيجية، تنفيذ، نتيجة، ودليل."],
  ["insights.html", "insights", "الرؤى | Elite Maison", "مكتبة معرفة لصنّاع القرار."],
  ["insight.html", "insight", "رؤية | Elite Maison", "معرفة تنفيذية لصنّاع القرار."],
  ["contact.html", "contact", "تواصل معنا | Elite Maison", "ابدأ بالتحدي، لا باختيار خدمة مسبقًا."]
];

for (const [file, page, title, description] of pages) {
  const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#F2ECE6">
  <meta name="description" content="${description}">
  <title>${title}</title>
  <!-- PRODUCTION: self-host Instrument Serif, Work Sans, Noto Naskh Arabic, IBM Plex Sans Arabic. -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=Noto+Naskh+Arabic:wght@400;700&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" href="assets/images/favicon.png">
  <link rel="stylesheet" href="assets/css/site.css">
  <script src="assets/js/content.js" defer></script>
  <script src="assets/js/site.js" defer></script>
</head>
<body data-page="${page}">
  <a class="skip-link" href="#main">تجاوز إلى المحتوى</a>
  <div class="progress" aria-hidden="true"></div>
  <div id="site-header"></div>
  <main id="main" class="page" tabindex="-1">
    <div id="view"></div>
  </main>
  <div id="site-footer"></div>
</body>
</html>
`;
  writeFileSync(join(root, file), html);
  console.log("wrote", file);
}
