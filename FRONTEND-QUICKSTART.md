# Tone Generator — 前端快速接入指南

## 项目位置
```
/root/projects/tone-generator/
```

## 技术栈确认
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Icons**: lucide-react
- **Fonts**: Space Grotesk, DM Sans, JetBrains Mono (Google Fonts)

## 首次运行
```bash
cd /root/projects/tone-generator
npm install
npm run build    # 构建静态站点到 out/ 目录
```

## 关键文件速查

| 我要改... | 找这个文件 |
|---|---|
| 首页内容 | `app/page.tsx` |
| 全局布局/字体/GA4 | `app/layout.tsx` |
| 颜色/字体配置 | `tailwind.config.js` |
| 全局CSS | `app/globals.css` |
| 音频工具 | `app/components/AudioEngine.tsx` |
| Cookie横幅 | `app/components/CookieConsent.tsx` |
| 音量警告 | `app/components/VolumeWarning.tsx` |
| Privacy页面 | `app/privacy/page.tsx` |
| Terms页面 | `app/terms/page.tsx` |
| Refund页面 | `app/refund/page.tsx` |
| Cookie Policy页面 | `app/cookie-policy/page.tsx` |

## Launch前必做 (3个Placeholder)

1. **GA4 ID**: `app/layout.tsx` 第31行和第48行
   ```tsx
   gtag('config', 'G-XXXXXXXXXX', { ... })
   ```

2. **AdSense ID**: `app/layout.tsx` 第53行
   ```tsx
   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
   ```

3. **联系邮箱**: Footer和法律页面中的 `[email placeholder]`

## Design Tokens速查

```js
// tailwind.config.js
colors: {
  background: '#08080F',
  surface: '#0F0F1A',
  primary: '#00E5CC',
  cta: '#FFBF00',
  'text-primary': '#E8ECF0',
  'text-secondary': '#6B7280',
  border: '#1E1E2E',
}
```

## 响应式断点
- `sm`: 640px
- `md`: 768px  ← 主要断点 (单列→多列)
- `lg`: 1024px ← Hero分栏
- `xl`: 1280px

## 注意事项
1. `page.tsx` 是 Client Component (`'use client'`)，因为用了 `useState`
2. 法律页面是 Server Component (无 `'use client'`)
3. 静态导出配置在 `next.config.cjs`: `output: 'export'`
4. 图片使用 `unoptimized: true` (静态导出必需)
