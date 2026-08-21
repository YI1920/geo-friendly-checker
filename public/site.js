// 星图邻 XingTuLink - 通用脚本（导航、JSON-LD 注入等）
(function () {
  // 移动端导航
  document.addEventListener("click", function (e) {
    if (e.target.closest(".nav-toggle")) {
      document.querySelector(".nav-links")?.classList.toggle("open");
    } else if (!e.target.closest(".nav-links")) {
      document.querySelector(".nav-links")?.classList.remove("open");
    }
  });

  // 给所有 a[data-external] 自动加 target=_blank
  document.querySelectorAll('a[data-external="1"]').forEach(function (a) {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });

  // 全站 Organization / WebSite JSON-LD（增强 GEO）
  function injectLd() {
    if (document.getElementById("ld-organization")) return;
    const org = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "星图邻",
      alternateName: "XingTuLink",
      url: "https://xingtulink.com/",
      logo: "https://xingtulink.com/img/logo.png",
      description:
        "在线工具与开源项目发布平台，由西安栈上月明软件科技有限公司运营。提供 GEO 友好度检测、JSON-LD 生成等在线工具。",
      parentOrganization: {
        "@type": "Organization",
        name: "西安栈上月明软件科技有限公司",
        url: "https://zsoftym.com/",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+86-17629020227",
        contactType: "customer service",
        email: "guohao@zsymtech.cn",
        availableLanguage: ["Chinese", "English"],
      },
      sameAs: ["https://github.com/xingtulink", "https://zsoftym.com/"],
    };
    const site = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "星图邻",
      alternateName: "XingTuLink",
      url: "https://xingtulink.com/",
    };
    const mk = (obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(obj);
      return s;
    };
    const a = mk(org);
    a.id = "ld-organization";
    const b = mk(site);
    document.head.appendChild(a);
    document.head.appendChild(b);
  }
  injectLd();
})();
