/* =========================================================
   星图邻 XingTuLink - 中英双语 i18n
   纯静态、零构建；默认 zh-CN，英文按字典替换。
   使用方法：
     - 在所有可翻译元素上加 data-i18n="key"（innerHTML 替换）
     - 属性翻译：data-i18n-attr="placeholder:key|title:key2"
     - meta 标签特殊处理：title / description / og:*
     - 语言选择保存在 localStorage，跨页面持久化
   ========================================================= */
(function () {
  "use strict";

  // -------------- 翻译字典 --------------
  const DICT = {
    "zh-CN": {}, // 中文 = HTML 原文（空字典即可，不替换）
    en: {
      "brand.github.title": "Open Source · GitHub",
      /* ===== 通用：导航 / 页脚 ===== */
      "nav.home": "Home",
      "nav.geo-check": "GEO Checker",
      "nav.jsonld": "JSON-LD Generator",
      "nav.about-geo": "About GEO",
      "nav.contact": "Contact",
      "nav.zsoftym": "ZSoftYM Site →",
      "nav.menu": "Menu",

      "footer.desc": "Online tools & open-source projects. Connecting creators, lighting up the digital star map.",
      "footer.desc.short": "Online tools & open-source projects.",
      "footer.title.tools": "Tools",
      "footer.tools.geo": "GEO Friendliness Checker",
      "footer.tools.jsonld": "JSON-LD Generator",
      "footer.tools.kb": "GEO Knowledge Base",
      "footer.title.company": "Company",
      "footer.company.zsoftym": "ZSoftYM Official",
      "footer.company.contact": "Contact Us",
      "footer.company.privacy": "Privacy Policy",
      "footer.title.contact": "Contact",
      "footer.contact.phone": "Tel: +86 176 2902 0227",
      "footer.contact.email": "Email: guohao@zsymtech.cn",
      "footer.contact.addr": "Xi'an, Shaanxi",
      "footer.copyright": "© 2026 Xi'an Zhanshang Yueming Software Technology Co., Ltd. · XingTuLink",

      "brand.alt": "XingTuLink",

      /* ===== 通用：CTA / 按钮 ===== */
      "btn.use-now": "Use Now →",
      "btn.visit-zsoftym": "Visit ZSoftYM →",
      "btn.contact-zsoftym": "Contact ZSoftYM →",
      "btn.return-home": "Back to Home",
      "btn.go-geo": "Go to GEO Checker",

      /* ===== 首页 ===== */
      "home.eyebrow": "By Xi'an Zhanshang Yueming Software Technology Co., Ltd.",
      "home.hero.h1.part1": "Make AI Search Engines",
      "home.hero.h1.part2": "actively recommend",
      "home.hero.h1.part3": "your brand",
      "home.hero.lead": "XingTuLink provides free online tools for the Generative AI era: GEO friendliness checker, structured data generator, and open-source project publishing. All tools run locally in your browser — no data uploads — so your site stands out in answers from Doubao, Wenxin Yiyan, Kimi and ChatGPT.",
      "home.hero.cta-primary": "Start GEO Check →",
      "home.hero.cta-ghost": "Generate JSON-LD",

      "home.card.geo.title": "GEO Friendliness Checker",
      "home.card.geo.desc": "Enter a URL or paste HTML source for an automatic 4-dimension, 100-point evaluation with an actionable, prioritized optimization checklist.",
      "home.card.geo.chip": "Structured Data · Meta · Content Semantics · AI Readability",
      "home.card.jsonld.title": "JSON-LD Generator",
      "home.card.jsonld.desc": "6 Schema types (Organization / Article / FAQ / HowTo / Product / LocalBusiness). Fill in the form and get copy-paste ready code.",
      "home.card.jsonld.chip": "Schema.org Standard · Live Preview · One-Click Copy",

      "home.why.eyebrow": "Why GEO Matters",
      "home.why.h2": "After traditional SEO, the next generation of traffic",
      "home.why.lead": "When users start asking AI questions instead of typing keywords, being cited by AI depends on how well structured your website is.",
      "home.why.cited.title": "Cited Actively by AI",
      "home.why.cited.desc": "JSON-LD, FAQ and HowTo structured data let LLMs \"read\" your page and increases the chance it is cited in answers.",
      "home.why.early.title": "Stay Ahead of AI Search",
      "home.why.early.desc": "Doubao, Kimi, Wenxin Yiyan and ChatGPT are the new traffic sources. Optimize GEO now and get a head start on competitors.",
      "home.why.safe.title": "Local-First · Data Safe",
      "home.why.safe.desc": "All analysis runs locally inside your browser. URLs and HTML sources are never uploaded to any server.",

      "home.stat.100": "Scoring Dimensions Comprehensive",
      "home.stat.6": "Schema Types",
      "home.stat.0": "Data Upload",
      "home.stat.inf": "Free to Use",

      "home.cta.eyebrow": "Need Professional Services?",
      "home.cta.h2.part1": "Let ZSoftYM do a",
      "home.cta.h2.part2": "deep GEO optimization",
      "home.cta.h2.part3": "for your brand",
      "home.cta.desc": "XingTuLink tools are for self-checks and daily optimization. If your business needs a full-stack GEO service targeting Doubao, Kimi, Wenxin Yiyan and ChatGPT, contact our parent company — Xi'an Zhanshang Yueming Software Technology Co., Ltd.",

      /* ===== GEO 检测器页面 ===== */
      "geo.eyebrow": "Free Online Tool",
      "geo.h1": "GEO Friendliness Checker",
      "geo.lead": "Rates your page across 4 dimensions — Structured Data, Meta Tags, Content Semantics and AI Readability — with actionable optimization suggestions.",
      "geo.tab.paste": "Paste HTML Source",
      "geo.tab.url": "Enter URL to Fetch",
      "geo.label.url": "Target Webpage URL",
      "geo.placeholder.url": "https://example.com/article",
      "geo.tip.url": "URL mode fetches HTML via our self-hosted fetch proxy. If the target has anti-scraping policies it may fail; please use \"Paste HTML Source\" instead.",
      "geo.btn.fetch": "Fetch & Analyze →",
      "geo.label.html": "HTML Source Code",
      "geo.placeholder.html": "Right-click the page → View Page Source → Select all and paste here…\n(Chrome: right-click → View page source → Ctrl+A then copy)",
      "geo.tip.html": "All parsing runs locally in your browser. The HTML source will <b>never be uploaded</b> to any server — safe and stable.",
      "geo.btn.analyze": "Start Analysis →",
      "geo.disclaimer.title": "Disclaimer: ",
      "geo.disclaimer.body": "This tool only analyzes the technical structure of public webpages. It does not store or disseminate any page content. By using this tool you agree to our ",
      "geo.disclaimer.link": "Privacy Policy",
      "geo.disclaimer.end": ".",

      "geo.empty.title": "Awaiting Analysis",
      "geo.empty.desc": "After filling in the left-side form, GEO friendliness score and optimization suggestions will appear here.",

      "geo.score.max": "/ 100",
      "geo.rtab.dims": "Dimension Scores",
      "geo.rtab.issues": "Issues",
      "geo.rtab.sug": "Suggestions",

      "geo.cta.title": "Need Professional GEO Optimization?",
      "geo.cta.desc": "ZSoftYM offers full-stack GEO optimization solutions targeting Doubao, Kimi, Wenxin Yiyan and ChatGPT.",

      "geo.watermark": "Tested by xingtulink.com",
      "geo.shareImg": "Download Result Image",

      /* ===== JSON-LD 生成器页面 ===== */
      "jsonld.eyebrow": "Free Online Tool",
      "jsonld.h1": "JSON-LD Structured Data Generator",
      "jsonld.lead": "Pick a Schema type, fill in the fields, and get ready-to-paste JSON-LD in real time. Covers 90% of GEO citation scenarios and conforms to Schema.org standards.",

      "jsonld.tab.org": "Organization",
      "jsonld.tab.article": "Article",
      "jsonld.tab.faq": "FAQ",
      "jsonld.tab.howto": "HowTo",
      "jsonld.tab.product": "Product",
      "jsonld.tab.localbiz": "LocalBusiness",

      "jsonld.formTitle.org": "Organization · Info",
      "jsonld.formTitle.article": "Article · Info",
      "jsonld.formTitle.faq": "FAQ · Info",
      "jsonld.formTitle.howto": "HowTo · Info",
      "jsonld.formTitle.product": "Product · Info",
      "jsonld.formTitle.localbiz": "LocalBusiness · Info",
      "jsonld.formDesc": "Fill in the fields below — the code on the right updates live.",

      "jsonld.preview.title": "Live Preview",
      "jsonld.btn.copy": "Copy Code",
      "jsonld.btn.download": "Download",
      "jsonld.tip.code": "Paste the code at the end of your page's <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code>, wrapped in <code>&lt;script type=\"application/ld+json\"&gt;...&lt;/script&gt;</code>.",
      "jsonld.copy.success": "Copied ✓",
      "jsonld.copy.fail": "Copy failed — please copy manually",

      "jsonld.howto.title": "How to Use",
      "jsonld.howto.1": "Select the matching Schema type on the left and fill in required fields.",
      "jsonld.howto.2": "Click \"Copy Code\" or \"Download\" to get the generated JSON-LD.",
      "jsonld.howto.3": "Embed the code in your website's HTML <code>&lt;head&gt;</code> section.",
      "jsonld.howto.4": "Validate with <a href=\"https://search.google.com/test/rich-results\" data-external=\"1\" style=\"color:var(--brand-3);\">Google Rich Results Test</a>.",

      "jsonld.cta.title": "Batch Generation · Long-Term GEO Monitoring?",
      "jsonld.cta.desc": "ZSoftYM provides enterprise-grade GEO optimization and structured data services.",

      /* ===== 关于 GEO 页面 ===== */
      "about.eyebrow": "GEO Knowledge Base",
      "about.h1.part1": "About GEO: Let AI",
      "about.h1.part2": "actively recommend",
      "about.h1.part3": "your brand",
      "about.lead": "GEO (Generative Engine Optimization) is a set of content optimization methods targeting Generative AI platforms such as Doubao, Kimi, Wenxin Yiyan and ChatGPT.",

      "about.toc.what": "What is GEO",
      "about.toc.vs": "GEO vs SEO",
      "about.toc.how": "How to do GEO",
      "about.toc.faq": "FAQ",

      "about.what.h2": "What is GEO?",
      "about.what.p1": "<b>GEO (Generative Engine Optimization)</b> is an optimization methodology targeting <b>Generative AI search engines</b>. When a user asks AI \"What are the domestic GEO optimization service providers?\", AI doesn't return 10 blue links — it directly generates an \"answer\". Whether your brand appears in that answer depends on how well structured your website is, how widely your brand entity is cited, and the readability of your content.",
      "about.what.p2": "In short, <b>SEO gets Google to rank you #1; GEO gets AI to say your name directly</b>.",
      "about.what.cardTitle": "Three Core GEO Signals",
      "about.what.signal1": "<b>Structured data</b>: JSON-LD and Schema.org let AI \"read\" your page.",
      "about.what.signal2": "<b>Brand entity</b>: Consistently reference brand name, logo and contact info across multiple platforms.",
      "about.what.signal3": "<b>Content semantics</b>: Clear hierarchy, FAQ, HowTo, citations and lists.",

      "about.vs.eyebrow": "Comparison",
      "about.vs.h2": "GEO vs SEO",
      "about.vs.lead": "The two are <b>complementary</b>, not substitutes: SEO solves \"being found by search\"; GEO solves \"being cited by AI answers\".",
      "about.vs.th.dim": "Dimension",
      "about.vs.th.seo": "SEO",
      "about.vs.th.geo": "GEO",
      "about.vs.td.goal.name": "Goal",
      "about.vs.td.goal.seo": "Rankings in keyword results",
      "about.vs.td.goal.geo": "Direct citation in AI answers",
      "about.vs.td.target.name": "Target",
      "about.vs.td.target.seo": "Google / Baidu / Bing",
      "about.vs.td.target.geo": "Doubao / Kimi / Wenxin Yiyan / ChatGPT",
      "about.vs.td.method.name": "Core Methods",
      "about.vs.td.method.seo": "Keyword density, backlinks, authority",
      "about.vs.td.method.geo": "Structured data, semantic clarity, brand entities",
      "about.vs.td.kpi.name": "Metrics",
      "about.vs.td.kpi.seo": "Rankings, click-through rate",
      "about.vs.td.kpi.geo": "Citation rate, answer appearance rate",
      "about.vs.td.time.name": "Time to Effect",
      "about.vs.td.time.seo": "1–6 months",
      "about.vs.td.time.geo": "1–3 months",

      "about.how.eyebrow": "Methodology",
      "about.how.h2": "How to Do GEO Optimization?",
      "about.how.c1.title": "Add Structured Data",
      "about.how.c1.desc": 'Use the <a href="/tools/json-ld-generator/" style="color:var(--brand-3);">JSON-LD Generator</a> to add Organization, Article, FAQ, HowTo, Product and other structured data types.',
      "about.how.c2.title": "Optimize Content Semantics",
      "about.how.c2.desc": 'Clear H1–H6 hierarchy, lists, citations and tables. Keep paragraphs to 3–5 lines. Validate with the <a href="/tools/geo-checker/" style="color:var(--brand-3);">GEO Checker</a>.',
      "about.how.c3.title": "Build Brand Entities",
      "about.how.c3.desc": "Consistently use your brand name, logo and contact info across platforms like GitHub, Zhihu, CSDN and WeChat.",
      "about.how.c4.title": "FAQ + HowTo",
      "about.how.c4.desc": "Turn common customer questions into FAQ, and how-to content into HowTo steps. This significantly raises AI citation probability.",
      "about.how.c5.title": "Improve AI Readability",
      "about.how.c5.desc": "Set <html lang>, add alt text to images, use simple sentences and avoid jargon — so LLMs can extract key points more easily.",
      "about.how.c6.title": "Monitor & Iterate",
      "about.how.c6.desc": "Regularly revisit using the Checker, target specific low-score dimensions for improvements, and track AI citation frequency for your brand.",

      "about.faq.eyebrow": "FAQ",
      "about.faq.h2": "Frequently Asked Questions about GEO",
      "about.faq.q1.q": "Which is more important, GEO or SEO?",
      "about.faq.q1.a": "They complement each other — do both. SEO secures \"being found\"; GEO claims \"being cited by AI\".",
      "about.faq.q2.q": "How long does GEO take to show results?",
      "about.faq.q2.a": "Typically 1–3 months to see higher citation frequency on AI platforms. After shipping structured data, Google Rich Results may appear within days.",
      "about.faq.q3.q": "Which AI platforms deserve GEO the most?",
      "about.faq.q3.a": "Domestic priority: Doubao, Kimi, Wenxin Yiyan, Tongyi Qianwen. Overseas priority: ChatGPT, Gemini, Perplexity.",
      "about.faq.q4.q": "Are XingTuLink tools free?",
      "about.faq.q4.a": 'Yes. The GEO Checker and JSON-LD Generator are 100% free, with all parsing running locally and no data uploads. For enterprise-grade full-stack GEO services, please contact our parent company <a href="https://zsoftym.com/" data-external="1" style="color:var(--brand-3);">zsoftym.com</a>.',
      "about.faq.q5.q": "Does JSON-LD have to be placed in <head>?",
      "about.faq.q5.a": "No. Either <head> or end of <body> works. Google and mainstream AI crawlers both support it. The key is ensuring the script exists in the HTML when the page renders.",

      "about.cta.h2": "Want a Systematic GEO Optimization?",
      "about.cta.desc": "ZSoftYM provides full-stack GEO services, from structured data and content renovation to brand entity building.",

      /* ===== 联系页面 ===== */
      "contact.eyebrow": "Contact Us",
      "contact.h1.part1": "Have GEO optimization needs?",
      "contact.h1.part2": "Let's talk",
      "contact.lead": "XingTuLink tools help you self-check for free. For enterprise-grade GEO optimization, contact our parent company ZSoftYM.",

      "contact.section.h2": "Contact Information",
      "contact.section.lead": "Feel free to reach us via any of the following channels.",
      "contact.cc.company.label": "Company",
      "contact.cc.company.name": "Xi'an Zhanshang Yueming Software Technology Co., Ltd.",
      "contact.cc.company.desc": "XingTuLink operating entity",
      "contact.cc.email.label": "Email",
      "contact.cc.phone.label": "Phone",
      "contact.cc.addr.label": "Address",
      "contact.cc.addr.value": "Xi'an · Shaanxi",

      "contact.btn.zsoftym": "Visit ZSoftYM Official →",

      "contact.privacy.eyebrow": "Compliance",
      "contact.privacy.h2": "Privacy Policy & Disclaimer",
      "contact.privacy.updated": "Last updated: 2026-08-21",
      "contact.privacy.h.1": "1. What We Collect",
      "contact.privacy.p.1": "XingTuLink tools by default <b>do not upload</b> any URL or HTML source you input. All parsing runs locally in your browser.",
      "contact.privacy.h.2": "2. Third-Party Services",
      "contact.privacy.p.2": 'The Checker supports two modes: "Paste HTML Source" and "Enter URL to Fetch". All parsing in Paste mode runs locally in your browser; URL Fetch mode fetches the target webpage HTML through a <b>Page Fetch Proxy</b> configured and operated by the deployer, used only for analysis — no storage, no dissemination.',
      "contact.privacy.h.3": "3. Disclaimer",
      "contact.privacy.p.3": "This tool only analyzes the technical structure of public webpages. It does not store or disseminate any page content. Detection results are for reference only and do not constitute an SEO/GEO service commitment.",
      "contact.privacy.h.4": "4. Contact",
      "contact.privacy.p.4": 'For questions about this Privacy Policy, please email <a href="mailto:guohao@zsymtech.cn" style="color:var(--brand-3);">guohao@zsymtech.cn</a>.',

      /* ===== 404 页面 ===== */
      "404.h1": "Page Not Found",
      "404.lead.part1": "Sorry, the page you requested doesn't exist or has been moved.<br />",
      "404.lead.part2": "You can return home or go directly to our tools.",

      /* ===== 语言切换器自身 ===== */
      "lang.label": "Language",
      "lang.zh": "中文",
      "lang.en": "EN",
    },
  };

  // -------------- 核心逻辑 --------------
  const STORAGE_KEY = "xtl_lang";
  const SUPPORTED = ["zh-CN", "en"];

  function detectLang() {
    // 1) localStorage
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s && SUPPORTED.includes(s)) return s;
    } catch (e) {}
    // 2) browser
    const nav = (navigator.language || "zh-CN").toLowerCase();
    if (nav.startsWith("en")) return "en";
    return "zh-CN";
  }

  function setLang(lang, persist) {
    if (!SUPPORTED.includes(lang)) lang = "zh-CN";
    if (persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {}
    }
    document.documentElement.setAttribute("lang", lang === "zh-CN" ? "zh-CN" : "en");
    document.documentElement.setAttribute("data-lang", lang);

    const dict = DICT[lang] || {};

    // 1) 替换 [data-i18n] innerHTML
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
        el.innerHTML = dict[key];
      } else if (key && !Object.prototype.hasOwnProperty.call(dict, key)) {
        // 英文无条目 = 回退（一般空 = 中文原样）
        if (lang === "en" && window.console && window.console.warn) {
          // 静默跳过；开调试时可打开：console.warn("[i18n] missing key:", key);
        }
      }
    });

    // 2) 替换属性 data-i18n-attr  格式: placeholder:key|title:key2
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const raw = el.getAttribute("data-i18n-attr") || "";
      raw.split("|").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (!attr || !key) return;
        if (Object.prototype.hasOwnProperty.call(dict, key)) {
          el.setAttribute(attr, dict[key]);
        }
      });
    });

    // 3) meta / og 标签
    translateMeta(dict);

    // 4) 触发自定义事件，便于页面脚本（geo-checker.js等）监听
    try {
      const ev = new CustomEvent("xtl:langchange", { detail: { lang } });
      window.dispatchEvent(ev);
    } catch (e) {}
  }

  function translateMeta(dict) {
    // 特殊：按当前页面做 title / description / og:title / og:description
    // 这里采用「每个页面自己的 meta 字典」策略
    let path = location.pathname.replace(/\/+$/, "") + "/";
    // 首页三种路径都归为 /
    if (path === "/index.html/" || path === "//") path = "/";
    const normPath = path.replace(/\/+/g, "/");

    const PAGE_META = {
      "/": {
        "zh-CN": {
          title: "GEO优化工具_AI搜索引擎优化_JSON-LD生成器 - 星图邻",
          description: "星图邻（XingTuLink）提供 GEO 友好度检测、JSON-LD 生成器等面向 AI 搜索引擎优化的免费在线工具，助力网站在豆包、Kimi、文心一言、ChatGPT 中被主动引用。由西安栈上月明软件科技有限公司运营。",
          ogTitle: "星图邻 - 在线工具与开源项目平台",
          ogDesc: "提供 GEO 优化工具、JSON-LD 生成器等在线工具，发布优质开源项目。",
          twTitle: "星图邻 - 在线工具与开源项目平台",
          twDesc: "提供 GEO 优化工具、JSON-LD 生成器等在线工具",
          ogLocale: "zh_CN",
        },
        en: {
          title: "GEO Optimization Tool · AI SEO · JSON-LD Generator - XingTuLink",
          description: "XingTuLink provides free online tools for AI search engine optimization — GEO friendliness checker & JSON-LD generator — helping your site get cited by Doubao, Kimi, Wenxin Yiyan and ChatGPT. Operated by Xi'an Zhanshang Yueming Software Technology Co., Ltd.",
          ogTitle: "XingTuLink - Online Tools & Open-Source Platform",
          ogDesc: "Free GEO optimization tools, JSON-LD generator and high-quality open-source projects.",
          twTitle: "XingTuLink - Online Tools & Open-Source Platform",
          twDesc: "GEO optimization tools and JSON-LD generator",
          ogLocale: "en_US",
        },
      },
      "/tools/geo-checker/": {
        "zh-CN": {
          title: "GEO 友好度检测器 | 星图邻",
          description: "在线 GEO 友好度检测工具，从结构化数据、Meta 标签、内容语义、AI 可读性 4 个维度 100 分制评估你的网站，给出可落地的优化建议。所有分析在浏览器本地完成，URL 与 HTML 不会上传。",
          ogLocale: "zh_CN",
        },
        en: {
          title: "GEO Friendliness Checker | XingTuLink",
          description: "Online GEO friendliness checker. Rates your website on a 100-point scale across 4 dimensions — structured data, meta tags, content semantics and AI readability — with actionable optimization suggestions. All analysis runs locally in your browser. URLs and HTML are never uploaded.",
          ogLocale: "en_US",
        },
      },
      "/tools/json-ld-generator/": {
        "zh-CN": {
          title: "JSON-LD 生成器 | 星图邻",
          description: "在线 JSON-LD Schema 生成器，支持 Organization、Article、FAQ、HowTo、Product、LocalBusiness 6 种类型。表单填写即可生成符合 Schema.org 标准的结构化数据代码，一键复制。",
          ogLocale: "zh_CN",
        },
        en: {
          title: "JSON-LD Generator | XingTuLink",
          description: "Online JSON-LD Schema generator supporting 6 types — Organization, Article, FAQ, HowTo, Product, LocalBusiness. Fill a form to get copy-paste ready structured data conforming to Schema.org standards.",
          ogLocale: "en_US",
        },
      },
      "/about-geo/": {
        "zh-CN": {
          title: "关于 GEO | 星图邻",
          description: "什么是 GEO（生成式引擎优化）？与 SEO 有什么区别？如何为豆包、Kimi、文心一言、ChatGPT 等生成式 AI 做优化？一文讲透。",
          ogLocale: "zh_CN",
        },
        en: {
          title: "About GEO | XingTuLink",
          description: "What is Generative Engine Optimization (GEO)? How does it differ from SEO? How to optimize for Generative AI like Doubao, Kimi, Wenxin Yiyan and ChatGPT? Everything in one article.",
          ogLocale: "en_US",
        },
      },
      "/contact/": {
        "zh-CN": {
          title: "联系我们 | 星图邻",
          description: "联系星图邻（XingTuLink）：邮箱 guohao@zsymtech.cn，电话 +86 176 2902 0227。也可访问母公司西安栈上月明软件科技有限公司 zsoftym.com 了解企业级 GEO 优化服务。",
          ogLocale: "zh_CN",
        },
        en: {
          title: "Contact | XingTuLink",
          description: "Contact XingTuLink — email guohao@zsymtech.cn, phone +86 176 2902 0227. Enterprise-grade GEO services by our parent company Xi'an Zhanshang Yueming Software Technology Co., Ltd. at zsoftym.com.",
          ogLocale: "en_US",
        },
      },
      "/404.html": {
        "zh-CN": {
          title: "404 页面不存在 | 星图邻",
          description: "404 页面",
          ogLocale: "zh_CN",
        },
        en: {
          title: "404 Not Found | XingTuLink",
          description: "404 page",
          ogLocale: "en_US",
        },
      },
    };

    const pageMeta = PAGE_META[normPath] || PAGE_META["/404.html"] || null;
    const lang = document.documentElement.getAttribute("data-lang") || "zh-CN";
    if (!pageMeta || !pageMeta[lang]) return;
    const m = pageMeta[lang];

    if (m.title) {
      const t = document.querySelector("head > title");
      if (t) t.textContent = m.title;
    }
    if (m.description) {
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", m.description);
    }
    if (m.ogTitle) {
      const ogt = document.querySelector('meta[property="og:title"]');
      if (ogt) ogt.setAttribute("content", m.ogTitle);
    }
    if (m.ogDesc) {
      const ogd = document.querySelector('meta[property="og:description"]');
      if (ogd) ogd.setAttribute("content", m.ogDesc);
    }
    if (m.twTitle) {
      const twt = document.querySelector('meta[name="twitter:title"]');
      if (twt) twt.setAttribute("content", m.twTitle);
    }
    if (m.twDesc) {
      const twd = document.querySelector('meta[name="twitter:description"]');
      if (twd) twd.setAttribute("content", m.twDesc);
    }
    if (m.ogLocale) {
      const ogl = document.querySelector('meta[property="og:locale"]');
      if (ogl) ogl.setAttribute("content", m.ogLocale);
    }
  }

  // -------------- 切换按钮：注入到 .nav 内末尾 --------------
  function injectToggle() {
    if (document.querySelector(".lang-toggle")) return;
    const nav = document.querySelector(".site-header .nav");
    if (!nav) return;

    const current = document.documentElement.getAttribute("data-lang") || "zh-CN";
    const other = current === "zh-CN" ? "en" : "zh-CN";

    const wrap = document.createElement("div");
    wrap.className = "lang-toggle";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Language Switch");
    wrap.innerHTML =
      '<button type="button" class="lt-btn lt-zh" data-lang="zh-CN" title="中文">' +
      '<span class="lt-ico"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><line x1="3" y1="12" x2="21" y2="12"></line><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path></svg></span>' +
      '<span class="lt-label">中文</span>' +
      "</button>" +
      '<button type="button" class="lt-btn lt-en" data-lang="en" title="English">' +
      '<span class="lt-label">EN</span>' +
      "</button>";

    // 直接放在 .nav-cta 旁边；如果找不到就在 nav 末尾
    const cta = nav.querySelector(".nav-cta");
    // ---- GitHub 图标：放在语言切换之前/之后都行，这里统一放到切换之后、nav-cta 之前 ----
    const GITHUB_URL = "https://github.com/ZSoftYM/geo-friendly-checker";
    const GITHUB_TITLE_ZH = "开源仓库 · GitHub";
    const GITHUB_TITLE_EN = "Open Source · GitHub";
    const githubLabel = (document.documentElement.getAttribute("data-lang") === "en") ? GITHUB_TITLE_EN : GITHUB_TITLE_ZH;
    const gh = document.createElement("a");
    gh.className = "nav-github";
    gh.setAttribute("href", GITHUB_URL);
    gh.setAttribute("target", "_blank");
    gh.setAttribute("rel", "noopener noreferrer");
    gh.setAttribute("title", githubLabel);
    gh.setAttribute("aria-label", githubLabel);
    gh.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.63 22.42c.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.39-2.69 5.36-5.25 5.64.41.35.78 1.04.78 2.11 0 1.52-.01 2.75-.01 3.13 0 .3.21.66.79.55A11.5 11.5 0 0 0 12 .5z"/></svg>';

    if (cta && cta.parentNode) {
      // 顺序：lang-toggle | nav-github | nav-cta
      cta.parentNode.insertBefore(gh, cta);
      cta.parentNode.insertBefore(wrap, gh);
    } else {
      nav.appendChild(wrap);
      nav.appendChild(gh);
    }

    wrap.querySelectorAll(".lt-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        setLang(lang);
        updateToggleUI();
        // 语言切换后同步更新 GitHub 图标 tooltip
        const ghEl = document.querySelector(".nav-github");
        if (ghEl) {
          const t =
            (document.documentElement.getAttribute("data-lang") === "en")
              ? GITHUB_TITLE_EN
              : GITHUB_TITLE_ZH;
          ghEl.setAttribute("title", t);
          ghEl.setAttribute("aria-label", t);
        }
      });
    });
    updateToggleUI();
  }

  function updateToggleUI() {
    const current = document.documentElement.getAttribute("data-lang") || "zh-CN";
    document.querySelectorAll(".lang-toggle .lt-btn").forEach((btn) => {
      if (btn.getAttribute("data-lang") === current) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    // 更新切换标签文字（让按钮标签按当前语言显示）
    const zhLabel = document.querySelector(".lang-toggle .lt-zh .lt-label");
    const enLabel = document.querySelector(".lang-toggle .lt-en .lt-label");
    if (current === "en") {
      // 把“中文”改成中文标识不变，但可加辅助
    }
  }

  // -------------- 对外 API --------------
  window.XTLi18n = {
    get t() {
      const lang = document.documentElement.getAttribute("data-lang") || "zh-CN";
      const dict = DICT[lang] || {};
      return (key) => (Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null);
    },
    get dict() {
      const lang = document.documentElement.getAttribute("data-lang") || "zh-CN";
      return DICT[lang] || {};
    },
    get lang() {
      return document.documentElement.getAttribute("data-lang") || "zh-CN";
    },
    setLang: setLang,
    init: function (opts) {
      const lang = (opts && opts.lang) || detectLang();
      setLang(lang, !(opts && opts.persist === false));
      if (!opts || opts.injectToggle !== false) injectToggle();
    },
    SUPPORTED: SUPPORTED,
  };

  // -------------- 自动初始化 --------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.XTLi18n.init());
  } else {
    window.XTLi18n.init();
  }
})();
