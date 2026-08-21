/* =========================================================
   GEO 友好度检测器核心逻辑
   - 支持「粘贴 HTML」与「输入 URL」两种模式
   - URL 模式通过页面抓取代理服务抓取（PROXY_BASE 可配置）
   ========================================================= */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);

  // 页面抓取代理服务地址（自建 CORS 代理，用于中转目标网页 HTML）
  // 示例格式：'https://your-proxy-domain.com/proxy-path'
  const PROXY_BASE = '请在此配置您的页面抓取代理服务地址';

  // ---------- 模式切换 ----------
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const mode = tab.dataset.mode;
      document.querySelectorAll("[data-pane]").forEach((p) => {
        p.style.display = p.dataset.pane === mode ? "" : "none";
      });
    });
  });

  // ---------- 解析 ----------
  function parse(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc;
  }

  // ---------- 检测函数 ----------
  function checkStructuredData(doc) {
    const jsonLd = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
    const types = new Set();
    let validCount = 0;
    jsonLd.forEach((s) => {
      try {
        const data = JSON.parse(s.textContent.trim());
        collectTypes(data, types);
        validCount++;
      } catch (e) {
        // 解析失败不计为有效
      }
    });
    const microdata = doc.querySelectorAll("[itemscope]").length;
    return {
      jsonLdCount: jsonLd.length,
      types: Array.from(types),
      hasMicrodata: microdata > 0,
      validCount,
    };
  }

  function collectTypes(obj, set) {
    if (!obj) return;
    if (Array.isArray(obj)) return obj.forEach((o) => collectTypes(o, set));
    if (typeof obj === "object") {
      if (obj["@type"]) {
        const t = obj["@type"];
        if (Array.isArray(t)) t.forEach((x) => set.add(x));
        else set.add(t);
      }
      Object.values(obj).forEach((v) => collectTypes(v, set));
    }
  }

  function checkMeta(doc) {
    const get = (sel) => doc.querySelector(sel);
    const title = (get("title")?.textContent || "").trim();
    const desc = (get('meta[name="description"]')?.getAttribute("content") || "").trim();
    const kw = (get('meta[name="keywords"]')?.getAttribute("content") || "").trim();
    const og = {
      title: get('meta[property="og:title"]')?.getAttribute("content"),
      desc: get('meta[property="og:description"]')?.getAttribute("content"),
      image: get('meta[property="og:image"]')?.getAttribute("content"),
      type: get('meta[property="og:type"]')?.getAttribute("content"),
      url: get('meta[property="og:url"]')?.getAttribute("content"),
    };
    const ogCount = Object.values(og).filter(Boolean).length;
    const twitter = {
      card: get('meta[name="twitter:card"]')?.getAttribute("content"),
      title: get('meta[name="twitter:title"]')?.getAttribute("content"),
      image: get('meta[name="twitter:image"]')?.getAttribute("content"),
    };
    const twCount = Object.values(twitter).filter(Boolean).length;
    const canonical = get('link[rel="canonical"]')?.getAttribute("href");

    return {
      title,
      titleLen: title.length,
      titleOk: title.length > 0 && title.length <= 60,
      desc,
      descLen: desc.length,
      descOk: desc.length > 0 && desc.length <= 160,
      hasKw: kw.length > 0,
      ogCount,
      ogOk: ogCount >= 4,
      twCount,
      twOk: twCount >= 2,
      hasCanonical: !!canonical,
    };
  }

  function checkContent(doc) {
    const headings = {};
    ["h1", "h2", "h3", "h4", "h5", "h6"].forEach((tag) => {
      headings[tag] = doc.querySelectorAll(tag).length;
    });
    const paragraphs = Array.from(doc.querySelectorAll("p"));
    const paraLenAvg =
      paragraphs.length > 0
        ? Math.round(
            paragraphs.reduce((s, p) => s + (p.textContent || "").trim().length, 0) /
              paragraphs.length
          )
        : 0;
    const hasBlockquote = doc.querySelectorAll("blockquote").length > 0;
    const lists = doc.querySelectorAll("ul, ol").length;
    const imgs = doc.querySelectorAll("img");
    const imgsNoAlt = Array.from(imgs).filter(
      (i) => !(i.getAttribute("alt") || "").trim()
    ).length;
    return {
      headings,
      h1Count: headings.h1,
      paraLenAvg,
      hasBlockquote,
      lists,
      imgsTotal: imgs.length,
      imgsNoAlt,
    };
  }

  function checkAI(doc) {
    const html = doc.documentElement;
    const hasLang = !!html.getAttribute("lang");
    const text = (doc.body?.textContent || "").trim();
    const hasFaq = !!doc.querySelector(
      'script[type="application/ld+json"]'
    ) && /FAQPage/i.test(
      Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))
        .map((s) => s.textContent)
        .join(" ")
    );
    const hasHowTo = !!doc.querySelector(
      'script[type="application/ld+json"]'
    ) && /HowTo/i.test(
      Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))
        .map((s) => s.textContent)
        .join(" ")
    );
    return {
      hasLang,
      wordCount: text.length,
      hasFaq,
      hasHowTo,
    };
  }

  // ---------- 评分 ----------
  function calcStructured(d) {
    let score = 0;
    const issues = [];
    const sug = [];
    if (d.jsonLdCount > 0) score += 10;
    else {
      issues.push({ level: "bad", text: "页面没有任何 JSON-LD 结构化数据" });
      sug.push("至少为页面添加 Organization 与 Article/Website 的 JSON-LD 块（可使用我们的 JSON-LD 生成器）。");
    }
    if (d.jsonLdCount >= 3) score += 10;
    else if (d.jsonLdCount > 0) {
      issues.push({ level: "warn", text: `JSON-LD 数量较少（${d.jsonLdCount} 个），建议覆盖 3 种以上类型` });
      sug.push("组合使用 Organization + Article + FAQ + BreadcrumbList，覆盖更多 AI 引用场景。");
    }
    if (d.hasMicrodata) score += 5;
    else {
      issues.push({ level: "warn", text: "未发现 Microdata/RDFa 标记（可选，但有助兼容性）" });
    }
    if (d.jsonLdCount > 0 && d.validCount === d.jsonLdCount) score += 5;
    else if (d.jsonLdCount > 0) {
      issues.push({ level: "bad", text: "存在 JSON-LD 解析错误，请检查语法" });
      sug.push("用 Google Rich Results Test 验证每条 JSON-LD。");
    }
    return { score, max: 30, label: "结构化数据", issues, sug };
  }

  function calcMeta(d) {
    let score = 0;
    const issues = [];
    const sug = [];
    if (d.titleOk) score += 5;
    else
      issues.push({
        level: d.titleLen === 0 ? "bad" : "warn",
        text: `title 标签${d.titleLen === 0 ? "缺失" : "长度 " + d.titleLen + " 字符"}（建议 10–60 字符）`,
      });
    if (d.descOk) score += 5;
    else
      issues.push({
        level: d.descLen === 0 ? "bad" : "warn",
        text: `description${d.descLen === 0 ? "缺失" : "长度 " + d.descLen + " 字符"}（建议 70–160 字符）`,
      });
    if (d.hasKw) score += 3;
    else issues.push({ level: "warn", text: "缺少 keywords meta（影响较小，可选）" });
    if (d.ogOk) score += 6;
    else {
      issues.push({ level: "bad", text: `OpenGraph 不完整（已设置 ${d.ogCount}/5）` });
      sug.push("补齐 og:title / og:description / og:image / og:type / og:url。");
    }
    if (d.twOk) score += 3;
    else {
      issues.push({ level: "warn", text: `Twitter Card 缺失（已设置 ${d.twCount}/3）` });
      sug.push("补齐 twitter:card / twitter:title / twitter:image。");
    }
    if (d.hasCanonical) score += 3;
    else {
      issues.push({ level: "warn", text: "缺少 canonical 链接" });
      sug.push("添加 <link rel=\"canonical\" href=\"...\"> 避免重复内容。");
    }
    return { score, max: 25, label: "Meta 标签", issues, sug };
  }

  function calcContent(d) {
    let score = 0;
    const issues = [];
    const sug = [];
    if (d.h1Count === 1) score += 8;
    else {
      issues.push({
        level: d.h1Count === 0 ? "bad" : "warn",
        text: `H1 数量异常（${d.h1Count} 个），建议恰好 1 个`,
      });
    }
    if (d.paraLenAvg > 0 && d.paraLenAvg <= 200) score += 5;
    else if (d.paraLenAvg > 200) {
      issues.push({ level: "warn", text: `段落平均 ${d.paraLenAvg} 字符偏长，建议控制在 200 以内` });
      sug.push("把长段落拆成多个短段落，并在段落开头给出结论。");
    }
    if (d.hasBlockquote) score += 4;
    else {
      issues.push({ level: "warn", text: "未发现 blockquote 引用块" });
      sug.push("为关键观点使用 <blockquote> 包裹，便于 AI 抽取。");
    }
    if (d.lists > 0) score += 4;
    else {
      issues.push({ level: "warn", text: "未使用 ul/ol 列表" });
      sug.push("将并列内容改为列表（ul/ol），大模型对列表结构更敏感。");
    }
    if (d.imgsTotal > 0 && d.imgsNoAlt === 0) score += 4;
    else if (d.imgsTotal > 0) {
      issues.push({ level: "bad", text: `${d.imgsNoAlt}/${d.imgsTotal} 张图片缺少 alt` });
      sug.push("为所有 <img> 填写描述性 alt，提升可访问性。");
    } else {
      issues.push({ level: "warn", text: "页面没有任何图片" });
    }
    return { score, max: 25, label: "内容语义", issues, sug };
  }

  function calcAI(d) {
    let score = 0;
    const issues = [];
    const sug = [];
    if (d.hasLang) score += 5;
    else {
      issues.push({ level: "bad", text: "html 缺少 lang 属性" });
      sug.push("为 <html> 加上 lang=\"zh-CN\"，便于 AI 识别语种。");
    }
    if (d.wordCount > 300) score += 5;
    else if (d.wordCount > 0) {
      issues.push({ level: "warn", text: "正文内容过短（" + d.wordCount + " 字符），信息密度不足" });
      sug.push("补充正文，建议单页正文 600 字以上。");
    }
    if (d.hasFaq) score += 5;
    else {
      issues.push({ level: "warn", text: "未发现 FAQ 结构（FAQPage）" });
      sug.push("整理常见问题，添加 FAQPage JSON-LD（可一键生成）。");
    }
    if (d.hasHowTo) score += 5;
    else {
      issues.push({ level: "warn", text: "未发现 HowTo 结构（如教程类页面）" });
      sug.push("如果是教程/步骤类页面，使用 HowTo JSON-LD 显著提升被引用概率。");
    }
    return { score, max: 20, label: "AI 可读性", issues, sug };
  }

  // ---------- 渲染 ----------
  function render(result) {
    $("#resultEmpty").style.display = "none";
    $("#resultBody").style.display = "";
    $("#totalScore").textContent = result.total;

    const total = result.total;
    let comment = "基础可用，仍有较大优化空间。";
    let tag = "待优化";
    let tagCls = "warn";
    if (total >= 85) {
      comment = "表现优秀！GEO 友好度很高，被 AI 引用的概率较大。";
      tag = "优秀";
      tagCls = "ok";
    } else if (total >= 70) {
      comment = "表现良好，关键维度基本达标。";
      tag = "良好";
      tagCls = "ok";
    } else if (total >= 50) {
      comment = "中等水平，多个维度需要优化。";
      tag = "中等";
      tagCls = "warn";
    } else {
      comment = "较弱，强烈建议按下方建议进行改造。";
      tag = "较弱";
      tagCls = "bad";
    }
    $("#totalComment").textContent = comment;
    const tagEl = $("#totalTag");
    tagEl.textContent = tag;
    tagEl.className = "score-tag " + tagCls;

    const dims = $("#dims");
    dims.innerHTML = "";
    result.dims.forEach((d) => {
      const ratio = d.max > 0 ? Math.round((d.score / d.max) * 100) : 0;
      const cls = ratio >= 85 ? "ok" : ratio >= 60 ? "" : ratio >= 40 ? "warn" : "bad";
      const wrap = document.createElement("div");
      wrap.className = "dim-row";
      wrap.innerHTML = `
        <header>
          <span>${d.label}</span>
          <b>${d.score} / ${d.max}</b>
        </header>
        <div class="bar ${cls}"><i style="width:${ratio}%"></i></div>
      `;
      dims.appendChild(wrap);
    });

    const issues = $("#issues");
    issues.innerHTML = "";
    if (result.allIssues.length === 0) {
      issues.innerHTML = '<li><span class="dot ok"></span><span>未发现明显问题，表现优秀！</span></li>';
    } else {
      result.allIssues.forEach((it) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="dot ${it.level}"></span><span>${escape(it.text)}</span>`;
        issues.appendChild(li);
      });
    }

    const sug = $("#suggestions");
    sug.innerHTML = "";
    if (result.allSug.length === 0) {
      sug.innerHTML = '<li><span class="dot ok"></span><span>暂无额外建议。</span></li>';
    } else {
      result.allSug.forEach((t) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="dot warn"></span><span>${escape(t)}</span>`;
        sug.appendChild(li);
      });
    }

    // 更新标签徽标计数
    $("#issuesCount").textContent = result.allIssues.length;
    $("#sugCount").textContent = result.allSug.length;

    // 重置到「各维度得分」标签
    switchResultTab("dims");
  }

  // 结果标签切换
  function switchResultTab(name) {
    document.querySelectorAll(".result-tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.rtab === name);
    });
    document.querySelectorAll(".result-pane").forEach((p) => {
      p.classList.toggle("active", p.dataset.rpane === name);
    });
  }

  document.querySelectorAll(".result-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchResultTab(tab.dataset.rtab));
  });

  function escape(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  // ---------- 主流程 ----------
  function runAnalysis(html) {
    const doc = parse(html);
    const sd = checkStructuredData(doc);
    const mt = checkMeta(doc);
    const ct = checkContent(doc);
    const ai = checkAI(doc);

    const a = calcStructured(sd);
    const b = calcMeta(mt);
    const c = calcContent(ct);
    const d = calcAI(ai);

    const dims = [a, b, c, d];
    const total = dims.reduce((s, x) => s + x.score, 0);
    const allIssues = [];
    const allSug = [];
    dims.forEach((x) => {
      x.issues.forEach((i) => allIssues.push(i));
      x.sug.forEach((i) => allSug.push(i));
    });
    allIssues.sort((x, y) =>
      ["bad", "warn", "ok"].indexOf(x.level) - ["bad", "warn", "ok"].indexOf(y.level)
    );

    render({ total, dims, allIssues, allSug });
  }

  $("#analyzeBtn")?.addEventListener("click", () => {
    const html = $("#htmlInput").value.trim();
    if (!html) {
      alert("请先粘贴 HTML 源码");
      return;
    }
    runAnalysis(html);
  });

  $("#fetchBtn")?.addEventListener("click", async () => {
    const url = $("#urlInput").value.trim();
    if (!url) {
      alert("请输入 URL");
      return;
    }
    if (!/^https?:\/\//i.test(url)) {
      alert("URL 必须以 http:// 或 https:// 开头");
      return;
    }
    const status = $("#fetchStatus");
    status.textContent = "正在抓取…";
    $("#fetchBtn").disabled = true;
    try {
      const proxy = PROXY_BASE + "/?url=" + encodeURIComponent(url);
      const r = await fetch(proxy);
      if (!r.ok) throw new Error("HTTP " + r.status);
      const html = await r.text();
      if (!html) throw new Error("代理未返回内容");
      status.textContent = "抓取成功，共 " + html.length + " 字符，开始分析…";
      runAnalysis(html);
    } catch (e) {
      status.textContent = "抓取失败：" + e.message + "。请改用「粘贴 HTML 源码」模式。";
    } finally {
      $("#fetchBtn").disabled = false;
    }
  });
})();
