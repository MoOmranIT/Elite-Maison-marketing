/* Elite Maison — bilingual content. Source-backed only. Do not invent clients, metrics, or contact details. */
window.EM = window.EM || {};

EM.CONFIG = {
  anonymizeCases: false,
  storageKey: "em-lang",
  contact: {
    email: "ceo@elitemaisonmarketing.com",
    phone: "+971 55 540 0705",
    phoneHref: "tel:+971555400705",
    website: "https://www.elitemaisonmarketing.com",
    websiteLabel: "www.elitemaisonmarketing.com"
  }
};

EM.NAV_PRIMARY = [
  { href: "about.html", id: "about", ar: "من نحن", en: "About" },
  { href: "consulting.html", id: "consulting", ar: "الاستشارات", en: "Consulting" },
  { href: "cases.html", id: "cases", ar: "الدليل", en: "Proof" }
];

EM.NAV_MORE = [
  { href: "execution.html", id: "execution", icon: "execute", ar: "الحلول التنفيذية", en: "Execution" },
  { href: "sectors.html", id: "sectors", icon: "sector", ar: "خبرة القطاعات", en: "Sectors" },
  { href: "insights.html", id: "insights", icon: "insight", ar: "الرؤى", en: "Insights" }
];

EM.NAV = [
  { href: "index.html", id: "home", ar: "الرئيسية", en: "Home" },
  { href: "about.html", id: "about", ar: "من نحن", en: "About" },
  { href: "consulting.html", id: "consulting", ar: "الاستشارات", en: "Consulting" },
  { href: "execution.html", id: "execution", ar: "الحلول التنفيذية", en: "Execution" },
  { href: "sectors.html", id: "sectors", ar: "القطاعات", en: "Sectors" },
  { href: "cases.html", id: "cases", ar: "قصص النجاح", en: "Case studies" },
  { href: "insights.html", id: "insights", ar: "الرؤى", en: "Insights" },
  { href: "contact.html", id: "contact", ar: "تواصل معنا", en: "Contact" }
];

EM.PAGER = {
  home: { prev: null, next: "about" },
  about: { prev: "home", next: "consulting" },
  consulting: { prev: "about", next: "execution" },
  execution: { prev: "consulting", next: "sectors" },
  sectors: { prev: "execution", next: "cases" },
  cases: { prev: "sectors", next: "insights" },
  insights: { prev: "cases", next: "contact" },
  contact: { prev: "insights", next: null }
};

EM.I18N = {
  ar: {
    skip: "تجاوز إلى المحتوى",
    navLabel: "التنقل الرئيسي",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
    langTo: "Switch to English",
    langBtn: "EN",
    bookCta: "احجز جلسة استشارية",
    bookShort: "احجز استشارة",
    exploreCta: "استكشف الاستشارات",
    exploreProof: "استكشف الدليل العملي",
    moreLabel: "المزيد",
    moreClose: "إغلاق",
    doorsLabel: "مساران",
    proofBar: "أساس الثقة",
    situationsLabel: "إن كان هذا وضعكم",
    exploreExecution: "استكشف الحلول التنفيذية",
    exploreSectors: "استكشف خبرة القطاعات",
    exploreCases: "عرض كل قصص النجاح",
    exploreInsights: "استكشف الرؤى",
    engageCta: "كيف نتعاون",
    footerNav: "التنقل",
    footerContact: "التواصل",
    footerText: "بيت استشاري للتأثير التسويقي والأثر التجاري.",
    navMore: "المزيد",
    prevPage: "السابق",
    nextPage: "التالي",
    homeCrumb: "الرئيسية",
    required: "يرجى تعبئة هذا الحقل.",
    invalidEmail: "أدخل بريدًا إلكترونيًا صالحًا.",
    prototypeOk: "تم التحقق من النموذج بنجاح. هذه نسخة تجريبية ولا يتم إرسال البيانات حاليًا.",
    validation: "يرجى مراجعة الحقول المطلوبة.",
    filterAll: "الكل",
    noInsights: "لا توجد رؤى لهذا الموضوع في هذه النسخة التجريبية.",
    photoNote: "مساحة تصوير معتمدة — قيادات حقيقية، إضاءة معمارية، وتفاصيل العمل الاستراتيجي. بانتظار أصول معتمدة.",
    viewCase: "اقرأ القصة",
    readInsight: "اقرأ الرؤية",
    related: "مرتبط",
    relatedCapabilities: "قدرات ذات صلة",
    nextCase: "القصة التالية",
    relatedInsights: "رؤى ذات صلة",
    startConversation: "ابدأ الحوار",
    objective: "الهدف",
    scope: "النطاق",
    role: "الدور",
    measure: "مفهوم القياس",
    bizObjective: "الهدف التجاري",
    execScope: "نطاق التنفيذ",
    impact: "الأثر المتوقع",
    metrics: "مؤشرات القياس",
    challenge: "التحدي",
    strategy: "الاستراتيجية",
    execution: "التنفيذ",
    result: "النتيجة",
    proof: "الدليل",
    context: "السياق",
    sectorLabel: "القطاع",
    optional: "(اختياري)",
    chooseOption: "اختر",
    consultationPath: "احجز جلسة استشارية",
    inquiryPath: "أرسل استفسارًا",
    pathLabel: "مسار التواصل",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني للعمل",
    phoneLabel: "الهاتف / واتساب",
    companyLabel: "اسم الشركة",
    industryLabel: "القطاع",
    marketLabel: "الدولة / السوق",
    challengeLabel: "التحدي الرئيسي",
    outcomeLabel: "الهدف التجاري المطلوب",
    startLabel: "متى ترغب بالبدء؟",
    inquiryLabel: "الاستفسار",
    startNow: "خلال شهر",
    startSoon: "خلال 1–3 أشهر",
    startExplore: "أستكشف الخيارات",
    submitCta: "ناقش الفرصة مع مستشار",
    submitInquiryCta: "أرسل الاستفسار",
    contactTime: "في الإنتاج: رسالة تأكيد، الخطوة التالية، وإطار زمني متوقع للرد.",
    serviceNav: "فهرس الخدمات",
    sectorNav: "فهرس القطاعات",
    insightTopics: "مواضيع الرؤى",
    caseIndex: "فهرس القصص",
    notFound: "هذه الصفحة غير متاحة في النموذج.",
    backHome: "العودة إلى الرئيسية",
    goPath: "انتقل إلى المسار",
    relatedCase: "قصة ذات صلة",
    relatedExecution: "حل تنفيذي مرتبط",
    relatedConsulting: "قدرة استشارية مرتبطة",
    errorSummary: "هناك حقول تحتاج مراجعة",
    progressLabel: "تقدم الصفحة",
    featured: "قصة بارزة",
    challengesNav: "اختيار التحدي",
    relatedExecution: "حل تنفيذي مرتبط",
    relatedConsulting: "قدرة استشارية مرتبطة",
    fourIs: "Four I's. One Vision."
  },
  en: {
    skip: "Skip to content",
    navLabel: "Primary navigation",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langTo: "التبديل إلى العربية",
    langBtn: "ع",
    bookCta: "Book a consultation",
    bookShort: "Book a session",
    exploreCta: "Explore consulting",
    exploreProof: "Explore the proof",
    moreLabel: "More",
    moreClose: "Close",
    doorsLabel: "Two paths",
    proofBar: "Grounds for trust",
    situationsLabel: "If this is your situation",
    exploreExecution: "Explore execution solutions",
    exploreSectors: "Explore sector experience",
    exploreCases: "View all case studies",
    exploreInsights: "Explore Insights",
    engageCta: "Ways to engage",
    footerNav: "Navigate",
    footerContact: "Contact",
    footerText: "A strategic house for marketing influence and business impact.",
    navMore: "More",
    prevPage: "Previous",
    nextPage: "Next",
    homeCrumb: "Home",
    required: "Please complete this field.",
    invalidEmail: "Enter a valid email address.",
    prototypeOk: "Form validation completed successfully. This prototype does not currently transmit data.",
    validation: "Please review the required fields.",
    filterAll: "All",
    noInsights: "No insights for this topic in this prototype set.",
    photoNote: "Approved photography slot — executive humanity, architectural light, and craft of strategic work. Awaiting approved assets.",
    viewCase: "Read the case",
    readInsight: "Read the insight",
    related: "Related",
    relatedCapabilities: "Related capabilities",
    nextCase: "Next case",
    relatedInsights: "Related insights",
    startConversation: "Start a conversation",
    objective: "Objective",
    scope: "Scope",
    role: "Business role",
    measure: "Measurement concept",
    bizObjective: "Business objective",
    execScope: "Execution scope",
    impact: "Expected impact",
    metrics: "Success metrics",
    challenge: "Challenge",
    strategy: "Strategy",
    execution: "Execution",
    result: "Result",
    proof: "Proof",
    context: "Context",
    sectorLabel: "Sector",
    optional: "(optional)",
    chooseOption: "Choose",
    consultationPath: "Book a consultation",
    inquiryPath: "Send an inquiry",
    pathLabel: "Contact path",
    nameLabel: "Full name",
    emailLabel: "Business email",
    phoneLabel: "Phone / WhatsApp",
    companyLabel: "Company name",
    industryLabel: "Industry",
    marketLabel: "Country / market",
    challengeLabel: "Primary challenge",
    outcomeLabel: "Desired business outcome",
    startLabel: "When would you like to start?",
    inquiryLabel: "Your inquiry",
    startNow: "Within one month",
    startSoon: "Within 1–3 months",
    startExplore: "Exploring options",
    submitCta: "Discuss the opportunity with a consultant",
    submitInquiryCta: "Send the inquiry",
    contactTime: "In production: confirmation, a defined next step, and an expected response time.",
    serviceNav: "Service index",
    sectorNav: "Sector index",
    insightTopics: "Insight topics",
    caseIndex: "Case index",
    notFound: "This page is not available in the prototype.",
    backHome: "Back to home",
    goPath: "Go to this path",
    relatedCase: "Related case",
    relatedExecution: "Related execution solution",
    relatedConsulting: "Related consulting capability",
    errorSummary: "These fields need review",
    progressLabel: "Page progress",
    featured: "Featured story",
    challengesNav: "Choose a challenge",
    relatedExecution: "Related execution solution",
    relatedConsulting: "Related consulting capability",
    fourIs: "Four I's. One Vision."
  }
};

EM.PAGES = {
  home: {
    title: { ar: "Elite Maison | Four I's. One Vision.", en: "Elite Maison | Four I's. One Vision." },
    description: { ar: "بيت استشاري استراتيجي للتأثير التسويقي والأثر التجاري.", en: "A strategic house for marketing influence and business impact." }
  },
  about: {
    title: { ar: "من نحن | Elite Maison", en: "About | Elite Maison" },
    description: { ar: "خبرة، طريقة تفكير، ونظام نمو يربط الاستراتيجية بالتنفيذ.", en: "Experience, thinking, and a growth system connecting strategy with execution." }
  },
  consulting: {
    title: { ar: "الاستشارات | Elite Maison", en: "Consulting | Elite Maison" },
    description: { ar: "من تشخيص التحديات إلى خارطة نمو قابلة للتنفيذ.", en: "From diagnosing challenges to an actionable growth roadmap." }
  },
  execution: {
    title: { ar: "الحلول التنفيذية | Elite Maison", en: "Execution Solutions | Elite Maison" },
    description: { ar: "تنفيذ يربط التسويق والأنظمة والتفعيل بنتائج قابلة للقياس.", en: "Execution connecting marketing, systems and activation to measurable results." }
  },
  sectors: {
    title: { ar: "خبرة القطاعات | Elite Maison", en: "Sector Experience | Elite Maison" },
    description: { ar: "منهجية نمو متكاملة، وواقع مختلف لكل قطاع.", en: "One integrated method. Different sector realities." }
  },
  cases: {
    title: { ar: "قصص النجاح | Elite Maison", en: "Case Studies | Elite Maison" },
    description: { ar: "من التحدي إلى نتيجة قابلة للقياس.", en: "From challenge to measurable result." }
  },
  insights: {
    title: { ar: "الرؤى | Elite Maison", en: "Insights | Elite Maison" },
    description: { ar: "مكتبة معرفة لصنّاع القرار، وليست مدونة أخبار.", en: "A knowledge library for decision-makers, not a news blog." }
  },
  contact: {
    title: { ar: "تواصل معنا | Elite Maison", en: "Contact | Elite Maison" },
    description: { ar: "ابدأ بالتحدي، لا باختيار خدمة مسبقًا.", en: "Start with the challenge, not a predefined service." }
  },
  case: {
    title: { ar: "قصة نجاح | Elite Maison", en: "Case study | Elite Maison" },
    description: { ar: "تحدٍ، استراتيجية، تنفيذ، نتيجة، ودليل.", en: "Challenge, strategy, execution, result and proof." }
  },
  insight: {
    title: { ar: "رؤية | Elite Maison", en: "Insight | Elite Maison" },
    description: { ar: "معرفة تنفيذية لصنّاع القرار.", en: "Executive knowledge for decision-makers." }
  }
};

EM.COPY = {
  home: {
    eyebrow: { ar: "Four I's. One Vision.", en: "Four I's. One Vision." },
    title: { ar: "بيت استشاري للتأثير التسويقي والأثر التجاري", en: "A strategic house for marketing influence and business impact" },
    lead: { ar: "Elite Maison تجمع التشخيص والاستراتيجية والإشراف على التنفيذ وقياس الأثر — للنمو كنظام، لا كحملة مفردة.", en: "Elite Maison combines diagnosis, strategy, execution oversight and measured impact — treating growth as a system, not a single campaign." },
    trustLabel: { ar: "مؤشرات مصداقية من المصادر المعتمدة", en: "Credibility drawn from approved sources" },
    years: { ar: "عامًا من الخبرة العملية", en: "Years of hands-on experience" },
    markets: { ar: "أسواق نفهم تحدياتها", en: "GCC markets understood" },
    crossLabel: { ar: "خبرة عبر قطاعات مختارة", en: "Selected sector experience" },
    pathLabel: { ar: "من القرار إلى الأثر", en: "From decision to impact" },
    challengesEyebrow: { ar: "نبدأ من الواقع", en: "Start from the situation" },
    challengesTitle: { ar: "أي تحدٍ يشبه مرحلتكم؟", en: "Which challenge resembles your stage?" },
    challengesText: { ar: "لا نبدأ بقائمة خدمات. نبدأ بما يعيق النمو، ثم نحدد المسار الأنسب.", en: "We do not start with a catalogue. We start with what is constraining growth, then choose the clearest path." },
    methodEyebrow: { ar: "منهجية التسليم", en: "Delivery method" },
    methodTitle: { ar: "تشخيص. قرار. تنفيذ. تحسين.", en: "Diagnose. Decide. Execute. Improve." },
    methodText: { ar: "مسار تشغيلي يربط فهم الواقع بالأثر. هذه منهجية العمل، وليست أعمدة العلامة Four I's.", en: "An operating path from understanding to impact. This is the delivery method — not the Four I's brand pillars." },
    methodLink: { ar: "كيف نفكر في النمو", en: "How we think about growth" },
    capEyebrow: { ar: "مساران متكاملان", en: "Two connected pathways" },
    capTitle: { ar: "الاستشارة تقرر. التنفيذ يُفعّل.", en: "Advisory decides. Execution activates." },
    consultingPreview: { ar: "تشخيص التحديات، بناء خارطة نمو، ودعم القرار التنفيذي قبل توسيع النشاط.", en: "Diagnose challenges, build a growth roadmap, and support executive decisions before activity expands." },
    executionPreview: { ar: "تحويل القرارات إلى حملات وأنظمة وتفعيل قابل للقياس — ثم تحسينه.", en: "Turn decisions into campaigns, systems and measurable activation — then improve them." },
    sectorsEyebrow: { ar: "خبرة مختارة", en: "Selected experience" },
    sectorsTitle: { ar: "واقع القطاع يتغيّر. المنهجية تبقى متصلة.", en: "Sector realities change. The method stays connected." },
    casesEyebrow: { ar: "دليل عملي", en: "Working proof" },
    casesTitle: { ar: "قصص تُقرأ من التحدي إلى الدليل.", en: "Stories read from challenge to proof." },
    insightsEyebrow: { ar: "مكتبة القرار", en: "A library for decisions" },
    insightsTitle: { ar: "خبرة تُكتب لصانع القرار.", en: "Expertise written for the decision-maker." },
    closeEyebrow: { ar: "الخطوة التالية", en: "Next step" },
    closeTitle: { ar: "ابدأ بالتحدي.", en: "Start with the challenge." },
    closeText: { ar: "جلسة تشخيص لفهم الواقع وتحديد أوضح خطوة تالية — دون اختيار خدمة مسبقًا.", en: "A diagnostic conversation to understand the situation and name the clearest next step — without picking a service first." },
    statementTitle: { ar: "خبرة عملية، لا شعارات.", en: "Hands-on experience, not slogans." },
    statementText: { ar: "أكثر من 18 عامًا في أسواق الخليج، تربط القرار بالتنفيذ والقياس — عبر قطاعات مختارة من سجل أوسع.", en: "18+ years in GCC markets, connecting decision to execution and measurement — across selected sectors from a broader record." }
  },
  about: {
    eyebrow: { ar: "من نحن", en: "About" },
    title: { ar: "النمو ليس حملة مفردة.", en: "Growth is not a single campaign." },
    lead: { ar: "Elite Maison شركة استشارات وتسويق تربط الاستراتيجية بالتنفيذ، وتركّز على نتائج تجارية قابلة للقياس في أسواق الخليج.", en: "Elite Maison is a marketing consultancy connecting strategy with execution, focused on measurable commercial outcomes in GCC markets." },
    whoEyebrow: { ar: "البيت الاستراتيجي", en: "The strategic house" },
    whoTitle: { ar: "بيت للتأثير التسويقي والأثر التجاري.", en: "A house for marketing influence and business impact." },
    whoText: { ar: "لسنا وكالة محتوى تقليدية. نعمل كنظام يربط التسويق بالمبيعات والتشغيل وتجربة العميل — من وضوح القرار إلى قياس الأثر.", en: "We are not a conventional content agency. We work as a system connecting marketing, sales, operations and customer experience — from decision clarity to measured impact." },
    pillarsTitle: { ar: "أعمدة العلامة — لا منهج التسليم", en: "Brand pillars — not the delivery method" },
    methodEyebrow: { ar: "كيف نعمل", en: "How we work" },
    methodTitle: { ar: "من التشخيص إلى الأثر.", en: "From diagnosis to impact." },
    methodText: { ar: "Diagnose → Strategize → Execute → Measure & Improve. مسار تشغيلي مستقل عن Four I's.", en: "Diagnose → Strategize → Execute → Measure & Improve. An operating path, distinct from the Four I's." },
    engageEyebrow: { ar: "نماذج التعاون", en: "Ways to engage" },
    engageTitle: { ar: "النموذج يتبع التحدي والنطاق.", en: "The model follows the challenge and the scope." },
    engageNote: { ar: "يبدأ كل تعاون بجلسة تشخيص لفهم الواقع وتحديد أوضح خطوة تالية.", en: "Every collaboration begins with a diagnostic session to understand the situation and identify the clearest next step." },
    ctaTitle: { ar: "الخطوة الأوضح بعد فهم البيت: الاستشارة.", en: "The clearest next step: consulting." }
  },
  consulting: {
    eyebrow: { ar: "الاستشارات", en: "Consulting" },
    title: { ar: "من تشخيص التحدي إلى خارطة نمو قابلة للتنفيذ.", en: "From diagnosing the challenge to an actionable growth roadmap." },
    lead: { ar: "ثماني قدرات استشارية تُعرض كتحدٍ تجاري، لا كقائمة خدمات. الهدف: قرار أوضح قبل توسيع النشاط.", en: "Eight advisory capabilities, each framed as a commercial challenge — not a service list. The aim: a clearer decision before activity expands." },
    flowLabel: { ar: "مسار الاستشارة", en: "Consulting engagement" },
    ctaTitle: { ar: "بعد القرار، يأتي التنفيذ.", en: "Once the decision is clear, execution follows." }
  },
  execution: {
    eyebrow: { ar: "الحلول التنفيذية", en: "Execution solutions" },
    title: { ar: "تنفيذ يخدم هدفًا تجاريًا.", en: "Execution built around a business outcome." },
    lead: { ar: "ليست نشاطًا تسويقيًا منفصلًا. حلول تربط التسويق والأنظمة والأتمتة والهوية بنتائج قابلة للقياس.", en: "Not isolated marketing activity. Solutions connecting marketing, systems, automation and identity to measurable results." },
    chainLabel: { ar: "من الاستراتيجية إلى القياس", en: "From strategy to measurement" },
    ctaTitle: { ar: "التنفيذ يتضح أكثر داخل واقع القطاع.", en: "Execution becomes sharper inside a sector reality." }
  },
  sectors: {
    eyebrow: { ar: "خبرة القطاعات", en: "Sector experience" },
    title: { ar: "تحديات مختلفة. منهجية نمو متكاملة.", en: "Different challenges. One integrated growth approach." },
    lead: { ar: "القدرات ثابتة. ما يتغيّر: الأولويات، الرسائل، رحلة العميل، ومؤشرات النجاح. القطاعات أدناه نماذج مختارة من سجل أوسع.", en: "Capabilities stay constant. Priorities, messages, the customer journey and success metrics change. The sectors below are selected examples from a broader record." },
    ctaTitle: { ar: "الدليل يظهر في القصص، لا في الشعارات.", en: "Proof lives in the cases, not in slogans." }
  },
  cases: {
    eyebrow: { ar: "قصص النجاح", en: "Case studies" },
    title: { ar: "من التحدي إلى نتيجة قابلة للقياس.", en: "From challenge to measurable result." },
    lead: { ar: "قصص مختارة وفق Challenge → Strategy → Execution → Result → Proof، باستخدام ما هو متاح في المصادر فقط.", en: "Selected stories using Challenge → Strategy → Execution → Result → Proof — only what the source material supports." },
    note: { ar: "الأسماء والأرقام تتطلب اعتمادًا نهائيًا قبل الإطلاق الإنتاجي.", en: "Names and figures require final approval before production launch." },
    ctaTitle: { ar: "بعد الدليل، تأتي المعرفة.", en: "After proof, knowledge." }
  },
  insights: {
    eyebrow: { ar: "الرؤى", en: "Insights" },
    title: { ar: "خبرة تتحول إلى معرفة.", en: "Expertise turned into knowledge." },
    lead: { ar: "مكتبة معرفة لصنّاع القرار — دليل، تحليل، تقرير مختصر، أو قائمة عملية. ليست مدونة أخبار.", en: "A knowledge library for decision-makers — guide, analysis, brief or checklist. Not a news blog." },
    ctaTitle: { ar: "إذا كانت الرؤية تلامس تحديكم، فلنبدأ من هناك.", en: "If an insight touches your challenge, start there." }
  },
  contact: {
    eyebrow: { ar: "ابدأ الحوار", en: "Start the conversation" },
    title: { ar: "ابدأ بالتحدي، لا باختيار خدمة مسبقًا.", en: "Start with the challenge, not a predefined service." },
    lead: { ar: "مساران واضحان: جلسة استشارية، أو استفسار أولي. كلاهما يبدأ من واقع العمل.", en: "Two clear paths: a consultation, or an initial inquiry. Both start from the business situation." },
    question: { ar: "ما الذي تحاولون حلّه؟", en: "What are you trying to solve?" },
    consultHint: { ar: "للشركات التي تريد تشخيصًا وخارطة أوضح للقرار.", en: "For companies that want diagnosis and a clearer decision path." },
    inquiryHint: { ar: "لسؤال محدد أو لمعرفة إن كان التعاون مناسبًا.", en: "For a defined question, or to learn whether collaboration is a fit." }
  }
};

EM.PILLARS = [
  { id: "insight", ar: "Insight", en: "Insight", text: { ar: "فهم السوق.", en: "Understand the market." } },
  { id: "ideas", ar: "Ideas", en: "Ideas", text: { ar: "حلول ذكية.", en: "Intelligent solutions." } },
  { id: "influence", ar: "Influence", en: "Influence", text: { ar: "تأثير حقيقي.", en: "Real influence." } },
  { id: "impact", ar: "Impact", en: "Impact", text: { ar: "نتائج قابلة للقياس.", en: "Measurable results." } }
];

EM.TRUST = [
  { value: "18+", labelKey: "years" },
  { value: "GCC", labelKey: "markets" },
  { value: { ar: "قطاعات متعددة", en: "Cross-sector" }, labelKey: "crossLabel" },
  { value: { ar: "استراتيجية ← تنفيذ", en: "Strategy → Execution" }, labelKey: "pathLabel" }
];

EM.CHALLENGES = [
  { id: "growth", href: "consulting.html#growth", ar: "اتجاه النمو غير واضح؟", en: "Unclear growth direction?", dest: { ar: "الاستشارات", en: "Consulting" }, caseId: "attractive-smile" },
  { id: "sales", href: "consulting.html#sales", ar: "هل المبيعات دون الإمكانات؟", en: "Are sales below potential?", dest: { ar: "الاستشارات", en: "Consulting" }, caseId: "bloom" },
  { id: "expansion", href: "consulting.html#expansion", ar: "هل تفكر في سوق جديد؟", en: "Considering a new market?", dest: { ar: "التوسع", en: "Market entry" }, caseId: "bin-ablan" },
  { id: "execution", href: "execution.html#performance", ar: "هل التنفيذ غير متسق؟", en: "Inconsistent execution?", dest: { ar: "الحلول التنفيذية", en: "Execution" }, caseId: "bloom" },
  { id: "systems", href: "execution.html#systems", ar: "هل الأنظمة تحدّ النمو؟", en: "Are systems limiting growth?", dest: { ar: "أنظمة التشغيل", en: "Business systems" }, caseId: "bin-ablan" }
];

EM.CASE_LINKS = {
  healthcare: ["attractive-smile"],
  fmcg: ["bloom"],
  hospitality: ["patchouli"],
  retail: ["bin-ablan"],
  growth: ["attractive-smile"],
  sales: ["bloom"],
  expansion: ["bin-ablan"],
  franchise: ["patchouli"],
  product: ["ai-brains"],
  performance: ["bloom"],
  campaigns: ["attractive-smile"],
  automation: ["ai-brains"]
};

EM.RELATED_PATHS = {
  growth: "execution.html#performance",
  sales: "execution.html#campaigns",
  expansion: "execution.html#systems",
  product: "execution.html#branding",
  franchise: "execution.html#activation",
  "private-label": "execution.html#branding",
  journey: "execution.html#campaigns",
  executive: "execution.html#systems",
  performance: "consulting.html#sales",
  campaigns: "consulting.html#growth",
  systems: "consulting.html#executive",
  automation: "consulting.html#product",
  branding: "consulting.html#franchise",
  activation: "consulting.html#journey"
};

EM.ABOUT = [
  { title: { ar: "خبرة تدعم المنهجية", en: "Experience behind the method" }, text: { ar: "أكثر من 18 عامًا من الخبرة العملية المتراكمة، تُترجم إلى فهم أعمق للأسواق وقرارات أكثر نضجًا.", en: "18+ years of accumulated hands-on experience, translated into deeper market understanding and more informed decisions." } },
  { title: { ar: "كيف نفكر في النمو", en: "How we think about growth" }, text: { ar: "النمو ليس حملة مفردة؛ بل نظام يربط التسويق والمبيعات والتشغيل وتجربة العميل.", en: "Growth is not a one-off campaign. It is a system connecting marketing, sales, operations and customer experience." } },
  { title: { ar: "الأسواق والقطاعات", en: "Markets & sector experience" }, text: { ar: "تركيز على أسواق الخليج، مع خبرة عبر قطاعات متعددة. ما يظهر في الموقع نماذج مختارة من سجل أوسع.", en: "A strong focus on GCC markets, with cross-sector experience. Website sectors are selected examples from a broader record." } },
  { title: { ar: "لماذا Elite Maison", en: "Why Elite Maison" }, text: { ar: "وضوح في القرار، ربط الأداء بالإيرادات، وحلول مصممة حسب السوق والمرحلة — لا قوالب جاهزة.", en: "Clearer decisions, performance tied to revenue, and solutions adapted to each market and stage of growth — not templates." } }
];

EM.METHOD = [
  { ar: { title: "تشخيص", text: "فهم الشركة والسوق والعميل والفرصة والقيد الحقيقي." }, en: { title: "Diagnose", text: "Understand the company, market, customer, opportunity and constraint." } },
  { ar: { title: "استراتيجية", text: "تحديد الأولويات والقرارات وخارطة الطريق ومؤشرات الأداء." }, en: { title: "Strategize", text: "Set priorities, decisions, roadmap and KPIs." } },
  { ar: { title: "تنفيذ", text: "تحويل القرارات إلى حملات وأنظمة ومسارات عمل ومبادرات." }, en: { title: "Execute", text: "Turn decisions into campaigns, systems, workflows and initiatives." } },
  { ar: { title: "قياس وتحسين", text: "تقييم الأداء والنتائج التجارية وفرص التحسين المستمر." }, en: { title: "Measure & improve", text: "Evaluate performance, business outcomes and optimization opportunities." } }
];

EM.CONSULTING_FLOW = [
  { ar: "التحدي", en: "Challenge" },
  { ar: "التشخيص", en: "Diagnosis" },
  { ar: "الاستراتيجية", en: "Strategy" },
  { ar: "خارطة التنفيذ", en: "Execution roadmap" },
  { ar: "مؤشرات الأداء", en: "KPIs" },
  { ar: "الدعم التنفيذي", en: "Executive support" }
];

EM.EXECUTION_CHAIN = [
  { ar: "استراتيجية", en: "Strategy" },
  { ar: "أنظمة", en: "Systems" },
  { ar: "تفعيل", en: "Activation" },
  { ar: "قياس", en: "Measurement" }
];

EM.CONSULTING = [
  { id: "growth", title: { ar: "استشارات النمو وتطوير الأعمال", en: "Growth & Business Development Consulting" }, challenge: { ar: "اتجاه النمو غير واضح، والنشاط يتوسع قبل أن تتضح الأولويات.", en: "Growth direction is unclear, and activity expands before priorities are set." }, objective: { ar: "تشخيص فرص النمو وتحديد الأولويات.", en: "Identify growth opportunities and set priorities." }, scope: { ar: "بناء خارطة واضحة لتطوير الأعمال.", en: "Build a clear roadmap for business development." }, role: { ar: "دعم قرار النمو قبل التوسع في النشاط.", en: "Support growth decisions before activity expands." }, measure: { ar: "وضوح الأولويات ووجود خارطة قابلة للتنفيذ.", en: "Clear priorities and an actionable roadmap." } },
  { id: "sales", title: { ar: "تطوير المبيعات وتوليد الإيرادات", en: "Sales & Revenue Development" }, challenge: { ar: "منظومة المبيعات تعمل، لكن التحويل والإيراد دون الإمكانات.", en: "The sales system is active, but conversion and revenue sit below potential." }, objective: { ar: "رفع قدرة منظومة المبيعات على التحويل.", en: "Strengthen the sales system’s ability to convert." }, scope: { ar: "تحسين مسارات التحويل وبناء فرص إيراد جديدة.", en: "Improve conversion paths and create new revenue opportunities." }, role: { ar: "ربط المبيعات بالنمو التجاري لا بالنشاط وحده.", en: "Connect sales work to commercial growth, not activity alone." }, measure: { ar: "مسارات أوضح وفرص إيراد محددة.", en: "Clearer paths and defined revenue opportunities." } },
  { id: "expansion", title: { ar: "التوسع ودخول الأسواق", en: "Market Expansion & Entry" }, challenge: { ar: "الرغبة في سوق جديد تسبق سؤال الجاهزية والقناة والنموذج.", en: "Appetite for a new market arrives before readiness, channel and model are resolved." }, objective: { ar: "تقييم جاهزية التوسع واختيار السوق المناسب.", en: "Assess expansion readiness and identify the right market." }, scope: { ar: "بناء استراتيجية فعّالة لدخول السوق.", en: "Build an effective market-entry strategy." }, role: { ar: "تقليل مخاطرة الدخول غير الناضج.", en: "Reduce the risk of premature market entry." }, measure: { ar: "قرار دخول مبني على جاهزية واضحة.", en: "An entry decision grounded in readiness." } },
  { id: "product", title: { ar: "تطوير المنتجات ونماذج الأعمال", en: "Product & Business Model Development" }, challenge: { ar: "العرض التجاري لا يواكب مرحلة الشركة أو قابلية النمو.", en: "The commercial offer does not match the company’s stage or its ability to scale." }, objective: { ar: "تعزيز القيمة المقدمة وقابلية النمو.", en: "Strengthen the value proposition and scalability." }, scope: { ar: "تحسين المنتجات والخدمات وبناء نموذج أكثر قابلية للنمو.", en: "Improve products and services and build a more scalable model." }, role: { ar: "ربط العرض التجاري بمرحلة الشركة.", en: "Align the commercial offer with the company’s stage." }, measure: { ar: "نموذج أوضح للقيمة والنمو.", en: "A clearer model of value and growth." } },
  { id: "franchise", title: { ar: "تطوير أنظمة الامتياز التجاري", en: "Franchise Systems Development" }, challenge: { ar: "نجاح محلي يصعب نقله دون معايير تشغيل وتجربة قابلة للتكرار.", en: "Local success is hard to transfer without repeatable operating and experience standards." }, objective: { ar: "بناء نموذج قابل للتكرار والتوسع.", en: "Build a repeatable, scalable model." }, scope: { ar: "توحيد التشغيل وتجربة العميل ومعايير العلامة.", en: "Standardize operations, customer experience and brand standards." }, role: { ar: "تحويل النجاح المحلي إلى نظام قابل للنقل.", en: "Turn local success into a transferable system." }, measure: { ar: "معايير تشغيل وتجربة قابلة للتكرار.", en: "Repeatable operating and experience standards." } },
  { id: "private-label", title: { ar: "تطوير مشاريع العلامات الخاصة", en: "Private Label Development" }, challenge: { ar: "المنتج والعلامة موجودان، لكن مسار السوق والتوزيع غير محكم.", en: "Product and brand exist, but the market path and distribution are not yet tight." }, objective: { ar: "تطوير المنتج والعلامة ومسار السوق.", en: "Develop the product, brand and market path." }, scope: { ar: "بناء نموذج السوق وقنوات التوزيع والنمو.", en: "Build the market model, distribution channels and growth path." }, role: { ar: "ربط العلامة الخاصة بقناة ونمو واضحين.", en: "Connect the private label to a clear channel and growth path." }, measure: { ar: "مسار توزيع ونمو محدد.", en: "A defined distribution and growth path." } },
  { id: "journey", title: { ar: "تصميم رحلة العميل وتحسين التجربة", en: "Customer Journey & Experience" }, challenge: { ar: "التجربة تُعامل كطبقة تجميل، لا كجزء من نظام التحويل والولاء.", en: "Experience is treated as a veneer, not as part of conversion and loyalty." }, objective: { ar: "تحسين التجربة بما يدعم التحويل والولاء.", en: "Improve experience to support conversion and loyalty." }, scope: { ar: "تصميم نقاط التفاعل وتقليل الاحتكاك.", en: "Design key touchpoints and reduce friction." }, role: { ar: "جعل الرحلة جزءًا من نظام النمو.", en: "Make the journey part of the growth system." }, measure: { ar: "احتكاك أقل ومسار أوضح للعميل.", en: "Less friction and a clearer customer path." } },
  { id: "executive", title: { ar: "الإدارة التنفيذية للنمو", en: "Executive Growth Management" }, challenge: { ar: "مبادرات النمو تتفرق بين الفرق دون إدارة ومؤشرات مشتركة.", en: "Growth initiatives scatter across teams without shared leadership and indicators." }, objective: { ar: "دعم القرار وقيادة مبادرات النمو.", en: "Support decision-making and lead growth initiatives." }, scope: { ar: "ربط الفرق والأولويات بمؤشرات أداء واضحة.", en: "Align teams and priorities around clear performance indicators." }, role: { ar: "إبقاء النمو تحت إدارة تنفيذية مستمرة.", en: "Keep growth under ongoing executive management." }, measure: { ar: "مؤشرات وأولويات مربوطة بالتنفيذ.", en: "Indicators and priorities tied to execution." } }
];

EM.EXECUTION = [
  { id: "performance", title: { ar: "التسويق القائم على الأداء والنتائج", en: "Performance Marketing" }, objective: { ar: "الاستحواذ والتحويل وربط الإنفاق بالعائد.", en: "Acquisition, conversion and return on marketing spend." }, scope: { ar: "إدارة حملات مدفوعة قابلة للقياس.", en: "Manage paid campaigns that can be measured." }, impact: { ar: "نشاط تسويقي مربوط بنتيجة تجارية.", en: "Marketing activity tied to a commercial result." }, metrics: { ar: "قياس العائد على الإنفاق التسويقي.", en: "Return on marketing spend." } },
  { id: "campaigns", title: { ar: "إدارة الحملات والقنوات الرقمية", en: "Campaign & Digital Channel Management" }, objective: { ar: "تنسيق الرسائل والعروض ومسارات التحويل.", en: "Align messages, offers and conversion paths." }, scope: { ar: "تخطيط وتنفيذ الحملات عبر القنوات المناسبة.", en: "Plan and execute campaigns across the right channels." }, impact: { ar: "قناة ورسالة تعملان معًا لا بشكل منفصل.", en: "Channel and message working together, not in isolation." }, metrics: { ar: "اتساق المسار عبر القنوات.", en: "Path consistency across channels." } },
  { id: "systems", title: { ar: "أنظمة إدارة الأعمال والتشغيل التسويقي", en: "Business Systems & Marketing Operations" }, objective: { ar: "دعم القرار والتنفيذ والمتابعة.", en: "Support execution, decision-making and follow-up." }, scope: { ar: "تطبيق أنظمة CRM ولوحات الأداء وأدوات تنظيم العمليات.", en: "Implement CRM systems, dashboards and process tools." }, impact: { ar: "تشغيل أوضح وقرار مبني على متابعة.", en: "Clearer operations and decisions informed by follow-up." }, metrics: { ar: "وجود نظام متابعة ولوحة أداء مستخدمة.", en: "A used follow-up system and performance dashboard." } },
  { id: "automation", title: { ar: "الأتمتة وحلول الذكاء الاصطناعي", en: "Automation & AI Solutions" }, objective: { ar: "رفع الكفاءة عبر تبسيط العمل المتكرر.", en: "Improve efficiency by simplifying repetitive work." }, scope: { ar: "أتمتة العمليات وتوظيف الذكاء الاصطناعي حيث يخدم النتيجة.", en: "Automate processes and apply AI where it serves the outcome." }, impact: { ar: "تقنية تخدم النتيجة لا أن تكون غاية بذاتها.", en: "Technology serving the result, not as an end in itself." }, metrics: { ar: "كفاءة تشغيلية أوضح على المسارات المؤتمتة.", en: "Clearer operational efficiency on automated paths." } },
  { id: "branding", title: { ar: "البراندينغ والهوية الإبداعية", en: "Branding & Creative Identity" }, objective: { ar: "هوية ورسائل تعكس التموضع وتدعم التجربة.", en: "Identity and messaging that reflect positioning and support experience." }, scope: { ar: "تطوير الهوية والرسائل الإبداعية المرتبطة بالتسويق.", en: "Develop identity and creative messaging linked to marketing." }, impact: { ar: "تموضع أوضح في السوق وتجربة العلامة.", en: "Clearer market positioning and brand experience." }, metrics: { ar: "اتساق الرسالة والهوية عبر نقاط التواصل.", en: "Message and identity consistency across touchpoints." } },
  { id: "activation", title: { ar: "التفعيل التسويقي وتحسين الأداء", en: "Marketing Activation & Performance Optimization" }, objective: { ar: "تحويل الاستراتيجية إلى مبادرات ثم تحسينها.", en: "Turn strategy into initiatives, then optimize them." }, scope: { ar: "تفعيل الحملات والقنوات وقياسها باستمرار.", en: "Activate, measure and continuously optimize campaigns and channels." }, impact: { ar: "تنفيذ يتحسن ولا يتوقف عند الإطلاق.", en: "Execution that improves, rather than stopping at launch." }, metrics: { ar: "تحسين مستمر مبني على قياس الأداء.", en: "Continuous improvement based on performance measurement." } }
];

EM.ENGAGE = [
  { id: "advisory", kicker: "Advisory", title: { ar: "استشارة محددة النطاق", en: "Defined advisory assignment" }, text: { ar: "مشروع استشاري محدد: تشخيص وخارطة استراتيجية ودعم للقرار.", en: "A defined consulting assignment: diagnosis, strategy roadmap and decision support." } },
  { id: "end-to-end", kicker: "End-to-end", title: { ar: "من الاستراتيجية إلى التنفيذ", en: "Strategy through implementation" }, text: { ar: "حلول مترابطة من الاستراتيجية إلى التنفيذ والقياس والتحسين.", en: "Connected work from strategy through implementation, measurement and improvement." } },
  { id: "systems", kicker: "Custom systems", title: { ar: "أنظمة مخصصة", en: "Tailored systems" }, text: { ar: "حلول تشغيلية أو رقمية أو تقنية تُبنى وفق عمل الشركة لا وفق قالب جاهز.", en: "Operational, digital or technology solutions built around how the company actually works." } },
  { id: "growth", kicker: "Growth management", title: { ar: "قيادة النمو المستمرة", en: "Ongoing growth leadership" }, text: { ar: "إدارة مستمرة لمبادرات النمو والتسويق والمبيعات والأنظمة ومؤشرات الأداء.", en: "Ongoing leadership of growth initiatives, marketing, sales, systems and KPIs." } }
];

EM.SECTORS = [
  { id: "healthcare", title: { ar: "الرعاية الصحية", en: "Healthcare" }, context: { ar: "ثقة المريض ومسار الحجز والتجربة داخل المنشأة تحدد الطلب أكثر مما تحدده الحملة وحدها.", en: "Patient trust, booking path and in-facility experience shape demand more than the campaign alone." }, challenges: { ar: "بناء الثقة، زيادة الحجوزات، وتحسين تجربة المريض.", en: "Trust-building, appointment growth, and patient experience." }, priorities: { ar: "وضوح العرض، مسار حجز أقل احتكاكًا، ومتابعة الطلب.", en: "Offer clarity, a lower-friction booking path, and demand follow-up." }, journey: { ar: "من البحث عن اختصاص إلى الحجز والحضور وإعادة الزيارة.", en: "From searching for a specialty to booking, attendance and return visits." }, capabilities: ["consulting.html#growth", "execution.html#campaigns", "consulting.html#journey"] },
  { id: "fmcg", title: { ar: "المنتجات الاستهلاكية", en: "FMCG" }, context: { ar: "النمو يُحسم في التوزيع والتكرار السعري ووضوح العلامة على الرف والقناة.", en: "Growth is decided in distribution, purchase frequency and brand clarity on shelf and channel." }, challenges: { ar: "اختراق السوق، نمو العلامة، وتطوير قنوات التوزيع.", en: "Market penetration, brand growth, and distribution channel development." }, priorities: { ar: "قناة، تغطية، ورسالة تثبت التكرار لا الضجيج.", en: "Channel, coverage, and a message that earns repeat — not noise." }, journey: { ar: "من التعرف إلى التجربة ثم إعادة الشراء عبر القناة المناسبة.", en: "From awareness to trial and repurchase through the right channel." }, capabilities: ["consulting.html#growth", "consulting.html#private-label", "execution.html#performance"] },
  { id: "hospitality", title: { ar: "الأغذية والمشروبات والضيافة", en: "Food & Beverage / Hospitality" }, context: { ar: "التجربة داخل المكان والنموذج التشغيلي يحددان إن كان النجاح قابلاً للتكرار.", en: "On-premise experience and the operating model decide whether success can be repeated." }, challenges: { ar: "تجربة العميل، زيادة التكرار، وبناء نماذج قابلة للتوسع.", en: "Customer experience, repeat business, and scalable growth models." }, priorities: { ar: "تجربة متسقة، تكرار الزيارة، وجاهزية النموذج للامتياز أو التوسع.", en: "Consistent experience, repeat visits, and a model ready to franchise or expand." }, journey: { ar: "من الاكتشاف إلى الزيارة والتقييم وإعادة الحجز.", en: "From discovery to visit, review and returning." }, capabilities: ["consulting.html#franchise", "consulting.html#journey", "execution.html#activation"] },
  { id: "retail", title: { ar: "التجزئة والتوزيع", en: "Retail & Distribution" }, context: { ar: "القناة والسوق الجديد يفرضان قرارًا أوضح قبل زيادة النشاط البيعي.", en: "Channel and new-market choices demand a clearer decision before sales activity is increased." }, challenges: { ar: "تطوير القنوات، رفع المبيعات، والتوسع في الأسواق.", en: "Channel development, sales growth, and market expansion." }, priorities: { ar: "تغطية القنوات، جاهزية التوسع، وربط المبيعات بالنمو.", en: "Channel coverage, expansion readiness, and sales tied to growth." }, journey: { ar: "من التوفر إلى القرار الشرائي وإعادة الطلب.", en: "From availability to purchase decision and reorder." }, capabilities: ["consulting.html#expansion", "consulting.html#sales", "execution.html#systems"] },
  { id: "ecommerce", title: { ar: "التجارة الإلكترونية", en: "E-commerce" }, context: { ar: "التحويل يضيع بين الاكتشاف والسلة والدفع وإعادة الشراء إن لم تُدار الرحلة كنظام.", en: "Conversion is lost between discovery, cart, payment and repurchase unless the journey is managed as a system." }, challenges: { ar: "رفع التحويل، تحسين رحلة الشراء، وزيادة قيمة العميل.", en: "Conversion growth, purchase journey optimization, and customer value." }, priorities: { ar: "مسار أوضح، احتكاك أقل، وقياس يربط الإنفاق بالعائد.", en: "A clearer path, less friction, and measurement that ties spend to return." }, journey: { ar: "من الزيارة الأولى إلى الشراء وإعادة الطلب.", en: "From first visit to purchase and reorder." }, capabilities: ["consulting.html#journey", "execution.html#performance", "execution.html#automation"] },
  { id: "education", title: { ar: "التعليم والتدريب", en: "Education & Training" }, context: { ar: "العرض والبرنامج ومسار التسجيل يحددون النمو أكثر من الحملات المنفصلة.", en: "Offer, programme and enrolment path determine growth more than disconnected campaigns." }, challenges: { ar: "اكتساب العملاء، نمو التسجيلات، وتطوير العروض والبرامج.", en: "Customer acquisition, enrollment growth, and offer development." }, priorities: { ar: "وضوح القيمة، مسار تسجيل أقصر، وعرض يناسب المرحلة.", en: "Value clarity, a shorter enrolment path, and an offer that fits the stage." }, journey: { ar: "من الاهتمام إلى التسجيل والحضور والاستمرار.", en: "From interest to enrolment, attendance and continuation." }, capabilities: ["consulting.html#product", "consulting.html#sales", "execution.html#campaigns"] }
];

EM.CASES = [
  {
    id: "attractive-smile",
    sector: "healthcare",
    related: ["consulting.html#growth", "execution.html#campaigns"],
    publicName: { ar: "Attractive Smile Medical Center", en: "Attractive Smile Medical Center" },
    anonymousName: { ar: "مركز طبي متخصص", en: "Specialist medical centre" },
    challenge: { ar: "الانتقال إلى مرحلة توسع أكثر تكاملًا.", en: "Moving into a more integrated expansion phase." },
    strategy: { ar: "دعم مرحلة التوسع بربط أوضح بين النمو والطلب.", en: "Support a more integrated expansion phase." },
    execution: { ar: "العمل على استقرار الطلب ضمن مرحلة التوسع.", en: "Work focused on more stable demand during expansion." },
    result: { ar: "نمو ملحوظ في الإيرادات واستقرار الطلب، مع حجوزات متواصلة لمدة 12 يومًا.", en: "Revenue growth and more stable demand, with 12 consecutive days of bookings." },
    proof: { ar: "حجوزات متواصلة لمدة 12 يومًا.", en: "12 consecutive days of bookings." }
  },
  {
    id: "bloom",
    sector: "fmcg",
    related: ["consulting.html#sales", "consulting.html#growth"],
    publicName: { ar: "Bloom / Perfect Foodstuff", en: "Bloom / Perfect Foodstuff" },
    anonymousName: { ar: "علامة أغذية استهلاكية", en: "Consumer food brand" },
    challenge: { ar: "نموذج النمو وقنوات البيع يحتاجان إعادة تصميم.", en: "The growth model and sales channels required redesign." },
    strategy: { ar: "إعادة تصميم نموذج النمو.", en: "Redesign the growth model." },
    execution: { ar: "إعادة تصميم قنوات البيع.", en: "Redesign sales channels." },
    result: { ar: "من 18 ألف درهم في الربع الأول إلى 40 ألفًا، ثم متوسط 65 ألف درهم شهريًا.", en: "From AED 18K in Q1 to AED 40K, then an average of AED 65K per month." },
    proof: { ar: "متوسط 65 ألف درهم شهريًا.", en: "AED 65K average monthly." }
  },
  {
    id: "bin-ablan",
    sector: "retail",
    related: ["consulting.html#expansion", "consulting.html#sales"],
    publicName: { ar: "Bin Ablan", en: "Bin Ablan" },
    anonymousName: { ar: "شركة توزيع إقليمية", en: "Regional distribution business" },
    challenge: { ar: "الحاجة إلى توسع إقليمي وقنوات توزيع جديدة.", en: "Need for regional expansion and new distribution channels." },
    strategy: { ar: "تطوير استراتيجية التوسع الإقليمي.", en: "Develop a regional expansion strategy." },
    execution: { ar: "فتح أسواق جديدة وتطوير قنوات توزيع.", en: "Open new markets and develop distribution channels." },
    result: { ar: "أسواق جديدة في كندا وعُمان والكويت والسعودية وليبيا، إلى جانب قنوات توزيع جديدة.", en: "New markets in Canada, Oman, Kuwait, Saudi Arabia and Libya, alongside new distribution channels." },
    proof: { ar: "دخول أسواق في خمس دول.", en: "Market entry across five countries." }
  },
  {
    id: "patchouli",
    sector: "hospitality",
    related: ["consulting.html#franchise", "consulting.html#product"],
    publicName: { ar: "Le Patchouli Café", en: "Le Patchouli Café" },
    anonymousName: { ar: "علامة ضيافة", en: "Hospitality brand" },
    challenge: { ar: "الحاجة إلى نموذج أكثر قابلية للتوسع والامتياز.", en: "Need for a model built for scale and franchising." },
    strategy: { ar: "تطوير النموذج ليصبح أكثر قابلية للتوسع والامتياز التجاري.", en: "Develop the model to support scalability and franchising." },
    execution: { ar: "بناء نموذج أكثر قابلية للتكرار.", en: "Build a more repeatable model." },
    result: { ar: "الوصول إلى 11 فرع امتياز تجاري، وبناء نموذج قابل للتوسع والاستدامة.", en: "11 franchise branches and a more repeatable growth model." },
    proof: { ar: "11 فرع Franchise.", en: "11 franchise branches." }
  },
  {
    id: "ai-brains",
    sector: null,
    related: ["execution.html#automation", "consulting.html#product"],
    publicName: { ar: "AI Brains — AI Solutions", en: "AI Brains — AI Solutions" },
    anonymousName: { ar: "مشروع حلول ذكاء اصطناعي", en: "AI solutions project" },
    challenge: { ar: "تحويل فكرة ذكاء اصطناعي إلى مشروع واضح القيمة.", en: "Turn an AI concept into a project with clear value." },
    strategy: { ar: "صياغة المشروع ليكون قابلاً للتطبيق والقياس.", en: "Shape the project so it is applicable and measurable." },
    execution: { ar: "تحويل الفكرة إلى مشروع واضح المعالم.", en: "Convert the concept into a defined project." },
    result: { ar: "مشروع واضح القيمة وقابل للتطبيق والقياس.", en: "A clear, applicable and measurable project." },
    proof: { ar: "جائزة أفضل مشروع داعم للذكاء الاصطناعي.", en: "Award for Best AI-Supporting Project." }
  }
];

EM.INSIGHTS = [
  {
    id: "growth-guide",
    topic: { ar: "النمو وتطوير الأعمال", en: "Growth & Business Development" },
    format: { ar: "دليل تطبيقي", en: "Practical guide" },
    title: { ar: "خارطة نمو يستطيع الفريق استخدامها", en: "A growth roadmap teams can actually use" },
    summary: { ar: "كيف تتحول أولويات النمو إلى خارطة واضحة للقرار والتنفيذ دون أن تبقى وثيقة معزولة.", en: "How growth priorities become a roadmap for decision and execution, rather than a document that sits unused." },
    sections: [
      { heading: { ar: "المشكلة الشائعة", en: "The usual failure" }, text: { ar: "خارطة النمو تُكتب ثم تُعزل عن القرار اليومي. الأولويات تبقى عامة، والتنفيذ يسير بمنطق النشاط لا بمنطق المرحلة.", en: "The roadmap is written, then isolated from daily decisions. Priorities stay generic, and execution follows activity rather than stage." } },
      { heading: { ar: "ما الذي يجب أن تحسمه الخارطة", en: "What the roadmap must settle" }, text: { ar: "الأولوية، القرار، ومسار التنفيذ ومؤشر واضح لكل أولوية — حتى يستطيع الفريق استخدامها لا أرشفتها.", en: "Priority, decision, execution path and a clear indicator for each priority — so the team can use it rather than file it." } }
    ],
    cta: "consulting.html#growth"
  },
  {
    id: "sales-article",
    topic: { ar: "المبيعات وتوليد الإيرادات", en: "Sales & Revenue" },
    format: { ar: "مقال تحليلي", en: "Analytical article" },
    title: { ar: "أين يفقد مسار التحويل زخمه", en: "Where the conversion path loses momentum" },
    summary: { ar: "قراءة في نقاط الاحتكاك بين الاهتمام والشراء، وكيف ترتبط المبيعات برحلة أوضح.", en: "A look at friction between interest and purchase, and how sales connect to a clearer journey." },
    sections: [
      { heading: { ar: "بين الاهتمام والشراء", en: "Between interest and purchase" }, text: { ar: "الزخم لا يضيع عادة في الحملة، بل في المسار: عرض غير واضح، تسليم غير متسق، أو رحلة لا تربط المبيعات بالتجربة.", en: "Momentum is rarely lost in the campaign. It is lost in the path: an unclear offer, inconsistent handoff, or a journey that does not connect sales to experience." } },
      { heading: { ar: "ربط المبيعات بالنمو", en: "Connecting sales to growth" }, text: { ar: "المبيعات جزء من نظام النمو حين تُقاس بمسار أوضح وفرص إيراد محددة، لا بحجم النشاط وحده.", en: "Sales belongs to the growth system when it is measured by a clearer path and defined revenue opportunities — not by activity volume alone." } }
    ],
    cta: "consulting.html#sales"
  },
  {
    id: "expansion-brief",
    topic: { ar: "التوسع ودخول الأسواق", en: "Market Expansion" },
    format: { ar: "تقرير مختصر", en: "Brief report" },
    title: { ar: "أسئلة الجاهزية قبل دخول سوق جديد", en: "Readiness questions before a new market" },
    summary: { ar: "ما الذي يجب حسمه قبل التوسع: السوق، القناة، النموذج، والقدرة التشغيلية.", en: "What must be resolved before expansion: market, channel, model and operating capacity." },
    sections: [
      { heading: { ar: "قبل فتح السوق", en: "Before opening a market" }, text: { ar: "الدخول غير الناضج يكلّف أكثر من التأخير المنضبط. الجاهزية تُحسم في السوق والقناة والنموذج والقدرة على التشغيل.", en: "Premature entry costs more than disciplined delay. Readiness is settled in market, channel, model and operating capacity." } },
      { heading: { ar: "قرار مبني على جاهزية", en: "A decision grounded in readiness" }, text: { ar: "الاستشارة هنا تقلّل المخاطرة: ليس تشجيع التوسع، بل توضيح إن كان الوقت مناسبًا وكيف.", en: "Advisory here reduces risk: not cheering expansion, but clarifying whether the timing is right — and how." } }
    ],
    cta: "consulting.html#expansion"
  },
  {
    id: "ai-insight",
    topic: { ar: "الأتمتة والذكاء الاصطناعي", en: "Automation & AI" },
    format: { ar: "رؤية من حالة عملية", en: "Case insight" },
    title: { ar: "من الاهتمام بالذكاء الاصطناعي إلى قيمة تشغيلية", en: "From AI interest to operational value" },
    summary: { ar: "الذكاء الاصطناعي مفيد حين يخدم مسار عمل ونتيجة، لا حين يبقى فكرة معزولة.", en: "AI is useful when it serves a workflow and an outcome, not when it remains an isolated idea." },
    sections: [
      { heading: { ar: "الفكرة ليست المشروع", en: "A concept is not a project" }, text: { ar: "الاهتمام بالذكاء الاصطناعي شائع. القيمة تظهر حين تُصاغ الفكرة كمشروع قابل للتطبيق والقياس ويرتبط بمسار عمل.", en: "Interest in AI is common. Value appears when the idea is shaped into an applicable, measurable project tied to a workflow." } },
      { heading: { ar: "التقنية في خدمة النتيجة", en: "Technology in service of the result" }, text: { ar: "الأتمتة والذكاء الاصطناعي ليسا غاية. يُوظَّفان حيث يبسّطان العمل المتكرر ويخدمان نتيجة تشغيلية أو تجارية.", en: "Automation and AI are not ends in themselves. They are used where they simplify repetitive work and serve an operating or commercial result." } }
    ],
    cta: "execution.html#automation"
  },
  {
    id: "cx-check",
    topic: { ar: "تجربة العميل", en: "Customer Experience" },
    format: { ar: "قائمة عملية", en: "Practical checklist" },
    title: { ar: "خمس إشارات على احتكاك في رحلة العميل", en: "Five signals your customer journey is creating friction" },
    summary: { ar: "علامات عملية تساعد على اكتشاف أين تعيق التجربة التحويل أو التكرار.", en: "Practical signals for spotting where experience blocks conversion or repeat business." },
    sections: [
      { heading: { ar: "التجربة كجزء من النمو", en: "Experience as part of growth" }, text: { ar: "الاحتكاك يظهر في نقاط التفاعل: انتظار، غموض، تسليم متقطع، أو مسار لا يُكمل. هذه إشارات تشغيل لا تجميل.", en: "Friction shows at touchpoints: waiting, ambiguity, broken handoff, or a path that is not completed. These are operating signals, not cosmetic ones." } },
      { heading: { ar: "ما الذي نبحث عنه", en: "What to look for" }, text: { ar: "مسار أوضح، احتكاك أقل، ورحلة تدعم التحويل والولاء بدل أن تُعامل كطبقة منفصلة عن المبيعات.", en: "A clearer path, less friction, and a journey that supports conversion and loyalty rather than sitting apart from sales." } }
    ],
    cta: "consulting.html#journey"
  }
];

EM.INDUSTRIES = [
  { ar: "الرعاية الصحية", en: "Healthcare" },
  { ar: "المنتجات الاستهلاكية", en: "FMCG" },
  { ar: "الأغذية والضيافة", en: "Food & Beverage / Hospitality" },
  { ar: "التجزئة والتوزيع", en: "Retail & Distribution" },
  { ar: "التجارة الإلكترونية", en: "E-commerce" },
  { ar: "التعليم والتدريب", en: "Education & Training" },
  { ar: "أخرى", en: "Other" }
];

/* Website copy pass: facts stay source-backed; Arabic and English are authored independently. */
EM.I18N.ar = {
  ...EM.I18N.ar,
  bookCta: "احجز جلسة استشارية",
  bookShort: "احجز استشارة",
  exploreCta: "استكشف الاستشارات",
  exploreProof: "استكشف الدليل العملي",
  moreLabel: "المزيد",
  moreClose: "إغلاق",
  exploreExecution: "استكشف الحلول التنفيذية",
  exploreSectors: "تعرّف إلى خبرة القطاعات",
  exploreCases: "شاهد قصص النجاح",
  exploreInsights: "اقرأ الرؤى",
  engageCta: "اختر طريقة التعاون",
  viewCase: "اقرأ القصة",
  readInsight: "اقرأ الرؤية",
  relatedCapabilities: "قدرات مرتبطة",
  nextCase: "القصة التالية",
  relatedInsights: "رؤى مرتبطة",
  startConversation: "ناقش تحدي النمو",
  prototypeOk: "وصلت رسالتك التجريبية. سنراجع المعلومات ونحدد الخطوة التالية؛ لا تُرسل البيانات إلى نظام خارجي في هذه النسخة.",
  validation: "راجع الحقول المعلّمة قبل الإرسال.",
  required: "هذا الحقل مطلوب.",
  invalidEmail: "أدخل بريدًا إلكترونيًا صالحًا.",
  noInsights: "لا توجد مواد أخرى في هذا الموضوع حاليًا.",
  photoNote: "مساحة لصورة معتمدة: قيادة حقيقية، ضوء معماري، وتفاصيل من العمل الاستراتيجي.",
  footerText: "استشارات تربط التسويق بالمبيعات والأنظمة والتنفيذ، حتى يتحول التحدي إلى مسار يمكن إدارته وقياسه.",
  footerContact: "للحوار",
  prevPage: "السابق",
  nextPage: "التالي",
  consultationPath: "احجز جلسة استشارية",
  inquiryPath: "أرسل استفسارًا أوليًا",
  submitCta: "ناقش تحدي النمو",
  submitInquiryCta: "أرسل الاستفسار",
  contactTime: "نراجع الطلبات ونعود إليك خلال يومي عمل في المسار الإنتاجي.",
  notFound: "هذه الصفحة غير متاحة في النموذج الحالي.",
  backHome: "العودة إلى الرئيسية"
};

EM.I18N.en = {
  ...EM.I18N.en,
  bookCta: "Book a consultation",
  bookShort: "Book a session",
  exploreCta: "Explore consulting",
  exploreProof: "Explore the proof",
  moreLabel: "More",
  moreClose: "Close",
  exploreExecution: "Explore execution solutions",
  exploreSectors: "View sector experience",
  exploreCases: "View case studies",
  exploreInsights: "Read the insights",
  engageCta: "Choose a working model",
  viewCase: "Read the case",
  readInsight: "Read the insight",
  relatedCapabilities: "Related capabilities",
  nextCase: "Next case",
  relatedInsights: "Related insights",
  startConversation: "Discuss your growth challenge",
  prototypeOk: "Your prototype message was received. We will review the information and define the next step; this version does not transmit data to an external system.",
  validation: "Review the marked fields before sending.",
  required: "This field is required.",
  invalidEmail: "Enter a valid email address.",
  noInsights: "There are no more pieces in this topic yet.",
  photoNote: "Approved photography slot: executive humanity, architectural light, and the craft of strategic work.",
  footerText: "Consultancy connecting marketing, sales, systems and execution so a challenge becomes a path that can be managed and measured.",
  footerContact: "Start a conversation",
  prevPage: "Previous",
  nextPage: "Next",
  consultationPath: "Book a consultation",
  inquiryPath: "Send an initial inquiry",
  submitCta: "Discuss your growth challenge",
  submitInquiryCta: "Send the inquiry",
  contactTime: "In production, inquiries receive a confirmation, next step, and expected response time.",
  notFound: "This page is not available in the current prototype.",
  backHome: "Return home"
};

EM.COPY = {
  home: {
    eyebrow: { ar: "Four I's. One Vision.", en: "Four I's. One Vision." },
    title: { ar: "بيت استشاري يحوّل الاستراتيجية إلى", en: "A consulting house that turns strategy into" },
    accent: { ar: "نمو قابل للقياس.", en: "measurable growth." },
    lead: { ar: "Elite Maison تجمع التشخيص والاستراتيجية والإشراف على التنفيذ وقياس الأثر — للنمو كنظام، لا كحملة مفردة.", en: "Elite Maison connects diagnosis, strategy, execution oversight and impact measurement — growth as a system, not a single campaign." },
    photoAlt: { ar: "مساحة معمارية راقية ترمز إلى منهج Elite Maison", en: "An architectural space that reflects Elite Maison's method" },
    methodChip: { ar: "منهجية متصلة", en: "A connected method" },
    methodLine: { ar: "تشخيص ← استراتيجية ← تنفيذ ← تحسين", en: "Diagnose → Strategize → Execute → Improve" },
    trustLabel: { ar: "أساس المصداقية", en: "The basis for confidence" },
    years: { ar: "عامًا من الخبرة العملية", en: "Years of hands-on experience" },
    markets: { ar: "تركيز على أسواق الخليج", en: "A focus on GCC markets" },
    crossLabel: { ar: "خبرة عبر قطاعات متعددة", en: "Cross-sector experience" },
    pathLabel: { ar: "من القرار إلى التنفيذ", en: "From decision to execution" },
    challengesEyebrow: { ar: "نبدأ من الواقع", en: "Start from the real situation" },
    challengesTitle: { ar: "أي تحدٍ يشبه مرحلتكم؟", en: "Which challenge looks like your stage?" },
    challengesText: { ar: "لا نبدأ بقائمة خدمات. نبدأ بما يعيق النمو، ثم نحدد المسار الأنسب.", en: "We do not start with a service menu. We start with what is blocking growth, then name the right path." },
    methodEyebrow: { ar: "طريقة العمل", en: "How the work moves" },
    methodTitle: { ar: "نفهم الواقع قبل أن نوسّع النشاط", en: "Understand the business before expanding activity" },
    methodText: { ar: "تشخيص، استراتيجية، تنفيذ، ثم قياس وتحسين. هذه هي طريقة التسليم؛ أما Four I's فهي لغة العلامة ومبادئها.", en: "Diagnose, strategize, execute, then measure and improve. This is the delivery method; the Four I's are the language and principles of the brand." },
    methodLink: { ar: "تعرّف إلى طريقة تفكيرنا", en: "See how we think" },
    capEyebrow: { ar: "مساران متكاملان", en: "Two connected paths" },
    capTitle: { ar: "الاستشارة تقرر. التنفيذ يُفعّل.", en: "Consulting decides. Execution activates." },
    consultingPreview: { ar: "تشخيص التحديات، بناء خارطة نمو، ودعم القرار التنفيذي قبل توسيع النشاط.", en: "Diagnose the challenge, build a growth map, and support the executive decision before expanding activity." },
    executionPreview: { ar: "تحويل القرارات إلى حملات وأنظمة وتفعيل قابل للقياس — ثم تحسينه.", en: "Turn decisions into campaigns, systems and measurable activation — then improve them." },
    sectorsEyebrow: { ar: "خبرة تتكيف مع السياق", en: "Context matters" },
    sectorsTitle: { ar: "المنهجية واحدة. أسئلة القطاع مختلفة.", en: "One method. Different sector questions." },
    casesEyebrow: { ar: "دليل من العمل", en: "Evidence from the work" },
    casesTitle: { ar: "ما الذي تغيّر بعد القرار؟", en: "What changed after the decision?" },
    insightsEyebrow: { ar: "معرفة قابلة للاستخدام", en: "Knowledge for decisions" },
    insightsTitle: { ar: "أفكار تساعدك على رؤية التحدي بدقة", en: "Ideas that sharpen the business question" },
    closeEyebrow: { ar: "الخطوة التالية", en: "The next step" },
    closeTitle: { ar: "ابدأ بالتحدي.", en: "Start with the challenge." },
    closeText: { ar: "جلسة تشخيص لفهم الواقع وتحديد أوضح خطوة تالية — دون اختيار خدمة مسبقًا.", en: "A diagnostic session to understand the situation and name the clearest next step — without choosing a service in advance." },
    statementTitle: { ar: "خبرة عملية، لا شعارات.", en: "Hands-on experience, not slogans." },
    statementText: { ar: "أكثر من 18 عامًا في أسواق الخليج، تربط القرار بالتنفيذ والقياس — عبر قطاعات مختارة من سجل أوسع.", en: "18+ years in GCC markets, connecting decision to execution and measurement — across selected sectors from a broader record." }
  },
  about: {
    eyebrow: { ar: "من نحن", en: "About Elite Maison" },
    title: { ar: "النمو نظام قرارات، لا حملة منفردة", en: "Growth is a system of decisions, not a single campaign" },
    lead: { ar: "نربط ما يحدث في التسويق بما يحدث في المبيعات والتشغيل وتجربة العميل. هذه الرؤية هي ما يجعل القرار التجاري أوضح.", en: "We connect what happens in marketing to what happens in sales, operations and customer experience. That connection is what makes the commercial decision clearer." },
    whoEyebrow: { ar: "التموضع", en: "Positioning" },
    whoTitle: { ar: "ليست وكالة محتوى. وليست موردًا منفصلًا.", en: "Not a content agency. Not a disconnected supplier." },
    whoText: { ar: "Elite Maison بيت استشاري للتأثير التسويقي والأثر التجاري: تشخيص، استراتيجية، إدارة، إشراف على التنفيذ، وقياس لما يهم الأعمال.", en: "Elite Maison is a strategic house for marketing influence and business impact: diagnosis, strategy, management, execution oversight and measurement tied to the business." },
    pillarsTitle: { ar: "Four I's: مبادئ العلامة", en: "The Four I's: principles of the brand" },
    methodEyebrow: { ar: "منهجية التسليم", en: "Delivery method" },
    methodTitle: { ar: "نبدأ بالفهم ثم نتحرك", en: "Start with understanding, then move" },
    methodText: { ar: "Diagnose → Strategize → Execute → Measure & Improve. مسار عملي منفصل عن Four I's، حتى تبقى الفكرة والعملية واضحتين.", en: "Diagnose → Strategize → Execute → Measure & Improve. A practical path distinct from the Four I's, so brand principles and delivery stay clear." },
    engageEyebrow: { ar: "طرق التعاون", en: "Ways to engage" },
    engageTitle: { ar: "اختر مستوى المشاركة الذي يناسب التحدي", en: "Choose the level of involvement the challenge requires" },
    engageNote: { ar: "قد يبدأ التعاون بتشخيص محدد، أو يمتد من الاستراتيجية إلى التنفيذ، أو يركز على نظام يحتاج إلى بناء وإدارة.", en: "The work may begin with a defined diagnosis, extend from strategy into implementation, or focus on a system that needs to be built and managed." },
    ctaTitle: { ar: "إذا كان القرار مهمًا، فلنبدأ بفهمه", en: "When the decision matters, start by understanding it" }
  },
  consulting: {
    eyebrow: { ar: "الاستشارات", en: "Consulting" },
    title: { ar: "قرارات النمو التي تحتاج إلى تفكير قبل الحركة", en: "Growth decisions that deserve thought before motion" },
    lead: { ar: "من اتجاه النمو إلى السوق الجديد، نحلل ما يواجهه العمل ونحوّل التعقيد إلى أولوية وخارطة قرار قابلة للاستخدام.", en: "From growth direction to a new market, we examine the business question and turn complexity into a priority and a usable decision roadmap." },
    flowLabel: { ar: "كيف تتحول المسألة إلى قرار", en: "How a question becomes a decision" },
    ctaTitle: { ar: "بعد وضوح القرار، نحدد ما يلزم لتنفيذه", en: "Once the decision is clear, define what it takes to execute" }
  },
  execution: {
    eyebrow: { ar: "الحلول التنفيذية", en: "Execution solutions" },
    title: { ar: "حوّل الاتجاه إلى عمل يمكن متابعته", en: "Turn direction into work that can be managed" },
    lead: { ar: "نصل الاستراتيجية بالقنوات والأنظمة والتفعيل. كل قدرة تنفيذية هنا مرتبطة بهدف تجاري ومؤشر يمكن متابعته.", en: "We connect strategy to channels, systems and activation. Each execution capability is tied to a business objective and an indicator that can be followed." },
    chainLabel: { ar: "سلسلة التنفيذ", en: "The execution chain" },
    ctaTitle: { ar: "النتيجة تتضح داخل سياق السوق والقطاع", en: "Results become clearer inside market and sector context" }
  },
  sectors: {
    eyebrow: { ar: "خبرة القطاعات", en: "Sector experience" },
    title: { ar: "السياق يغيّر الأولوية", en: "Context changes the priority" },
    lead: { ar: "نفس القدرة لا تعني نفس الإجابة. نقرأ القطاع والسوق ورحلة العميل قبل تحديد ما يستحق الاستثمار.", en: "The same capability does not produce the same answer. We read the sector, market and customer journey before deciding where effort belongs." },
    ctaTitle: { ar: "الدليل يوضح كيف نترجم المنهجية", en: "The cases show how the method is applied" }
  },
  cases: {
    eyebrow: { ar: "قصص النجاح", en: "Case studies" },
    title: { ar: "العمل الجيد يترك أثرًا يمكن روايته", en: "Good work leaves a result worth explaining" },
    lead: { ar: "نقرأ كل قصة عبر التحدي والاستراتيجية والتنفيذ والنتيجة والدليل. الأسماء والأرقام هنا من المواد المقدمة وتحتاج اعتمادًا نهائيًا قبل النشر.", en: "Each case is read through challenge, strategy, execution, result and proof. Names and figures come from the supplied material and require final approval before publication." },
    note: { ar: "محتوى الحالات والأرقام خاضع للاعتماد التجاري والقانوني النهائي.", en: "Case content and figures remain subject to final commercial and legal approval." },
    ctaTitle: { ar: "بعد الدليل، يأتي السؤال التالي", en: "After the evidence comes the next question" }
  },
  insights: {
    eyebrow: { ar: "الرؤى", en: "Insights" },
    title: { ar: "معرفة تساعد صانع القرار", en: "Knowledge for better decisions" },
    lead: { ar: "مكتبة صغيرة ومقصودة حول النمو والإيراد والتوسع والأنظمة وتجربة العميل. لا أخبار؛ أسئلة عمل تستحق إجابة.", en: "A focused library on growth, revenue, expansion, systems and customer experience. No news feed; business questions worth answering." },
    ctaTitle: { ar: "حوّل الفكرة إلى نقاش حول عملك", en: "Turn the idea into a conversation about your business" }
  },
  contact: {
    eyebrow: { ar: "ابدأ الحوار", en: "Start the conversation" },
    title: { ar: "لا تحتاج إلى تسمية الحل قبل أن تشرح المشكلة", en: "You do not need to name the solution before explaining the problem" },
    lead: { ar: "اختر جلسة استشارية إذا كان التحدي واضحًا وتريد مناقشته، أو أرسل استفسارًا أوليًا إذا كنت ما زلت تستكشف الملاءمة.", en: "Choose a consultation when you have a defined challenge to discuss, or send an initial inquiry while you are still exploring the fit." },
    consultHint: { ar: "جلسة منظمة لفهم الوضع، الهدف، والقرار الذي يحتاج إلى وضوح.", en: "A focused conversation about the situation, objective and decision that needs clarity." },
    inquiryHint: { ar: "مسار أخف لسؤال أولي أو لمعرفة إن كان الحوار مناسبًا.", en: "A lighter path for an initial question or to understand whether a conversation is appropriate." },
    question: { ar: "ما الذي تحاولون حلّه؟", en: "What are you trying to solve?" }
  }
};

const EM_COPY = EM.COPY;
const serviceCopy = {
  growth: { ar: ["اتجاه النمو غير محسوم", "نحوّل فرص النمو المتفرقة إلى أولويات وخارطة عمل يستطيع الفريق استخدامها.", "قرار أوضح بشأن أين يركز العمل أولًا."], en: ["When growth direction is unresolved", "We turn scattered growth opportunities into priorities and a roadmap the team can use.", "A clearer decision about where effort belongs first."] },
  sales: { ar: ["الإيراد لا يعكس الإمكانات", "نفحص منظومة المبيعات ومسار التحويل ونحدد أين تتعطل الفرصة وأي مسار يستحق التطوير.", "فرص إيراد ومسارات تحويل أكثر تحديدًا."], en: ["When revenue sits below potential", "We examine the sales system and conversion path to identify where opportunity is lost and what to improve.", "Clearer revenue opportunities and conversion paths."] },
  expansion: { ar: ["الرغبة في التوسع تسبق الجاهزية", "نختبر السوق والقناة والنموذج والقدرة التشغيلية قبل أن يصبح الدخول قرارًا مكلفًا.", "قرار دخول مبني على جاهزية، لا على الحماس وحده."], en: ["When expansion comes before readiness", "We test the market, channel, model and operating capacity before entry becomes an expensive decision.", "An entry decision grounded in readiness, not appetite alone."] },
  product: { ar: ["العرض لا يواكب مرحلة الشركة", "نراجع القيمة والمنتج ونموذج العمل حتى يصبح مسار النمو أكثر قابلية للفهم والتوسع.", "عرض تجاري أوضح ونموذج أقرب إلى المرحلة."], en: ["When the offer no longer fits the stage", "We review value, product and business model so the path to growth is easier to understand and scale.", "A clearer commercial offer and a model suited to the stage."] },
  franchise: { ar: ["النجاح المحلي لا ينتقل بسهولة", "نبني معايير تشغيل وتجربة وعلامة تجعل النموذج أكثر قابلية للتكرار والامتياز.", "نموذج يمكن نقله دون فقدان اتساقه."], en: ["When local success does not travel", "We build operating, experience and brand standards that make the model more repeatable and franchise-ready.", "A model that can travel without losing consistency."] },
  "private-label": { ar: ["المنتج موجود، لكن طريقه إلى السوق غير واضح", "نربط المنتج والعلامة وقنوات التوزيع ضمن نموذج سوق ومسار نمو واحد.", "مسار توزيع ونمو يمكن اتخاذ قرار حوله."], en: ["When the product lacks a clear market path", "We connect product, brand and distribution into one market model and growth path.", "A distribution and growth path leaders can act on."] },
  journey: { ar: ["التجربة تعيق التحويل أو التكرار", "نرسم نقاط التفاعل ونكشف الاحتكاك الذي يجعل العميل يتردد أو ينقطع عن الرحلة.", "رحلة أوضح واحتكاك أقل عند النقاط الحاسمة."], en: ["When experience blocks conversion or return", "We map the touchpoints and expose the friction that makes customers hesitate or leave the journey.", "A clearer journey with less friction at decisive moments."] },
  executive: { ar: ["مبادرات النمو بلا مركز قرار", "ندعم القيادة التنفيذية في ترتيب المبادرات وربط الفرق ومؤشرات الأداء بالأولويات.", "نمو تتم إدارته كأولوية مشتركة، لا كقائمة مبادرات."], en: ["When growth initiatives lack a centre of decision", "We help leadership sequence initiatives and align teams and indicators around the priorities.", "Growth managed as a shared priority, not a list of initiatives."] }
};
EM.CONSULTING.forEach((item) => {
  const copy = serviceCopy[item.id];
  if (!copy) return;
  item.challenge = { ar: copy.ar[0], en: copy.en[0] };
  item.objective = { ar: copy.ar[1], en: copy.en[1] };
  item.measure = { ar: copy.ar[2], en: copy.en[2] };
});

const executionCopy = {
  performance: { ar: ["حوّل الإنفاق إلى مسار يمكن قياسه", "نربط الاستحواذ والتحويل والإنفاق بقراءة واحدة للأداء، بدل إدارة الحملات كجزء منفصل.", "العائد على الإنفاق التسويقي ومسار التحويل."], en: ["Turn spend into a measurable path", "We connect acquisition, conversion and spend into one performance view instead of treating campaigns as isolated activity.", "Return on marketing spend and the conversion path."] },
  campaigns: { ar: ["القنوات تقول أشياء مختلفة", "نوحّد الرسائل والعروض ومسارات التحويل عبر القنوات التي تخدم الهدف التجاري.", "اتساق الرسالة والمسار عبر القنوات."], en: ["When channels tell different stories", "We align messages, offers and conversion paths across the channels that serve the business objective.", "Consistency across message and path."] },
  systems: { ar: ["القرار يسبقُه بحثٌ يدوي متكرر", "نبني CRM ولوحات أداء وأدوات تشغيل تمنح الفريق متابعة أوضح وقرارًا أسرع.", "نظام متابعة ولوحة أداء مستخدمان في العمل اليومي."], en: ["When decisions depend on repeated manual work", "We build CRM, dashboards and operating tools that give teams clearer follow-up and faster decisions.", "A working follow-up system and performance dashboard."] },
  automation: { ar: ["العمل المتكرر يستهلك قدرة الفريق", "نحدد ما يستحق الأتمتة ونوظف AI حيث يحسن سير العمل، لا حيث يبدو لامعًا.", "كفاءة تشغيلية أوضح على المسارات المؤتمتة."], en: ["When repetitive work consumes the team", "We identify what deserves automation and apply AI where it improves the workflow, not where it merely looks impressive.", "Clearer operating efficiency on automated paths."] },
  branding: { ar: ["العلامة لا تعكس التموضع", "نطوّر الهوية والرسائل الإبداعية لتخدم العرض والسوق وتجربة العميل.", "اتساق الرسالة والهوية عبر نقاط التواصل."], en: ["When the brand does not reflect the position", "We develop identity and creative messaging that serve the offer, market and customer experience.", "Consistency across message and identity."] },
  activation: { ar: ["الإطلاق ليس نهاية العمل", "نحوّل الاستراتيجية إلى مبادرات، ثم نقرأ الأداء ونحسن القنوات والحملات باستمرار.", "تحسين مستمر مبني على قياس الأداء."], en: ["When launch is treated as the finish line", "We turn strategy into initiatives, then read performance and improve campaigns and channels continuously.", "Continuous improvement based on performance."] }
};
EM.EXECUTION.forEach((item) => {
  const copy = executionCopy[item.id];
  if (!copy) return;
  item.objective = { ar: copy.ar[0], en: copy.en[0] };
  item.scope = { ar: copy.ar[1], en: copy.en[1] };
  item.metrics = { ar: copy.ar[2], en: copy.en[2] };
});

EM.PILLARS = [
  { id: "insight", ar: "Insight", en: "Insight", text: { ar: "نرى ما وراء النشاط.", en: "See beyond activity." } },
  { id: "ideas", ar: "Ideas", en: "Ideas", text: { ar: "نحوّل الفهم إلى خيارات.", en: "Turn understanding into options." } },
  { id: "influence", ar: "Influence", en: "Influence", text: { ar: "نصنع حضورًا له وزن.", en: "Build influence with weight." } },
  { id: "impact", ar: "Impact", en: "Impact", text: { ar: "نربط العمل بما يمكن قياسه.", en: "Tie the work to what can be measured." } }
];

EM.CHALLENGES = [
  { id: "growth", href: "consulting.html#growth", ar: "لديكم فرص كثيرة ولا خارطة أولوية؟", en: "Too many opportunities, no clear priority?", dest: { ar: "الاستشارات", en: "Consulting" }, caseId: "attractive-smile" },
  { id: "sales", href: "consulting.html#sales", ar: "المبيعات تتحرك دون أن تقترب من الإمكانات؟", en: "Sales activity is moving below potential?", dest: { ar: "الإيراد والمبيعات", en: "Revenue and sales" }, caseId: "bloom" },
  { id: "expansion", href: "consulting.html#expansion", ar: "هل حان وقت سوق جديد فعلًا؟", en: "Is the business ready for a new market?", dest: { ar: "دخول الأسواق", en: "Market entry" }, caseId: "bin-ablan" },
  { id: "execution", href: "execution.html#performance", ar: "التسويق نشط، لكن أثره غير واضح؟", en: "Marketing is active, but its effect is unclear?", dest: { ar: "الحلول التنفيذية", en: "Execution solutions" }, caseId: "bloom" },
  { id: "systems", href: "execution.html#systems", ar: "هل يستهلك التشغيل وقت الفريق؟", en: "Is operations consuming the team's capacity?", dest: { ar: "الأنظمة والتشغيل", en: "Systems and operations" }, caseId: "bin-ablan" }
];

EM.METHOD = [
  { ar: { title: "نشخّص", text: "نحدد ما يحدث في الشركة والسوق ورحلة العميل قبل اقتراح الحل." }, en: { title: "Diagnose", text: "Understand what is happening across the business, market and customer journey before proposing a response." } },
  { ar: { title: "نرتّب", text: "نحوّل المعطيات إلى قرار وأولوية وخارطة يستطيع الفريق استخدامها." }, en: { title: "Strategize", text: "Turn the facts into a decision, a priority and a roadmap the team can use." } },
  { ar: { title: "ننفّذ", text: "نصل الاتجاه بالقنوات والأنظمة والمبادرات التي يحتاجها العمل." }, en: { title: "Execute", text: "Connect the direction to the channels, systems and initiatives the business needs." } },
  { ar: { title: "نقيس ونحسّن", text: "نقرأ الأداء والنتيجة التجارية، ثم نعدل المسار بوعي." }, en: { title: "Measure & improve", text: "Read performance and commercial outcome, then adjust the path deliberately." } }
];

EM.ABOUT = [
  { title: { ar: "خبرة ترى ما وراء النشاط", en: "Experience that sees beyond activity" }, text: { ar: "أكثر من 18 عامًا من الخبرة العملية تمنحنا سياقًا أوسع لقراءة السوق واتخاذ قرار أنضج.", en: "More than 18 years of hands-on experience provide a wider context for reading markets and making better-informed decisions." } },
  { title: { ar: "النمو شبكة مترابطة", en: "Growth is connected" }, text: { ar: "التسويق لا ينفصل عن المبيعات أو التشغيل أو تجربة العميل. أي قرار في طرف منها يغيّر النتيجة في الأطراف الأخرى.", en: "Marketing does not sit apart from sales, operations or customer experience. A decision in one changes the result in the others." } },
  { title: { ar: "الخليج ليس سوقًا واحدًا", en: "The GCC is not one market" }, text: { ar: "نركّز على أسواق الخليج ونحافظ على حساسية اختلاف القطاع والسوق والمرحلة بدل تطبيق وصفة واحدة.", en: "We focus on GCC markets while respecting differences in sector, market and stage rather than applying one formula." } },
  { title: { ar: "وضوح قبل التوسع", en: "Clarity before expansion" }, text: { ar: "نربط الأداء بالإيرادات ونصمم نطاق العمل حول السؤال الحقيقي، لا حول قائمة خدمات جاهزة.", en: "We connect performance to revenue and shape the scope around the real question, not a preset service list." } }
];

EM.ENGAGE = [
  { id: "advisory", kicker: "Advisory", title: { ar: "حين تحتاجون إلى قرار محدد", en: "When one decision needs clarity" }, text: { ar: "تشخيص وخارطة استراتيجية ودعم للقرار ضمن نطاق واضح.", en: "A defined diagnosis, strategy roadmap and decision support within a clear scope." } },
  { id: "end-to-end", kicker: "End-to-end", title: { ar: "حين يجب أن يصل القرار إلى التنفيذ", en: "When the decision must reach execution" }, text: { ar: "عمل مترابط من الاستراتيجية إلى التنفيذ والقياس والتحسين.", en: "Connected work from strategy through implementation, measurement and improvement." } },
  { id: "systems", kicker: "Custom systems", title: { ar: "حين يحتاج التشغيل إلى بنية", en: "When operations need structure" }, text: { ar: "نظام تشغيلي أو رقمي أو تقني يُبنى حول طريقة عمل الشركة الفعلية.", en: "An operating, digital or technology system built around how the company actually works." } },
  { id: "growth", kicker: "Growth management", title: { ar: "حين يصبح النمو مسؤولية مستمرة", en: "When growth needs ongoing leadership" }, text: { ar: "إدارة مبادرات النمو والتسويق والمبيعات والأنظمة ضمن أولويات ومؤشرات مشتركة.", en: "Ongoing leadership across growth, marketing, sales and systems around shared priorities and indicators." } }
];

const sectorCopy = {
  healthcare: {
    context: { ar: "الثقة ومسار الحجز وتجربة المريض هي الأسئلة التجارية قبل زيادة الإنفاق.", en: "Trust, the booking path and patient experience are commercial questions before spend increases." },
    challenges: { ar: "كيف يصبح الطلب أكثر استقرارًا؟", en: "How can demand become more stable?" },
    priorities: { ar: "وضوح العرض، حجز أقل احتكاكًا، ومتابعة للطلب.", en: "Clearer offer, lower-friction booking and demand follow-up." },
    journey: { ar: "من البحث عن اختصاص إلى الحجز والحضور والعودة.", en: "From finding a specialty to booking, attending and returning." }
  },
  fmcg: {
    context: { ar: "العلامة لا تنمو وحدها؛ التوزيع والتكرار ووضوحها في القناة جزء من القرار.", en: "A brand does not grow alone; distribution, repeat purchase and channel clarity are part of the decision." },
    challenges: { ar: "كيف نزيد الحضور والطلب عبر القنوات المناسبة؟", en: "How do we increase presence and demand through the right channels?" },
    priorities: { ar: "اختراق السوق، نمو العلامة، وقنوات توزيع أكثر فاعلية.", en: "Market penetration, brand growth and more effective distribution channels." },
    journey: { ar: "من التعرف إلى التجربة ثم إعادة الشراء.", en: "From recognition to trial and repeat purchase." }
  },
  hospitality: {
    context: { ar: "التجربة والنموذج التشغيلي يحددان إن كان النجاح قابلًا للتكرار.", en: "Experience and the operating model determine whether success can be repeated." },
    challenges: { ar: "كيف تتحول الزيارة إلى تكرار ونمو قابل للتوسع؟", en: "How does a visit become repeat business and scalable growth?" },
    priorities: { ar: "تجربة متسقة، تكرار الزيارة، وجاهزية للامتياز أو التوسع.", en: "Consistent experience, repeat visits and readiness to franchise or expand." },
    journey: { ar: "من الاكتشاف إلى الزيارة والتقييم ثم العودة.", en: "From discovery to visit, review and return." }
  },
  retail: {
    context: { ar: "القناة والسوق الجديد يفرضان قرارًا واضحًا قبل زيادة النشاط البيعي.", en: "Channel and market choice demand a clear decision before sales activity increases." },
    challenges: { ar: "أين نبيع، وكيف نوسع دون تشتيت القوة التجارية؟", en: "Where should we sell, and how do we expand without diluting commercial strength?" },
    priorities: { ar: "تطوير القنوات، رفع المبيعات، وجاهزية التوسع.", en: "Channel development, sales growth and expansion readiness." },
    journey: { ar: "من التوفر إلى القرار الشرائي وإعادة الطلب.", en: "From availability to purchase decision and reorder." }
  },
  ecommerce: {
    context: { ar: "كل خطوة بين الزيارة والدفع وإعادة الشراء تؤثر في قيمة العميل.", en: "Every step between visit, payment and repurchase affects customer value." },
    challenges: { ar: "أين يتوقف العميل قبل إتمام الشراء؟", en: "Where does the customer stop before purchase?" },
    priorities: { ar: "رفع التحويل، تبسيط رحلة الشراء، وزيادة قيمة العميل.", en: "Conversion growth, a simpler purchase journey and greater customer value." },
    journey: { ar: "من الزيارة الأولى إلى الشراء وإعادة الطلب.", en: "From first visit to purchase and reorder." }
  },
  education: {
    context: { ar: "العرض والبرنامج ومسار التسجيل أهم من حملة منفصلة لا تصل إلى قرار المتعلم.", en: "Offer, programme and enrolment path matter more than a campaign disconnected from the learner's decision." },
    challenges: { ar: "كيف يتحول الاهتمام إلى تسجيل واستمرار؟", en: "How does interest become enrolment and continuation?" },
    priorities: { ar: "اكتساب العملاء، نمو التسجيلات، وتطوير العروض والبرامج.", en: "Customer acquisition, enrolment growth and offer development." },
    journey: { ar: "من الاهتمام إلى التسجيل والحضور والاستمرار.", en: "From interest to enrolment, attendance and continuation." }
  }
};
EM.SECTORS.forEach((item) => {
  if (sectorCopy[item.id]) Object.assign(item, sectorCopy[item.id]);
});

const caseCopy = {
  "attractive-smile": {
    challenge: { ar: "كان الانتقال إلى مرحلة توسع أكثر تكاملًا يحتاج إلى طلب أكثر استقرارًا.", en: "Moving into a more integrated expansion phase required more stable demand." },
    strategy: { ar: "دعم التوسع بربط أوضح بين النمو والطلب.", en: "Support expansion through a clearer connection between growth and demand." },
    execution: { ar: "مساندة المرحلة التنفيذية التي قادت إلى استمرار الحجوزات.", en: "Support the execution phase that led to continued bookings." },
    result: { ar: "نمو ملحوظ في الإيرادات واستقرار الطلب، مع حجوزات متواصلة لمدة 12 يومًا.", en: "Revenue growth and more stable demand, with bookings sustained for 12 consecutive days." },
    proof: { ar: "حجوزات متواصلة لمدة 12 يومًا.", en: "12 consecutive days of bookings." }
  },
  bloom: {
    challenge: { ar: "نموذج النمو وقنوات البيع لم يكونا يعكسان المسار الممكن للعلامة.", en: "The growth model and sales channels were not reflecting the brand's possible path." },
    strategy: { ar: "إعادة تصميم نموذج النمو حول قنوات بيع أوضح.", en: "Redesign the growth model around clearer sales channels." },
    execution: { ar: "تطوير القنوات ومتابعة الانتقال في الإيرادات.", en: "Develop the channels and track the revenue progression." },
    result: { ar: "انتقل الأداء من 18 ألف درهم في الربع الأول إلى 40 ألفًا، ثم إلى متوسط 65 ألف درهم شهريًا.", en: "Performance moved from AED 18K in Q1 to AED 40K, then to an average of AED 65K per month." },
    proof: { ar: "متوسط 65 ألف درهم شهريًا.", en: "AED 65K average monthly." }
  },
  "bin-ablan": {
    challenge: { ar: "كان التوسع الإقليمي وقنوات التوزيع الجديدة يتطلبان اتجاهًا واحدًا.", en: "Regional expansion and new distribution channels required one clear direction." },
    strategy: { ar: "تطوير استراتيجية توسع إقليمي.", en: "Develop a regional expansion strategy." },
    execution: { ar: "فتح أسواق جديدة وتطوير قنوات توزيع.", en: "Open new markets and develop distribution channels." },
    result: { ar: "فتح أسواق في كندا وعُمان والكويت والسعودية وليبيا، إلى جانب قنوات توزيع جديدة.", en: "New markets opened in Canada, Oman, Kuwait, Saudi Arabia and Libya, alongside new distribution channels." },
    proof: { ar: "دخول أسواق في خمس دول.", en: "Market entry across five countries." }
  },
  patchouli: {
    challenge: { ar: "احتاج نموذج المقهى إلى قابلية أكبر للتكرار والامتياز التجاري.", en: "The café model needed greater repeatability and franchise readiness." },
    strategy: { ar: "إعادة بناء النموذج ليحمل التوسع والامتياز.", en: "Develop the model to support scale and franchising." },
    execution: { ar: "تطوير نموذج أكثر قابلية للتكرار والاستدامة.", en: "Develop a more repeatable and sustainable model." },
    result: { ar: "الوصول إلى 11 فرع امتياز تجاري وبناء نموذج قابل للتوسع.", en: "Reach 11 franchise branches and build a model designed to scale." },
    proof: { ar: "11 فرع Franchise.", en: "11 franchise branches." }
  },
  "ai-brains": {
    challenge: { ar: "كانت الفكرة تحتاج إلى صياغة تجعل قيمتها وتطبيقها قابلين للفهم والقياس.", en: "The concept needed to be shaped into something clear, applicable and measurable." },
    strategy: { ar: "تحويل الفكرة إلى مشروع واضح القيمة.", en: "Shape the idea into a project with clear value." },
    execution: { ar: "تطوير مشروع حلول ذكاء اصطناعي قابل للتطبيق والقياس.", en: "Develop an AI solutions project that could be applied and measured." },
    result: { ar: "مشروع واضح القيمة وقابل للتطبيق والقياس.", en: "A clear, applicable and measurable project." },
    proof: { ar: "جائزة أفضل مشروع داعم للذكاء الاصطناعي.", en: "Award for Best AI-Supporting Project." }
  }
};
EM.CASES.forEach((item) => {
  if (caseCopy[item.id]) Object.assign(item, caseCopy[item.id]);
});

const insightCopy = {
  "growth-guide": {
    title: { ar: "متى تصبح خارطة النمو أداة قرار؟", en: "When does a growth roadmap become a decision tool?" },
    summary: { ar: "الخارطة المفيدة لا تُحفظ في عرض تقديمي؛ تُرتب الأولويات وتحدد ما الذي يفعله الفريق بعد ذلك.", en: "A useful roadmap does not live in a presentation. It orders priorities and makes the next team decision clear." }
  },
  "sales-article": {
    title: { ar: "أين يتعطل الطريق بين الاهتمام والإيراد؟", en: "Where does the path from interest to revenue break?" },
    summary: { ar: "حين لا تعكس المبيعات الإمكانات، لا يكفي زيادة النشاط. يجب قراءة العرض والمسار والتسليم بين الفرق.", en: "When sales sit below potential, more activity is not enough. Read the offer, the path and the handoff between teams." }
  },
  "expansion-brief": {
    title: { ar: "أسئلة يجب حسمها قبل دخول سوق جديد", en: "Questions to settle before entering a new market" },
    summary: { ar: "اختيار السوق خطوة واحدة فقط. الجاهزية والقناة والنموذج والقدرة على التشغيل تحدد ما إذا كان التوسع قابلًا للحياة.", en: "Choosing a market is only one step. Readiness, channel, model and operating capacity decide whether expansion can hold." }
  },
  "ai-insight": {
    title: { ar: "من فكرة AI إلى قيمة تشغيلية", en: "From an AI idea to operating value" },
    summary: { ar: "لا تبدأ التقنية من الأداة. تبدأ من سير عمل واضح ونتيجة تستحق أن تتحسن.", en: "Technology should not start with the tool. It should start with a workflow and an outcome worth improving." }
  },
  "cx-check": {
    title: { ar: "أين تخلق رحلة العميل احتكاكًا؟", en: "Where is the customer journey creating friction?" },
    summary: { ar: "الاحتكاك يظهر في الانتظار والغموض والتسليم المتقطع. قراءته بدقة تحمي التحويل والولاء.", en: "Friction appears in waiting, ambiguity and broken handoffs. Reading it clearly protects conversion and loyalty." }
  }
};
EM.INSIGHTS.forEach((item) => {
  if (insightCopy[item.id]) Object.assign(item, insightCopy[item.id]);
});

const insightSections = {
  "growth-guide": [
    [{ ar: "الخارطة ليست وثيقة أرشيف", en: "A roadmap is not an archive" }, { ar: "إذا لم تغيّر الخارطة ما يقرره الفريق هذا الأسبوع، فهي لم تتحول إلى أداة عمل.", en: "If the roadmap does not change what the team decides this week, it has not become a working tool." }],
    [{ ar: "ما الذي يجب أن تحسمه", en: "What it must settle" }, { ar: "الأولوية والقرار ومسار التنفيذ ومؤشر القراءة؛ أربعة عناصر تجعل النمو قابلًا للإدارة لا مجرد نية.", en: "Priority, decision, execution path and a reading indicator make growth manageable rather than aspirational." }]
  ],
  "sales-article": [
    [{ ar: "النشاط ليس الإيراد", en: "Activity is not revenue" }, { ar: "قد تكون القنوات مشغولة بينما يفقد العميل وضوح العرض أو سهولة الانتقال إلى القرار.", en: "Channels can be busy while customers lose clarity about the offer or ease of moving to a decision." }],
    [{ ar: "اقرأ المسار كاملًا", en: "Read the whole path" }, { ar: "اربط الرسالة والتسليم والمتابعة بالمبيعات، ثم حدد نقطة الاحتكاك بدل إضافة نشاط جديد.", en: "Connect message, handoff and follow-up to sales, then locate friction before adding more activity." }]
  ],
  "expansion-brief": [
    [{ ar: "السوق ليس السؤال الوحيد", en: "The market is not the only question" }, { ar: "الجاهزية والقناة والنموذج والقدرة التشغيلية تحدد ما إذا كان الدخول خطوة منطقية.", en: "Readiness, channel, model and operating capacity determine whether entry is a sound step." }],
    [{ ar: "التأخير قد يكون قرارًا", en: "Delay can be a decision" }, { ar: "التوسع المنضبط يبدأ بتحديد ما ينقص قبل أن يصبح التأخير تكلفة أقل من الدخول المبكر.", en: "Disciplined expansion identifies what is missing before delay becomes less costly than premature entry." }]
  ],
  "ai-insight": [
    [{ ar: "ابدأ بسير العمل", en: "Start with the workflow" }, { ar: "الفكرة لا تصبح مشروعًا حتى ترتبط بعمل متكرر ونتيجة يمكن ملاحظتها وقياسها.", en: "An idea is not a project until it is tied to repetitive work and an observable, measurable outcome." }],
    [{ ar: "التقنية تخدم القرار", en: "Technology serves the decision" }, { ar: "الأتمتة وAI مفيدان حين يختصران الطريق إلى عمل أدق أو قرار أسرع.", en: "Automation and AI matter when they shorten the path to better work or a faster decision." }]
  ],
  "cx-check": [
    [{ ar: "الاحتكاك إشارة تشغيل", en: "Friction is an operating signal" }, { ar: "الانتظار والغموض والتسليم المتقطع تكشف أين تفقد الرحلة قدرتها على التحويل أو التكرار.", en: "Waiting, ambiguity and broken handoffs reveal where the journey loses its ability to convert or create repeat business." }],
    [{ ar: "ما الذي يستحق الإصلاح", en: "What deserves fixing" }, { ar: "ابدأ بالنقطة التي يتوقف عندها العميل، ثم أصلح المسار لا مظهره فقط.", en: "Start where the customer stops, then repair the path rather than its appearance alone." }]
  ]
};
EM.INSIGHTS.forEach((item) => {
  if (insightSections[item.id]) item.sections = insightSections[item.id].map(([heading, text]) => ({ heading, text }));
});
