/* Elite Maison — shared UI components + page renderers. Vanilla. */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const page = document.body.dataset.page || "home";
  const reducedQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopQ = window.matchMedia("(min-width: 1101px)");
  let reduced = reducedQ.matches;
  const state = { lang: "ar", lead: "consultation", topic: "all", lastFocus: null, moreOpen: false };
  let spy = null;
  let revealObs = null;

  const ICONS = {
    arrow: '<polyline points="5 12 19 12"/><polyline points="13 6 19 12 13 18"/>',
    arrowRtl: '<polyline points="19 12 5 12"/><polyline points="11 6 5 12 11 18"/>',
    consult: '<path d="M4 20 V8"/><path d="M4 8 C4 4 12 4 12 8 C12 12 20 12 20 8 V20"/><path d="M12 8 V20"/>',
    execute: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/><path d="M10 7 H14 C16 7 17 8 17 10 V14"/>',
    proof: '<path d="M7 3 h8 l5 5 v13 H7 z"/><path d="M15 3 v5 h5"/><path d="M10 13 h6"/><path d="M10 17 h4"/>',
    insight: '<path d="M8 4 h8 v12 H8 z"/><path d="M10 8 h4"/><path d="M10 12 h3"/><path d="M9 20 h6"/>',
    sector: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    mail: '<rect x="3" y="6" width="18" height="12"/><path d="M3 7 l9 7 9-7"/>',
    phone: '<path d="M7 3 h4 l1 4 -3 2 c1 3 4 6 7 7 l2-3 4 1 v4 c-7 1-16-8-15-15 z"/>',
    more: '<circle cx="6" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.2" fill="currentColor" stroke="none"/>'
  };

  function icon(name, cls = "icon") {
    const rtl = state.lang === "ar" && name === "arrow";
    const d = ICONS[rtl ? "arrowRtl" : name] || ICONS.arrow;
    return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  }
  function t(key) { return (EM.I18N[state.lang] && EM.I18N[state.lang][key]) || key; }
  function loc(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] ?? obj.en ?? obj.ar ?? "";
  }
  function copy(group, key) {
    const src = EM.COPY[group];
    return src && src[key] ? loc(src[key]) : "";
  }
  function caseName(item) {
    return EM.CONFIG.anonymizeCases ? loc(item.anonymousName) : loc(item.publicName);
  }
  function capabilityLabel(href) {
    const [file, hash] = href.split("#");
    const list = file.includes("execution") ? EM.EXECUTION : EM.CONSULTING;
    const item = list.find((entry) => entry.id === hash);
    return item ? loc(item.title) : t("relatedCapabilities");
  }
  function featuredCase() {
    return EM.CASES.find((item) => item.id === "patchouli") || EM.CASES[0];
  }

  function frame({ href, iconName, title, text, kicker }) {
    const inner = `
      <span class="icon-well">${icon(iconName)}</span>
      <span>${kicker ? `<small class="kicker">${kicker}</small>` : ""}<h3>${title}</h3>${text ? `<p>${text}</p>` : ""}</span>
      ${icon("arrow", "icon icon-go")}`;
    if (href) return `<a class="frame" href="${href}">${inner}</a>`;
    return `<div class="frame">${inner}</div>`;
  }

  function go(href, label) {
    return `<a class="go" href="${href}"><span>${label}</span>${icon("arrow")}</a>`;
  }

  function dots() {
    return `<span class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;
  }

  function navItems() {
    return EM.NAV.filter((item) => item.id !== "home" && item.id !== "contact");
  }

  function isCurrent(item) {
    return item.id === page || (page === "case" && item.id === "cases") || (page === "insight" && item.id === "insights");
  }

  function header() {
    const primary = navItems().map((item) =>
      `<a href="${item.href}"${isCurrent(item) ? ' aria-current="page"' : ""}>${loc(item)}</a>`
    ).join("");
    return `
      <div class="ambient" aria-hidden="true"><div class="drift drift-a"></div><div class="drift drift-b"></div></div>
      <header class="topbar">
        <div class="shell nav">
          <a class="brand" href="index.html" aria-label="Elite Maison">
            <span class="brand__well"><img src="assets/images/logo-mark.png" alt=""></span>
            <span class="brand__name">Elite Maison</span>
          </a>
          <nav class="nav__primary" aria-label="${t("navLabel")}">${primary}</nav>
          <div class="nav__tools">
            <button type="button" class="lang-btn" id="languageToggle" aria-label="${t("langTo")}">${t("langBtn")}</button>
            <a class="btn btn--gold" href="contact.html">${t("bookShort")}</a>
            <button type="button" class="nav__menu" id="menuToggle" aria-expanded="false" aria-controls="drawer" aria-label="${t("menuOpen")}">
              <span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>
            </button>
          </div>
        </div>
      </header>
      <dialog class="drawer" id="drawer" aria-labelledby="drawerTitle">
        <h2 id="drawerTitle" class="sr-only">${t("navLabel")}</h2>
        <nav aria-label="${t("navLabel")}">
          ${navItems().map((item) => `<a href="${item.href}">${loc(item)}</a>`).join("")}
        </nav>
        <a class="btn btn--gold" href="contact.html">${t("bookCta")} ${icon("arrow")}</a>
      </dialog>`;
  }

  function footer() {
    const c = EM.CONFIG.contact;
    const links = navItems().map((item) => `<a href="${item.href}">${loc(item)}</a>`).join("");
    return `
      <footer class="footer">
        <div class="shell">
          <div class="footer__grid">
            <div>
              <div class="footer__lockup">
                <img class="footer__mark" src="assets/images/logo-lockup.png" alt="Elite Maison Marketing Consultancies">
              </div>
              <p>${t("footerText")}</p>
            </div>
            <nav class="footer-nav" aria-label="${t("footerNav")}">${links}</nav>
          </div>
          <div class="footer-meta">
            <span>© 2026 Elite Maison</span>
            <span>${c.email} · ${c.phone}</span>
          </div>
        </div>
      </footer>`;
  }

  function cta({ title, href, label, tone, kicker }) {
    const cls = tone === "strong" ? "section section--plum" : "section section--sand";
    return `<section class="${cls}"><div class="shell cta-band">
      <div class="head">
        ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
        <h2>${title}</h2>
      </div>
      <a class="btn btn--gold" href="${href}">${label} ${icon("arrow")}</a>
    </div></section>`;
  }

  function heroPortal() {
    const accent = copy("home", "accent");
    const title = accent
      ? `${copy("home", "title")} <span class="accent">${accent}</span>`
      : copy("home", "title");
    return `
      <header class="hero hero-home">
        <div class="shell hero__grid">
          <div class="hero-seq">
            <p class="kicker" dir="ltr">${copy("home", "eyebrow")}</p>
            <h1>${title}</h1>
            <p class="lead">${copy("home", "lead")}</p>
            <div class="hero-actions">
              <a class="btn btn--gold" href="contact.html">${t("bookCta")} ${icon("arrow")}</a>
              ${go("cases.html", t("exploreProof"))}
            </div>
            <div class="proof-bar" aria-label="${t("proofBar")}">
              <div><strong class="accent">18+</strong><span>${copy("home", "years")}</span></div>
              <div><strong>GCC</strong><span>${copy("home", "markets")}</span></div>
            </div>
          </div>
          <div class="hero-media">
            <figure class="logo-chamber">
              <span class="logo-chamber__arch" aria-hidden="true"></span>
              <img src="assets/images/logo-lockup.png" width="1085" height="685" alt="Elite Maison Marketing Consultancies">
              <div class="logo-chamber__base">
                ${dots()}
                <p class="kicker">${copy("home", "methodChip")}</p>
                <p>${copy("home", "methodLine")}</p>
              </div>
            </figure>
          </div>
        </div>
      </header>`;
  }

  function renderHome() {
    const labels = [
      { ar: "الاتجاه", en: "Direction" },
      { ar: "الإيراد", en: "Revenue" },
      { ar: "التوسع", en: "Expansion" }
    ];
    const situations = EM.CHALLENGES.slice(0, 3).map((item, i) => `
      <a href="${item.href}">
        <span class="num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${loc(labels[i])}</h3>
        <p>${loc({ ar: item.ar, en: item.en })}</p>
        <span class="go"><span>${loc(item.dest)}</span>${icon("arrow")}</span>
      </a>`).join("");
    return `
      ${heroPortal()}
      <section class="section section--glass">
        <div class="shell">
          <div class="head">
            <p class="kicker">${copy("home", "challengesEyebrow")}</p>
            <h2 data-reveal="clip">${copy("home", "challengesTitle")}</h2>
            <p class="intro">${copy("home", "challengesText")}</p>
          </div>
          <div class="challenge-grid">${situations}</div>
        </div>
      </section>
      <section class="section">
        <div class="shell">
          <div class="head">
            <p class="kicker">${copy("home", "capEyebrow")}</p>
            <h2 data-reveal="clip">${copy("home", "capTitle")}</h2>
          </div>
          <div class="paths">
            <a class="path" href="consulting.html">
              <h3>${loc({ ar: "الاستشارات", en: "Consulting" })}</h3>
              <p>${copy("home", "consultingPreview")}</p>
              <span class="go"><span>${t("exploreCta")}</span>${icon("arrow")}</span>
            </a>
            <a class="path" href="execution.html">
              <h3>${loc({ ar: "الحلول التنفيذية", en: "Execution solutions" })}</h3>
              <p>${copy("home", "executionPreview")}</p>
              <span class="go"><span>${t("exploreExecution")}</span>${icon("arrow")}</span>
            </a>
          </div>
        </div>
      </section>
      ${cta({
        kicker: copy("home", "closeEyebrow"),
        title: copy("home", "closeTitle"),
        href: "contact.html",
        label: t("bookCta"),
        tone: "sand"
      })}`;
  }

  function renderAbout() {
    const bands = EM.ABOUT.map((block, i) => `
      <article class="frame" data-reveal="rise" style="animation-delay:${i * 60}ms">
        <span class="icon-well">${icon("consult")}</span>
        <span><h3>${loc(block.title)}</h3><p>${loc(block.text)}</p></span>
      </article>`).join("");
    const pillars = EM.PILLARS.map((item) => `
      <article><p class="kicker">${loc({ ar: item.ar, en: item.en })}</p><hr class="gold-rule"><p>${loc(item.text)}</p></article>`).join("");
    const method = EM.METHOD.map((step, i) => `
      <article data-reveal="rise">
        <div class="step-num">${String(i + 1).padStart(2, "0")}</div>
        <h3>${loc({ ar: step.ar.title, en: step.en.title })}</h3>
        <p>${loc({ ar: step.ar.text, en: step.en.text })}</p>
      </article>`).join("");
    const engage = EM.ENGAGE.map((item) => frame({
      href: "contact.html",
      iconName: "consult",
      kicker: item.kicker,
      title: loc(item.title),
      text: loc(item.text)
    })).join("");
    return `
      <header class="hero hero-quiet">
        <div class="shell hero-seq">
          <p class="kicker">${copy("about", "eyebrow")}</p>
          <h1>${copy("about", "title")}</h1>
          <p class="lead">${copy("about", "lead")}</p>
        </div>
      </header>
      <section class="section section--ivory surface-light">
        <div class="shell">
          <p class="kicker">${copy("about", "whoEyebrow")}</p>
          <hr class="gold-rule">
          <div class="head">
            <h2>${copy("about", "whoTitle")}</h2>
            <p class="intro">${copy("about", "whoText")}</p>
          </div>
          <div class="stack">${bands}</div>
        </div>
      </section>
      <section class="section section--ink">
        <div class="shell">
          <p class="kicker">Four I's. One Vision.</p>
          <hr class="gold-rule">
          <h2>${copy("about", "pillarsTitle")}</h2>
          <div class="method" style="margin-top:2rem">${pillars}</div>
        </div>
      </section>
      <section class="section section--ivory surface-light">
        <div class="shell">
          <p class="kicker">${copy("about", "methodEyebrow")}</p>
          <hr class="gold-rule">
          <h2>${copy("about", "methodTitle")}</h2>
          <p class="intro">${copy("about", "methodText")}</p>
          <div class="method" style="margin-top:2rem">${method}</div>
        </div>
      </section>
      <section class="section section--ivory surface-light section--tight">
        <div class="shell">
          <p class="kicker">${copy("about", "engageEyebrow")}</p>
          <hr class="gold-rule">
          <h2>${copy("about", "engageTitle")}</h2>
          <div class="stack" style="margin-top:1.5rem">${engage}</div>
        </div>
      </section>
      ${cta({ title: copy("about", "ctaTitle"), href: "consulting.html", label: t("exploreCta") })}`;
  }

  function relatedFor(id, kind) {
    const cases = (EM.CASE_LINKS && EM.CASE_LINKS[id] || [])
      .map((cid) => EM.CASES.find((c) => c.id === cid)).filter(Boolean);
    const path = EM.RELATED_PATHS && EM.RELATED_PATHS[id];
    let html = "";
    if (path) {
      const label = kind === "consult" ? t("relatedExecution") : t("relatedConsulting");
      html += frame({ href: path, iconName: kind === "consult" ? "execute" : "consult", title: `${label}: ${capabilityLabel(path)}` });
    }
    cases.forEach((item) => {
      html += frame({ href: `case.html?id=${item.id}`, iconName: "proof", title: `${t("relatedCase")}: ${caseName(item)}` });
    });
    return html ? `<div class="related">${html}</div>` : "";
  }

  function renderConsulting() {
    const flow = EM.CONSULTING_FLOW.map((step, i) => `<article><span>${String(i + 1).padStart(2, "0")}</span><h3>${loc(step)}</h3></article>`).join("");
    const desktop = desktopQ.matches;
    const index = EM.CONSULTING.map((item, i) =>
      `<a href="#${item.id}" data-target="${item.id}" class="${i === 0 ? "is-active" : ""}"><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${loc(item.title)}</span></a>`
    ).join("");
    const stack = EM.CONSULTING.map((item, i) => {
      const n = String(i + 1).padStart(2, "0");
      const facts = [["challenge", item.challenge], ["objective", item.objective], ["scope", item.scope], ["measure", item.measure]]
        .map(([k, v]) => `<div><dt>${t(k)}</dt><dd>${loc(v)}</dd></div>`).join("");
      return `<article class="block" id="${item.id}">
        <button class="acc" type="button" aria-expanded="${desktop || i === 0}" aria-controls="${item.id}-body">${n} · ${loc(item.title)}</button>
        <div id="${item.id}-body" ${!desktop && i !== 0 ? "hidden" : ""}>
          <h2>${loc(item.title)}</h2>
          <dl class="facts">${facts}</dl>
          ${relatedFor(item.id, "consult")}
        </div>
      </article>`;
    }).join("");
    return `
      <header class="hero hero-system">
        <div class="shell hero-seq">
          <p class="kicker">${copy("consulting", "eyebrow")}</p>
          <h1>${copy("consulting", "title")}</h1>
          <p class="lead">${copy("consulting", "lead")}</p>
        </div>
      </header>
      <section class="section section--ivory surface-light section--tight">
        <div class="shell">
          <p class="kicker">${copy("consulting", "flowLabel")}</p>
          <hr class="gold-rule">
          <div class="flow">${flow}</div>
        </div>
      </section>
      <section class="section section--ivory surface-light">
        <div class="shell split">
          <nav class="index" id="serviceIndex" aria-label="${t("serviceNav")}">${index}</nav>
          <div id="serviceStack">${stack}</div>
        </div>
      </section>
      ${cta({ title: copy("consulting", "ctaTitle"), href: "execution.html", label: t("exploreExecution") })}`;
  }

  function renderExecution() {
    const chain = EM.EXECUTION_CHAIN.map((step, i) => `<article><span>${String(i + 1).padStart(2, "0")}</span><h3>${loc(step)}</h3></article>`).join("");
    const mods = EM.EXECUTION.map((item, i) => {
      const facts = [["bizObjective", item.objective], ["execScope", item.scope], ["impact", item.impact], ["metrics", item.metrics]]
        .map(([k, v]) => `<div><dt>${t(k)}</dt><dd>${loc(v)}</dd></div>`).join("");
      return `<section class="exec-mod" id="${item.id}">
        <div class="exec-inner shell">
          <div class="exec-num">${String(i + 1).padStart(2, "0")}</div>
          <div><h2>${loc(item.title)}</h2></div>
          <dl class="facts">${facts}</dl>
        </div>
        <div class="shell">${relatedFor(item.id, "exec")}</div>
      </section>`;
    }).join("");
    return `
      <header class="hero hero-system">
        <div class="shell hero-seq">
          <p class="kicker">${copy("execution", "eyebrow")}</p>
          <h1>${copy("execution", "title")}</h1>
          <p class="lead">${copy("execution", "lead")}</p>
        </div>
      </header>
      <section class="section section--ink section--tight">
        <div class="shell">
          <p class="kicker">${copy("execution", "chainLabel")}</p>
          <hr class="gold-rule">
          <div class="chain">${chain}</div>
        </div>
      </section>
      ${mods}
      ${cta({ title: copy("execution", "ctaTitle"), href: "sectors.html", label: t("exploreSectors") })}`;
  }

  function sectorPanel(item) {
    const facts = [
      [t("context"), item.context],
      [state.lang === "ar" ? "تحديات شائعة" : "Common challenges", item.challenges],
      [state.lang === "ar" ? "أولويات تجارية" : "Commercial priorities", item.priorities]
    ].map(([l, v]) => `<article><h3>${l}</h3><p>${loc(v)}</p></article>`).join("");
    const links = item.capabilities.map((href) => frame({
      href, iconName: href.includes("execution") ? "execute" : "consult", title: capabilityLabel(href)
    })).join("");
    const cases = (EM.CASE_LINKS[item.id] || []).map((id) => EM.CASES.find((c) => c.id === id)).filter(Boolean)
      .map((c) => frame({ href: `case.html?id=${c.id}`, iconName: "proof", title: caseName(c) })).join("");
    return `<h2>${loc(item.title)}</h2><div class="stack" style="margin-top:1.5rem">${facts}</div><div class="related">${links}${cases}</div>`;
  }

  function renderSectors() {
    const hash = location.hash.slice(1);
    const current = EM.SECTORS.find((s) => s.id === hash) || EM.SECTORS[0];
    const index = EM.SECTORS.map((item, i) =>
      `<button type="button" data-id="${item.id}" class="${item.id === current.id ? "is-active" : ""}" ${item.id === current.id ? 'aria-current="true"' : ""}>
        <span class="num">${String(i + 1).padStart(2, "0")}</span><span>${loc(item.title)}</span>
      </button>`
    ).join("");
    return `
      <header class="hero hero-system">
        <div class="shell hero-seq">
          <p class="kicker">${copy("sectors", "eyebrow")}</p>
          <h1>${copy("sectors", "title")}</h1>
          <p class="lead">${copy("sectors", "lead")}</p>
        </div>
      </header>
      <section class="section section--ivory surface-light">
        <div class="shell split">
          <nav class="index" id="sectorIndex" aria-label="${t("sectorNav")}">${index}</nav>
          <div id="sectorPanel">${sectorPanel(current)}</div>
        </div>
      </section>
      ${cta({ title: copy("sectors", "ctaTitle"), href: "cases.html", label: t("exploreCases") })}`;
  }

  function renderCases() {
    const featured = featuredCase();
    const rest = EM.CASES.filter((c) => c.id !== featured.id).map((item) => frame({
      href: `case.html?id=${item.id}`,
      iconName: "proof",
      title: caseName(item),
      text: loc(item.result)
    })).join("");
    return `
      <header class="hero hero-story">
        <div class="shell hero-seq">
          <p class="kicker">${copy("cases", "eyebrow")}</p>
          <h1>${copy("cases", "title")}</h1>
          <p class="lead">${copy("cases", "lead")}</p>
        </div>
      </header>
      <section class="section section--ivory surface-light">
        <div class="shell">
          <div class="feature">
            <div data-reveal="clip">
              <p class="kicker">${t("featured")}</p>
              <hr class="gold-rule">
              <h2>${caseName(featured)}</h2>
              <p class="intro">${loc(featured.challenge)}</p>
            </div>
            <div>
              <dl class="beats"><dt>${t("result")}</dt><dd>${loc(featured.result)}</dd><dt>${t("proof")}</dt><dd>${loc(featured.proof)}</dd></dl>
              ${frame({ href: `case.html?id=${featured.id}`, iconName: "proof", title: t("viewCase") })}
            </div>
          </div>
          <div class="stack" style="margin-top:2rem">${rest}</div>
        </div>
      </section>
      ${cta({ title: copy("cases", "ctaTitle"), href: "insights.html", label: t("exploreInsights") })}`;
  }

  function renderCaseDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const item = EM.CASES.find((c) => c.id === id);
    if (!item) {
      return `<div class="not-found shell"><h1>${t("notFound")}</h1><div class="related">${frame({ href: "index.html", iconName: "consult", title: t("backHome") })}</div></div>`;
    }
    const idx = EM.CASES.indexOf(item);
    const next = EM.CASES[(idx + 1) % EM.CASES.length];
    const sector = EM.SECTORS.find((s) => s.id === item.sector);
    document.title = `${caseName(item)} | Elite Maison`;
    const beats = [["challenge", item.challenge], ["strategy", item.strategy], ["execution", item.execution], ["result", item.result], ["proof", item.proof]]
      .map(([k, v]) => `<article><h2>${t(k)}</h2><p>${loc(v)}</p></article>`).join("");
    const related = item.related.map((href) => frame({
      href, iconName: href.includes("execution") ? "execute" : "consult", title: capabilityLabel(href)
    })).join("");
    return `
      <div class="crumb"><div class="shell"><span>${t("homeCrumb")}</span><span>/</span><span>${loc({ ar: "قصص النجاح", en: "Case studies" })}</span><span>/</span><span>${caseName(item)}</span></div></div>
      <header class="hero hero-story">
        <div class="shell hero-seq">
          <p class="kicker">${sector ? loc(sector.title) : t("challenge")}</p>
          <h1>${caseName(item)}</h1>
          <p class="lead">${loc(item.challenge)}</p>
        </div>
      </header>
      <section class="section section--ivory surface-light story">
        <div class="shell">${beats}<div class="related">${related}${frame({ href: `case.html?id=${next.id}`, iconName: "proof", title: `${t("nextCase")}: ${caseName(next)}` })}</div></div>
      </section>
      ${cta({ title: t("startConversation"), href: "contact.html", label: t("bookCta"), tone: "strong" })}`;
  }

  function renderInsights() {
    const params = new URLSearchParams(location.search);
    state.topic = params.get("topic") || "all";
    const topics = [];
    EM.INSIGHTS.forEach((item) => {
      const label = loc(item.topic);
      if (!topics.some((x) => x.id === item.topic.en)) topics.push({ id: item.topic.en, label });
    });
    const items = state.topic === "all" ? EM.INSIGHTS : EM.INSIGHTS.filter((i) => i.topic.en === state.topic);
    const filters = [`<button type="button" class="filter" data-topic="all" aria-pressed="${state.topic === "all"}">${t("filterAll")}</button>`]
      .concat(topics.map((tp) => `<button type="button" class="filter" data-topic="${tp.id}" aria-pressed="${state.topic === tp.id}">${tp.label}</button>`)).join("");
    const list = items.length
      ? items.map((item, i) => frame({
        href: `insight.html?id=${item.id}`,
        iconName: "insight",
        kicker: loc(item.format),
        title: loc(item.title),
        text: i === 0 ? loc(item.summary) : ""
      })).join("")
      : `<p>${t("noInsights")}</p>`;
    return `
      <header class="hero hero-quiet">
        <div class="shell hero-seq">
          <p class="kicker">${copy("insights", "eyebrow")}</p>
          <h1>${copy("insights", "title")}</h1>
          <p class="lead">${copy("insights", "lead")}</p>
        </div>
      </header>
      <section class="section section--ivory surface-light">
        <div class="shell library">
          <aside class="rail" id="insightFilters" role="toolbar" aria-label="${t("insightTopics")}">${filters}</aside>
          <div class="stack">${list}</div>
        </div>
      </section>
      ${cta({ title: copy("insights", "ctaTitle"), href: "contact.html", label: t("bookCta"), tone: "strong" })}`;
  }

  function renderInsightDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const item = EM.INSIGHTS.find((i) => i.id === id);
    if (!item) {
      return `<div class="not-found shell"><h1>${t("notFound")}</h1><div class="related">${frame({ href: "index.html", iconName: "consult", title: t("backHome") })}</div></div>`;
    }
    document.title = `${loc(item.title)} | Elite Maison`;
    const body = item.sections.map((sec) => `<article><h2>${loc(sec.heading)}</h2><p>${loc(sec.text)}</p></article>`).join("");
    const related = item.cta ? frame({
      href: item.cta,
      iconName: "consult",
      title: `${t("relatedConsulting")}: ${capabilityLabel(item.cta)}`
    }) : "";
    return `
      <div class="crumb"><div class="shell"><span>${t("homeCrumb")}</span><span>/</span><span>${loc({ ar: "الرؤى", en: "Insights" })}</span><span>/</span><span>${loc(item.title)}</span></div></div>
      <header class="hero hero-quiet">
        <div class="shell hero-seq">
          <p class="kicker">${loc(item.format)} · ${loc(item.topic)}</p>
          <h1>${loc(item.title)}</h1>
          <p class="lead">${loc(item.summary)}</p>
        </div>
      </header>
      <section class="section section--ivory surface-light story">
        <div class="shell">${body}<div class="related">${related}${frame({ href: "contact.html", iconName: "consult", title: t("bookCta") })}</div></div>
      </section>`;
  }

  function renderContact() {
    const c = EM.CONFIG.contact;
    const industries = [`<option value="">${t("chooseOption")}</option>`]
      .concat(EM.INDUSTRIES.map((o) => `<option value="${o.en}">${loc(o)}</option>`)).join("");
    return `
      <header class="hero hero-hush">
        <div class="shell hero-seq">
          <p class="kicker">${copy("contact", "eyebrow")}</p>
          <h1>${copy("contact", "question") || copy("contact", "title")}</h1>
          <p class="lead">${copy("contact", "lead")}</p>
        </div>
      </header>
      <section class="section section--ivory surface-light">
        <div class="shell contact-grid">
          <aside>
            <p class="hint" id="consultHint">${copy("contact", "consultHint")}</p>
            <p class="hint" id="inquiryHint" hidden>${copy("contact", "inquiryHint")}</p>
            <p class="hint">${t("contactTime")}</p>
            <div class="meta-list">
              <a href="mailto:${c.email}">${icon("mail")}<span>${c.email}</span></a>
              <a href="${c.phoneHref}">${icon("phone")}<span>${c.phone}</span></a>
            </div>
          </aside>
          <form id="consultationForm" novalidate>
            <div id="errorSummary" class="error-summary" role="alert" tabindex="-1" hidden></div>
            <input type="hidden" id="leadType" name="leadType" value="consultation">
            <fieldset>
              <legend>${t("pathLabel")}</legend>
              <div class="path-switch" role="group" aria-label="${t("pathLabel")}">
                <button type="button" class="path-btn" id="pathConsultation" aria-pressed="true">${t("consultationPath")}</button>
                <button type="button" class="path-btn" id="pathInquiry" aria-pressed="false">${t("inquiryPath")}</button>
              </div>
            </fieldset>
            <div class="form-grid">
              <div class="field"><label for="name">${t("nameLabel")}</label><input id="name" name="name" autocomplete="name" required aria-describedby="nameError"><p class="error" id="nameError"></p></div>
              <div class="field"><label for="email">${t("emailLabel")}</label><input id="email" name="email" type="email" autocomplete="email" required aria-describedby="emailError"><p class="error" id="emailError"></p></div>
              <div class="field"><label for="phone">${t("phoneLabel")} <span class="optional">${t("optional")}</span></label><input id="phone" name="phone" type="tel" autocomplete="tel" aria-describedby="phoneError"><p class="error" id="phoneError"></p></div>
              <div class="field"><label for="company">${t("companyLabel")}</label><input id="company" name="company" autocomplete="organization" required aria-describedby="companyError"><p class="error" id="companyError"></p></div>
              <div class="field" id="industryField"><label for="industry">${t("industryLabel")}</label><select id="industry" name="industry" required aria-describedby="industryError">${industries}</select><p class="error" id="industryError"></p></div>
              <div class="field" id="marketField"><label for="market">${t("marketLabel")}</label><input id="market" name="market" required aria-describedby="marketError"><p class="error" id="marketError"></p></div>
              <div class="field field--full" id="challengeField"><label for="challenge">${t("challengeLabel")}</label><textarea id="challenge" name="challenge" required aria-describedby="challengeError"></textarea><p class="error" id="challengeError"></p></div>
              <div class="field field--full" id="outcomeField"><label for="outcome">${t("outcomeLabel")}</label><textarea id="outcome" name="outcome" required aria-describedby="outcomeError"></textarea><p class="error" id="outcomeError"></p></div>
              <div class="field field--full" id="timelineField"><label for="timeline">${t("startLabel")}</label>
                <select id="timeline" name="timeline" required aria-describedby="timelineError">
                  <option value="">${t("chooseOption")}</option>
                  <option value="now">${t("startNow")}</option>
                  <option value="soon">${t("startSoon")}</option>
                  <option value="explore">${t("startExplore")}</option>
                </select>
                <p class="error" id="timelineError"></p>
              </div>
              <div class="field field--full" id="inquiryField" hidden>
                <label for="inquiry">${t("inquiryLabel")}</label>
                <textarea id="inquiry" name="inquiry" aria-describedby="inquiryError"></textarea>
                <p class="error" id="inquiryError"></p>
              </div>
            </div>
            <button class="btn btn--gold" type="submit">${t("submitCta")} ${icon("arrow")}</button>
            <p class="form-status" id="formStatus" role="status" aria-live="polite" tabindex="-1" hidden></p>
          </form>
        </div>
      </section>`;
  }

  const PAGES = {
    home: renderHome,
    about: renderAbout,
    consulting: renderConsulting,
    execution: renderExecution,
    sectors: renderSectors,
    cases: renderCases,
    case: renderCaseDetail,
    insights: renderInsights,
    insight: renderInsightDetail,
    contact: renderContact
  };

  function observe() {
    $$(".gold-rule").forEach((n) => { if (reduced) n.classList.add("is-draw"); });
    if (reduced) {
      $$("[data-reveal]").forEach((n) => n.classList.add("is-visible"));
      return;
    }
    if (!revealObs) {
      revealObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          if (e.target.classList.contains("gold-rule")) e.target.classList.add("is-draw");
          revealObs.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    }
    $$("[data-reveal], .gold-rule").forEach((n) => revealObs.observe(n));
  }

  function bindConsulting() {
    if (page !== "consulting") return;
    const stack = $("#serviceStack");
    $$(".acc", stack).forEach((btn) => {
      btn.addEventListener("click", () => {
        if (desktopQ.matches) return;
        const body = document.getElementById(btn.getAttribute("aria-controls"));
        const open = body.hidden;
        $$(".block > div", stack).forEach((el) => { el.hidden = true; });
        $$(".acc", stack).forEach((b) => b.setAttribute("aria-expanded", "false"));
        if (open) { body.hidden = false; btn.setAttribute("aria-expanded", "true"); }
      });
    });
    if (spy) { spy.disconnect(); spy = null; }
    if (desktopQ.matches) {
      const links = $$("#serviceIndex a");
      spy = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("is-active", a.dataset.target === e.target.id));
        });
      }, { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 });
      $$(".block").forEach((b) => spy.observe(b));
      const hash = location.hash.slice(1);
      if (hash) document.getElementById(hash)?.scrollIntoView();
    }
  }

  function bindSectors() {
    if (page !== "sectors") return;
    const panel = $("#sectorPanel");
    $$("#sectorIndex button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = EM.SECTORS.find((s) => s.id === btn.dataset.id);
        $$("#sectorIndex button").forEach((b) => {
          b.classList.toggle("is-active", b === btn);
          if (b === btn) b.setAttribute("aria-current", "true");
          else b.removeAttribute("aria-current");
        });
        panel.innerHTML = sectorPanel(item);
        history.replaceState({}, "", `#${item.id}`);
      });
    });
  }

  function bindInsights() {
    if (page !== "insights") return;
    $$("#insightFilters .filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.topic;
        const url = new URL(location.href);
        if (id === "all") url.searchParams.delete("topic");
        else url.searchParams.set("topic", id);
        history.replaceState({}, "", url);
        paint();
      });
    });
  }

  function setLead(type) {
    state.lead = type;
    const consult = type === "consultation";
    $("#leadType").value = type;
    $("#pathConsultation")?.setAttribute("aria-pressed", String(consult));
    $("#pathInquiry")?.setAttribute("aria-pressed", String(!consult));
    if ($("#consultHint")) $("#consultHint").hidden = !consult;
    if ($("#inquiryHint")) $("#inquiryHint").hidden = consult;
    ["industryField", "marketField", "challengeField", "outcomeField", "timelineField"].forEach((id) => {
      const field = document.getElementById(id);
      if (!field) return;
      field.hidden = !consult;
      $$("input, select, textarea", field).forEach((i) => { i.required = consult; });
    });
    const iq = $("#inquiryField");
    if (iq) {
      iq.hidden = consult;
      if ($("#inquiry")) $("#inquiry").required = !consult;
    }
    const submit = $('#consultationForm button[type="submit"]');
    if (submit) submit.lastChild && (submit.childNodes[0].textContent = t(consult ? "submitCta" : "submitInquiryCta") + " ");
  }

  function bindContact() {
    if (page !== "contact") return;
    $("#pathConsultation")?.addEventListener("click", () => setLead("consultation"));
    $("#pathInquiry")?.addEventListener("click", () => setLead("inquiry"));
    $("#consultationForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const errors = [];
      $$(".error", form).forEach((n) => { n.textContent = ""; });
      $$("[aria-invalid]", form).forEach((n) => n.removeAttribute("aria-invalid"));
      $$("input, select, textarea", form).forEach((input) => {
        if (input.disabled || input.closest("[hidden]")) return;
        let msg = "";
        if (input.required && !String(input.value).trim()) msg = t("required");
        else if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) msg = t("invalidEmail");
        if (msg) {
          input.setAttribute("aria-invalid", "true");
          const err = document.getElementById(`${input.id}Error`);
          if (err) err.textContent = msg;
          const lab = document.querySelector(`label[for="${input.id}"]`);
          errors.push({ id: input.id, label: lab ? lab.innerText.trim() : input.id, message: msg });
        }
      });
      const box = $("#errorSummary");
      if (box) {
        box.innerHTML = "";
        if (!errors.length) box.hidden = true;
        else {
          box.innerHTML = `<h2 id="errorSummaryTitle">${t("errorSummary")}</h2><ul>${errors.map((x) => `<li><a href="#${x.id}">${x.label}: ${x.message}</a></li>`).join("")}</ul>`;
          box.hidden = false;
          box.querySelectorAll("a").forEach((a) => a.addEventListener("click", (ev) => {
            ev.preventDefault();
            document.getElementById(a.getAttribute("href").slice(1))?.focus();
          }));
          box.focus();
          return;
        }
      }
      const status = $("#formStatus");
      const submit = form.querySelector('button[type="submit"]');
      if (submit) { submit.setAttribute("aria-busy", "true"); submit.disabled = true; }
      status.hidden = false;
      status.textContent = t("prototypeOk");
      status.focus();
      if (submit) { submit.removeAttribute("aria-busy"); submit.disabled = false; }
    });
    setLead(state.lead);
  }

  function setMenu(open) {
    const drawer = $("#drawer");
    const btn = $("#menuToggle");
    if (!drawer || !btn) return;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", t(open ? "menuClose" : "menuOpen"));
    document.body.classList.toggle("nav-open", open);
    if (open) {
      state.lastFocus = document.activeElement;
      if (!drawer.open) drawer.showModal();
    } else if (drawer.open) {
      drawer.close();
    }
  }

  function bindChrome() {
    const drawer = $("#drawer");
    $("#menuToggle")?.addEventListener("click", () => setMenu(!drawer?.open));
    drawer?.addEventListener("close", () => {
      document.body.classList.remove("nav-open");
      $("#menuToggle")?.setAttribute("aria-expanded", "false");
      $("#menuToggle")?.setAttribute("aria-label", t("menuOpen"));
      state.lastFocus?.focus();
    });
    drawer?.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    $("#languageToggle")?.addEventListener("click", () => {
      state.lang = state.lang === "ar" ? "en" : "ar";
      try { localStorage.setItem(EM.CONFIG.storageKey, state.lang); } catch { /* ignore */ }
      paint();
    });
    $(".skip-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      $("#main")?.focus();
    });
  }

  function bindSticky() {
    const bar = $(".topbar");
    const progress = $(".progress");
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      bar?.classList.toggle("is-solid", y > 24);
      if (!reduced && !$(".drawer")?.open) {
        if (y > last && y > 88) bar?.classList.add("is-compact");
        else if (y < last) bar?.classList.remove("is-compact");
      }
      last = y;
      if (progress && !reduced) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function paint() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    const meta = EM.PAGES[page];
    if (meta) {
      document.title = loc(meta.title);
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", loc(meta.description));
    }
    const skip = $(".skip-link");
    if (skip) skip.textContent = t("skip");
    $("#site-header").innerHTML = header();
    $("#view").innerHTML = (PAGES[page] || renderHome)();
    $("#site-footer").innerHTML = footer();
    bindChrome();
    bindConsulting();
    bindSectors();
    bindInsights();
    bindContact();
    observe();
    const hash = location.hash.slice(1);
    if (hash && page !== "sectors") document.getElementById(hash)?.scrollIntoView();
  }

  function init() {
    document.documentElement.classList.add("js");
    const urlLang = new URLSearchParams(location.search).get("lang");
    let saved = null;
    try { saved = localStorage.getItem(EM.CONFIG.storageKey); } catch { /* ignore */ }
    if (urlLang === "en" || urlLang === "ar") {
      state.lang = urlLang;
      try { localStorage.setItem(EM.CONFIG.storageKey, urlLang); } catch { /* ignore */ }
    } else if (saved === "en" || saved === "ar") state.lang = saved;
    paint();
    bindSticky();
    if (desktopQ.addEventListener) desktopQ.addEventListener("change", () => { if (page === "consulting") paint(); });
    reducedQ.addEventListener?.("change", (e) => { reduced = e.matches; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
