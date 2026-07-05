# ToneTool.org 工作日志

## 2026-06-12 (昨天)

### 修复的 SEO 问题
1. **Canonical URL 修复** — 之前所有页面的 canonical 都指向首页，导致 Google 只索引首页。已为每个工具页面添加独立的 canonical URL。
2. **Meta Keywords 删除** — 该标签已被主流搜索引擎忽略，删除了 `layout.tsx` 中的 keywords 字段。
3. **Favicon 缺失修复** — 用现有 logo.png 生成 favicon.ico 并添加到 metadata，搜索结果会显示小图标。

### 今日流量
- Cloudflare Analytics: 158 独立访客 / 1.35k 总请求 (24小时)
- 状态：正常，新站自然增长

### 已完成的代码修改 (今日)
- commit `9b53d39`: Fix canonical URLs for all pages
- commit `16c8aaa`: Remove meta keywords tag
- commit `733c0d2`: Add favicon.ico for SEO

---

## 2026-06-13 (今天)

### SEO 检查结果
1. **Canonical 标签验证** ✅ — 所有页面 canonical 正确
   - 首页: `https://tonetool.org/`
   - Frequency Sweep: `https://tonetool.org/frequency-sweep`
   - Headphone Test: `https://tonetool.org/headphone-test`

2. **Google 索引状态** ✅
   - 已索引: 首页 + Frequency Sweep
   - 待索引: Headphone Test, 440Hz Tone 等
   - 用户已手动请求编入索引

3. **GA4 检查** ✅ — 代码正常运行，Measurement ID: G-L7CZQ8T37C

### 数据对比
- Cloudflare: 705 独立访客 (7天)
- Google Search Console: 20 次曝光, 0 次点击
- 原因: 新站，SEO 还没起效，大部分是直接访问

### 推广相关
- 用户在 YouTube 评论发了 2 条带链接的评论（风险中等，不建议继续批量）
- 创建了冷启动推广计划 `docs/cold-launch-plan.md`

### 待办 (明天)
- [ ] **内容 SEO**: 写 3 篇博客文章
  - 文章 1: How to Test Headphones Online for Free
  - 文章 2: 440Hz vs 432Hz: Complete Guide
  - 文章 3: Tinnitus Frequency Matching Guide
- [ ] 冷启动推广执行 (Product Hunt / Reddit)
- [ ] 其他优化

### 关键信息
- GitHub 仓库: `ti-kiu/tonetool`
- 部署平台: Cloudflare Pages (自动部署)
- GA4 ID: `G-L7CZQ8T37C`
- Bing 验证码: `8D5AE51845CFE08F58F54A68CFF76D57`
- Sitemap: `https://tonetool.org/sitemap.xml`

## 2026-07-01

### Sitemap 修复
- **问题**：sitemap.xml 只有 18 个页面 URL，缺少 12 篇博客文章
- **修复**：更新 public/sitemap.xml，加入所有博客文章 URL（共 30 个页面）
- **部署**：推送 master，Cloudflare Pages 自动构建成功

### Google Search Console
- **提交 sitemap**：用户提交 sitemap.xml，GSC 状态：成功，发现 30 个页面
- **已索引页面**：homepage, frequency-sweep, headphone-test（3个）
- **待索引**：12 篇博客文章 + 其他工具页面（需 Google 爬取，1-3 天）

### 关键词研究
- **API 限制**：discoverkeywords.co 学生账号只能获取共享缓存数据，无法自定义种子词
- **降级方案**：用 SERP 手动分析，找到 5 个 A 级音频相关机会：
  1. 1000hz test tone online
  2. brown noise generator online free
  3. speaker phase test online
  4. interactive frequency chart
  5. note to frequency chart online
- **"Soccer 5" 分析**：判断为 D_SKIP（品牌词 + 与音频赛道无关）

### 待办
- [ ] 等 Google 爬取博客文章（1-3 天）
- [ ] 用户可登录 GSC 逐个提交博客 URL 的 Request Indexing
- [ ] 下次可做：brown noise generator 扩展、1000hz test tone 博客
