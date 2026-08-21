# 星图邻 XingTuLink · GEO 工具站

> **English Version** → [README.en.md](./README.en.md)
>
> 西安栈上月明软件科技有限公司 出品 · 在线体验：[xingtulink.com](https://xingtulink.com)
> 公司官网：[zsoftym.com](https://zsoftym.com/)

本项目是**西安栈上月明软件科技有限公司**开发并开源的**纯静态 GEO 工具站**，无需任何构建步骤即可部署。包含两个核心工具：

- **GEO 友好度检测器** `/tools/geo-checker/` — 4 个维度 100 分制评估，助力生成式引擎优化
- **JSON-LD 生成器** `/tools/json-ld-generator/` — 6 种 Schema 类型一键生成结构化数据

## ✨ 在线体验

官方部署地址：**[https://xingtulink.com](https://xingtulink.com)**

## 📁 目录结构

```
/
├── index.html                       首页
├── 404.html
├── robots.txt
├── sitemap.xml
├── about-geo/index.html             关于 GEO（含 FAQ）
├── contact/index.html               联系我们 + 隐私政策
├── tools/
│   ├── geo-checker/index.html       GEO 检测器
│   └── json-ld-generator/index.html JSON-LD 生成器
├── public/
│   ├── styles.css                   全站样式
│   ├── site.js                      通用脚本
│   ├── geo-checker.js               检测器逻辑
│   └── json-ld-generator.js         生成器逻辑
└── img/
    └── logo.png                     品牌 Logo
```

## 🚀 本地预览

直接用任意静态服务器即可，例如：

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

然后访问 `http://localhost:8080/`。

## 📦 部署

整个目录直接上传到任意静态托管（Vercel、阿里云 OSS、腾讯云 COS、Cloudflare Pages、GitHub Pages）即可。

### 阿里云 OSS 部署示例

```bash
ossutil cp -r . oss://your-bucket-name/ --update
```

> 部署前请把 `robots.txt` / `sitemap.xml` / 各页 `canonical` / `og:url` 中域名替换为你的实际域名。

## ⚙️ 页面抓取代理服务配置

GEO 检测器支持两种模式：

1. **粘贴 HTML 源码**（推荐）— 本地解析，零依赖，不上传任何数据
2. **输入 URL 抓取** — 需要自建 CORS 代理来中转目标网页 HTML

如需使用 URL 抓取模式，请编辑 `public/geo-checker.js`，配置 `PROXY_BASE` 为你自己的**页面抓取代理服务地址**：

```js
// public/geo-checker.js
const PROXY_BASE = 'https://your-proxy-domain.com/proxy-path';
```

代理服务需支持：接收 `?url=<目标URL>` 参数、添加允许跨域的响应头、返回目标页面的原始 HTML。

## 🛠 第三方依赖说明

- 字体：使用系统字体栈，无外部字体请求
- 图标：使用 Emoji 字符，无图标字体
- 检测器「粘贴 HTML 源码」模式纯浏览器本地解析，无任何第三方网络请求

## ✅ 合规要点

- 所有 HTML/JS 解析在浏览器本地完成，**不上传用户数据**
- 检测器页面已包含免责声明
- `contact/#privacy` 包含完整隐私政策

## 🏢 关于我们

**星图邻（XingTuLink）** 是西安栈上月明软件科技有限公司旗下的在线工具与开源项目平台。

- **公司名称**：西安栈上月明软件科技有限公司
- **公司官网**：[https://zsoftym.com/](https://zsoftym.com/)
- **在线工具**：[https://xingtulink.com](https://xingtulink.com)
- **联系邮箱**：guohao@zsymtech.cn
- **联系电话**：+86 176 2902 0227
- **地　　址**：陕西 · 西安

---

## ⚠️ 免责声明

1. **工具性质**：本项目及所提供的 GEO 友好度检测器、JSON-LD 生成器等工具（以下统称"本工具"）为**免费开源的技术参考工具**，仅用于分析网页的技术结构与生成结构化数据示例，**不构成任何 GEO / SEO 服务承诺或专业建议**。

2. **结果参考性**：GEO 检测评分与优化建议基于通用的 AI 搜索引擎友好度规则给出，**不保证任何 AI 引擎（如豆包、Kimi、ChatGPT 等）一定会引用或推荐使用本工具优化后的网站**。各 AI 平台的算法随时可能调整，实际效果以各平台为准。

3. **数据安全**：
   - 「粘贴 HTML 源码」模式的所有解析在用户浏览器本地完成，**不会上传任何用户输入的数据**；
   - 「输入 URL 抓取」模式经由部署方自行配置的**页面抓取代理服务**中转抓取目标网页的公开 HTML，西安栈上月明软件科技有限公司（以下简称"本公司"）不存储、不传播任何抓取内容；
   - 使用者不得通过本工具抓取非公开或涉及他人隐私的内容，**由此产生的法律责任由使用者自行承担**。

4. **使用风险**：使用者因下载、部署、修改或使用本项目源代码所产生的任何**直接或间接损失**，包括但不限于网站排名下降、流量损失、业务中断、法律纠纷等，本公司均不承担任何责任。

5. **第三方内容**：本工具文档或代码中引用的第三方服务（如静态托管、CORS 代理、Schema.org 规范等）仅为技术示例，本公司不对其可用性、准确性、安全性做任何担保。

6. **修改权利**：本公司有权在不提前通知的情况下**更新或终止**本项目的维护、在线服务及相关文档。开源代码按所采用的开源许可证（如适用）条款分发。

7. **合规义务**：部署和使用本项目者应自行遵守所在国家或地区的法律法规，包括但不限于《网络安全法》《数据安全法》《个人信息保护法》及《人工智能生成合成内容标识办法》等。

**使用本项目即视为您已阅读、理解并同意本免责声明的全部条款。**
