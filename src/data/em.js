/* Elite Maison — bilingual content. Source-backed only. Do not invent clients, metrics, or contact details. */
export const EM = {};

EM.CONFIG = {
  /*
   * PUBLIC LAUNCH GATE
   * publicationApproved is true so this site can show named cases and figures in client review.
   * Before any public launch, confirm legal/commercial approval of client names and metrics.
   * If approval is not final: set publicationApproved to false (or anonymizeCases to true).
   * That one switch hides public names and standalone metrics across the site.
   */
  publicationApproved: true,
  anonymizeCases: false,
  storageKey: "em-lang",
  siteUrl: "https://www.elitemaisonmarketing.com",
  contact: {
    email: "ceo@elitemaisonmarketing.com",
    phone: "+971 55 540 0705",
    phoneHref: "tel:+971555400705",
    whatsappHref: "https://wa.me/971555400705",
    website: "https://www.elitemaisonmarketing.com",
    websiteLabel: "www.elitemaisonmarketing.com",
    // FormSubmit AJAX endpoint for the public inquiry inbox. No secret needed.
    formsubmitUrl: "https://formsubmit.co/ajax/ceo@elitemaisonmarketing.com"
  }
};

/* The two commercial paths stay visible together; secondary pages remain discoverable without a catch-all menu. */
EM.NAV_PRIMARY = [
  { href: "index.html", id: "home", ar: "الرئيسية", en: "Home" },
  { href: "about.html", id: "about", ar: "من نحن", en: "About" },
  { href: "consulting.html", id: "consulting", ar: "الاستشارات", en: "Consulting" },
  { href: "execution.html", id: "execution", ar: "التنفيذ", en: "Execution" },
  { href: "sectors.html", id: "sectors", ar: "القطاعات", en: "Sectors" },
  { href: "cases.html", id: "cases", ar: "الدليل", en: "Proof" },
  { href: "insights.html", id: "insights", ar: "الرؤى", en: "Insights" }
];

/* Kept as an extension point for genuinely secondary destinations; it is empty by design. */
EM.NAV_MORE = [];

EM.NAV = [
  ...EM.NAV_PRIMARY,
  { href: "contact.html", id: "contact", ar: "تواصل معنا", en: "Contact" }
];

EM.I18N = {
  ar: {
    skip: "تجاوز إلى المحتوى",
    navLabel: "التنقل الرئيسي",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
    langTo: "Switch to English",
    langBtn: "EN",
    bookCta: "أرسلوا استفسارًا للاستشارة",
    bookShort: "أرسلوا استفسارًا",
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
    breadcrumb: "مسار الصفحة",
    required: "يرجى تعبئة هذا الحقل.",
    invalidEmail: "أدخل بريدًا إلكترونيًا صالحًا.",
    validation: "يرجى مراجعة الحقول المطلوبة.",
    photoNote: "مساحة تصوير معتمدة — قيادات حقيقية، إضاءة معمارية، وتفاصيل العمل الاستراتيجي. بانتظار أصول معتمدة.",
    viewCase: "اقرأوا الحالة",
    readInsight: "اقرأوا الرؤية",
    related: "مرتبط",
     relatedCapabilities: "قدرات ذات صلة",
     relatedSector: "القطاع ذو الصلة",
     nextInsight: "الرؤية التالية",
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
    consultationPath: "أرسلوا استفسارًا للاستشارة",
    inquiryPath: "أرسل استفسارًا",
    pathLabel: "مسار التواصل",
    emailChannelLabel: "البريد الإلكتروني",
    phoneChannelLabel: "الهاتف",
    whatsappChannelLabel: "واتساب",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني للعمل",
    phoneLabel: "الهاتف / واتساب",
    companyLabel: "اسم الشركة",
    messageLabel: "الرسالة",
    industryLabel: "القطاع",
    marketLabel: "الدولة / السوق",
    challengeLabel: "التحدي الرئيسي",
    outcomeLabel: "الهدف التجاري المطلوب",
    inquiryLabel: "الاستفسار",
    submitCta: "ناقش الفرصة مع مستشار",
    submitInquiryCta: "أرسل الاستفسار",
    contactTime: "في الإنتاج: رسالة تأكيد، الخطوة التالية، وإطار زمني متوقع للرد.",
    serviceNav: "فهرس الخدمات",
    sectorNav: "فهرس القطاعات",
    caseIndex: "فهرس القصص",
    notFound: "الصفحة التي تبحث عنها غير موجودة.",
    backHome: "العودة إلى الرئيسية",
    goPath: "انتقل إلى المسار",
    relatedCase: "قصة ذات صلة",
    relatedExecution: "حل تنفيذي مرتبط",
    relatedConsulting: "قدرة استشارية مرتبطة",
    errorSummary: "هناك حقول تحتاج مراجعة",
    progressLabel: "تقدم الصفحة",
    featured: "قصة بارزة",
    challengesNav: "اختيار التحدي",
    fourIs: "Four I's. One Vision.",
    dockOpen: "تواصل معنا",
    dockClose: "إغلاق قنوات التواصل",
    heroInquiry: "لديك استفسار؟",
    dockPanel: "قنوات التواصل",
    dockWhatsapp: "واتساب",
    dockEmail: "البريد",
    dockPhone: "اتصال"
  },
  en: {
    skip: "Skip to content",
    navLabel: "Primary navigation",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langTo: "التبديل إلى العربية",
    langBtn: "ع",
    bookCta: "Send a consultation inquiry",
    bookShort: "Send an inquiry",
    exploreCta: "Explore consulting",
    exploreProof: "Explore the proof",
    moreLabel: "More",
    moreClose: "Close",
    doorsLabel: "Two paths",
    proofBar: "Grounds for trust",
    situationsLabel: "If this is your situation",
    exploreExecution: "Explore execution",
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
    breadcrumb: "Breadcrumb",
    required: "Please complete this field.",
    invalidEmail: "Enter a valid email address.",
    validation: "Please review the required fields.",
    photoNote: "Approved photography slot — executive humanity, architectural light, and craft of strategic work. Awaiting approved assets.",
    viewCase: "Read the case",
    readInsight: "Read the insight",
    related: "Related",
     relatedCapabilities: "Related capabilities",
     relatedSector: "Related sector",
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
    consultationPath: "Send a consultation inquiry",
    inquiryPath: "Send an inquiry",
    pathLabel: "Contact path",
    emailChannelLabel: "Email",
    phoneChannelLabel: "Phone",
    whatsappChannelLabel: "WhatsApp",
    nameLabel: "Full name",
    emailLabel: "Business email",
    phoneLabel: "Phone / WhatsApp",
    companyLabel: "Company name",
    messageLabel: "Message",
    industryLabel: "Industry",
    marketLabel: "Country / market",
    challengeLabel: "Primary challenge",
    outcomeLabel: "Desired business outcome",
    inquiryLabel: "Your inquiry",
    submitCta: "Discuss the opportunity with a consultant",
    submitInquiryCta: "Send the inquiry",
    contactTime: "In production: confirmation, a defined next step, and an expected response time.",
    serviceNav: "Service index",
    sectorNav: "Sector index",
    caseIndex: "Case index",
    notFound: "The page you are looking for does not exist.",
    backHome: "Back to home",
    goPath: "Go to this path",
    relatedCase: "Related case",
    relatedExecution: "Related execution solution",
    relatedConsulting: "Related consulting capability",
    errorSummary: "These fields need review",
    progressLabel: "Page progress",
    featured: "Featured story",
    challengesNav: "Choose a challenge",
    fourIs: "Four I's. One Vision.",
    dockOpen: "Contact us",
    dockClose: "Close contact options",
    heroInquiry: "Have a question?",
    dockPanel: "Contact channels",
    dockWhatsapp: "WhatsApp",
    dockEmail: "Email",
    dockPhone: "Call"
  }
};

EM.PAGES = {
  home: {
    title: { ar: "النمو لا يحتاج دائمًا إلى مزيد من التسويق | استشارات نمو وتسويق | Elite Maison", en: "Elite Maison | Growth & Marketing Consultancy in GCC Markets" },
    description: { ar: "استشارات نمو وتسويق في أسواق الخليج تربط التشخيص والاستراتيجية بالمبيعات والتنفيذ والقياس لتحويل القرارات إلى تقدم قابل للمتابعة.", en: "Growth and marketing consultancy in GCC markets connecting diagnosis, strategy, sales, execution and measurement to turn decisions into trackable progress." }
  },
  about: {
    title: { ar: "التسويق لا يعمل في فراغ. والمشكلة لا تفعل كذلك | عن Elite Maison", en: "About Elite Maison | Growth & Marketing Consultancy in the GCC" },
    description: { ar: "تعرفوا إلى Elite Maison ومنهجها في ربط التسويق بالنمو والمبيعات والتشغيل وتجربة العميل بخبرة عملية في أسواق الخليج.", en: "Meet Elite Maison and its approach to connecting marketing with growth, sales, operations and customer experience across GCC markets." }
  },
  consulting: {
    title: { ar: "قبل أن تتحركوا أسرع، احسموا أين يستحق العمل أن يتحرك | استشارات نمو وتسويق | Elite Maison", en: "Growth & Marketing Consulting | Clearer Decisions Before More Activity | Elite Maison" },
    description: { ar: "استشارات في النمو والمبيعات والتوسع والمنتج وتجربة العميل تساعد الشركات على تشخيص العوائق وترتيب الأولويات وبناء مسار عمل واضح.", en: "Consulting across growth, sales, market expansion, product and customer experience to diagnose constraints, set priorities and build a usable path forward." }
  },
  execution: {
    title: { ar: "الاستراتيجية لا تصبح حقيقية في العرض. تصبح حقيقية في يوم العمل | تنفيذ تسويقي | Elite Maison", en: "Marketing Execution | From Strategy to Measurable Operations | Elite Maison" },
    description: { ar: "تنفيذ يربط التسويق بالأداء والحملات والأنظمة والأتمتة والهوية، مع متابعة وقياس وتحسين مستمر يخدم نتيجة تجارية واضحة.", en: "Execution across performance marketing, campaigns, systems, automation and brand, with measurement and improvement tied to a clear commercial outcome." }
  },
  sectors: {
    title: { ar: "القطاع يغيّر السؤال قبل أن يغيّر الحل | خبرة قطاعات | Elite Maison", en: "Sector Experience | Different Context, Different Decision | Elite Maison" },
    description: { ar: "خبرة مختارة في الرعاية الصحية والمنتجات الاستهلاكية والضيافة والتجزئة والتجارة الإلكترونية والتعليم، مع قراءة كل قطاع ضمن سياقه التجاري.", en: "Selected experience across healthcare, FMCG, hospitality, retail, e-commerce and education, with each sector read through its commercial context." }
  },
  cases: {
    title: { ar: "الدليل ونتائج العمل | حالات نمو وتسويق مختارة | Elite Maison", en: "Proof & Case Studies | Selected Growth and Marketing Work | Elite Maison" },
    description: { ar: "حالات مختارة تعرض التحدي والقرار والتنفيذ والنتيجة التي يمكن إثباتها بالمعلومات المعتمدة، من دون تحويل الموقع إلى معرض شعارات.", en: "Selected cases showing the challenge, decision, execution and evidence supported by approved information — not a gallery of logos." }
  },
  case: {
    title: { ar: "قصة من العمل | Elite Maison", en: "A working case | Elite Maison" },
    description: { ar: "تحدٍ، اتجاه استراتيجي، تنفيذ، نتيجة، ودليل من المصادر المعتمدة.", en: "Challenge, strategic direction, execution, result and proof from approved sources." }
  },
  insights: {
    title: { ar: "رؤى النمو والتسويق | أفكار لصنع قرار أفضل | Elite Maison", en: "Growth & Marketing Insights | Thinking for Better Decisions | Elite Maison" },
    description: { ar: "رؤى عملية عن النمو والإيراد والتوسع والذكاء الاصطناعي وتجربة العميل، مكتوبة لصانع القرار لا لمجرد نشر محتوى جديد.", en: "Practical thinking on growth, revenue, expansion, AI and customer experience, written for decision-makers rather than content volume." }
  },
  insight: {
    title: { ar: "خلاصة قرار | Elite Maison", en: "A decision brief | Elite Maison" },
    description: { ar: "إجابة مباشرة من مكتبة Elite Maison لصانع القرار.", en: "A direct answer from the Elite Maison library for a decision-maker." }
  },
  contact: {
    title: { ar: "تواصل وابدأ استشارة | Elite Maison", en: "Contact Elite Maison for a Consultation" },
    description: { ar: "أرسلوا استفسارًا لفريق Elite Maison ليتابع معكم، أو تواصلوا مباشرة عبر واتساب أو البريد أو الهاتف.", en: "Send an inquiry for the Elite Maison team to follow up, or contact us directly by WhatsApp, email or phone." }
  }
};


/* Curated next steps only; an empty entry is intentional when no strong continuation exists. */
EM.CONTEXTUAL_PATHS = {
  growth: "execution.html#performance",
  sales: "execution.html#campaigns",
  journey: "execution.html#campaigns",
  executive: "execution.html#systems",
  franchise: "execution.html#activation",
  performance: "consulting.html#growth",
  campaigns: "consulting.html#sales",
  systems: "consulting.html#executive",
  automation: "consulting.html#product",
  branding: "consulting.html#product",
  activation: "consulting.html#journey"
};

EM.CASE_LINKS = {
  healthcare: ["attractive-smile"],
  fmcg: ["bloom"],
  hospitality: ["patchouli"],
  retail: ["bin-ablan"],
  growth: ["attractive-smile", "bloom"],
  sales: ["bloom", "bin-ablan"],
  expansion: ["bin-ablan"],
  franchise: ["patchouli"],
  product: ["patchouli", "ai-brains"],
  performance: ["bloom"],
  campaigns: ["attractive-smile"],
  automation: ["ai-brains"]
};

EM.CASE_SEQUENCE = ["patchouli", "attractive-smile", "bloom", "bin-ablan", "ai-brains"];
EM.INSIGHT_SEQUENCE = ["growth-guide", "sales-article", "expansion-brief", "gcc-market-entry-readiness", "ai-insight", "cx-check"];


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
  { id: "growth", title: { ar: "استشارات النمو وتطوير الأعمال", en: "Growth & Business Development" }, challenge: { ar: "الفرص كثيرة، لكن لا يوجد اتفاق واضح على ما يجب أن يأتي أولًا.", en: "There are several possible growth opportunities, but no clear agreement on what should come first." }, objective: { ar: "تحديد مصادر النمو وترتيب الأولويات بوضوح.", en: "Identify the strongest growth opportunities and set clear priorities." }, scope: { ar: "قراءة الوضع الحالي، فرص النمو، والأعمال التي تستحق التركيز.", en: "Review the current position, growth opportunities and the work that deserves focus." }, role: { ar: "تحويل الطموح إلى اختيارات واضحة يستطيع الفريق العمل عليها.", en: "Turn ambition into clear choices the team can act on." }, measure: { ar: "أولويات محددة وخارطة قابلة للاستخدام، لا وثيقة للعرض.", en: "Defined priorities and a roadmap built to be used, not just presented." } },
  { id: "sales", title: { ar: "تطوير المبيعات وتوليد الإيرادات", en: "Sales & Revenue Development" }, challenge: { ar: "يوجد نشاط واهتمام، لكن جزءًا كبيرًا منه لا يصل إلى إيراد كما ينبغي.", en: "There is activity and interest — so where is revenue being lost?" }, objective: { ar: "معرفة أين يتعطل التحويل وكيف يمكن تحسينه قبل زيادة الإنفاق.", en: "Find where conversion breaks down and how to improve it before increasing spend." }, scope: { ar: "العرض، مراحل البيع، نقاط الاحتكاك بين الخطوات، وفرص الإيراد.", en: "The offer, sales stages, friction points between steps and revenue opportunities." }, role: { ar: "ربط عمل المبيعات برحلة العميل وهدف النمو بدل قياس النشاط وحده.", en: "Connect sales activity to the customer journey and the growth objective rather than measuring activity alone." }, measure: { ar: "مسار بيع أوضح، ونقاط تحسين محددة يمكن متابعتها.", en: "A clearer sales path and defined improvement points that can be followed." } },
  { id: "expansion", title: { ar: "التوسع ودخول الأسواق", en: "Market Expansion & Entry" }, challenge: { ar: "السوق الجديد يبدو واعدًا، لكن سؤال الجاهزية وطريقة الدخول لم يُحسم.", en: "The new market looks promising, but readiness and the route to entry are still unresolved." }, objective: { ar: "اختبار منطق التوسع قبل الالتزام بالموارد: السوق، القناة، النموذج، والقدرة التشغيلية.", en: "Test the logic of expansion before committing resources: market, channel, model and operating capacity." }, scope: { ar: "الجاهزية، اختيار السوق، نموذج الدخول، القنوات والأولويات.", en: "Readiness, market selection, entry model, channels and priorities." }, role: { ar: "تحويل التوسع من رغبة إلى قرار مبني على معايير.", en: "Turn expansion from an ambition into a decision based on clear criteria." }, measure: { ar: "قرار دخول واضح وشروط نجاح معروفة قبل الإطلاق.", en: "A clear entry decision and known conditions for success before launch." }, relatedInsights: ["gcc-market-entry-readiness"] },
  { id: "product", title: { ar: "تطوير المنتجات ونماذج الأعمال", en: "Product & Business Model Development" }, challenge: { ar: "العرض الحالي لا يعكس أفضل قيمة يمكن تقديمها، أو يصعب توسيعه دون تعقيد.", en: "The current offer does not express the strongest value the business can provide, or becomes harder to scale as it grows." }, objective: { ar: "تحسين القيمة المقدمة وجعل النموذج أنسب للمرحلة التالية من النمو.", en: "Strengthen the value proposition and make the model better suited to the next stage of growth." }, scope: { ar: "المنتج أو الخدمة، القيمة المقدمة، وبنية نموذج العمل.", en: "The product or service, value proposition and business-model structure." }, role: { ar: "مواءمة ما تبيعه الشركة مع ما يستطيع السوق فهمه وتبنيه.", en: "Align what the business sells with what the market can understand and adopt." }, measure: { ar: "عرض أوضح ونموذج أكثر قابلية للتوسع.", en: "A clearer offer and a model better able to scale." } },
  { id: "franchise", title: { ar: "تطوير أنظمة الامتياز التجاري", en: "Franchise Systems Development" }, challenge: { ar: "نجاح الفرع الأول لا يعني أن التجربة يمكن تكرارها بالجودة نفسها عند التوسع.", en: "A successful first location does not automatically mean the experience can be repeated at the same standard as the business expands." }, objective: { ar: "تحويل النجاح المحلي إلى نموذج يمكن نقله.", en: "Turn local success into a model that can be transferred." }, scope: { ar: "معايير التشغيل، تجربة العميل، ومتطلبات العلامة.", en: "Operating standards, customer experience and brand requirements." }, role: { ar: "تحديد ما يجب أن يبقى ثابتًا وما يمكن تكييفه عند التوسع.", en: "Define what must stay consistent and what can adapt as the business expands." }, measure: { ar: "نموذج تشغيل وتجربة يمكن تكرارهما بثبات عند التوسع.", en: "An operating model and customer experience that can be repeated consistently as the business expands." } },
  { id: "private-label", title: { ar: "تطوير مشاريع العلامات الخاصة", en: "Private Label Development" }, challenge: { ar: "المنتج موجود، لكن طريقه إلى السوق والتوزيع والنمو غير محسوم.", en: "The product exists, but its route to market, distribution and growth is not yet settled." }, objective: { ar: "تحديد منطق أوضح للعلامة ومسارها التجاري قبل توسيع النشاط.", en: "Define a clearer commercial logic for the brand and its route to market before expanding activity." }, scope: { ar: "العرض، السوق، قنوات التوزيع، ومسار النمو.", en: "The offer, market, distribution channels and growth path." }, role: { ar: "ربط المنتج بقناة وسياق تجاري يمكن دعمهما.", en: "Connect the product to a channel and commercial context that can be supported." }, measure: { ar: "مسار سوق وتوزيع محدد يمكن البناء عليه.", en: "A defined market and distribution path the business can build on." } },
  { id: "journey", title: { ar: "تصميم رحلة العميل وتحسين التجربة", en: "Customer Journey & Experience" }, challenge: { ar: "العميل يواجه احتكاكًا بين الاهتمام والشراء، أو بين الشراء والعودة.", en: "Customers face friction between interest and purchase, or between purchase and return." }, objective: { ar: "تقليل الاحتكاك وتحسين اللحظات التي تؤثر في التحويل والولاء.", en: "Reduce friction and improve the moments that influence conversion and loyalty." }, scope: { ar: "نقاط التفاعل، الانتقالات بين الفرق، ومسار العميل.", en: "Touchpoints, handoffs between teams and the customer path." }, role: { ar: "جعل التجربة جزءًا من الأداء التجاري، لا طبقة تجميل.", en: "Make experience part of commercial performance, not a cosmetic layer." }, measure: { ar: "رحلة أبسط ونقاط احتكاك محددة يمكن تحسينها.", en: "A simpler journey and defined friction points that can be improved." } },
  { id: "executive", title: { ar: "الإدارة التنفيذية للنمو", en: "Executive Growth Management" }, challenge: { ar: "مبادرات النمو موزعة بين فرق متعددة، ولا أحد يملك الصورة كاملة.", en: "Growth initiatives are spread across teams, with no single view of the whole picture." }, objective: { ar: "توحيد الأولويات والمتابعة حول هدف تجاري مشترك بدل تشتت المبادرات.", en: "Align priorities and follow-up around a shared commercial objective instead of scattered initiatives." }, scope: { ar: "إدارة المبادرات، التنسيق بين الفرق، ومؤشرات الأداء.", en: "Initiative management, cross-team coordination and performance indicators." }, role: { ar: "إبقاء القرارات والتنفيذ في مسار واحد مع متابعة مستمرة.", en: "Keep decisions and execution on the same path with ongoing oversight." }, measure: { ar: "أولويات ومؤشرات واضحة، ومسؤولية تنفيذ يمكن تتبعها.", en: "Clear priorities and indicators, with execution ownership that can be tracked." } }
];

EM.EXECUTION = [
  { id: "performance", title: { ar: "التسويق القائم على الأداء", en: "Performance Marketing" }, objective: { ar: "جلب طلب قابل للقياس وتحسين كفاءة الإنفاق.", en: "Generate measurable demand and improve the efficiency of spend." }, scope: { ar: "تخطيط وإدارة الحملات المدفوعة ومسارات التحويل.", en: "Plan and manage paid campaigns and conversion paths." }, impact: { ar: "قرارات إنفاق مرتبطة بما يقترب من النتيجة التجارية.", en: "Spending decisions tied more closely to commercial outcomes." }, metrics: { ar: "الاكتساب، التحويل، والعائد على الإنفاق وفق ما يناسب الحالة.", en: "Acquisition, conversion and return on spend, according to the business context." } },
  { id: "campaigns", title: { ar: "إدارة الحملات والقنوات الرقمية", en: "Campaign & Digital Channel Management" }, objective: { ar: "توحيد الرسالة والعرض ومسار التحويل عبر القنوات.", en: "Align the message, offer and conversion path across channels." }, scope: { ar: "تخطيط الحملات، تشغيل القنوات، ومتابعة الأداء.", en: "Campaign planning, channel execution and performance follow-up." }, impact: { ar: "تجربة أكثر اتساقًا من أول تفاعل حتى الخطوة التالية.", en: "A more consistent experience from first interaction to the next action." }, metrics: { ar: "أداء القنوات ومسار التحويل والمؤشرات المتفق عليها.", en: "Channel performance, conversion-path performance and the agreed indicators." } },
  { id: "systems", title: { ar: "أنظمة إدارة الأعمال والتشغيل التسويقي", en: "Business Systems & Marketing Operations" }, objective: { ar: "جعل المتابعة والقرار أقل اعتمادًا على العمل اليدوي والمعلومات المتفرقة.", en: "Make follow-up and decision-making less dependent on manual work and scattered information." }, scope: { ar: "أنظمة CRM، لوحات الأداء، وأدوات تنظيم العمليات والمتابعة.", en: "CRM systems, performance dashboards, and tools for workflow and follow-up." }, impact: { ar: "رؤية أوضح لما يحدث، ومسؤوليات أسهل في المتابعة.", en: "A clearer view of what is happening and ownership that is easier to follow." }, metrics: { ar: "استخدام النظام، اكتمال المتابعة، ووضوح المؤشرات الأساسية.", en: "System use, follow-up completeness and visibility of the core indicators." } },
  { id: "automation", title: { ar: "الأتمتة وحلول الذكاء الاصطناعي", en: "Automation & AI Solutions" }, objective: { ar: "تقليل العمل المتكرر عندما يمكن للنظام أن يتولاه بصورة أفضل.", en: "Reduce repetitive work where a system can handle it more effectively." }, scope: { ar: "أتمتة العمليات وتوظيف الذكاء الاصطناعي داخل مسارات عمل محددة وواضحة.", en: "Automate processes and apply AI within specific, clearly defined workflows." }, impact: { ar: "تقنية تخدم طريقة العمل بدل أن تضيف طبقة جديدة من التعقيد.", en: "Technology that supports the way of working instead of adding another layer of complexity." }, metrics: { ar: "كفاءة المسارات المؤتمتة وجودة المتابعة بعد تطبيقها.", en: "Efficiency of automated workflows and the quality of follow-up after implementation." } },
  { id: "branding", title: { ar: "الهوية والرسائل الإبداعية", en: "Branding & Creative Identity" }, objective: { ar: "جعل الهوية والرسائل تعكسان التموضع الذي تريد العلامة أن تحتله.", en: "Make identity and messaging reflect the position the brand intends to own." }, scope: { ar: "الهوية، الرسائل، والنظام الإبداعي المستخدم عبر نقاط التواصل.", en: "Identity, messaging and the creative system used across touchpoints." }, impact: { ar: "حضور أكثر اتساقًا ووضوحًا في السوق.", en: "A more consistent and recognizable market presence." }, metrics: { ar: "اتساق الهوية والرسائل عبر نقاط التواصل الرئيسية.", en: "Consistency of identity and messaging across key touchpoints." } },
  { id: "activation", title: { ar: "التفعيل التسويقي وتحسين الأداء", en: "Marketing Activation & Performance Optimization" }, objective: { ar: "تحويل الخطة إلى برنامج عمل يتطور مع النتائج.", en: "Turn the plan into an active program of work that evolves with results." }, scope: { ar: "إطلاق الحملات والقنوات، المتابعة، والتحسين المستمر.", en: "Launch campaigns and channels, follow performance and improve continuously." }, impact: { ar: "تنفيذ يستمر بعد الإطلاق بدل أن ينتهي عنده.", en: "Execution that continues beyond launch instead of ending there." }, metrics: { ar: "التحسن في مؤشرات الأداء المتفق عليها مع الوقت.", en: "Improvement over time in the performance indicators agreed for the work." } }
];


EM.SECTORS = [
  { id: "healthcare", title: { ar: "الرعاية الصحية", en: "Healthcare" }, context: { ar: "ثقة المريض ومسار الحجز والتجربة داخل المنشأة تحدد الطلب أكثر مما تحدده الحملة وحدها.", en: "Patient trust, booking path and in-facility experience shape demand more than the campaign alone." }, challenges: { ar: "بناء الثقة، زيادة الحجوزات، وتحسين تجربة المريض.", en: "Trust-building, appointment growth, and patient experience." }, priorities: { ar: "وضوح العرض، مسار حجز أقل احتكاكًا، ومتابعة الطلب.", en: "Offer clarity, a lower-friction booking path, and demand follow-up." }, journey: { ar: "من البحث عن اختصاص إلى الحجز والحضور وإعادة الزيارة.", en: "From searching for a specialty to booking, attendance and return visits." }, capabilities: ["consulting.html#growth", "execution.html#campaigns", "consulting.html#journey"] },
  { id: "fmcg", title: { ar: "المنتجات الاستهلاكية", en: "FMCG" }, context: { ar: "النمو يُحسم في التوزيع والتكرار السعري ووضوح العلامة على الرف والقناة.", en: "Growth is decided in distribution, purchase frequency and brand clarity on shelf and channel." }, challenges: { ar: "اختراق السوق، نمو العلامة، وتطوير قنوات التوزيع.", en: "Market penetration, brand growth, and distribution channel development." }, priorities: { ar: "قناة، تغطية، ورسالة تثبت التكرار لا الضجيج.", en: "Channel, coverage, and a message that earns repeat — not noise." }, journey: { ar: "من التعرف إلى التجربة ثم إعادة الشراء عبر القناة المناسبة.", en: "From awareness to trial and repurchase through the right channel." }, capabilities: ["consulting.html#growth", "consulting.html#private-label", "execution.html#performance"] },
  { id: "hospitality", title: { ar: "الأغذية والمشروبات والضيافة", en: "Food & Beverage / Hospitality" }, context: { ar: "التجربة داخل المكان والنموذج التشغيلي يحددان إن كان النجاح قابلاً للتكرار.", en: "On-premise experience and the operating model decide whether success can be repeated." }, challenges: { ar: "تجربة العميل، زيادة التكرار، وبناء نماذج قابلة للتوسع.", en: "Customer experience, repeat business, and scalable growth models." }, priorities: { ar: "تجربة متسقة، تكرار الزيارة، وجاهزية النموذج للامتياز أو التوسع.", en: "Consistent experience, repeat visits, and a model ready to franchise or expand." }, journey: { ar: "من الاكتشاف إلى الزيارة والتقييم وإعادة الحجز.", en: "From discovery to visit, review and returning." }, capabilities: ["consulting.html#franchise", "consulting.html#journey", "execution.html#activation"] },
  { id: "retail", title: { ar: "التجزئة والتوزيع", en: "Retail & Distribution" }, context: { ar: "القناة والسوق الجديد يفرضان قرارًا أوضح قبل زيادة النشاط البيعي.", en: "Channel and new-market choices demand a clearer decision before sales activity is increased." }, challenges: { ar: "تطوير القنوات، رفع المبيعات، والتوسع في الأسواق.", en: "Channel development, sales growth, and market expansion." }, priorities: { ar: "تغطية القنوات، جاهزية التوسع، وربط المبيعات بالنمو.", en: "Channel coverage, expansion readiness, and sales tied to growth." }, journey: { ar: "من التوفر إلى القرار الشرائي وإعادة الطلب.", en: "From availability to purchase decision and reorder." }, capabilities: ["consulting.html#expansion", "consulting.html#sales", "execution.html#systems"], relatedInsights: ["gcc-market-entry-readiness"] },
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
    challenge: { ar: "كان المركز يدخل مرحلة توسع. السؤال لم يكن كيف نضيف نشاطًا تسويقيًا، بل كيف ندعم التوسع بطلب وحجوزات أكثر استقرارًا.", en: "The medical centre was entering an expansion phase. The question was not how to add more marketing activity, but how to support expansion with steadier demand and bookings." },
    strategy: { ar: "ربط هدف التوسع بمسار الطلب، والتركيز على ما يساعد الاهتمام على التحول إلى حجوزات بصورة أكثر انتظامًا.", en: "Connect the expansion objective to the demand path and focus on what could turn interest into bookings more consistently." },
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
    challenge: { ar: "المنتج والسوق كانا موجودين؛ ما لم يكن يلتقط الإمكانات التجارية المتاحة بالقدر الكافي هو نموذج النمو وقنوات البيع.", en: "The product and market were already there; the growth model and sales channels were not capturing the available commercial potential strongly enough." },
    strategy: { ar: "إعادة تصميم منطق النمو حول فرص إيراد أوضح بدل التعامل مع المبيعات كمسار ثابت لا يتغير.", en: "Redesign the growth logic around clearer revenue opportunities rather than treating sales as a fixed path." },
    execution: { ar: "إعادة تصميم قنوات البيع لتخدم النموذج الجديد وتمنح العمل طريقًا تجاريًا أوضح.", en: "Redesign sales channels to support the new model and give the business a clearer commercial path." },
    result: { ar: "من 18 ألف درهم في الربع الأول إلى 40 ألفًا، ثم متوسط 65 ألف درهم شهريًا.", en: "From AED 18K in Q1 to AED 40K, then an average of AED 65K per month." },
    proof: { ar: "متوسط 65 ألف درهم شهريًا.", en: "AED 65K average monthly." }
  },
  {
    id: "bin-ablan",
    sector: "retail",
    related: ["consulting.html#expansion", "consulting.html#sales"],
    relatedInsights: ["gcc-market-entry-readiness"],
    publicName: { ar: "Bin Ablan", en: "Bin Ablan" },
    anonymousName: { ar: "شركة توزيع إقليمية", en: "Regional distribution business" },
    challenge: { ar: "كان النمو يتطلب أسواقًا وقنوات توزيع جديدة. قبل توسيع النشاط، كان لا بد من حسم أين وكيف يحدث التوسع.", en: "Growth required new markets and distribution channels. Before expanding activity, the business needed a clearer decision on where and how expansion should happen." },
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
  },
  {
    id: "gcc-market-entry-readiness",
    topic: { ar: "التوسع ودخول الأسواق", en: "Market Expansion" },
    format: { ar: "مقال تحليلي", en: "Analytical article" },
    title: { ar: "السوق يفتح أبوابه. النجاح لا يفعل.", en: "The market opens. Success still has to be earned." },
    summary: { ar: "دخول السوق قرار تجاري قبل أن يكون خطوة تشغيلية. أربعة أسئلة تساعد على اختبار الجاهزية قبل الالتزام.", en: "Market entry is a commercial decision before it becomes an operational move. Four questions help test readiness before commitment." },
    answer: { ar: "قبل دخول السوق، نصور لكم النتائج بمنطق الأرقام والخبرة.", en: "Before market entry, we bring the outcomes into focus through numbers and experience." },
    relatedCase: "bin-ablan",
    cta: "consulting.html#expansion",
    seo: {
      title: { ar: "الجاهزية التجارية لدخول أسواق الخليج | Elite Maison", en: "GCC Market Entry Readiness | Elite Maison" },
      description: { ar: "قبل دخول أسواق الخليج، اختبروا منطق العرض والطلب والقناة والثقة لتعرفوا إن كان قرار التوسع جاهزًا تجاريًا، لا تشغيليًا فقط.", en: "Before entering GCC markets, test the offer, demand, channel, and trust logic to see whether the expansion decision is commercially ready." },
      ogTitle: { ar: "السوق يفتح أبوابه. النجاح لا يفعل. | Elite Maison", en: "The Market Opens. Success Still Has to Be Earned. | Elite Maison" },
      ogDescription: { ar: "دخول السوق قرار تجاري قبل أن يكون خطوة تشغيلية. أربعة أسئلة تساعد على اختبار الجاهزية قبل الالتزام.", en: "Market entry is a commercial decision before it becomes an operational move. Four questions help test readiness before commitment." }
    },
    body: [
      {
        heading: { ar: "السوق يفتح أبوابه. النجاح لا يفعل.", en: "The market opens. Success still has to be earned." },
        paragraphs: [
          { ar: "فتح سوق جديد ليس هو الاختبار الحقيقي. الاختبار يبدأ عندما يصبح الدخول ممكنًا: هل يملك العمل منطقًا تجاريًا قادرًا على كسب الطلب، وبناء الثقة، وتحويل الوجود إلى نمو؟", en: "Opening a new market is not the real test. The test begins once entry is possible: does the business have a commercial case strong enough to earn demand, build trust, and turn presence into growth?" },
          { ar: "بيانات الحجم والنمو والجاذبية تساعد على قراءة الفرصة. لكنها لا تجيب وحدها عن السؤال الأهم: هل نحن جاهزون تجاريًا لهذه الفرصة؟", en: "Market size, growth, and attractiveness help describe the opportunity. They do not, on their own, answer the harder question: is the business commercially ready for it?" }
        ]
      },
      {
        heading: { ar: "الدخول ليس الجاهزية", en: "Entry is not the same as readiness" },
        paragraphs: [
          { ar: "الجاهزية التشغيلية تفتح الباب. الجاهزية التجارية تحدد إن كان الدخول يستحق الخطوة.", en: "Operational readiness opens the door. Commercial readiness determines whether walking through it makes sense." },
          { ar: "قد تكون التراخيص في مسارها، واللوجستيات واضحة، والقدرة على التشغيل موجودة، بينما تبقى أسئلة العرض والقناة والطلب دون إجابة كافية. هنا لا تكون المشكلة في القدرة على الدخول، بل في وضوح ما سيحدث بعده.", en: "Permits may be progressing, logistics may be mapped, and the business may be able to operate while the offer, channel, and demand logic still need work. At that point, the challenge is not access to the market. It is clarity about what happens after entry." }
        ]
      },
      {
        heading: { ar: "أربعة أسئلة قبل قرار الدخول", en: "Four questions before the decision" },
        paragraphs: [
          { ar: "**من سيختار العرض هنا — ولماذا؟**", en: "**Who will choose the offer here — and why?**" },
          { ar: "ليس المطلوب افتراض أن ما نجح في سوق سيعمل بالطريقة نفسها في سوق آخر. المطلوب فهم ما الذي سيجعل العرض مقنعًا في السياق الجديد، وما الذي يجب أن يبقى ثابتًا وما الذي يحتاج إلى تعديل.", en: "The goal is not to assume that what worked in one market will travel unchanged. The goal is to understand what will make the offer persuasive in the new context, what should remain consistent, and what may need to change." },
          { ar: "**ما الذي سيتغير في قرار الشراء؟**", en: "**What changes in the purchase decision?**" },
          { ar: "رحلة الشراء قد تتغير مع السوق والقناة وطبيعة العميل. قبل بناء خطة الدخول، يجب أن يكون واضحًا كيف يصل العميل إلى القرار، وأين يمكن أن يتوقف الطلب بين الاهتمام والشراء.", en: "The path to purchase can change with the market, the channel, and the customer. Before designing the entry plan, the business needs a clear view of how the decision is made and where demand may weaken between interest and purchase." },
          { ar: "**أين تبدأ الثقة؟**", en: "**Where does trust begin?**" },
          { ar: "الثقة لا تُنقل تلقائيًا مع العلامة. يجب تحديد ما الذي سيمنح العميل الجديد سببًا كافيًا للاطمئنان إلى العرض: الدليل، التجربة، الوجود، العلاقات، أو مزيج منها بحسب السياق.", en: "Trust does not automatically travel with the brand. The business needs to understand what will give a new customer enough confidence in the offer: proof, experience, presence, relationships, or a combination that fits the context." },
          { ar: "**ما الذي ما زلنا نفترضه عن الطلب؟**", en: "**Which demand assumptions are still assumptions?**" },
          { ar: "التوسع يصبح أكثر مخاطرة عندما تُعامل الفرضيات كأنها حقائق. قبل الالتزام بالموارد، يجب فصل ما نعرفه عن السوق عمّا نتوقعه منه، ثم اختبار ما يؤثر فعلًا في القرار.", en: "Expansion becomes riskier when assumptions are treated as facts. Before resources are committed, the business should separate what it knows about the market from what it expects, then test the assumptions that actually shape the decision." }
        ]
      },
      {
        heading: { ar: "السوق الجديد لا يصنع نقاط الضعف. يكشفها.", en: "A new market does not create weak foundations. It exposes them." },
        paragraphs: [
          { ar: "التموضع غير الواضح يصبح أكثر وضوحًا عندما لا يعرف الجمهور العلامة مسبقًا. العرض الذي يحتاج إلى شرح طويل يواجه اختبارًا أصعب. والقناة التي لم تُبنَ على منطق واضح قد تصبح عبئًا بدل أن تكون طريقًا إلى الطلب.", en: "Unclear positioning becomes more visible when the audience does not already know the brand. An offer that needs too much explanation faces a harder test. A channel without clear commercial logic can become a cost rather than a path to demand." },
          { ar: "لهذا لا ننظر إلى التوسع كقرار جغرافي فقط. نحن ننظر إليه كسؤال تجاري: هل يمكن للعرض، والقناة، والطلب، والقدرة على التنفيذ أن تعمل معًا بما يكفي ليصبح الدخول قرارًا قابلًا للدفاع عنه؟", en: "That is why we do not treat expansion as a geographic decision alone. We treat it as a commercial question: can the offer, channel, demand logic, and execution capacity work together strongly enough to make entry defensible?" }
        ]
      },
      {
        heading: { ar: "دليل من العمل", en: "Proof from the work" },
        paragraphs: [
          { ar: "في حالة Bin Ablan، امتد الدخول إلى خمس دول: كندا، عُمان، الكويت، السعودية وليبيا، إلى جانب فتح قنوات توزيع جديدة.", en: "In the Bin Ablan case, market entry extended across five countries: Canada, Oman, Kuwait, Saudi Arabia, and Libya, alongside new distribution channels." },
          { ar: "ما نأخذه من هذه الحالة ليس وعدًا بأن كل توسع يتكرر بالطريقة نفسها. الأهم هو أن التوسع لا يُقاس بعدد الأسواق فقط، بل بجودة المنطق الذي يربط السوق بالقناة والنموذج والقدرة على التنفيذ.", en: "The lesson is not that every expansion will follow the same path. It is that expansion should not be measured only by the number of markets entered, but by the quality of the commercial logic connecting market, channel, model, and execution capacity." }
        ]
      },
      {
        heading: { ar: "نقطة ختام", en: "Closing point" },
        paragraphs: [
          { ar: "قد يكون السوق جذابًا، وقد تكون القدرة على الدخول موجودة، ومع ذلك يبقى القرار بحاجة إلى اختبار.", en: "A market can be attractive, and entry can be operationally possible, while the decision still needs to be tested." },
          { ar: "قبل دخول السوق، يجب أن تتضح صورة العرض، ومنطق الطلب، ومصدر الثقة، والطريق الذي سيحوّل الوجود إلى نمو قابل للاستمرار.", en: "Before entering, the business should have a clearer view of the offer, the demand logic, the source of trust, and the path that can turn presence into sustainable growth." },
          { ar: "**قبل دخول السوق، نصور لكم النتائج بمنطق الأرقام والخبرة.**", en: "**Before market entry, we bring the outcomes into focus through numbers and experience.**" }
        ]
      },
    ]
  },
];

EM.COPY = {
  home: {},
  about: {
     eyebrow: { ar: "من نحن", en: "About Elite Maison" },
     title: { ar: "نربط التسويق بما يحدث فعلًا في الأعمال.", en: "We connect marketing to what is actually happening in the business." },
     lead: { ar: "لأن المشكلة التسويقية نادرًا ما تعيش وحدها. قد تبدأ من العرض، أو المبيعات، أو التشغيل، أو تجربة العميل. لذلك ننظر إلى الصورة كاملة قبل أن نقرر أين نتدخل.", en: "Marketing problems rarely live on their own. The cause may sit in the offer, sales, operations or customer experience. We look at the full picture before deciding where to intervene." },
     whoEyebrow: { ar: "كيف نتموضع", en: "How we work with clients" },
     whoTitle: { ar: "نفكر معكم، ثم نبقى قريبين من العمل.", en: "We think with you, then stay close to the work." },
     whoText: { ar: "Elite Maison بيت استشاري للنمو والتسويق. نعمل من التشخيص والاستراتيجية إلى الإدارة والإشراف على التنفيذ والقياس، مع ربط كل ذلك بالهدف التجاري الذي بدأ منه المشروع.", en: "Elite Maison is a growth and marketing consultancy. We work from diagnosis and strategy through management, execution oversight and measurement, keeping the original commercial objective in view throughout." },
     pillarsTitle: { ar: "Four I's: كيف ننظر إلى العمل", en: "The Four I's: how we look at the work" },
     methodEyebrow: { ar: "منهجية العمل", en: "Our working method" },
     methodTitle: { ar: "عملية بسيطة في شكلها، صارمة في تطبيقها.", en: "Simple in structure. Rigorous in practice." },
     methodText: { ar: "Diagnose → Prioritize → Execute → Measure & Improve. أربع مراحل تبقي التفكير والتنفيذ في المسار نفسه: نفهم، نختار، نشغّل، ثم نراجع ما حدث.", en: "Diagnose → Prioritize → Execute → Measure & Improve. Four stages that keep thinking and execution on the same path: understand, choose, run, then review what happened." },
     engageEyebrow: { ar: "طرق التعاون", en: "Ways to work together" },
     engageTitle: { ar: "يتغير شكل التعاون بحسب ما يحتاجه التحدي.", en: "The shape of the engagement depends on what the challenge requires." },
     engageNote: { ar: "قد تحتاجون إلى تشخيص وقرار محدد، أو إلى مسار متكامل من الاستراتيجية إلى التنفيذ، أو إلى نظام يحتاج إلى بناء وإدارة مستمرة.", en: "You may need a focused diagnosis and decision, an end-to-end path from strategy to execution, or a system that needs to be built and managed over time." },
     ctaTitle: { ar: "لنبدأ بما يحدث في العمل.", en: "Start with what is happening in the business." }
   },
  consulting: {
    eyebrow: { ar: "الاستشارات", en: "Consulting" },
    title: { ar: "اختاروا المشكلة قبل القدرة.", en: "Choose the problem before the capability." },
    lead: { ar: "نبدأ من السؤال التجاري الأقرب إلى واقعكم، لا من قائمة القدرات. الاستشارة هنا تساعدكم على اختيار ما يستحق الحركة قبل توسيع النشاط، من المبيعات والتوسع إلى المنتج وتجربة العميل.", en: "We start with the business question closest to your reality, not a capability list. Consulting here helps you choose what deserves action before activity expands — from sales and expansion to product and customer experience." },
    decisionEyebrow: { ar: "كيف تختارون القدرة", en: "How to choose a capability" },
    decisionTitle: { ar: "اختاروا السؤال التجاري الأقرب إلى واقعكم.", en: "Choose the business question closest to your reality." },
    decisionText: { ar: "ابدأوا بالسؤال التجاري الأقرب إلى واقعكم. كل قدرة أدناه تبدأ بسؤال مختلف. اقرأوا الأسئلة واختاروا ما يشبه واقعكم الآن، ثم افتحوا القدرة لقراءة التحدي والهدف والنطاق والدور والنتيجة. القدرة تأتي بعد فهم المشكلة، لا قبلها.", en: "Start with the business question closest to your reality. Each capability below starts with a different question. Read the questions, choose what resembles your reality now, then open the capability to read the challenge, objective, scope, role and outcome. The capability follows the problem, not the other way around." },
    flowLabel: { ar: "من سؤال مبهم إلى خطوة قابلة للتنفيذ", en: "From an unclear question to an actionable next step" },
    engageTitle: { ar: "لا نبدأ بقائمة Deliverables.", en: "We do not start with a deliverables list." },
    engageText: { ar: "نبدأ بما يجب أن يتغير. بعدها نحدد نطاق التشخيص، والخيارات، والأولوية، والخارطة التي يحتاجها الفريق للتحرك.", en: "We start with what needs to change. Then we define the diagnosis, options, priority and roadmap the team needs to move." },
     scopeLabel: { ar: "النطاق", en: "Scope" },
     roleLabel: { ar: "الدور", en: "Role" },
     outLabel: { ar: "النتيجة", en: "Outcome" },
    ctaEyebrow: { ar: "الخطوة التالية", en: "The next step" },
    ctaTitle: { ar: "إذا ذكّركم أحد الأسئلة أعلاه بسؤال لديكم، فابدأوا من السؤال.", en: "If one of the questions above reminded you of your own question, start there." },
    ctaText: { ar: "أرسلوا سؤالكم الأولي عبر نموذج الاستفسار ليتابع الفريق معكم، أو تواصلوا مباشرة عبر واتساب والبريد والهاتف. المهم أن نبدأ من السؤال لا من الحل.", en: "Send your initial question through the inquiry form and the team will follow up, or reach us directly through WhatsApp, email and phone. What matters is starting with the question — not the solution." },
    answerLabel: { ar: "دور الاستشارة", en: "What consulting is for" },
    answer: { ar: "الاستشارة في Elite Maison تساعدكم على اختيار المشكلة الصحيحة قبل توسيع النشاط. نفهم التحدي، نرتب الأولويات، ونحوّل القرار إلى خطة تنفيذ يستطيع الفريق استخدامها، مع النظر إلى التسويق والمبيعات والتشغيل وتجربة العميل كأجزاء مترابطة من الصورة نفسها.", en: "Consulting at Elite Maison helps you choose the right problem before activity expands. We understand the challenge, set priorities and turn the decision into an execution plan the team can use, while treating marketing, sales, operations and customer experience as connected parts of the same picture." }
  },
  execution: {
    eyebrow: { ar: "التنفيذ", en: "Execution" },
    title: { ar: "الاستراتيجية تصبح ذات قيمة عندما تدخل في طريقة العمل اليومية.", en: "Strategy creates value when it becomes part of the day-to-day work." },
    lead: { ar: "نحوّل الاتجاه إلى حملات وقنوات وأنظمة وتفعيل يمكن تشغيله ومتابعته وتحسينه. الهدف ليس المزيد من النشاط، بل تنفيذ يخدم نتيجة تجارية واضحة.", en: "We turn direction into campaigns, channels, systems and activation that can be run, followed and improved. The goal is not more activity, but execution that serves a clear commercial outcome." },
    chainLabel: { ar: "كيف يعمل التنفيذ", en: "How execution works" },
    chainTitle: { ar: "كيف ننتقل من الاتجاه إلى العمل.", en: "How we move from direction to work." },
    chainText: { ar: "نربط الأدوات والقنوات والأنظمة بالاستراتيجية نفسها، ثم نراجع الأداء ونعدل ما يحتاج إلى تعديل.", en: "We connect tools, channels and systems to the same strategy, then review performance and adjust what needs to change." },
     impactLabel: { ar: "الأثر", en: "Impact" },
     ctaEyebrow: { ar: "من الاتجاه إلى العمل", en: "From direction to work" },
    ctaTitle: { ar: "لديكم اتجاه واضح؟ لنناقش كيف يصبح عملًا يتحسن مع الوقت.", en: "Have a clear direction? Let us discuss how it becomes work that improves over time." },
    ctaText: { ar: "نحدد ما يحتاج إلى تشغيل، ومن يملكه، وكيف سنعرف إن كان يعمل.", en: "We define what needs to run, who owns it and how we will know whether it is working." },
    answerLabel: { ar: "دور التنفيذ", en: "What execution is for" },
    answer: { ar: "التنفيذ هنا لا يعني استلام قائمة مهام منفصلة عن الاستراتيجية. يعني تحويل الاتجاه إلى حملات وقنوات وأنظمة ومبادرات قابلة للمتابعة، ثم استخدام الأداء لتحسين ما يحدث بعد ذلك.", en: "Execution here is not a task list detached from strategy. It means turning direction into campaigns, channels, systems and initiatives that can be followed, then using performance to improve what happens next." }
  },
  sectors: {
     eyebrow: { ar: "خبرة القطاعات", en: "Sector experience" },
     title: { ar: "نفهم القطاع بوصفه سياقًا للقرار، لا قالبًا جاهزًا للحل.", en: "We treat the sector as context for the decision, not a template for the solution." },
     lead: { ar: "تتغير رحلة العميل، دورة الشراء، القنوات، ومعايير الثقة من قطاع إلى آخر. لذلك نستخدم نفس الانضباط في التفكير، لكننا لا ننقل نفس الإجابة من سوق إلى سوق أو من صناعة إلى أخرى.", en: "Customer journeys, buying cycles, channels and trust signals change from one sector to another. We use the same discipline in how we think, but we do not carry the same answer from one market or industry to the next." },
     selectEyebrow: { ar: "خبرة مختارة", en: "Selected experience" },
     selectTitle: { ar: "اختاروا السياق الأقرب إلى عملكم لقراءة ما يتغير في القرار داخله.", en: "Choose the context closest to your business to read what changes in the decision inside it." },
     selectNote: { ar: "هذه ليست قائمة بكل القطاعات التي عملنا معها. هي مجموعة مختارة توضّح نوع الأسئلة التجارية التي نعرف كيف نقرأها داخل سياقات مختلفة.", en: "This is not a catalogue of every sector we have worked with. It is a selected set that shows the kinds of commercial questions we know how to read in different contexts." },
     priorityLabel: { ar: "الأولوية", en: "Priority" },
     journeyLabel: { ar: "التجربة", en: "Experience" },
     ctaEyebrow: { ar: "قطاعكم هو السياق، لا كيف تختارون القدرة الوحيدة", en: "Your sector is context, not the only starting point" },
     ctaTitle: { ar: "ابدأوا بالسؤال التجاري داخل قطاعكم، لا باسم القطاع وحده.", en: "Start with the commercial question inside your sector — not the sector name alone." },
     ctaText: { ar: "نقرأ السوق والمرحلة ورحلة العميل، ثم نحدد أين تحتاجون إلى قرار أو تنفيذ أو كليهما.", en: "We read the market, stage and customer journey, then identify where you need a decision, execution, or both." },
     answerLabel: { ar: "ماذا تعني خبرة القطاع هنا؟", en: "What does sector experience mean here?" },
     answer: { ar: "لا نتعامل مع القطاعات كحزم خدمات ثابتة. الخبرة القطاعية تعني فهم ما الذي يغيّر القرار في ذلك السياق: كيف يشتري العميل، أين تتكون الثقة، ما الذي يبطئ التحويل، وما الذي يجعل النمو قابلًا للتكرار.", en: "We do not treat sectors as fixed service packages. Sector experience means understanding what changes the decision in that context: how customers buy, where trust is formed, what slows conversion and what makes growth repeatable." }
   },
   cases: {
     eyebrow: { ar: "الدليل", en: "Proof" }, title: { ar: "نبدأ بما تغيّر، لا بما صنعناه.", en: "We start with what changed, not what we made." },
     lead: { ar: "كل حالة تبدأ بسؤال تجاري، ثم قرار، ثم ما تم تشغيله، وتنتهي فقط بما يمكن إثباته من النتيجة بالمعلومات المعتمدة لدينا. لا نستخدم قصص العملاء كديكور، ولا نضيف رقمًا لا نستطيع الدفاع عنه.", en: "Each case starts with a commercial question, then a decision, then what was put into practice, and ends only with what can be supported by approved information. We do not use client stories as decoration, and we do not add a number we cannot defend." },
     featuredLabel: { ar: "حالة مختارة", en: "Featured case" }, otherLabel: { ar: "حالات أخرى", en: "Further cases" },
     ctaEyebrow: { ar: "إذا كان السياق مألوفًا", en: "If the context feels familiar" }, ctaTitle: { ar: "إذا ذكّرتكم إحدى الحالات بسؤال لديكم، فلنبدأ من السؤال لا من الحل.", en: "If one of these cases feels familiar, start with the question — not the solution." }, ctaText: { ar: "قد يكون السياق مختلفًا تمامًا. المهم هو فهم ما تحاولون تغييره الآن، ثم استخدام الخبرة ذات الصلة من دون فرض وصفة جاهزة.", en: "Your context may be entirely different. What matters is understanding what you are trying to change now, then using relevant experience without forcing a ready-made formula." }
   },
   insights: {
     eyebrow: { ar: "الرؤى", en: "Insights" }, title: { ar: "ملاحظات لصنع قرار أفضل، لا محتوى للنشر فقط.", en: "Thinking for better decisions, not content for the sake of publishing." },
     lead: { ar: "نكتب عن الأسئلة التي تظهر داخل العمل: كيف نرتب النمو، أين يتعطل التحويل، متى يصبح التوسع منطقيًا، وأين يمكن للتقنية أو تجربة العميل أن تغيّر النتيجة.", en: "We write about questions that show up inside the work: how to prioritize growth, where conversion breaks down, when expansion makes sense, and where technology or customer experience can change the outcome." },
     featuredLabel: { ar: "ابدأوا من هنا", en: "Start here" }, listLabel: { ar: "موضوعات أخرى", en: "More topics" }, answerLabel: { ar: "الفكرة الأساسية", en: "The core idea" }, whyLabel: { ar: "لماذا يهم هذا؟", en: "Why does this matter?" }, frameLabel: { ar: "ما الذي يجب فحصه؟", en: "What should you examine?" }, ctaEyebrow: { ar: "عندما يصبح السؤال عمليًا", en: "When the question becomes practical" }, ctaTitle: { ar: "إذا كنتم تواجهون السؤال نفسه، يمكننا الانتقال من الفكرة إلى واقع عملكم.", en: "If you are facing the same question, we can move from the idea to your business reality." }, ctaText: { ar: "نبدأ بفهم السياق، ثم نحدد إن كانت الخطوة التالية قرارًا استشاريًا، تنفيذًا، أو مجرد وضوح أكبر قبل أي منهما.", en: "We start by understanding the context, then decide whether the next step is advisory, execution, or simply more clarity before either." }
   },
  contact: {
    eyebrow: { ar: "ابدأوا من حيث أنتم", en: "Start where you are" },
    title: { ar: "سؤال، تحدٍ، أو قرار لم يُحسم بعد؟ لنتحدث عنه.", en: "A question, a challenge, or a decision still unresolved? Let’s talk it through." },
    lead: {
      ar: "أرسلوا استفسارًا إذا كنتم تريدون مشاركة السياق أولًا. يتابع الفريق معكم يدويًا، وإن كان الطريق المباشر أنسب فواتساب والبريد والهاتف موجودة هنا أيضًا.",
      en: "Send a short inquiry if you want to share the context first. The team will follow up with you directly, or use WhatsApp, email and phone if a direct route is easier."
    },
    inquiryLabel: { ar: "أرسلوا استفسارًا", en: "Send an inquiry" },
    inquiryTitle: { ar: "أرسلوا السياق كما هو. لا نحتاج إلى نموذج تأهيل طويل.", en: "Send the context as it is. We do not need a long qualification form." },
    inquiryText: {
      ar: "الاسم والبريد والسؤال تكفي للبدء.",
      en: "Your name, email and question are enough to start."
    },
    messageLabel: { ar: "ما الذي تريدون مناقشته؟", en: "What would you like to discuss?" },
    submit: { ar: "أرسلوا الاستفسار", en: "Send inquiry" },
    sending: { ar: "جارٍ الإرسال…", en: "Sending…" },
    successTitle: { ar: "تم إرسال الرسالة.", en: "Message sent." },
    successText: {
      ar: "وصل الاستفسار إلى خدمة الإرسال بنجاح. يمكنكم الاحتفاظ بهذه الصفحة كتأكيد، أو استخدام إحدى قنوات التواصل المباشر أدناه.",
      en: "The inquiry was accepted by the delivery service. You can keep this page as confirmation or use one of the direct contact options below."
    },
    errorTitle: { ar: "لم يتم إرسال الرسالة.", en: "The message was not sent." },
    errorText: {
      ar: "احتفظنا بما كتبتموه في الصفحة. جرّبوا مرة أخرى، أو استخدموا واتساب أو البريد أو الهاتف مباشرة.",
      en: "What you entered is still on the page. Try again, or use WhatsApp, email or phone directly."
    },
    validationSummary: { ar: "هناك حقول تحتاج إلى مراجعة.", en: "Some fields need your attention." },
    required: { ar: "يرجى تعبئة هذا الحقل.", en: "Please complete this field." },
    invalidEmail: { ar: "أدخلوا بريدًا إلكترونيًا صالحًا.", en: "Enter a valid email address." },
    privacyNote: {
      ar: "نستخدم المعلومات التي ترسلونها للتعامل مع استفساركم والتواصل بشأنه. يتم إرسال النموذج عبر خدمة خارجية لتسليم الرسالة إلينا.",
      en: "We use the information you send to handle your inquiry and contact you about it. The form is submitted through an external service that delivers the message to us."
    },
    directTitle: { ar: "تفضّلون الطريق المباشر؟", en: "Prefer the direct route?" },
    directText: {
      ar: "",
      en: ""
    }
  }
};

EM.PILLARS = [
  { id: "insight", ar: "Insight", en: "Insight", text: { ar: "نفهم ما وراء الأعراض قبل أن نصف الحل.", en: "Look beyond the symptoms before prescribing a response." } },
  { id: "ideas", ar: "Ideas", en: "Ideas", text: { ar: "نحوّل الفهم إلى خيارات يمكن اختبارها وتنفيذها.", en: "Turn understanding into options that can be tested and executed." } },
  { id: "influence", ar: "Influence", en: "Influence", text: { ar: "نبني حضورًا ورسائل تساعد الناس على الاختيار.", en: "Build presence and messaging that help people choose." } },
  { id: "impact", ar: "Impact", en: "Impact", text: { ar: "نربط العمل بنتيجة يمكن متابعتها وقياسها.", en: "Connect the work to outcomes that can be followed and measured." } }
];

EM.CHALLENGES = [
  { id: "growth", href: "consulting.html#growth", ar: "فرص النمو كثيرة، لكن ما الأولوية؟", en: "Plenty of growth opportunities — but what comes first?", dest: { ar: "الاستشارات", en: "Consulting" }, caseId: "attractive-smile" },
  { id: "sales", href: "consulting.html#sales", ar: "الاهتمام موجود، فلماذا لا يتحول إلى إيراد كما ينبغي؟", en: "There is interest — so where is revenue being lost?", dest: { ar: "الإيراد والمبيعات", en: "Revenue and sales" }, caseId: "bloom" },
  { id: "expansion", href: "consulting.html#expansion", ar: "هل السوق الجديد فرصة حقيقية أم خطوة مبكرة؟", en: "Is the new market a real opportunity, or a move too early?", dest: { ar: "دخول الأسواق", en: "Market entry" }, caseId: "bin-ablan" },
  { id: "execution", href: "execution.html#performance", ar: "التسويق يعمل، لكن هل نعرف ما الذي يحقق أثرًا فعلًا؟", en: "Marketing is active — but do we know what is actually driving impact?", dest: { ar: "الحلول التنفيذية", en: "Execution solutions" }, caseId: "bloom" },
  { id: "systems", href: "execution.html#systems", ar: "هل يستهلك التشغيل وقتًا كان يجب أن يذهب للنمو؟", en: "Is day-to-day operations taking capacity away from growth?", dest: { ar: "الأنظمة والتشغيل", en: "Systems and operations" }, caseId: "bin-ablan" }
];

EM.METHOD = [
  { ar: { title: "نشخّص", text: "نفهم ما يحدث في الشركة والسوق ورحلة العميل، ونفصل العرض عن السبب." }, en: { title: "Diagnose", text: "Understand what is happening across the business, market and customer journey, and separate symptoms from causes." } },
  { ar: { title: "نرتّب", text: "نحدد ما يستحق الأولوية وما يجب أن ينتظر، ثم نبني مسارًا واضحًا." }, en: { title: "Prioritize", text: "Decide what deserves priority, what can wait, and build a clear path forward." } },
  { ar: { title: "ننفّذ", text: "نحوّل الاتجاه إلى مبادرات وقنوات وأنظمة يستطيع الفريق تشغيلها." }, en: { title: "Execute", text: "Turn the direction into initiatives, channels and systems the team can run." } },
  { ar: { title: "نقيس ونحسّن", text: "نراجع ما تغيّر، وما لم يتغيّر، ونعدّل العمل بناءً على الدليل." }, en: { title: "Measure & improve", text: "Review what changed, what did not, and adjust the work based on evidence." } }
];

EM.ABOUT = [
  { title: { ar: "خبرة تقرأ السياق، لا الحالة المجردة.", en: "Experience reads context, not an isolated case." }, text: { ar: "أكثر من 18 عامًا من العمل في المنطقة تعني أن السؤال يُقرأ داخل السوق والمرحلة والقيود الفعلية، لا كتمرين نظري منفصل.", en: "More than 18 years of work in the region means reading the question inside its market, stage and real constraints — not as an isolated theoretical exercise." } },
  { title: { ar: "التسويق لا يملك النتيجة وحده.", en: "Marketing does not own the outcome alone." }, text: { ar: "المبيعات والتشغيل وتجربة العميل قد تغيّر النتيجة بقدر ما تغيّرها الحملة. لذلك نقرأ نقاط الاتصال بينها بدل تحسين كل جزء بمعزل عن الآخر.", en: "Sales, operations and customer experience can shape the outcome as much as a campaign. We look at the connections between them rather than optimizing each part in isolation." } },
  { title: { ar: "الخليج ليس سوقًا واحدًا.", en: "The GCC is not one market." }, text: { ar: "تختلف طريقة الشراء والثقة والقنوات وسرعة القرار بين سوق وآخر وقطاع وآخر. المنهج ثابت؛ الإجابة ليست كذلك.", en: "Buying behaviour, trust, channels and decision speed vary across markets and sectors. The discipline stays; the answer does not." } },
  { title: { ar: "نطاق العمل يتبع موضع المشكلة.", en: "The scope follows where the problem sits." }, text: { ar: "لا نبدأ بحزمة خدمات جاهزة. نحدد ما يحتاج إلى أن يتغيّر، ثم نبني نطاق العمل حول القرار والتنفيذ اللذين يخدمانه.", en: "We do not start with a preset package. We define what needs to change, then shape the work around the decision and execution it requires." } }
];

EM.NOT_FOUND_COPY = {
  title: { ar: "الصفحة التي تبحثون عنها غير موجودة.", en: "The page you are looking for does not exist." },
  text: { ar: "قد يكون الرابط قديمًا أو غير مكتمل. يمكنكم العودة إلى الرئيسية أو استخدام التنقل للوصول إلى القسم المطلوب.", en: "The link may be old or incomplete. Return home or use the navigation to find the section you need." }
};

EM.ENGAGE = [
  { id: "advisory", kicker: "Advisory", title: { ar: "عندما تحتاجون إلى قرار قبل أي التزام أكبر", en: "When you need a decision before a bigger commitment" }, text: { ar: "تشخيص مركز، خيارات واضحة، وخارطة تساعد الفريق على التحرك بثقة.", en: "A focused diagnosis, clear options and a roadmap the team can act on with confidence." } },
  { id: "end-to-end", kicker: "End-to-end", title: { ar: "عندما يحتاج الاتجاه إلى قيادة حتى التنفيذ", en: "When the direction needs leadership through execution" }, text: { ar: "عمل مترابط من الاستراتيجية إلى التشغيل والقياس والتحسين، بدل تسليم الخطة والابتعاد.", en: "Connected work from strategy through operations, measurement and improvement, rather than handing over a plan and stepping away." } },
  { id: "systems", kicker: "Custom systems", title: { ar: "عندما تصبح طريقة العمل نفسها عائقًا", en: "When the way of working becomes the constraint" }, text: { ar: "نبني أو نعيد ترتيب الأنظمة والأدوات حول الطريقة التي يحتاجها الفريق للعمل والمتابعة.", en: "We build or reshape systems and tools around how the team needs to operate and follow the work." } },
  { id: "growth", kicker: "Growth management", title: { ar: "عندما يحتاج النمو إلى قيادة مستمرة", en: "When growth needs ongoing leadership" }, text: { ar: "متابعة للمبادرات والفرق والمؤشرات حتى تبقى الأولويات مرتبطة بما يحدث فعليًا في السوق والعمل.", en: "Ongoing oversight of initiatives, teams and indicators so priorities stay connected to what is actually happening in the market and the business." } }
];

const sectorCopy = {
  healthcare: { context: { ar: "في الرعاية الصحية، لا يبدأ القرار من الإعلان وحده. الثقة في الاختصاص والمنشأة، سهولة الحجز، وما يحدث قبل الزيارة وبعدها كلها تؤثر في الطلب.", en: "In healthcare, the decision does not begin with advertising alone. Trust in the specialty and provider, ease of booking, and what happens before and after the visit all shape demand." }, challenges: { ar: "تحويل الاهتمام إلى حجوزات، بناء الثقة، وتقليل الاحتكاك في رحلة المريض.", en: "Turning interest into appointments, building trust and reducing friction across the patient journey." }, priorities: { ar: "عرض واضح، مسار حجز يمكن إكماله بسهولة، ومتابعة تعرف أين يتوقف الطلب.", en: "A clear offer, a booking path people can complete easily, and follow-up that shows where demand is being lost." }, journey: { ar: "من البحث عن الاختصاص ومقارنة الخيارات إلى الحجز والحضور ثم العودة عند الحاجة.", en: "From searching for a specialty and comparing options to booking, attendance and returning when needed." } },
  fmcg: { context: { ar: "في المنتجات الاستهلاكية، قوة العلامة وحدها لا تكفي. التوزيع، التوفر، السعر، وضوح الاختيار، وإعادة الشراء هي ما يحول الحضور إلى نمو فعلي.", en: "In FMCG, brand presence alone is not enough. Distribution, availability, price, clarity of choice and repeat purchase are what turn visibility into real growth." }, challenges: { ar: "الوصول إلى السوق، تطوير قنوات البيع، وتحويل التجربة الأولى إلى شراء يتكرر.", en: "Reaching the market, developing sales channels and turning first trial into repeat purchase." }, priorities: { ar: "قناة مناسبة، تغطية قابلة للتوسع، وعرض تستطيع العلامة أن تدعمه باستمرار.", en: "The right channel, coverage that can scale and an offer the brand can support consistently." }, journey: { ar: "من رؤية المنتج إلى تجربته ثم إيجاده مرة أخرى واختياره عند الشراء التالي.", en: "From seeing the product to trying it, finding it again and choosing it on the next purchase." } },
  hospitality: { context: { ar: "في الضيافة، العلامة لا تعيش في الهوية وحدها؛ تعيش في التجربة داخل المكان، التشغيل، الخدمة، والقدرة على تكرار المستوى نفسه عندما يتوسع النشاط.", en: "In hospitality, the brand does not live in identity alone. It lives in the on-site experience, operations, service and the ability to repeat the same standard as the business expands." }, challenges: { ar: "زيادة تكرار الزيارة، الحفاظ على تجربة متسقة، وبناء نموذج يمكن توسيعه دون فقدان ما يجعل العلامة مميزة.", en: "Increasing repeat visits, keeping the experience consistent and building a model that can grow without losing what makes the brand distinctive." }, priorities: { ar: "وضوح التجربة، ثبات التشغيل، ومعرفة ما يجب أن يبقى ثابتًا عند التوسع أو الامتياز.", en: "A clear experience, operational consistency and knowing what must remain fixed as the business expands or franchises." }, journey: { ar: "من الاكتشاف والحجز أو الزيارة الأولى إلى التجربة والتقييم والعودة.", en: "From discovery and booking or first visit to experience, review and return." } },
  retail: { context: { ar: "في التجزئة والتوزيع، النمو يعتمد على أين يوجد المنتج، كيف يصل إلى السوق، ومن يملك العلاقة مع القناة بقدر اعتماده على الطلب نفسه.", en: "In retail and distribution, growth depends on where the product is available, how it reaches the market and who owns the channel relationship as much as it depends on demand itself." }, challenges: { ar: "تطوير القنوات، زيادة المبيعات، ودخول أسواق جديدة دون توسيع التعقيد أسرع من الإيراد.", en: "Developing channels, growing sales and entering new markets without letting complexity grow faster than revenue." }, priorities: { ar: "اختيار السوق والقناة، وضوح نموذج التوزيع، وربط التوسع بقدرة فعلية على الخدمة والمتابعة.", en: "Market and channel choice, a clear distribution model and expansion tied to the ability to serve and follow the market." }, journey: { ar: "من توفر المنتج واكتشافه إلى قرار الشراء ثم إعادة الطلب عبر القناة المناسبة.", en: "From product availability and discovery to purchase and reorder through the right channel." } },
  ecommerce: { context: { ar: "في التجارة الإلكترونية، كل خطوة بين الزيارة والدفع يمكن أن تضيف أو تفقد قيمة. لذلك يجب أن تُقرأ القناة والإعلان وتجربة الشراء والعودة كنظام واحد.", en: "In e-commerce, every step between visit and payment can add or lose value. Channel, advertising, purchase experience and return behaviour need to be read as one system." }, challenges: { ar: "رفع التحويل، تقليل التسرب من رحلة الشراء، وتحسين قيمة العميل بعد الطلب الأول.", en: "Improving conversion, reducing leakage across the purchase journey and increasing customer value after the first order." }, priorities: { ar: "مسار شراء واضح، احتكاك أقل، وقياس يربط الإنفاق بما يحدث بعد النقرة.", en: "A clear purchase path, less friction and measurement that connects spend to what happens after the click." }, journey: { ar: "من الاكتشاف والزيارة الأولى إلى السلة والدفع ثم إعادة الطلب.", en: "From discovery and first visit to cart, payment and repeat order." } },
  education: { context: { ar: "في التعليم والتدريب، لا يشتري العميل إعلانًا؛ يختار وعدًا بنتيجة مستقبلية. وضوح البرنامج والقيمة ومسار التسجيل عناصر أساسية في هذا القرار.", en: "In education and training, the customer is not buying an advertisement; they are choosing a promise of a future outcome. Programme clarity, value and the enrolment path are central to that decision." }, challenges: { ar: "زيادة التسجيلات، توضيح قيمة البرامج، وتحويل الاهتمام إلى التزام فعلي.", en: "Growing enrolment, clarifying programme value and turning interest into real commitment." }, priorities: { ar: "قيمة مفهومة، عرض يناسب المرحلة، ومسار تسجيل لا يضيف عوائق غير ضرورية.", en: "Value people can understand, an offer suited to the stage and an enrolment path without unnecessary barriers." }, journey: { ar: "من اكتشاف البرنامج ومقارنته بالبدائل إلى التسجيل والحضور ثم الاستمرار.", en: "From discovering the programme and comparing alternatives to enrolment, attendance and continuation." } }
};
EM.SECTORS.forEach((item) => {
  if (sectorCopy[item.id]) Object.assign(item, sectorCopy[item.id]);
});

const caseCopy = {
  "attractive-smile": { challenge: { ar: "كان المركز يدخل مرحلة توسع، وكان التحدي هو دعم هذه المرحلة بطلب أكثر استقرارًا بدل الاكتفاء بنشاط تسويقي منفصل عن مسار الحجز.", en: "The medical centre was moving into an expansion phase. The challenge was to support that stage with more stable demand rather than marketing activity disconnected from the booking path." }, strategy: { ar: "ربط هدف التوسع بالطلب، والتركيز على ما يساعد على تحويل الاهتمام إلى حجوزات بصورة أكثر انتظامًا.", en: "Connect the expansion objective to demand and focus on what could turn interest into bookings more consistently." }, execution: { ar: "توجيه العمل نحو استقرار تدفق الطلب والحجوزات خلال مرحلة التوسع، مع متابعة ما يحدث على امتداد المسار.", en: "Direct the work toward a steadier flow of demand and bookings during expansion, with follow-up across the path." }, result: { ar: "نمو ملحوظ في الإيرادات واستقرار الطلب، مع حجوزات متواصلة لمدة 12 يومًا.", en: "Revenue growth and more stable demand, with 12 consecutive days of bookings." }, proof: { ar: "حجوزات متواصلة لمدة 12 يومًا.", en: "12 consecutive days of bookings." } },
  bloom: { challenge: { ar: "كان النشاط يملك منتجًا وسوقًا، لكن نموذج النمو وقنوات البيع لم يكونا يحققان الإمكانات التجارية المتاحة.", en: "The business had a product and a market, but its growth model and sales channels were not capturing the commercial potential available." }, strategy: { ar: "إعادة تصميم نموذج النمو حول فرص إيراد أوضح، بدل التعامل مع المبيعات كمسار ثابت لا يتغير.", en: "Redesign the growth model around clearer revenue opportunities rather than treating sales as a fixed path." }, execution: { ar: "إعادة تصميم قنوات البيع بما يخدم النموذج الجديد ويمنح العمل مسارًا تجاريًا أوضح.", en: "Redesign the sales channels to support the new growth model and give the business a clearer commercial path." }, result: { ar: "من 18 ألف درهم في الربع الأول إلى 40 ألفًا، ثم متوسط 65 ألف درهم شهريًا.", en: "From AED 18K in Q1 to AED 40K, then an average of AED 65K per month." }, proof: { ar: "متوسط 65 ألف درهم شهريًا.", en: "AED 65K average monthly." }, metric: { value: "65K", unit: { ar: "درهم متوسط شهريًا", en: "AED average monthly" }, context: { ar: "من 18 ألف درهم في الربع الأول إلى 40 ألفًا.", en: "From AED 18K in Q1 to AED 40K." } } },
  "bin-ablan": { challenge: { ar: "كان النمو يحتاج إلى أسواق وقنوات توزيع جديدة، لكن التوسع الإقليمي يتطلب اختيار أين وكيف يحدث قبل زيادة النشاط.", en: "Growth required new markets and distribution channels, but regional expansion needed a clearer decision on where and how to move before activity increased." }, strategy: { ar: "تطوير استراتيجية للتوسع الإقليمي تربط اختيار السوق بطريقة الدخول وتطوير القنوات.", en: "Develop a regional expansion strategy connecting market choice with route to entry and channel development." }, execution: { ar: "فتح أسواق جديدة وتطوير قنوات توزيع تدعم التوسع التجاري.", en: "Open new markets and develop distribution channels that support commercial expansion." }, result: { ar: "أسواق جديدة في كندا وعُمان والكويت والسعودية وليبيا، إلى جانب قنوات توزيع جديدة.", en: "New markets in Canada, Oman, Kuwait, Saudi Arabia and Libya, alongside new distribution channels." }, proof: { ar: "دخول أسواق في خمس دول.", en: "Market entry across five countries." }, markets: [{ ar: "كندا", en: "Canada" }, { ar: "عُمان", en: "Oman" }, { ar: "الكويت", en: "Kuwait" }, { ar: "السعودية", en: "Saudi Arabia" }, { ar: "ليبيا", en: "Libya" }] },
  patchouli: { challenge: { ar: "كان نجاح العلامة يحتاج إلى نموذج يمكن تكراره عند التوسع، لا إلى نجاح يعتمد على فرع واحد أو طريقة تشغيل يصعب نقلها.", en: "The brand needed a model that could be repeated as it expanded, rather than success dependent on one location or a way of operating that was difficult to transfer." }, strategy: { ar: "تطوير النموذج ليصبح أكثر قابلية للتوسع والامتياز، مع تحديد ما يجب أن يبقى ثابتًا في العلامة والتجربة.", en: "Develop the model for greater scalability and franchising, with clearer definition of what needed to remain consistent in the brand and experience." }, execution: { ar: "بناء نموذج أكثر قابلية للتكرار يدعم الانتقال من نجاح الموقع إلى شبكة يمكن توسيعها.", en: "Build a more repeatable model that supports the move from location-level success to a network that can expand." }, result: { ar: "الوصول إلى 11 فرع امتياز تجاري، وبناء نموذج قابل للتوسع والاستدامة.", en: "11 franchise branches and a more repeatable growth model." }, proof: { ar: "11 فرع امتياز تجاري.", en: "11 franchise branches." } },
  "ai-brains": { challenge: { ar: "كانت الفكرة في مجال الذكاء الاصطناعي موجودة، لكن قيمتها وطريقة تحويلها إلى مشروع قابل للتطبيق والقياس احتاجتا إلى وضوح أكبر.", en: "The AI concept existed, but its value and the route from idea to an applicable, measurable project needed greater clarity." }, strategy: { ar: "صياغة المشروع حول قيمة واضحة وحالة استخدام يمكن تحويلها إلى عمل، بدل إبقاء الذكاء الاصطناعي كفكرة عامة.", en: "Shape the project around clear value and a use case that could be turned into work, rather than leaving AI as a broad concept." }, execution: { ar: "تحويل الفكرة إلى مشروع محدد المعالم يمكن تطبيقه وقياسه.", en: "Turn the concept into a defined project that could be applied and measured." }, result: { ar: "مشروع واضح القيمة وقابل للتطبيق والقياس.", en: "A clear, applicable and measurable project." }, proof: { ar: "جائزة أفضل مشروع داعم للذكاء الاصطناعي.", en: "Award for Best AI-Supporting Project." } }
};
/* Client names, metrics and awards require final public-use approval before production. */
EM.CASES.forEach((item) => {
  if (caseCopy[item.id]) Object.assign(item, caseCopy[item.id]);
});

const insightCopy = {
  "growth-guide": {
     title: { ar: "متى تصبح خارطة النمو أداة قرار فعلية؟", en: "When does a growth roadmap become a real decision tool?" },
     summary: { ar: "خارطة النمو الجيدة لا تجمع كل الفرص الممكنة. هي تحدد ما يستحق أن يحدث الآن، ما الذي ينتظر، وكيف يعرف الفريق أن الأولوية المختارة تتحرك فعلًا.", en: "A useful growth roadmap does not collect every possible opportunity. It decides what deserves to happen now, what can wait and how the team will know the chosen priority is actually moving." },
     answer: { ar: "خارطة النمو الجيدة لا تجمع كل الفرص الممكنة. هي تحدد ما يستحق أن يحدث الآن، ما الذي ينتظر، وكيف يعرف الفريق أن الأولوية المختارة تتحرك فعلًا.", en: "A useful growth roadmap does not collect every possible opportunity. It decides what deserves to happen now, what can wait and how the team will know the chosen priority is actually moving." },
     relatedCase: "bloom"
   },
  "sales-article": {
     title: { ar: "الاهتمام موجود. أين يضيع قبل أن يصبح إيرادًا؟", en: "Interest is there. Where does it disappear before becoming revenue?" },
     summary: { ar: "ضعف الإيراد لا يعني دائمًا أنكم تحتاجون إلى مزيد من العملاء المحتملين. أحيانًا يكون الطلب موجودًا، لكن العرض أو المتابعة أو الانتقال بين الخطوات يجعل جزءًا منه يضيع.", en: "Weak revenue does not always mean you need more leads. Sometimes demand already exists, but the offer, follow-up or handoff between steps causes part of it to disappear." },
     answer: { ar: "ضعف الإيراد لا يعني دائمًا أنكم تحتاجون إلى مزيد من العملاء المحتملين. أحيانًا يكون الطلب موجودًا، لكن العرض أو المتابعة أو الانتقال بين الخطوات يجعل جزءًا منه يضيع.", en: "Weak revenue does not always mean you need more leads. Sometimes demand already exists, but the offer, follow-up or handoff between steps causes part of it to disappear." },
     relatedCase: "attractive-smile"
   },
  "expansion-brief": {
     title: { ar: "السوق جذاب. لكن هل أنتم جاهزون لدخوله؟", en: "The market is attractive. But are you ready to enter it?" },
     summary: { ar: "جاذبية السوق لا تكفي لاتخاذ قرار التوسع. السؤال الأصعب هو ما إذا كان العرض والقناة والتشغيل والموارد جاهزة لدعم الدخول بعد الإطلاق، لا في يوم الإطلاق فقط.", en: "Market attractiveness is not enough to justify expansion. The harder question is whether the offer, channel, operations and resources are ready to support entry after launch — not just on launch day." },
     answer: { ar: "جاذبية السوق لا تكفي لاتخاذ قرار التوسع. السؤال الأصعب هو ما إذا كان العرض والقناة والتشغيل والموارد جاهزة لدعم الدخول بعد الإطلاق، لا في يوم الإطلاق فقط.", en: "Market attractiveness is not enough to justify expansion. The harder question is whether the offer, channel, operations and resources are ready to support entry after launch — not just on launch day." },
     relatedCase: "bin-ablan"
   },
  "ai-insight": {
     title: { ar: "ابدأوا بمسار العمل، لا بأداة الذكاء الاصطناعي.", en: "Start with the workflow, not the AI tool." },
     summary: { ar: "السؤال المفيد ليس: أين يمكننا استخدام الذكاء الاصطناعي؟ بل: أي عمل متكرر أو قرار أو نقطة متابعة تستحق أن تصبح أسرع أو أوضح، وهل التقنية مناسبة لها فعلًا؟", en: "The useful question is not “Where can we use AI?” It is which repetitive task, decision or follow-up point deserves to become faster or clearer — and whether the technology is actually suitable for it." },
     answer: { ar: "السؤال المفيد ليس: أين يمكننا استخدام الذكاء الاصطناعي؟ بل: أي عمل متكرر أو قرار أو نقطة متابعة تستحق أن تصبح أسرع أو أوضح، وهل التقنية مناسبة لها فعلًا؟", en: "The useful question is not “Where can we use AI?” It is which repetitive task, decision or follow-up point deserves to become faster or clearer — and whether the technology is actually suitable for it." },
     relatedCase: "ai-brains"
   },
  "cx-check": {
     title: { ar: "خمس إشارات على وجود احتكاك في رحلة العميل", en: "Five signs there is friction in your customer journey" },
     summary: { ar: "الاحتكاك لا يظهر دائمًا كشكوى صريحة. أحيانًا يظهر كعميل يتردد، يعيد السؤال، ينتظر بين الخطوات، أو يختفي قبل إكمال الإجراء.", en: "Friction does not always arrive as a complaint. Sometimes it appears as hesitation, repeated questions, waiting between steps or customers disappearing before completing the action." },
     answer: { ar: "الاحتكاك لا يظهر دائمًا كشكوى صريحة. أحيانًا يظهر كعميل يتردد، يعيد السؤال، ينتظر بين الخطوات، أو يختفي قبل إكمال الإجراء.", en: "Friction does not always arrive as a complaint. Sometimes it appears as hesitation, repeated questions, waiting between steps or customers disappearing before completing the action." }
   }
};
EM.INSIGHTS.forEach((item) => {
  if (insightCopy[item.id]) Object.assign(item, insightCopy[item.id]);
});

const insightSections = {
  "growth-guide": [
    [{ ar: "المشكلة ليست نقص الأفكار", en: "The problem is rarely a lack of ideas" }, { ar: "غالبًا توجد فرص أكثر مما يستطيع الفريق تنفيذها في الوقت نفسه: سوق جديد، قناة جديدة، عرض جديد، أو هدف مبيعات أعلى. عندما توضع كلها في الخطة بالمستوى نفسه، تصبح الخارطة قائمة رغبات بدل أن تكون أداة اختيار.", en: "Most teams have more opportunities than they can pursue at once: a new market, a new channel, a new offer or a higher sales target. When all of them sit at the same level in the plan, the roadmap becomes a wish list rather than a tool for choosing." }],
    [{ ar: "الأولوية تحتاج إلى منطق", en: "A priority needs a reason" }, { ar: "اسألوا عن ثلاثة أشياء: ما المشكلة التي تحلها هذه الأولوية؟ ما الذي يجب أن يتغير إذا نجحت؟ وما الذي سنؤجله كي نعطيها الوقت والموارد؟ إذا لم توجد إجابات واضحة، فالأولوية ما زالت عنوانًا لا قرارًا.", en: "Ask three things: what problem does this priority solve, what should change if it works, and what will we delay so it receives enough time and resources? If those answers are unclear, the priority is still a label rather than a decision." }],
    [{ ar: "الخارطة يجب أن تغيّر العمل الأسبوعي", en: "The roadmap should change weekly work" }, { ar: "إذا لم تساعد الخارطة الفريق على رفض عمل أقل أهمية، توزيع المسؤوليات، ومراجعة مؤشر واضح، فلن تؤثر في التنفيذ. قيمتها ليست في عدد الشرائح، بل في القرارات التي تجعلها أسهل.", en: "If the roadmap does not help the team reject lower-value work, assign ownership and review a clear indicator, it will not shape execution. Its value is not in the number of slides but in the decisions it makes easier." }]
  ],
  "sales-article": [
    [{ ar: "ابدأوا من المسار، لا من الحملة", en: "Start with the path, not the campaign" }, { ar: "تتبّعوا ما يحدث منذ أول اهتمام حتى الشراء. هل يفهم العميل العرض؟ هل يعرف ما الخطوة التالية؟ هل تنتقل المعلومة من التسويق إلى المبيعات دون فقدان؟ زيادة الإنفاق قبل الإجابة عن هذه الأسئلة قد تزيد حجم التسرب نفسه.", en: "Follow what happens from first interest to purchase. Does the customer understand the offer? Do they know the next step? Does information move from marketing to sales without being lost? Increasing spend before answering these questions can simply increase the volume of the same leakage." }],
    [{ ar: "راقبوا نقاط الانتقال", en: "Watch the handoffs" }, { ar: "كثير من الاحتكاك يحدث بين فريق وفريق أو قناة وقناة: نموذج لا يصل إلى الشخص المناسب، متابعة تتأخر، أو عميل يعيد شرح احتياجه من البداية. هذه ليست تفاصيل تشغيلية صغيرة إذا كانت تعطل الإيراد.", en: "A lot of friction happens between teams or channels: a form that reaches the wrong person, delayed follow-up or a customer having to explain the same need again. These are not minor operating details if they are slowing revenue." }],
    [{ ar: "لا تقيسوا النشاط بدل التقدم", en: "Do not measure activity instead of progress" }, { ar: "عدد المكالمات والرسائل والعملاء المحتملين مهم، لكنه لا يشرح وحده أين يتحسن المسار. القياس المفيد يوضح الانتقال بين المراحل وأين ينخفض التحويل ولماذا.", en: "Calls, messages and lead volume matter, but they do not explain where the path is improving. Useful measurement shows movement between stages and where conversion falls — and why." }]
  ],
  "expansion-brief": [
    [{ ar: "افصلوا الفرصة عن الجاهزية", en: "Separate opportunity from readiness" }, { ar: "قد يكون السوق كبيرًا ومناسبًا، ومع ذلك يكون الدخول المباشر قرارًا مبكرًا. فرصة السوق تجيب عن سؤال: هل توجد إمكانية؟ أما الجاهزية فتجيب: هل نستطيع التقاط هذه الإمكانية بطريقة يمكن تشغيلها ودعمها؟", en: "A market can be large and relevant while immediate entry is still premature. Market opportunity answers whether potential exists. Readiness asks whether the business can capture that potential in a way it can operate and support." }],
    [{ ar: "اختبروا أربعة أشياء قبل الالتزام", en: "Test four things before committing" }, { ar: "وضوح العرض للسوق الجديد، القناة التي ستصلون من خلالها، القدرة التشغيلية على الخدمة، والاقتصاد التجاري الذي يجعل الاستمرار منطقيًا. ضعف عنصر واحد قد يغيّر نموذج الدخول كله.", en: "Test the clarity of the offer in the new market, the channel you will use to reach it, the operating capacity to serve it and the commercial economics that make continuation worthwhile. A weakness in one can change the entire entry model." }],
    [{ ar: "قرار التأجيل يمكن أن يكون قرارًا جيدًا", en: "Delay can be a good decision" }, { ar: "الهدف من دراسة الجاهزية ليس إثبات أن التوسع يجب أن يحدث. أحيانًا تكون النتيجة الأفضل هي تعديل القناة، اختبار السوق على نطاق أصغر، أو تأجيل الدخول حتى يصبح عنصر أساسي جاهزًا.", en: "The purpose of a readiness review is not to prove that expansion should happen. Sometimes the better outcome is to change the channel, test the market at a smaller scale or delay entry until a critical element is ready." }]
  ],
  "ai-insight": [
    [{ ar: "التقنية ليست حالة الاستخدام", en: "The technology is not the use case" }, { ar: "اختيار أداة أولًا يدفع الفريق غالبًا إلى البحث عن مشكلة تناسبها. المسار الأفضل يبدأ بعمل معروف: إدخال متكرر، فرز معلومات، متابعة، أو خطوة تستنزف وقتًا أكثر مما تستحق. بعدها فقط يصبح تقييم الأتمتة أو الذكاء الاصطناعي منطقيًا.", en: "Choosing a tool first often pushes the team to search for a problem that fits it. A better path starts with known work: repetitive entry, information sorting, follow-up or a step consuming more time than it deserves. Only then does evaluating automation or AI make sense." }],
    [{ ar: "حدّدوا ما يجب أن يتحسن", en: "Define what should improve" }, { ar: "هل الهدف تقليل الوقت؟ خفض الأخطاء؟ جعل المعلومة متاحة أسرع؟ أم تحسين جودة المتابعة؟ إذا لم يمكن وصف التحسن قبل بناء الحل، سيكون من الصعب معرفة إن كانت التقنية أضافت قيمة بعده.", en: "Is the goal to reduce time, lower errors, make information available faster or improve follow-up quality? If the improvement cannot be described before the solution is built, it will be difficult to know whether the technology added value afterward." }],
    [{ ar: "الأتمتة الجيدة تختفي داخل العمل", en: "Good automation disappears into the work" }, { ar: "أفضل نتيجة ليست نظامًا مبهرًا يحتاج إلى شرح يومي. هي خطوة تعمل بصورة أبسط، يعرف الفريق متى يستخدمها، ويستطيع متابعة ما إذا كانت تعطي النتيجة المطلوبة.", en: "The best outcome is not an impressive system that needs daily explanation. It is a simpler step, used at the right moment, with a way to see whether it is producing the intended result." }]
  ],
  "cx-check": [
    [{ ar: "1. العميل يسأل دائمًا: ماذا أفعل الآن؟", en: "1. Customers keep asking: what do I do next?" }, { ar: "عندما تكون الخطوة التالية غير واضحة، يتحول جزء من التجربة إلى مجهود يبذله العميل بنفسه. راقبوا أين يحتاج الناس إلى سؤال كان يجب أن تجيب عنه الرحلة تلقائيًا.", en: "When the next step is unclear, part of the experience becomes work the customer has to do. Look for places where people need to ask a question the journey should already answer." }],
    [{ ar: "2. يكرر العميل المعلومات نفسها", en: "2. Customers repeat the same information" }, { ar: "إذا كان العميل يعيد شرح حاجته أو بياناته عند الانتقال بين فريقين أو قناتين، فالمشكلة ليست في صبره؛ المشكلة في التسليم بين نقاط التفاعل.", en: "If customers have to repeat their need or details when moving between teams or channels, the issue is not their patience. It is the handoff between touchpoints." }],
    [{ ar: "3. الانتظار يحدث بين الخطوات، لا داخلها", en: "3. Waiting happens between steps" }, { ar: "قد تكون كل خطوة سريعة بمفردها، لكن الرحلة بطيئة لأن لا أحد يملك الانتقال بينها. راقبوا الوقت الضائع بعد الإرسال أو الحجز أو الطلب وقبل أن يبدأ الإجراء التالي.", en: "Each step can be fast on its own while the overall journey remains slow because no one owns the transition. Watch the time lost after submission, booking or purchase before the next action begins." }],
    [{ ar: "4. الناس تبدأ الإجراء ولا تكمله", en: "4. People start but do not finish" }, { ar: "السلة المتروكة، نموذج الحجز غير المكتمل، أو محادثة البيع التي تتوقف كلها إشارات تحتاج إلى قراءة المسار قبل زيادة النشاط الذي يدخل إليه.", en: "An abandoned cart, unfinished booking form or stalled sales conversation are signals to inspect the path before increasing the activity feeding into it." }],
    [{ ar: "5. التجربة تنتهي عند الشراء", en: "5. The experience ends at purchase" }, { ar: "إذا لم توجد متابعة واضحة بعد الشراء أو الزيارة أو التسجيل، تضيع فرصة التكرار والتعلم من التجربة. رحلة العميل لا تنتهي عندما تدفع الفاتورة؛ هناك قيمة فيما يحدث بعدها أيضًا.", en: "If there is no clear follow-up after purchase, visit or enrolment, the business loses an opportunity for repeat behaviour and learning. The customer journey does not end when the invoice is paid; what happens afterward matters too." }]
  ]
};
EM.INSIGHTS.forEach((item) => {
  if (insightSections[item.id]) item.sections = insightSections[item.id].map(([heading, text]) => ({ heading, text }));
});

/* ============================================================================
 * HOME v2 — محتوى أقسام الرئيسية بعد الهيرو.
 * إضافة فقط: لا تعديل على المفاتيح القائمة إلا ما كان نصًا معطوبًا.
 * ========================================================================== */

/* المعنى العربي لمفاهيم العلامة الأربعة. القيم ar/en الأصلية تبقى كما هي
   (مصطلحات علامة إنجليزية) حتى لا يتأثر /about. */
const PILLAR_GLOSS = {
  insight: { ar: "البصيرة", en: "Insight" },
  ideas: { ar: "الفكرة", en: "Idea" },
  influence: { ar: "التأثير", en: "Influence" },
  impact: { ar: "الأثر", en: "Impact" }
};
EM.PILLARS.forEach((item) => {
  if (PILLAR_GLOSS[item.id]) item.gloss = PILLAR_GLOSS[item.id];
});

/* كانت مكتوبة داخل HomePage.tsx — نُقلت إلى مصدر المحتوى. */
EM.HOME_NEEDLES = {
  consult: [
    { ar: "قرار", en: "Decision" },
    { ar: "تشخيص", en: "Diagnosis" },
    { ar: "استراتيجية", en: "Strategy" },
    { ar: "خارطة نمو", en: "Growth map" }
  ],
  exec: [
    { ar: "أنظمة", en: "Systems" },
    { ar: "مبادرات", en: "Initiatives" },
    { ar: "تفعيل", en: "Activation" },
    { ar: "قياس", en: "Measurement" }
  ]
};

/* ============================================================================
 * Editorial Copy Deck v2 — final, verified replacements.
 *
 * This block is deliberately explicit rather than a broad search/replace. Each
 * override is attached to the existing semantic data record so KEEP EXACT
 * proof facts and insight bodies remain untouched.
 * ========================================================================== */

Object.assign(EM.I18N.ar, {
  bookCta: "أرسلوا استفسارًا للاستشارة",
  bookShort: "أرسلوا استفسارًا",
  startConversation: "ابدأوا من التحدي",
  exploreCta: "استكشفوا الاستشارات",
  exploreExecution: "استكشفوا التنفيذ",
  exploreSectors: "استكشفوا خبرة القطاعات",
  exploreCases: "شاهدوا ما تغيّر في العمل",
  exploreInsights: "اقرأوا الرؤى",
  engageCta: "اختاروا طريقة التعاون",
  viewCase: "اقرأوا الحالة",
  readInsight: "اقرأوا الرؤية",
  footerContact: "ابدأوا حوارًا",
  notFound: "الصفحة التي تبحثون عنها غير موجودة.",
  backHome: "العودة إلى الرئيسية",
  footerText: "استشارات نمو وتسويق تربط القرار بالتنفيذ، وتقرأ المبيعات والتشغيل وتجربة العميل كأجزاء من الصورة نفسها."
});
Object.assign(EM.I18N.en, {
  bookCta: "Send a consultation inquiry",
  bookShort: "Send an inquiry",
  startConversation: "Start with the challenge",
  exploreCta: "Explore consulting",
  exploreExecution: "Explore execution",
  exploreSectors: "Explore sector experience",
  exploreCases: "See what changed in the work",
  exploreInsights: "Read the insights",
  engageCta: "Choose a way to work together",
  viewCase: "Read the case",
  readInsight: "Read the insight",
  footerContact: "Start a conversation",
  notFound: "The page you are looking for does not exist.",
  backHome: "Back to home",
  footerText: "Growth and marketing consultancy connecting decisions to execution, with sales, operations and customer experience treated as parts of the same picture."
});

Object.assign(EM.PAGES, {
  home: {
    title: { ar: "Elite Maison | استشارات النمو والتسويق في أسواق الخليج", en: "Elite Maison | Growth & Marketing Consultancy in GCC Markets" },
    description: { ar: "استشارات نمو وتسويق في أسواق الخليج تربط التشخيص والاستراتيجية بالمبيعات والتنفيذ والقياس لتحويل القرارات إلى تقدم قابل للمتابعة.", en: "Growth and marketing consultancy in GCC markets connecting diagnosis, strategy, sales, execution and measurement to turn decisions into trackable progress." }
  },
  about: {
    title: { ar: "من نحن | Elite Maison — استشارات نمو وتسويق بخبرة خليجية", en: "About Elite Maison | Growth & Marketing Consultancy in the GCC" },
    description: { ar: "تعرفوا إلى Elite Maison ومنهجها في ربط التسويق بالنمو والمبيعات والتشغيل وتجربة العميل بخبرة عملية في أسواق الخليج.", en: "Meet Elite Maison and its approach to connecting marketing with growth, sales, operations and customer experience across GCC markets." }
  },
  consulting: {
    title: { ar: "استشارات النمو والتسويق | قرارات أوضح قبل مزيد من النشاط | Elite Maison", en: "Growth & Marketing Consulting | Clearer Decisions Before More Activity | Elite Maison" },
    description: { ar: "استشارات في النمو والمبيعات والتوسع والمنتج وتجربة العميل تساعد الشركات على تشخيص العوائق وترتيب الأولويات وبناء مسار عمل واضح.", en: "Consulting across growth, sales, market expansion, product and customer experience to diagnose constraints, set priorities and build a usable path forward." }
  },
  execution: {
    title: { ar: "التنفيذ التسويقي | من الاستراتيجية إلى تشغيل قابل للقياس | Elite Maison", en: "Marketing Execution | From Strategy to Measurable Operations | Elite Maison" },
    description: { ar: "تنفيذ يربط التسويق بالأداء والحملات والأنظمة والأتمتة والهوية، مع متابعة وقياس وتحسين مستمر يخدم نتيجة تجارية واضحة.", en: "Execution across performance marketing, campaigns, systems, automation and brand, with measurement and improvement tied to a clear commercial outcome." }
  },
  sectors: {
    title: { ar: "خبرة القطاعات | سياق مختلف، قرار مختلف | Elite Maison", en: "Sector Experience | Different Context, Different Decision | Elite Maison" },
    description: { ar: "خبرة مختارة في الرعاية الصحية والمنتجات الاستهلاكية والضيافة والتجزئة والتجارة الإلكترونية والتعليم، مع قراءة كل قطاع ضمن سياقه التجاري.", en: "Selected experience across healthcare, FMCG, hospitality, retail, e-commerce and education, with each sector read through its commercial context." }
  },
  cases: {
    title: { ar: "الدليل ونتائج العمل | حالات نمو وتسويق مختارة | Elite Maison", en: "Proof & Case Studies | Selected Growth and Marketing Work | Elite Maison" },
    description: { ar: "حالات مختارة تعرض التحدي والقرار والتنفيذ والنتيجة التي يمكن إثباتها بالمعلومات المعتمدة، من دون تحويل الموقع إلى معرض شعارات.", en: "Selected cases showing the challenge, decision, execution and evidence supported by approved information — not a gallery of logos." }
  },
  insights: {
    title: { ar: "رؤى النمو والتسويق | أفكار لصنع قرار أفضل | Elite Maison", en: "Growth & Marketing Insights | Thinking for Better Decisions | Elite Maison" },
    description: { ar: "رؤى عملية عن النمو والإيراد والتوسع والذكاء الاصطناعي وتجربة العميل، مكتوبة لصانع القرار لا لمجرد نشر محتوى جديد.", en: "Practical thinking on growth, revenue, expansion, AI and customer experience, written for decision-makers rather than content volume." }
  },
  contact: {
    title: { ar: "تواصل وابدأ استشارة | Elite Maison", en: "Contact Elite Maison for a Consultation" },
    description: { ar: "أرسلوا استفسارًا لفريق Elite Maison ليتابع معكم، أو تواصلوا مباشرة عبر واتساب أو البريد أو الهاتف.", en: "Send an inquiry for the Elite Maison team to follow up, or contact us directly by WhatsApp, email or phone." }
  }
});

Object.assign(EM.COPY.home, {
  eyebrow: { ar: "Four I's. One Vision.", en: "Four I's. One Vision." },
  title: { ar: "وضوح أكبر.", en: "Greater clarity." },
  accent: { ar: "قرارات أفضل. نمو أقوى.", en: "Better decisions. Stronger growth." },
  lead: { ar: "Elite Maison بيت استشاري للنمو والتسويق يعمل مع الشركات في أسواق الخليج على الأسئلة التي تسبق مزيدًا من النشاط: أين يتعطل النمو؟ أين يضيع الطلب؟ وما الذي يستحق الأولوية؟ نصل التشخيص بالاستراتيجية والتنفيذ والقياس حتى يتحول القرار إلى تقدم يمكن متابعته.", en: "Elite Maison is a growth and marketing consultancy working across GCC markets on the questions that come before more activity: where is growth stalling, where is demand being lost, and what deserves priority? We connect diagnosis, strategy, execution and measurement so decisions become progress that can be tracked." },
  trustLabel: { ar: "خبرة تقرأ العمل..", en: "Experience that understands the business." },
  challengesEyebrow: { ar: "ابدأوا بما يعيق التقدم", en: "Start with what is slowing progress" },
  challengesTitle: { ar: "أين يتعطل التقدم؟", en: "Where is progress getting stuck?" },
  challengesText: { ar: "قد يظهر العطل في المبيعات، أو السوق، أو تجربة العميل، أو طريقة تشغيل التسويق نفسها. لا نفترض الحل من البداية؛ نحدد موضع المشكلة أولًا، ثم نختار ما يستحق أن يتحرك.", en: "The constraint may sit in sales, the market, customer experience or the way marketing itself is being run. We do not assume the answer first; we locate the problem, then decide what deserves to move." },
  methodTitle: { ar: "نفهمكم، نختار القرار الذي نراه مناسبًا لكم، وندفع قرارنا للعمل برؤية واثقة.", en: "We understand you, choose the course we believe is right for you, and put it to work with confident direction." },
  methodText: { ar: "نقرأ العمل والسوق ورحلة العميل، نفصل العرض عن السبب، ونرتب الأولويات قبل إضافة أي نشاط. بعدها يتحول القرار إلى تنفيذ له مسؤولية وإيقاع ومؤشر، ثم نراجع ما تغيّر ونحسّن بناءً على الدليل.", en: "We read the business, market and customer journey, separate symptoms from causes, and set priorities before adding activity. The decision then becomes work with ownership, rhythm and an indicator — followed by review and improvement based on evidence." },
  capTitle: { ar: "الدور يتغيّر. المعيار لا يتغيّر.", en: "The role may change. The standard does not." },
  capText: { ar: "استراتيجية تستحق التنفيذ، وتنفيذ يبقى تحت عين القرار.", en: "Strategy worth executing. Execution guided by the same discipline." },
  consultingTitle: { ar: "الاستشارة.", en: "Consulting." },
  consultingPreview: { ar: "نحدد ما يعيق النمو، وما الذي يستحق الأولوية، وما الذي يجب أن ينتظر. النتيجة ليست عرضًا استراتيجيًا إضافيًا؛ بل اتجاه يستطيع الفريق استخدامه في قراراته التالية.", en: "We identify what is constraining growth, what deserves priority and what should wait. The result is not another strategy deck; it is a direction the team can use in the decisions that follow." },
  executionTitle: { ar: "التنفيذ.", en: "Execution." },
  executionPreview: { ar: "نحوّل الاتجاه إلى حملات وقنوات وأنظمة يمكن تشغيلها وقياسها.", en: "We turn direction into campaigns, channels and systems that can be run and measured." },
  sectorsEyebrow: { ar: "السياق يغيّر القرار", en: "Context changes the decision" },
  sectorsTitle: { ar: "القطاع يغيّر السؤال قبل أن يغيّر الحل.", en: "The sector changes the question before it changes the answer." },
  casesEyebrow: { ar: "دليل من العمل", en: "Evidence from the work" },
  casesTitle: { ar: "نتائج تتكلم، والحكم للأرقام.", en: "Results speak. The numbers have the final say." },
  closeTitle: { ar: "إذا كان هناك شيء يجب أن يتغيّر، فلنبدأ منه.", en: "If something needs to change, start there." },
  closeText: { ar: "أرسلوا استفسارًا إذا كان السؤال يحتاج إلى نقاش، وسيتابع الفريق معكم مباشرة.", en: "Send us an inquiry if your question calls for a conversation, and our team will follow up with you directly." },
  statementTitle: { ar: "خبرة تعرف الفرق بين الانشغال والتقدم.", en: "Experience that knows the difference between busyness and progress." }
});

Object.assign(EM.COPY.about, {
  title: { ar: "التسويق لا يعمل في فراغ. والمشكلة لا تفعل كذلك.", en: "Marketing does not operate in a vacuum. Neither does the problem." },
  lead: { ar: "لا نبدأ بما تفعلونه. نبدأ بما يجب أن يتغيّر.", en: "We don't start with what you do. We start with what needs to change." },
  whoTitle: { ar: "ننظر إلى العمل كمنظومة، لا كسلسلة قنوات.", en: "We look at the business as a system, not a stack of channels." },
  whoText: { ar: "Elite Maison بيت استشاري للنمو والتسويق. نعمل من التشخيص والاستراتيجية إلى الإدارة والإشراف على التنفيذ والقياس، ونبقي السؤال التجاري الأصلي حاضرًا حتى لا يتحول التسويق إلى نشاط منفصل عن النتيجة.", en: "Elite Maison is a growth and marketing consultancy. We work from diagnosis and strategy through management, execution oversight and measurement, keeping the original commercial question in view so marketing does not become activity detached from the outcome." },
  pillarsTitle: { ar: "Four I's: من الفهم إلى الأثر", en: "The Four I's: from understanding to impact" },
  methodTitle: { ar: "المنهج واضح. الصرامة في القرارات.", en: "The method is simple. The discipline is in the decisions." },
  methodText: { ar: "Diagnose → Prioritize → Execute → Measure & Improve. أربع مراحل تمنع التفكير من الانفصال عن العمل: نفهم أين تبدأ المشكلة، نختار ما يستحق الآن، نشغّل القرار، ثم نراجع ما حدث.", en: "Diagnose → Prioritize → Execute → Measure & Improve. Four stages that keep thinking connected to the work: find where the problem begins, choose what matters now, run the decision, then review what happened." },
  engageTitle: { ar: "شكل التعاون يتبع المشكلة، لا الباقة.", en: "The engagement follows the problem, not a package." },
  engageNote: { ar: "قد يكون المطلوب قرارًا واحدًا، أو قيادة من الاستراتيجية إلى التنفيذ، أو نظامًا يحتاج إلى بناء ومتابعة. نحدد الشكل بعد فهم السؤال، لا قبله.", en: "The need may be one decision, leadership from strategy through execution, or a system that needs to be built and followed. We define the shape after understanding the question, not before." },
  ctaTitle: { ar: "لديكم سؤال معقد؟ هذا مكان جيد للبدء.", en: "Have a complex question? This is a good place to start." }
});

EM.PILLARS = [
  { id: "insight", ar: "Insight", en: "Insight", text: { ar: "نبحث عمّا يفسر المشكلة، لا عمّا يصفها فقط.", en: "Look for what explains the problem, not only what describes it." } },
  { id: "ideas", ar: "Ideas", en: "Ideas", text: { ar: "نحوّل الفهم إلى خيارات تستحق الاختبار.", en: "Turn understanding into options worth testing." } },
  { id: "influence", ar: "Influence", en: "Influence", text: { ar: "نجعل القيمة أوضح، والاختيار أسهل.", en: "Make the value clearer and the choice easier." } },
  { id: "impact", ar: "Impact", en: "Impact", text: { ar: "نربط ما نفعله بما تغيّر فعلًا.", en: "Connect the work to what actually changed." } }
];
EM.METHOD = [
  { ar: { title: "Diagnose", text: "نفهم أين تبدأ المشكلة وأين تظهر، ونفصل الأعراض عن الأسباب." }, en: { title: "Diagnose", text: "Find where the problem begins and where it appears, separating symptoms from causes." } },
  { ar: { title: "Prioritize", text: "نختار ما يستحق الآن، ونقبل بوضوح ما يجب أن ينتظر." }, en: { title: "Prioritize", text: "Choose what deserves attention now, and be explicit about what should wait." } },
  { ar: { title: "Execute", text: "نحوّل القرار إلى عمل له مالك وإيقاع وطريقة متابعة." }, en: { title: "Execute", text: "Turn the decision into work with ownership, rhythm and a way to follow it." } },
  { ar: { title: "Measure & improve", text: "نقرأ ما تغيّر وما لم يتغيّر، ثم نحسّن بناءً على الدليل." }, en: { title: "Measure & improve", text: "Read what changed and what did not, then improve based on evidence." } }
];
EM.ENGAGE = [
  { id: "advisory", kicker: "Advisory", title: { ar: "عندما تحتاجون إلى قرار قبل التزام أكبر", en: "When you need a decision before a bigger commitment" }, text: { ar: "تشخيص مركز، خيارات واضحة، وخارطة تساعد الفريق على معرفة ما يجب أن يحدث بعد ذلك.", en: "A focused diagnosis, clear options and a roadmap that helps the team know what should happen next." } },
  { id: "end-to-end", kicker: "End-to-end", title: { ar: "عندما لا يكفي أن تكون الاستراتيجية صحيحة", en: "When a correct strategy is not enough" }, text: { ar: "قيادة مترابطة من القرار إلى التشغيل والقياس والتحسين، بدل أن تنتهي العلاقة عند تسليم الخطة.", en: "Connected leadership from decision through execution, measurement and improvement, rather than ending at the handover of a plan." } },
  { id: "systems", kicker: "Custom systems", title: { ar: "عندما تصبح طريقة العمل نفسها عائقًا", en: "When the way of working becomes the constraint" }, text: { ar: "نبني أو نعيد ترتيب الأنظمة والأدوات حول ما يحتاجه الفريق فعلًا للرؤية والمتابعة والتنفيذ.", en: "Build or reshape systems and tools around what the team actually needs to see, follow and execute." } },
  { id: "growth", kicker: "Growth management", title: { ar: "عندما يحتاج النمو إلى إيقاع قيادة مستمر", en: "When growth needs an ongoing leadership rhythm" }, text: { ar: "متابعة للمبادرات والفرق والمؤشرات حتى تبقى الأولويات متصلة بما يحدث فعلًا في السوق والعمل.", en: "Ongoing oversight of initiatives, teams and indicators so priorities stay connected to what is actually happening in the market and the business." } }
];

const consultingDeck = {
  growth: { challenge: { ar: "الخيارات كثيرة، والموارد محدودة. المشكلة ليست العثور على فرصة نمو أخرى، بل معرفة أيها يستحق أن يبدأ الآن.", en: "Opportunities are plentiful and resources are finite. The question is not where to find another growth idea, but which one deserves to move now." }, objective: { ar: "تحديد أين يمكن أن يأتي النمو، وترتيب الفرص بحسب ما يستحق التركيز.", en: "Identify where growth can come from and sequence the opportunities that deserve focus." }, scope: { ar: "الوضع الحالي، مصادر النمو، القيود، الأولويات، وما يجب أن ينتظر.", en: "The current position, sources of growth, constraints, priorities and what should wait." }, role: { ar: "تحويل طموح النمو إلى اختيارات واضحة يستطيع الفريق الدفاع عنها والعمل عليها.", en: "Turn growth ambition into clear choices the team can defend and act on." }, measure: { ar: "أولويات محددة وخارطة تغيّر ما يفعله الفريق، لا وثيقة تُحفظ بعد العرض.", en: "Defined priorities and a roadmap that changes what the team does, not a document filed after the presentation." } },
  sales: { challenge: { ar: "الاهتمام موجود، لكن شيئًا ما يضيع بين أول تفاعل والإيراد.", en: "Interest exists, but something is being lost between first contact and revenue." }, objective: { ar: "تحديد أين يتسرب التحويل، وما الذي يمكن تغييره لاستعادة الزخم.", en: "Find where conversion is leaking and what can change to restore momentum." }, scope: { ar: "العرض، مراحل البيع، الانتقالات بين الفرق، نقاط الاحتكاك، وفرص الإيراد.", en: "The offer, sales stages, team handoffs, friction points and revenue opportunities." }, role: { ar: "ربط عمل المبيعات برحلة العميل وهدف النمو بدل قياس النشاط بمعزل عن النتيجة.", en: "Connect sales activity to the customer journey and growth objective instead of measuring activity in isolation." }, measure: { ar: "مسار بيع أوضح، ونقاط تحويل ومتابعة يمكن للفريق العمل عليها.", en: "A clearer sales path with conversion and follow-up points the team can work on." } },
  expansion: { challenge: { ar: "السوق يبدو جذابًا. السؤال الحقيقي هو: هل أنتم جاهزون لدخوله بالطريقة الصحيحة؟", en: "The market looks attractive. The real question is whether you are ready to enter it in the right way." }, objective: { ar: "اختبار الجاهزية ومنطق الدخول قبل أن تتحول الموارد إلى التزام يصعب التراجع عنه.", en: "Test readiness and the logic of entry before resources become a commitment that is difficult to reverse." }, scope: { ar: "اختيار السوق، الجاهزية، نموذج الدخول، القنوات، والقدرة على الخدمة والمتابعة.", en: "Market choice, readiness, entry model, channels and the ability to serve and follow the market." }, role: { ar: "تحويل التوسع من رغبة إلى قرار له معايير وطريقة دخول واضحة.", en: "Turn expansion from an ambition into a decision with criteria and a clear route to entry." }, measure: { ar: "قرار أوضح حول الدخول وطريقته، مع شروط نجاح معروفة قبل الإطلاق.", en: "A clearer entry decision and route, with known conditions for success before launch." } },
  product: { challenge: { ar: "القيمة موجودة، لكن العرض لا يقولها بوضوح — أو يصبح أصعب كلما حاولتم توسيعه.", en: "The value exists, but the offer does not express it clearly — or becomes harder to run as you try to scale it." }, objective: { ar: "جعل القيمة المقدمة أوضح، والنموذج أنسب للمرحلة التالية.", en: "Make the value proposition clearer and the model better suited to the next stage." }, scope: { ar: "المنتج أو الخدمة، القيمة المقدمة، بنية العرض، ومنطق نموذج العمل.", en: "The product or service, value proposition, offer structure and business-model logic." }, role: { ar: "مواءمة ما تبيعه الشركة مع ما يستطيع السوق فهمه وتبنيه وما يستطيع العمل دعمه.", en: "Align what the business sells with what the market can understand and adopt, and what the operation can support." }, measure: { ar: "عرض أوضح ونموذج أسهل في الفهم والتشغيل والتوسع.", en: "A clearer offer and a model that is easier to understand, operate and scale." } },
  franchise: { challenge: { ar: "نجاح موقع واحد لا يضمن أن التجربة ستنجو من التكرار.", en: "Success in one location does not guarantee the experience will survive repetition." }, objective: { ar: "تحويل النجاح المحلي إلى نموذج يمكن نقله من دون فقدان ما يجعل التجربة مميزة.", en: "Turn local success into a model that can travel without losing what makes the experience distinctive." }, scope: { ar: "معايير التشغيل، تجربة العميل، متطلبات العلامة، وما يجب أن يبقى ثابتًا عند التوسع.", en: "Operating standards, customer experience, brand requirements and what must remain consistent as the business expands." }, role: { ar: "تحديد ما يجب توحيده وما يمكن تكييفه حتى يصبح التوسع قابلًا للإدارة.", en: "Define what must be standardized and what can adapt so expansion becomes manageable." }, measure: { ar: "نموذج تشغيل وتجربة يمكن تكرارهما بثبات أكبر.", en: "An operating model and customer experience that can be repeated more consistently." } },
  "private-label": { challenge: { ar: "المنتج موجود. ما ينقصه هو منطق تجاري واضح يصل به إلى السوق ويمنحه طريقًا للنمو.", en: "The product exists. What is missing is a clear commercial logic that gets it to market and gives it a path to grow." }, objective: { ar: "بناء منطق أوضح للعلامة وطريقها إلى السوق والتوزيع.", en: "Build a clearer commercial logic for the brand, its route to market and distribution." }, scope: { ar: "العرض، السوق، قنوات التوزيع، ومسار النمو.", en: "The offer, market, distribution channels and growth path." }, role: { ar: "ربط المنتج بسوق وقناة وسياق تجاري يستطيع العمل دعمه.", en: "Connect the product to a market, channel and commercial context the business can support." }, measure: { ar: "طريق سوق وتوزيع واضح يمكن البناء عليه.", en: "A defined market and distribution path the business can build on." } },
  journey: { challenge: { ar: "العميل يريد التقدم، لكن الرحلة تجعله يعمل أكثر مما ينبغي.", en: "The customer wants to move forward, but the journey makes them work harder than they should." }, objective: { ar: "تقليل الاحتكاك وتحسين اللحظات التي تؤثر في التحويل والعودة والولاء.", en: "Reduce friction and improve the moments that influence conversion, return and loyalty." }, scope: { ar: "نقاط التفاعل، الانتقالات بين الفرق، الخطوة التالية، ومسار العميل من الاهتمام إلى ما بعد الشراء.", en: "Touchpoints, team handoffs, the next step and the customer path from interest through post-purchase." }, role: { ar: "جعل تجربة العميل جزءًا من الأداء التجاري، لا طبقة تجميل منفصلة عنه.", en: "Make customer experience part of commercial performance, not a cosmetic layer beside it." }, measure: { ar: "رحلة أبسط ونقاط احتكاك محددة يمكن تحسينها ومتابعتها.", en: "A simpler journey with defined friction points that can be improved and followed." } },
  executive: { challenge: { ar: "الفرق تتحرك، لكن لا أحد يرى الصورة كلها أو يملك إيقاع المتابعة عبر المبادرات.", en: "Teams are moving, but no one sees the whole picture or owns the rhythm across initiatives." }, objective: { ar: "توحيد الأولويات والمتابعة حول هدف تجاري مشترك.", en: "Align priorities and follow-up around a shared commercial objective." }, scope: { ar: "إدارة المبادرات، التنسيق بين الفرق، مؤشرات الأداء، وإيقاع المراجعة.", en: "Initiative management, cross-team coordination, performance indicators and review rhythm." }, role: { ar: "إبقاء القرار والتنفيذ في المسار نفسه حتى لا تتوزع الأولويات بين الفرق.", en: "Keep decisions and execution on the same path so priorities do not fragment across teams." }, measure: { ar: "أولويات ومؤشرات ومسؤوليات تنفيذ يمكن تتبعها بوضوح.", en: "Priorities, indicators and execution ownership that can be clearly tracked." } }
};
EM.CONSULTING.forEach((item) => { if (consultingDeck[item.id]) Object.assign(item, consultingDeck[item.id]); });

Object.assign(EM.COPY.consulting, {
  title: { ar: "قبل أن تتحركوا أسرع، احسموا أين يستحق العمل أن يتحرك.", en: "Before moving faster, decide where the business should move." },
  lead: { ar: "حين تكون الخيارات كثيرة، يصبح وضوح القرار أكثر قيمة من إضافة نشاط جديد. نساعدكم على تشخيص ما يعيق النمو، ترتيب الأولويات، وتحويل أسئلة المبيعات والتوسع والمنتج وتجربة العميل إلى مسار يمكن استخدامه.", en: "When options multiply, clarity becomes more valuable than adding activity. We help diagnose what is constraining growth, set priorities and turn questions around sales, expansion, product and customer experience into a path the team can use." },
  answer: { ar: "تساعد استشارات Elite Maison الشركات في أسواق الخليج على تشخيص عوائق النمو، ترتيب الأولويات، وتحويل أسئلة المبيعات والتوسع والمنتج وتجربة العميل إلى قرارات وخارطة عمل قابلة للاستخدام.", en: "Elite Maison helps companies in GCC markets diagnose growth constraints, set priorities and turn questions around sales, expansion, product and customer experience into decisions and a usable roadmap." },
  decisionTitle: { ar: "أي قرار، إن حُسم، سيغيّر ما تفعلونه بعده؟", en: "Which decision would change what you do next?" },
  decisionText: { ar: "ابدأوا بالسؤال التجاري الأقرب إلى واقعكم. القدرة الاستشارية تأتي بعد فهم المشكلة، لا قبلها.", en: "Start with the business question closest to your reality. The advisory capability follows the problem, not the other way around." },
  engageTitle: { ar: "لا نبدأ بالمخرجات. نبدأ بالقرار الذي يجب أن يصبح ممكنًا.", en: "We do not start with deliverables. We start with the decision the work needs to make possible." },
  engageText: { ar: "نحدد ما الذي يجب أن يصبح أوضح، ثم نبني التشخيص والخيارات والأولوية والخارطة حول هذا القرار.", en: "We define what needs to become clearer, then shape the diagnosis, options, priority and roadmap around that decision." },
  ctaTitle: { ar: "إذا كان السؤال غير واضح، فهذه ليست مشكلة. هذه نقطة البداية.", en: "If the question is unclear, that is not a problem. That is the starting point." },
  ctaText: { ar: "نبدأ من المسألة كما هي، لا من خدمة نحاول بيعها لها.", en: "We start with the issue as it is, not with a service we are trying to fit onto it." }
});

const executionDeck = {
  performance: { objective: { ar: "تحويل الإنفاق إلى طلب يمكن تتبعه وتحسينه، لا إلى أرقام حركة منفصلة عن النتيجة.", en: "Turn spend into demand that can be tracked and improved, not activity metrics detached from the outcome." }, scope: { ar: "تخطيط وإدارة الحملات المدفوعة ومسارات التحويل ومتابعة الأداء.", en: "Plan and manage paid campaigns, conversion paths and performance follow-up." }, impact: { ar: "قرارات إنفاق تتغير بناءً على ما يقترب من النتيجة التجارية، لا على المؤشرات السطحية وحدها.", en: "Spending decisions shaped by what moves closer to the commercial outcome, not surface metrics alone." } },
  campaigns: { objective: { ar: "جعل الرسالة والعرض والخطوة التالية متصلة عبر القنوات.", en: "Make the message, offer and next step connected across channels." }, scope: { ar: "تخطيط الحملات، تشغيل القنوات، ومتابعة الأداء عبر المسار.", en: "Campaign planning, channel execution and performance follow-up across the path." }, impact: { ar: "تجربة أقل تجزؤًا من أول تفاعل حتى الخطوة التالية.", en: "A less fragmented experience from first interaction to the next action." } },
  systems: { objective: { ar: "إخراج المتابعة من العمل اليدوي والمعلومات المتفرقة إلى نظام يرى الفريق من خلاله ما يحدث.", en: "Move follow-up out of manual work and scattered information into a system the team can use to see what is happening." }, impact: { ar: "رؤية أوضح، ومسؤولية أسهل في التتبع، وقرارات أقل اعتمادًا على البحث عن المعلومة.", en: "Clearer visibility, ownership that is easier to follow and decisions less dependent on hunting for information." } },
  automation: { objective: { ar: "إزالة العمل المتكرر حين تستطيع الأتمتة أو الذكاء الاصطناعي أداءه بصورة أنسب.", en: "Remove repetitive work where automation or AI can handle it more appropriately." }, scope: { ar: "أتمتة عمليات محددة وتوظيف الذكاء الاصطناعي داخل مسارات عمل واضحة لها نتيجة معروفة.", en: "Automate defined processes and apply AI inside clear workflows with a known intended outcome." }, impact: { ar: "تقنية تختفي داخل طريقة العمل بدل أن تصبح طبقة جديدة من التعقيد.", en: "Technology that disappears into the way of working instead of becoming another layer of complexity." } },
  branding: { objective: { ar: "منح العلامة لغة وصورة تعكسان المكان الذي تريد أن تحتله في ذهن السوق.", en: "Give the brand a language and identity that reflect the position it intends to own in the market." }, impact: { ar: "حضور أكثر اتساقًا وتميزًا ووضوحًا عبر نقاط التواصل.", en: "A more consistent, distinctive and recognizable presence across touchpoints." } },
  activation: { objective: { ar: "منع الخطة من أن تنتهي عند الإطلاق: تشغيل، قياس، تعديل، ثم تحسين مستمر.", en: "Keep the plan from ending at launch: run, measure, adjust and keep improving." }, impact: { ar: "تنفيذ يبقى حيًا بعد الإطلاق ويتغير مع ما تظهره النتائج.", en: "Execution that stays alive after launch and evolves with what the results reveal." } }
};
EM.EXECUTION.forEach((item) => { if (executionDeck[item.id]) Object.assign(item, executionDeck[item.id]); });
Object.assign(EM.COPY.execution, {
  title: { ar: "الاستراتيجية لا تصبح حقيقية في العرض. تصبح حقيقية في يوم العمل.", en: "Strategy does not become real in the deck. It becomes real in the day-to-day." },
  lead: { ar: "نحوّل الاتجاه إلى حملات وقنوات وأنظمة وتفعيل يمكن تشغيله وقياسه وتحسينه. الهدف ليس زيادة الحركة، بل بناء تنفيذ يبقى مرتبطًا بالنتيجة التجارية التي بدأ منها القرار.", en: "We turn direction into campaigns, channels, systems and activation that can be run, measured and improved. The goal is not more motion, but execution that stays tied to the commercial outcome behind the decision." },
  answer: { ar: "تنفيذ Elite Maison يربط الاستراتيجية بالتسويق القائم على الأداء، إدارة الحملات والقنوات، أنظمة التشغيل التسويقي، الأتمتة والذكاء الاصطناعي، الهوية، والتفعيل المستمر مع القياس والتحسين.", en: "Elite Maison connects strategy to performance marketing, campaign and channel management, marketing operations systems, automation and AI, brand execution and ongoing activation with measurement and improvement." },
  chainTitle: { ar: "اتجاه واضح. تشغيل منضبط. تعلّم مستمر.", en: "Clear direction. Disciplined execution. Continuous learning." },
  chainText: { ar: "نربط القنوات والأدوات والأنظمة بالقرار نفسه، ثم نستخدم ما تكشفه النتائج لتحسين ما يحدث بعد ذلك.", en: "We connect channels, tools and systems to the same decision, then use what the results reveal to improve what happens next." },
  ctaTitle: { ar: "الاتجاه واضح؟ الآن يجب أن ينجو من يوم العمل.", en: "The direction is clear? Now it has to survive the day-to-day." },
  ctaText: { ar: "نحدد ما يحتاج إلى تشغيل، من يملكه، وما الذي سنراقبه لنعرف إن كان التنفيذ يتحرك في الاتجاه المطلوب.", en: "We define what needs to run, who owns it and what we will watch to know whether execution is moving in the intended direction." }
});

const sectorDeck = {
  healthcare: { context: { ar: "في الرعاية الصحية، الثقة جزء من التحويل. الاختصاص، صورة المنشأة، سهولة الحجز، وما يحدث قبل الزيارة وبعدها كلها تشكّل الطلب.", en: "In healthcare, trust is part of conversion. The specialty, provider, ease of booking and what happens before and after the visit all shape demand." }, priorities: { ar: "عرض واضح، مسار حجز سهل الإكمال، ومتابعة تكشف أين يتوقف الطلب.", en: "A clear offer, a booking path that is easy to complete and follow-up that shows where demand is being lost." } },
  fmcg: { context: { ar: "المنتج لا ينمو لأنه معروف فقط؛ ينمو حين يكون متاحًا، مفهومًا، ومختارًا مرة أخرى. التوزيع والسعر ووضوح الاختيار وإعادة الشراء جزء من الصورة نفسها.", en: "A product does not grow because it is known alone; it grows when it is available, understood and chosen again. Distribution, price, clarity of choice and repeat purchase belong to the same picture." }, priorities: { ar: "قناة مناسبة، تغطية يمكن توسيعها، وعرض تستطيع العلامة دعمه باستمرار.", en: "The right channel, coverage that can scale and an offer the brand can support consistently." } },
  hospitality: { context: { ar: "في الضيافة، العلامة تُعاش أكثر مما تُرى. التجربة داخل المكان، التشغيل، الخدمة، والقدرة على تكرار المستوى نفسه هي ما يحمل الهوية إلى التوسع.", en: "In hospitality, the brand is experienced more than it is seen. On-site experience, operations, service and the ability to repeat the same standard are what carry identity into expansion." } },
  retail: { context: { ar: "في التجزئة والتوزيع، الطريق إلى السوق جزء من النمو نفسه. أين يوجد المنتج، كيف يصل، ومن يملك علاقة القناة قد يحدد النتيجة بقدر الطلب.", en: "In retail and distribution, the route to market is part of growth itself. Where the product is available, how it gets there and who owns the channel relationship can shape the outcome as much as demand." } },
  ecommerce: { context: { ar: "في التجارة الإلكترونية، كل خطوة بين الإعلان والدفع يمكن أن تضيف قيمة أو تسرّبها. لذلك يجب أن تُقرأ القناة وتجربة الشراء والعودة والقياس كنظام واحد.", en: "In e-commerce, every step between the ad and payment can add value or leak it. Channel, purchase experience, return behaviour and measurement need to be read as one system." } },
  education: { context: { ar: "العميل لا يشتري برنامجًا فقط؛ يراهن على نتيجة مستقبلية. لذلك يصبح وضوح البرنامج والقيمة ومسار التسجيل جزءًا أساسيًا من القرار.", en: "The customer is not only buying a programme; they are betting on a future outcome. Programme clarity, value and the enrolment path therefore become central to the decision." } }
};
EM.SECTORS.forEach((item) => { if (sectorDeck[item.id]) Object.assign(item, sectorDeck[item.id]); });
Object.assign(EM.COPY.sectors, {
  title: { ar: "القطاع يغيّر السؤال قبل أن يغيّر الحل.", en: "The sector changes the question before it changes the answer." },
  lead: { ar: "طريقة الشراء، دورة القرار، القنوات، ومعايير الثقة تختلف من قطاع إلى آخر. لذلك نحافظ على انضباط واحد في التفكير، من دون نقل إجابة جاهزة من سوق إلى آخر.", en: "Buying behaviour, decision cycles, channels and trust signals change by sector. We keep the discipline in how we think without carrying a ready-made answer from one market into another." },
  answer: { ar: "خبرة Elite Maison القطاعية تعني فهم ما يغيّر القرار داخل كل سياق — كيف يشتري العميل، أين تتكوّن الثقة، ما الذي يبطئ التحويل، وما الذي يجعل النمو قابلًا للتكرار.", en: "Elite Maison treats sector experience as understanding what changes the decision in each context — how customers buy, where trust forms, what slows conversion and what makes growth repeatable." },
  selectTitle: { ar: "اختاروا السياق الأقرب إلى عملكم، لا القالب الأقرب إلى خدمة.", en: "Choose the context closest to your business, not the template closest to a service." },
  selectNote: { ar: "هذه مجموعة مختارة من القطاعات، وليست قائمة كاملة. الهدف هو إظهار كيف يتغير السؤال التجاري عندما يتغير السياق.", en: "This is a selected set of sectors, not a complete catalogue. The point is to show how the commercial question changes when the context changes." },
  ctaTitle: { ar: "لا تبدأوا باسم القطاع. ابدأوا بالسؤال داخله.", en: "Do not start with the sector label. Start with the question inside it." },
  ctaText: { ar: "نقرأ السوق والمرحلة ورحلة العميل، ثم نحدد أين يحتاج العمل إلى قرار أو تنفيذ أو كليهما.", en: "We read the market, stage and customer journey, then identify where the business needs a decision, execution or both." }
});

Object.assign(EM.COPY.cases, {
  title: { ar: "نبدأ بما تغيّر، لا بما صنعناه.", en: "We start with what changed, not what we made." },
  lead: { ar: "كل حالة تبدأ بسؤال تجاري، ثم قرار، ثم ما تم تشغيله، وتنتهي فقط بما يمكن إثباته من النتيجة بالمعلومات المعتمدة لدينا. لا نستخدم قصص العملاء كديكور، ولا نضيف رقمًا لا نستطيع الدفاع عنه.", en: "Each case starts with a commercial question, then a decision, then what was put into practice, and ends only with what can be supported by approved information. We do not use client stories as decoration, and we do not add a number we cannot defend." },
  ctaTitle: { ar: "إذا ذكّرتكم إحدى الحالات بسؤال لديكم، فلنبدأ من السؤال لا من الحل.", en: "If one of these cases feels familiar, start with the question — not the solution." },
  ctaText: { ar: "قد يكون السياق مختلفًا تمامًا. المهم هو فهم ما تحاولون تغييره الآن، ثم استخدام الخبرة ذات الصلة من دون فرض وصفة جاهزة.", en: "Your context may be entirely different. What matters is understanding what you are trying to change now, then using relevant experience without forcing a ready-made formula." }
});

const caseDeck = {
  "attractive-smile": { challenge: { ar: "كان المركز يدخل مرحلة توسع. السؤال لم يكن كيف نضيف نشاطًا تسويقيًا، بل كيف ندعم التوسع بطلب وحجوزات أكثر استقرارًا.", en: "The medical centre was entering an expansion phase. The question was not how to add more marketing activity, but how to support expansion with steadier demand and bookings." }, strategy: { ar: "ربط هدف التوسع بمسار الطلب، والتركيز على ما يساعد الاهتمام على التحول إلى حجوزات بصورة أكثر انتظامًا.", en: "Connect the expansion objective to the demand path and focus on what could turn interest into bookings more consistently." } },
  bloom: { challenge: { ar: "المنتج والسوق كانا موجودين؛ ما لم يكن يلتقط الإمكانات التجارية المتاحة بالقدر الكافي هو نموذج النمو وقنوات البيع.", en: "The product and market were already there; the growth model and sales channels were not capturing the available commercial potential strongly enough." }, strategy: { ar: "إعادة تصميم منطق النمو حول فرص إيراد أوضح بدل التعامل مع المبيعات كمسار ثابت لا يتغير.", en: "Redesign the growth logic around clearer revenue opportunities rather than treating sales as a fixed path." }, execution: { ar: "إعادة تصميم قنوات البيع لتخدم النموذج الجديد وتمنح العمل طريقًا تجاريًا أوضح.", en: "Redesign sales channels to support the new model and give the business a clearer commercial path." } },
  "bin-ablan": { challenge: { ar: "كان النمو يتطلب أسواقًا وقنوات توزيع جديدة. قبل توسيع النشاط، كان لا بد من حسم أين وكيف يحدث التوسع.", en: "Growth required new markets and distribution channels. Before expanding activity, the business needed a clearer decision on where and how expansion should happen." } },
  patchouli: { challenge: { ar: "نجاح العلامة في موقعها لم يكن السؤال الأصعب. السؤال كان كيف يصبح هذا النجاح نموذجًا يمكن تكراره عند التوسع.", en: "Success at the location level was not the hardest question. The harder question was how that success could become a model that could be repeated as the brand expanded." } },
  "ai-brains": { challenge: { ar: "الفكرة كانت موجودة. ما احتاج إلى الوضوح هو أين تكمن قيمتها، وكيف تتحول من مفهوم واسع إلى مشروع يمكن تطبيقه وقياسه.", en: "The idea already existed. What needed clarity was where its value sat and how to turn a broad concept into a project that could be applied and measured." }, strategy: { ar: "صياغة المشروع حول قيمة واضحة وحالة استخدام قابلة للتحويل إلى عمل، بدل إبقاء الذكاء الاصطناعي كعنوان عام.", en: "Shape the project around clear value and a use case that could be turned into work, rather than leaving AI as a broad label." }, proof: { ar: "جائزة أفضل مشروع داعم للذكاء الاصطناعي.", en: "Award for Best AI-Supporting Project." } }
};
EM.CASES.forEach((item) => { if (caseDeck[item.id]) Object.assign(item, caseDeck[item.id]); });

Object.assign(EM.COPY.insights, {
  title: { ar: "أفكار صُممت لتغيّر قرارًا، لا لتملأ مدونة.", en: "Ideas meant to change a decision, not fill a blog." },
  lead: { ar: "نكتب عن الأسئلة التي تظهر داخل العمل فعلًا: متى تصبح خارطة النمو أداة قرار؟ أين يضيع الطلب قبل أن يصبح إيرادًا؟ متى يكون السوق جذابًا لكن الدخول مبكرًا؟ وأين تخدم التقنية العمل بدل أن تصبح مشروعًا منفصلًا عنه؟", en: "We write about questions that actually show up inside the work: when does a growth roadmap become a decision tool, where does demand disappear before revenue, when is a market attractive but entry premature, and where does technology serve the work instead of becoming a separate project?" },
  ctaTitle: { ar: "عندما يصبح السؤال عمليًا، يمكننا نقله من المقال إلى واقع العمل.", en: "When the question becomes practical, we can move it from the article into the business." },
  ctaText: { ar: "نبدأ بالسياق، ثم نحدد إن كانت الخطوة التالية قرارًا استشاريًا، تنفيذًا، أو وضوحًا أكبر قبل أي منهما.", en: "We start with the context, then decide whether the next step is advisory, execution, or simply more clarity before either." }
});

Object.assign(EM.COPY.contact, {
  eyebrow: { ar: "ابدأوا من حيث أنتم", en: "Start where you are" },
  title: { ar: "سؤال، تحدٍ، أو قرار لم يُحسم بعد؟ لنتحدث عنه.", en: "A question, a challenge, or a decision still unresolved? Let’s talk it through." },
  lead: { ar: "أرسلوا استفسارًا مختصرًا إذا كنتم تريدون مشاركة السياق أولًا، وسيتابع الفريق معكم مباشرة. وإن كان الطريق المباشر أنسب، فواتساب والبريد والهاتف موجودة هنا أيضًا.", en: "Send a short inquiry if you want to share the context first, and the team will follow up directly. If a direct route is easier, WhatsApp, email and phone are here too." }
});

EM.DECK_MIGRATION_COMPLETE = true;
