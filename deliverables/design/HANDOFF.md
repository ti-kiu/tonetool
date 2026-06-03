# Tone Generator — Design Handoff

状态：可开发
日期：2026-06-02
负责人：Design Agent → Dev Agent

---

## 1. 项目概览

产品名：Tone Generator
域名：tonetool.org
一句话定位：Free online tone generator for testing headphones, tuning instruments, and generating precise audio frequencies from 1Hz to 20kHz
目标用户：Headphone/speaker testers (40%), Hearing test/tinnitus matchers (25%), Audio/electronics experimenters (20%), Meditation/therapy users (10%)
设计调性：Industrial Dark — precise, technical, trustworthy, no-nonsense

---

## 2. 交付文件

```text
deliverables/design/
├── 01-competitor-analysis.md
├── 02-anti-ai-constraints.md
├── 03-design-directions.md
├── 04-seo-page-template.md
├── HANDOFF.md (this file)
├── prompts/
│   ├── landing-desktop.md
│   └── landing-mobile.md
└── assets/
    ├── logo-svg-prompt.md
    ├── og-image-prompt.md
    └── hero-image-prompt.md
```

上游输入文件（已存在）：
```text
/root/projects/tone-generator/
├── COPYWRITING.md              # 定稿文案
├── app/components/AudioEngine.tsx  # 工具组件（已有可视化+URL分享）
├── app/components/VolumeWarning.tsx
├── app/components/CookieConsent.tsx
├── app/components/ConsentWrapper.tsx
├── app/privacy/page.tsx
├── app/terms/page.tsx
├── app/cookie-policy/page.tsx
└── app/refund/page.tsx
```

---

## 3. Design Tokens

| Token | Value | Usage |
|---|---|---|
| Background | `#08080F` | 页面底色 |
| Surface | `#0F0F1A` | 卡片、工具面板、导航栏 |
| Primary Accent | `#00E5CC` | 品牌色、波形、激活状态、链接 |
| CTA / Highlight | `#FFBF00` | 按钮、高亮 Plan、重要标签 |
| Text Primary | `#E8ECF0` | 标题、正文 |
| Text Secondary | `#6B7280` | 副标题、描述、辅助文字 |
| Border | `#1E1E2E` | 卡片边框、分隔线 |
| Danger | `#FF4D4D` | 停止播放按钮、警告 |
| Font Display | Space Grotesk | 所有标题 (h1-h6)、CTA 按钮 |
| Font Body | DM Sans | 正文、描述、FAQ |
| Font Mono | JetBrains Mono | 频率数字、标签、代码、 eyebrow 文字 |
| Border Radius - Button | 12px | 所有按钮 |
| Border Radius - Card | 16px | 卡片、FAQ 项 |
| Border Radius - Tool Panel | 20px | Hero 工具面板 |
| Section Padding | 120px (desktop) / 64px (mobile) | 垂直间距 |

### Typography Scale

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| H1 (Hero) | Space Grotesk | 56px | 700 | `#E8ECF0` |
| H2 (Section) | Space Grotesk | 40px | 700 | `#E8ECF0` |
| H3 (Card Title) | Space Grotesk | 24px | 600 | `#E8ECF0` |
| Body | DM Sans | 16px | 400 | `#6B7280` |
| Eyebrow | JetBrains Mono | 12px | 400 | `#00E5CC` |
| Frequency Display | JetBrains Mono | 72px | 700 | `#E8ECF0` |
| CTA Button | Space Grotesk | 16px | 600 | varies |

---

## 4. 页面 IA

### 首页 (/)

1. Navigation (fixed, 64px)
2. Hero (100vh, split: 45% copy + 55% tool)
3. How It Works (3 cards)
4. Use Cases (3 cards, asymmetric)
5. Features (Bento Grid, 5 items)
6. Pricing (3 cards, Pro highlighted)
7. FAQ (accordion, 8 items)
8. Final CTA (centered, gradient bg)
9. Footer (4 columns)

### SEO 矩阵页模板

可复用：配色、字体、导航、定价、FAQ 结构、Footer
每页只改：headline、subheadline、use cases、FAQ 中 2-3 个问题
必含：工具嵌入（AudioEngine 组件）

已规划 13 个 SEO 页面，详见 `04-seo-page-template.md`

---

## 5. 开发注意事项

### 必须保留
- 首屏必须保留 CTA 按钮（"Start Testing — Free"）
- Hero 必须是 Split 布局（左文案右工具），不要改成居中
- 工具面板必须嵌入真实的 AudioEngine 组件
- 频率数字必须使用 JetBrains Mono（等宽，仪表感）
- 深色主题贯穿全站，不要插入浅色 section

### 绝对禁止
- 不要把 Hero 改成居中模板布局
- 不要替换回 Inter / Roboto / Arial
- 不要使用 emoji icon
- 不要使用紫蓝渐变 + 白背景
- 不要编造假用户评价
- 不要把按钮 href 留为 `#`
- 不要在 Free 版插入广告（Pro 卖点就是去广告）

### 移动端必须
- 单列布局，所有多列变堆叠
- 工具面板全宽，无侧边距
- 按钮全宽（减 32px margin）
- 触摸目标 ≥ 44×44px
- 375px 无横向滚动
- 隐藏键盘快捷键提示

### 组件复用
- AudioEngine.tsx — 已存在，含可视化+URL分享
- VolumeWarning.tsx — 已存在
- CookieConsent.tsx — 已存在
- Pricing 卡片 — 3 种样式（Free 边框 / Pro 金色高亮 / Lifetime 青色边框）
- FAQ Accordion — 手风琴组件，默认收起

### 高亮 Plan
- Pro Plan 用 `#FFBF00` 2px 边框 + "MOST POPULAR" 徽章
- 徽章定位：top center，-12px margin 重叠边框

### 合规展示
- Footer 必须包含：Privacy, Terms, Cookie, Refund 链接
- Terms 页面已有听力安全免责声明（红色高亮区块）
- Use Case 2（Tinnitus）必须有医疗免责声明
- CookieConsent 横幅默认拒绝非必要 Cookie

---

## 6. 需要替换 / 补充的内容

- [ ] Logo SVG（按 `assets/logo-svg-prompt.md` 生成）
- [ ] OG Image（按 `assets/og-image-prompt.md` 生成）
- [ ] Hero 图（优先真实产品截图，见 `assets/hero-image-prompt.md`）
- [ ] 联系邮箱（当前 `[待确认]`，配置域名邮箱后更新 Footer）
- [ ] GA4 ID（`G-XXXXXXXXXX`）
- [ ] AdSense Publisher ID（`ca-pub-XXXXXXXXXXXXXXXX`）
- [ ] 真实用户数据（替换 Social Proof 区块的 cold start 文案）
- [ ] Creem 支付集成（Pricing CTA 链接）

---

## 7. 终检结果

- [x] 5 秒内能看懂产品（Hero: Generate Any Frequency in Seconds）
- [x] 首屏 CTA 可见（"Start Testing — Free" 在 Hero 左下角）
- [x] Desktop + Mobile Prompt 都完成
- [x] 375px 无横向滚动（mobile prompt 已约束）
- [x] 没有紫蓝渐变 + 白背景模板感（全深色主题）
- [x] 没有 emoji icon（使用 Lucide 线条图标）
- [x] 没有假评价（Social Proof 用功能信任点替代）
- [x] 没有按钮 href="#"（CTA 链接待支付集成后填充）
- [x] 占位图已标记（Logo/OG/Hero 有明确生成 Prompt）

---

## 8. 未完成项 / 风险

| 项目 | 风险等级 | 说明 |
|---|---|---|
| 联系邮箱 | P1 | 影响 4 个法律页面 Footer，域名邮箱配置后修复 |
| GA4 ID | P1 | 影响 analytics，上线前配置 |
| AdSense ID | P1 | 影响广告加载，上线前配置 |
| Creem 支付链接 | P0 | 影响 Pricing CTA 功能，需先完成支付集成 |
| 真实用户数据 | P2 | Social Proof 区块待冷启动后有数据后更新 |
| Logo/OG 图生成 | P2 | 有 Prompt，可并行执行 |

---

## 9. 技术栈确认

- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS
- UI Components: shadcn/ui (可选，用于 accordion/button)
- Icons: Lucide React
- Fonts: Space Grotesk, DM Sans, JetBrains Mono (Google Fonts)
- Audio: Web Audio API (原生，已有实现)
- Payment: Creem (待集成)
- Analytics: GA4 (待配置 ID)
- Ads: Google AdSense (待配置 ID，仅 Free 版展示)
