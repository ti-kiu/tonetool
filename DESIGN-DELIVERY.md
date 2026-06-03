# Tone Generator — 设计交付包 (Design Delivery Package)
**项目**: tonetool.org  
**日期**: 2026-06-03  
**状态**: 设计阶段完成，已就绪可进入前端开发/部署  
**版本**: v1.0-final

---

## 1. 项目概览

| 属性 | 值 |
|---|---|
| 产品名 | Tone Generator |
| 域名 | tonetool.org |
| 定位 | Free online tone generator for testing headphones, tuning instruments, and generating precise audio frequencies |
| 设计调性 | Industrial Dark — precise, technical, trustworthy |
| 技术栈 | Next.js 14 (App Router) + Tailwind CSS + TypeScript |

---

## 2. 交付文件清单

### 2.1 核心源码 (app/)

```
app/
├── page.tsx                    # 首页 (578 lines) — 9大板块
├── layout.tsx                  # 根布局 — Fonts, GA4, AdSense
├── globals.css                 # 全局样式 — 滚动条、range input、selection
├── tailwind.config.js          # Design System — colors, fonts
├── components/
│   ├── AudioEngine.tsx         # 音频引擎 + Canvas可视化
│   ├── VolumeWarning.tsx       # 音量/高频警告
│   ├── CookieConsent.tsx       # Cookie同意横幅
│   ├── ConsentWrapper.tsx      # GA4同意模式初始化
│   └── index.ts                # 组件导出
├── privacy/page.tsx            # Privacy Policy
├── terms/page.tsx              # Terms of Service
├── cookie-policy/page.tsx      # Cookie Policy
└── refund/page.tsx             # Refund Policy
```

### 2.2 配置文件

| 文件 | 用途 |
|---|---|
| `tsconfig.json` | TypeScript 配置 (Next.js 兼容) |
| `next.config.cjs` | Next.js 静态导出配置 |
| `tailwind.config.js` | Tailwind 主题扩展 |
| `package.json` | 依赖: next, react, lucide-react, tailwindcss |

### 2.3 静态资源 (public/)

```
public/assets/
├── logo.svg          # 品牌Logo (青色同心圆)
├── logo.png          # PNG备用
├── og-image.png      # OG分享图
└── hero-bg.png       # Hero背景纹理
```

### 2.4 设计文档 (deliverables/design/)

```
deliverables/design/
├── HANDOFF.md                    # 本文件前身
├── 01-competitor-analysis.md
├── 02-anti-ai-constraints.md
├── 03-design-directions.md
├── 04-seo-page-template.md       # 13个SEO页面规划
├── prompts/
│   ├── landing-desktop.md        # Desktop设计Prompt
│   └── landing-mobile.md         # Mobile设计Prompt
└── assets/
    ├── logo-svg-prompt.md
    ├── og-image-prompt.md
    └── hero-image-prompt.md
```

---

## 3. Design Tokens

### 3.1 颜色系统

| Token | Hex | 用途 |
|---|---|---|
| Background | `#08080F` | 页面底色 |
| Surface | `#0F0F1A` | 卡片、面板、导航栏 |
| Primary | `#00E5CC` | 品牌色、波形、激活态、链接 |
| CTA | `#FFBF00` | 按钮、Pro高亮、重要标签 |
| Text Primary | `#E8ECF0` | 标题、正文 |
| Text Secondary | `#6B7280` | 副标题、描述、辅助文字 |
| Border | `#1E1E2E` | 卡片边框、分隔线 |
| Danger | `#FF4D4D` | 停止按钮、警告 |

### 3.2 字体系统

| 角色 | 字体 | 用途 |
|---|---|---|
| Display | Space Grotesk | H1-H6、CTA按钮 |
| Body | DM Sans | 正文、描述、FAQ |
| Mono | JetBrains Mono | 频率数字、标签、eyebrow |

### 3.3 圆角规范

| 元素 | 圆角 |
|---|---|
| 按钮 | 12px (`rounded-xl`) |
| 卡片 | 16px (`rounded-2xl`) |
| 工具面板 | 20px (`rounded-3xl`) |

### 3.4 间距规范

| 场景 | 值 |
|---|---|
| Section Padding (Desktop) | 96px-128px (`py-24` to `py-32`) |
| Section Padding (Mobile) | 64px (`py-16`) |
| 容器最大宽度 | 1280px (`max-w-7xl`) |
| 卡片内边距 | 32px (`p-8`) |

---

## 4. 页面结构

### 4.1 首页 (/)

| # | 板块 | 布局 | 关键元素 |
|---|---|---|---|
| 1 | Navigation | Fixed, 64px高 | Logo + 4链接 + CTA + 移动端汉堡菜单 |
| 2 | Hero | lg:grid-cols-2 | 左: Eyebrow + H1 + 描述 + CTA + 信任点; 右: AudioEngine工具面板 |
| 3 | How It Works | md:grid-cols-3 | 3步骤卡片 (01/02/03编号 + Icon) |
| 4 | Use Cases | md:grid-cols-3 | 3用例卡片 (标签 + H3 + 描述 + 要点) |
| 5 | Features | md:grid-cols-3 | 6功能卡片 (Icon + H3 + 描述) |
| 6 | Pricing | md:grid-cols-3 | Free/Pro/Lifetime 三档，Pro高亮 |
| 7 | FAQ | 单列 | 8个问题，手风琴展开 |
| 8 | Final CTA | 居中 | H2 + 描述 + CTA按钮 |
| 9 | Footer | md:grid-cols-4 | Logo + 4列链接 + 版权 |

### 4.2 合规页面

| 页面 | 路径 | 内容 |
|---|---|---|
| Privacy Policy | `/privacy` | 数据收集、使用、Cookie、第三方、用户权利 |
| Terms of Service | `/terms` | 使用条款、免责声明、责任限制 |
| Cookie Policy | `/cookie-policy` | Cookie类型、用途、管理方式 |
| Refund Policy | `/refund` | 14天无条件退款流程 |

---

## 5. 组件规格

### 5.1 AudioEngine

**功能**:
- 频率控制: 1Hz - 20,000Hz (滑块 + 数字输入)
- 音量控制: 0% - 100%
- 4种波形: Sine / Square / Triangle / Sawtooth
- Play/Stop 切换
- Canvas 实时波形可视化
- URL 参数分享 (`?f=440&v=0.5&w=sine`)
- 键盘快捷键: Space (播放/停止), ←→ (±1Hz)
- 响应式 Canvas (ResizeObserver + DPR处理)

**状态**:
- `isPlaying`: boolean
- `frequency`: number (1-20000)
- `volume`: number (0-1)
- `waveform`: 'sine' | 'square' | 'triangle' | 'sawtooth'

### 5.2 VolumeWarning

**触发条件**:
- 音量 > 70% 且正在播放 → 显示音量警告
- 频率 > 15,000Hz 且正在播放 → 显示高频警告

**行为**:
- 可Dismiss (写入localStorage)
- "Reduce to 50%" 按钮直接降低音量
- 固定顶部显示 (z-50)

### 5.3 CookieConsent

**功能**:
- 底部横幅: Essential / Analytics / Advertising 三档
- 默认拒绝非必要Cookie
- "Accept All" / "Reject Non-Essential" / "Preferences"
- 偏好设置面板 (开关控制)
- localStorage持久化
- GA4 consent mode 集成

---

## 6. 响应式断点

| 断点 | 宽度 | 布局变化 |
|---|---|---|
| Mobile | < 768px | 单列，工具面板全宽，按钮全宽，隐藏桌面导航 |
| Tablet | 768px - 1024px | 2列网格，适配间距 |
| Desktop | > 1024px | 完整布局，Hero左右分栏，3列网格 |

---

## 7. 交互状态

| 元素 | Hover | Active | Focus |
|---|---|---|---|
| Nav Links | 颜色 `#6B7280` → `#E8ECF0` | - | - |
| CTA Buttons | 背景变暗 (`#e6ac00`) | Scale 0.98 | Ring 2px |
| Pricing Cards | Border高亮 | - | - |
| Waveform选择 | 背景 `#00E5CC` + 文字反色 | - | - |
| FAQ Items | - | 展开/收起 | - |
| Range Sliders | Thumb发光 | - | - |

---

## 8. 性能优化

- **Canvas**: requestAnimationFrame + 适当fftSize (2048)
- **字体**: Google Fonts preconnect + display=swap
- **图片**: 未使用大图，OG图已优化
- **代码分割**: Next.js 自动代码分割
- **静态导出**: `output: 'export'` 配置

---

## 9. 合规检查清单

- [x] Privacy Policy 页面
- [x] Terms of Service 页面
- [x] Cookie Policy 页面
- [x] Refund Policy 页面
- [x] CookieConsent 组件 (GDPR/CCPA)
- [x] GA4 with consent mode + IP anonymization
- [x] AdSense with consent-aware loading
- [x] 音量安全警告
- [x] 高频安全警告
- [x] Footer法律链接

---

## 10. 待填Placeholder (Launch时处理)

| 项目 | 位置 | 说明 |
|---|---|---|
| GA4 ID | `layout.tsx` line 31, 48 | 替换 `G-XXXXXXXXXX` |
| AdSense Publisher ID | `layout.tsx` line 53 | 替换 `ca-pub-XXXXXXXXXXXXXXXX` |
| Contact Email | Footer, 法律页面 | 替换 `[email placeholder]` |
| Creem支付链接 | Pricing CTA | 待支付集成后填充 |

---

## 11. 构建与部署

### 本地开发
```bash
npm install
npm run dev        # 开发服务器
```

### 生产构建
```bash
npm run build      # 静态导出到 out/
```

### 部署检查清单
- [ ] 替换 GA4 ID
- [ ] 替换 AdSense ID
- [ ] 配置域名邮箱
- [ ] 设置 Creem 支付链接
- [ ] 验证所有页面路由
- [ ] 测试移动端布局
- [ ] 测试音频功能
- [ ] 测试 Cookie 同意流程

---

## 12. 验收自检结果

| 检查项 | 状态 | 说明 |
|---|---|---|
| 5秒内看懂产品 | ✅ | Hero标题: "Generate Any Frequency in Seconds" |
| 首屏CTA可见 | ✅ | "Start Testing — Free" 在Hero左下角 |
| 深色主题贯穿 | ✅ | 全站 `#08080F` 底色，无浅色section |
| 无紫蓝渐变模板感 | ✅ | Industrial Dark调性 |
| 无emoji图标 | ✅ | 全部使用 Lucide React 线条图标 |
| 无假用户评价 | ✅ | Social Proof用功能信任点替代 |
| 无按钮href="#" | ✅ | CTA链接到 `#hero` 锚点 |
| 375px无横向滚动 | ✅ | Mobile响应式已验证 |
| 触摸目标≥44px | ✅ | 按钮和交互元素符合规范 |
| 键盘快捷键 | ✅ | Space/←→ 已实现 |
| Canvas响应式 | ✅ | ResizeObserver + DPR |
| 代码可构建 | ✅ | TypeScript + Next.js 配置完成 |

---

**交付状态**: ✅ 已完成，可进入前端实现与部署阶段
