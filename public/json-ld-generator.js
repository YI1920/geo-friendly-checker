/* =========================================================
   JSON-LD 生成器
   支持：Organization / Article / FAQ / HowTo / Product / LocalBusiness
   ========================================================= */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);

  // ---------- Schema 表单定义 ----------
  const SCHEMAS = {
    Organization: {
      title: "Organization · 组织信息",
      desc: "适用于品牌官网、About 页面。",
      defaults: {
        name: "星图邻 XingTuLink",
        url: "https://xingtulink.com",
        logo: "https://xingtulink.com/img/logo.png",
        description: "在线工具与开源项目发布平台",
        phone: "+86-17629020227",
        email: "guohao@zsymtech.cn",
        sameAs: "https://zsoftym.com/,https://github.com/xingtulink",
      },
      fields: [
        { k: "name", label: "组织名称 *", required: true },
        { k: "url", label: "官网 URL *", required: true },
        { k: "logo", label: "Logo URL", type: "url" },
        { k: "description", label: "简介", textarea: true },
        { k: "phone", label: "客服电话" },
        { k: "email", label: "联系邮箱", type: "email" },
        { k: "sameAs", label: "社交/其他链接（逗号分隔）" },
      ],
      build: (d) => {
        const sameAs = (d.sameAs || "")
          .split(/[,，]/)
          .map((s) => s.trim())
          .filter(Boolean);
        const obj = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: d.name,
          url: d.url,
        };
        if (d.logo) obj.logo = d.logo;
        if (d.description) obj.description = d.description;
        if (d.phone || d.email) {
          obj.contactPoint = {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: ["Chinese", "English"],
          };
          if (d.phone) obj.contactPoint.telephone = d.phone;
          if (d.email) obj.contactPoint.email = d.email;
        }
        if (sameAs.length) obj.sameAs = sameAs;
        return obj;
      },
    },

    Article: {
      title: "Article · 文章",
      desc: "适用于博客、新闻、教程文章。",
      defaults: {
        headline: "什么是 GEO？与 SEO 有什么区别？",
        author: "栈上月明",
        datePublished: "2026-08-21",
        image: "https://xingtulink.com/img/og.png",
        description: "一份面向 AI 时代的搜索优化指南。",
        url: "https://xingtulink.com/blog/what-is-geo",
      },
      fields: [
        { k: "headline", label: "标题 *", required: true },
        { k: "author", label: "作者 *", required: true },
        { k: "datePublished", label: "发布日期 * (YYYY-MM-DD)", required: true },
        { k: "image", label: "封面图 URL", type: "url" },
        { k: "description", label: "摘要", textarea: true },
        { k: "url", label: "文章 URL *", required: true, type: "url" },
      ],
      build: (d) => {
        const obj = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: d.headline,
          author: { "@type": "Person", name: d.author },
          datePublished: d.datePublished,
        };
        if (d.image) obj.image = d.image;
        if (d.description) obj.description = d.description;
        if (d.url) obj.mainEntityOfPage = { "@type": "WebPage", "@id": d.url };
        return obj;
      },
    },

    FAQ: {
      title: "FAQ · 常见问答",
      desc: "输入 Q&A，自动生成 FAQPage 结构。",
      defaults: {
        q1: "什么是 GEO？",
        a1: "GEO（Generative Engine Optimization）是面向生成式 AI 搜索引擎的优化方法。",
        q2: "GEO 和 SEO 有什么区别？",
        a2: "SEO 面向 Google、百度等关键词搜索引擎；GEO 面向豆包、Kimi、文心一言等生成式 AI 回答。",
      },
      fields: [
        { k: "q1", label: "问题 1 *", required: true },
        { k: "a1", label: "答案 1 *", required: true, textarea: true },
        { k: "q2", label: "问题 2" },
        { k: "a2", label: "答案 2", textarea: true },
        { k: "q3", label: "问题 3" },
        { k: "a3", label: "答案 3", textarea: true },
      ],
      build: (d) => {
        const list = [];
        for (let i = 1; i <= 3; i++) {
          if (d["q" + i] && d["a" + i])
            list.push({
              "@type": "Question",
              name: d["q" + i],
              acceptedAnswer: { "@type": "Answer", text: d["a" + i] },
            });
        }
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: list,
        };
      },
    },

    HowTo: {
      title: "HowTo · 操作步骤",
      desc: "适用于教程、流程类内容。",
      defaults: {
        name: "如何为网站添加 JSON-LD？",
        totalTime: "PT5M",
        step1: "选择 Schema 类型",
        step2: "填写表单字段",
        step3: "复制 JSON-LD 并粘贴到 <head> 中",
      },
      fields: [
        { k: "name", label: "教程名称 *", required: true },
        { k: "totalTime", label: "总耗时（ISO 8601，如 PT5M）" },
        { k: "step1", label: "步骤 1 *", required: true },
        { k: "step2", label: "步骤 2" },
        { k: "step3", label: "步骤 3" },
        { k: "step4", label: "步骤 4" },
        { k: "step5", label: "步骤 5" },
      ],
      build: (d) => {
        const steps = [];
        for (let i = 1; i <= 5; i++) {
          if (d["step" + i])
            steps.push({
              "@type": "HowToStep",
              position: i,
              text: d["step" + i],
            });
        }
        const obj = {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: d.name,
          step: steps,
        };
        if (d.totalTime) obj.totalTime = d.totalTime;
        return obj;
      },
    },

    Product: {
      title: "Product · 产品",
      desc: "适用于商品页。",
      defaults: {
        name: "GEO 优化服务（基础版）",
        image: "https://zsoftym.com/og.png",
        description: "面向中小企业的入门级 GEO 优化服务。",
        brand: "栈上月明",
        sku: "ZSYM-GEO-STD-001",
      },
      fields: [
        { k: "name", label: "产品名 *", required: true },
        { k: "image", label: "产品图 URL" },
        { k: "description", label: "描述", textarea: true },
        { k: "brand", label: "品牌" },
        { k: "sku", label: "SKU" },
      ],
      build: (d) => {
        const obj = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: d.name,
        };
        if (d.image) obj.image = d.image;
        if (d.description) obj.description = d.description;
        if (d.brand) obj.brand = { "@type": "Brand", name: d.brand };
        if (d.sku) obj.sku = d.sku;
        return obj;
      },
    },

    LocalBusiness: {
      title: "LocalBusiness · 本地商家",
      desc: "适用于门店、线下服务商家。",
      defaults: {
        name: "西安栈上月明软件科技有限公司",
        street: "陕西 · 西安",
        phone: "+86-17629020227",
        url: "https://zsoftym.com",
        openingHours: "Mo-Fr 09:00-18:00",
      },
      fields: [
        { k: "name", label: "商家名 *", required: true },
        { k: "street", label: "街道地址 *", required: true },
        { k: "phone", label: "电话" },
        { k: "url", label: "官网 URL" },
        { k: "openingHours", label: "营业时间（Mo-Fr 09:00-18:00）" },
      ],
      build: (d) => {
        const obj = {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: d.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: d.street,
            addressLocality: "西安市",
            addressRegion: "陕西省",
            addressCountry: "CN",
          },
        };
        if (d.phone) obj.telephone = d.phone;
        if (d.url) obj.url = d.url;
        if (d.openingHours) obj.openingHours = d.openingHours;
        return obj;
      },
    },
  };

  // ---------- 渲染 ----------
  let current = "Organization";

  function renderForm(type) {
    const def = SCHEMAS[type];
    $("#formTitle").textContent = def.title;
    $("#formDesc").textContent = def.desc;
    const form = $("#schemaForm");
    form.innerHTML = "";
    def.fields.forEach((f) => {
      const id = "f_" + f.k;
      const wrap = document.createElement("div");
      const lab = document.createElement("label");
      lab.setAttribute("for", id);
      lab.textContent = f.label;
      wrap.appendChild(lab);
      let el;
      if (f.textarea) {
        el = document.createElement("textarea");
        el.className = "textarea";
        el.rows = 3;
      } else {
        el = document.createElement("input");
        el.className = "input";
        el.type = f.type || "text";
      }
      el.id = id;
      el.name = f.k;
      el.value = def.defaults[f.k] || "";
      el.addEventListener("input", update);
      wrap.appendChild(el);
      form.appendChild(wrap);
    });
    update();
  }

  function collect() {
    const form = $("#schemaForm");
    const data = {};
    form.querySelectorAll("[name]").forEach((el) => (data[el.name] = el.value));
    return data;
  }

  function highlight(json) {
    return json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (m) => {
          if (/^"/.test(m)) {
            return /:$/.test(m) ? '<span class="b">' + m + "</span>" : '<span class="s">' + m + "</span>";
          } else if (/true|false/.test(m)) return '<span class="k">' + m + "</span>";
          else if (/null/.test(m)) return '<span class="k">' + m + "</span>";
          else return '<span class="n">' + m + "</span>";
        }
      );
  }

  function update() {
    const def = SCHEMAS[current];
    const data = collect();
    // 必填校验
    let ok = true;
    def.fields.forEach((f) => {
      if (f.required && !data[f.k]) ok = false;
    });
    const obj = def.build(data);
    const str = JSON.stringify(obj, null, 2);
    $("#codePreview").innerHTML = highlight(str);
    $("#codePreview").dataset.raw = str;
    $("#copyTip").textContent = ok
      ? ""
      : "提示：标记 * 的必填字段为空时，预览仍会生成，但请补全后再发布。";
  }

  // ---------- 交互 ----------
  document.querySelectorAll("#schemaTabs .tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#schemaTabs .tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      current = tab.dataset.type;
      renderForm(current);
    });
  });

  $("#copyBtn").addEventListener("click", async () => {
    const raw = $("#codePreview").dataset.raw || "";
    try {
      await navigator.clipboard.writeText(
        '<script type="application/ld+json">\n' + raw + "\n</script>"
      );
      $("#copyTip").textContent = "✓ 已复制（含 <script> 包裹）";
      setTimeout(() => ($("#copyTip").textContent = ""), 2500);
    } catch (e) {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = raw;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      $("#copyTip").textContent = "✓ 已复制";
      setTimeout(() => ($("#copyTip").textContent = ""), 2500);
    }
  });

  $("#downloadBtn").addEventListener("click", () => {
    const raw = $("#codePreview").dataset.raw || "";
    const blob = new Blob([raw], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = current.toLowerCase() + ".jsonld.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  // 初始化
  renderForm(current);
})();
