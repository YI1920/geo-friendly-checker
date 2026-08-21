# XingTuLink · GEO Toolkit

> **中文版** → [README.md](./README.md)
>
> Brought to you by **Xi'an Zhanshang Yueming Software Technology Co., Ltd.**
> Live Demo: [xingtulink.com](https://xingtulink.com) ·
> Official Website: [zsoftym.com](https://zsoftym.com/)

This project is a **zero-build, pure-static GEO toolkit** developed and open-sourced by **Xi'an Zhanshang Yueming Software Technology Co., Ltd.** Deploy it by dropping the files onto any static host — no bundler required. It ships with two core tools:

- **GEO Friendliness Checker** `/tools/geo-checker/` — 4 dimensions, 100-point scale for Generative Engine Optimization
- **JSON-LD Generator** `/tools/json-ld-generator/` — 6 Schema types, one-click structured data generation

## ✨ Live Demo

Official deployment: **[https://xingtulink.com](https://xingtulink.com)**

## 📁 Project Structure

```
/
├── index.html                       Landing page
├── 404.html
├── robots.txt
├── sitemap.xml
├── about-geo/index.html             About GEO (with FAQ)
├── contact/index.html               Contact + Privacy Policy
├── tools/
│   ├── geo-checker/index.html       GEO Checker
│   └── json-ld-generator/index.html JSON-LD Generator
├── public/
│   ├── styles.css                   Global styles
│   ├── site.js                      Shared scripts
│   ├── geo-checker.js               Checker logic
│   └── json-ld-generator.js         Generator logic
└── img/
    └── logo.png                     Brand logo
```

## 🚀 Local Preview

Serve the directory with any static file server, e.g.:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080/` in your browser.

## 📦 Deployment

Upload the entire directory to any static host: Vercel, Alibaba Cloud OSS, Tencent Cloud COS, Cloudflare Pages, GitHub Pages, etc.

### Example — Alibaba Cloud OSS

```bash
ossutil cp -r . oss://your-bucket-name/ --update
```

> Before deploying, replace the domain references inside `robots.txt`, `sitemap.xml`, and each page's `canonical` / `og:url` tags with your actual domain.

## ⚙️ Page Fetch Proxy Configuration

The GEO Checker supports two modes:

1. **Paste HTML source** *(recommended)* — fully local parsing, zero external requests, nothing uploaded.
2. **Fetch by URL** — requires a self-hosted CORS proxy to relay the target page's HTML.

To enable URL-fetch mode, edit `public/geo-checker.js` and set `PROXY_BASE` to your own **Page Fetch Proxy URL**:

```js
// public/geo-checker.js
const PROXY_BASE = 'https://your-proxy-domain.com/proxy-path';
```

Your proxy endpoint should: accept a `?url=<target-url>` query parameter, respond with CORS headers, and return the raw HTML of the target page.

## 🛠 Third-Party Dependencies

- Fonts: system font stack, no external font requests.
- Icons: Emoji characters, no icon font required.
- "Paste HTML" mode runs entirely inside the user's browser with no third-party network requests.

## ✅ Compliance Notes

- All HTML / JS analysis runs locally in the browser — **user data is never uploaded**.
- The Checker page already embeds a disclaimer.
- A full privacy policy is available at `contact/#privacy`.

## 🏢 About Us

**XingTuLink** is the online-tools & open-source platform of Xi'an Zhanshang Yueming Software Technology Co., Ltd.

- **Company**: Xi'an Zhanshang Yueming Software Technology Co., Ltd.
- **Website**: [https://zsoftym.com/](https://zsoftym.com/)
- **Live Tools**: [https://xingtulink.com](https://xingtulink.com)
- **Email**: guohao@zsymtech.cn
- **Phone**: +86 176 2902 0227
- **Location**: Xi'an, Shaanxi, China

---

## ⚠️ Disclaimer

1. **Nature of the Tools.** The GEO Friendliness Checker, JSON-LD Generator, and any other utilities bundled with this project (collectively, the "Tools") are **free, open-source technical reference utilities**. They are provided solely for the purpose of analyzing a web page's technical structure and generating structured-data examples, and **do not constitute any GEO / SEO service guarantee or professional advice**.

2. **Reference-only Results.** GEO scores and optimization suggestions are derived from general AI-search-engine friendliness rules. We **do not guarantee** that Doubao, Kimi, ChatGPT, or any other AI engine will cite or recommend websites optimized with the Tools. Each AI platform adjusts its algorithms frequently; actual results are determined solely by the respective platform.

3. **Data & Privacy.**
   - In "Paste HTML source" mode, all parsing runs **locally in the user's browser**. No input is ever uploaded.
   - In "Fetch by URL" mode, public HTML is relayed through the **Page Fetch Proxy** configured by the deployer. Xi'an Zhanshang Yueming Software Technology Co., Ltd. (the "Company") does not store or redistribute any fetched content.
   - Users must not use the Tools to fetch non-public or privacy-sensitive content. **Legal liability arising from such actions rests solely with the user.**

4. **Use-at-your-own-risk.** The Company shall not be liable for any **direct or indirect damages** arising from downloading, deploying, modifying, or using the project source code, including — but not limited to — ranking drops, traffic loss, business interruption, or legal disputes.

5. **Third-Party Content.** Third-party services referenced in the code or docs (static hosts, CORS proxies, Schema.org specs, etc.) are technical examples only. The Company makes no warranty as to their availability, accuracy, or security.

6. **Right to Modify.** The Company reserves the right to **update or discontinue** maintenance of this project, its live services, and related documentation without prior notice. Open-source code is distributed under the terms of its applicable open-source license (if any).

7. **Compliance.** Anyone deploying or using this project is responsible for complying with the laws and regulations of their jurisdiction, including (but not limited to) PRC Cybersecurity Law, Data Security Law, Personal Information Protection Law, and the Administrative Measures for AI-Generated Synthetic Content.

**By using this project, you acknowledge that you have read, understood, and agreed to the full terms of this Disclaimer.**
