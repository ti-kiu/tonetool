# AdSense 隐私配置指南

## 1. 在 AdSense 后台配置

### 1.1 提交隐私政策 URL
1. 登录 [AdSense 后台](https://www.google.com/adsense)
2. 点击 **Account** → **Settings** → **Privacy Center**
3. 找到 **Privacy policy URL**
4. 输入: `https://tonetool.org/privacy`
5. 保存

### 1.2 启用 GDPR 消息
1. 在 AdSense 后台，点击 **Privacy** → **GDPR**
2. 启用 **GDPR messaging**
3. 选择 **Use Google's GDPR message** 或 **Use your own consent solution**
4. 如果选择自己的方案（推荐，因为我们已有 CookieConsent 组件），选择 **"I have my own consent solution"**
5. 填写 CMP 信息（如果使用第三方）或选择 **"I don't use a CMP"**（因为我们自建）

### 1.3 配置广告技术提供商 (ATP)
1. **Privacy** → **Consent** → **Ad technology providers**
2. 选择 **"Custom set of ad technology providers"**
3. 只选择必要的提供商（减少合规风险）
4. 或选择 **"All"** 以最大化广告填充率

### 1.4 启用有限广告 (Limited Ads)
1. **Privacy** → **Consent** → **Limited ads**
2. 启用 **Limited ads**
3. 这会在用户未同意广告 Cookie 时展示非个性化广告

---

## 2. 代码中的 AdSense 配置

### 2.1 当前 layout.tsx 中的配置

```tsx
// AdSense 脚本已在 layout.tsx 中添加
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
/>
```

**需要替换:**
- `ca-pub-XXXXXXXXXXXXXXXX` → 你的实际 AdSense Publisher ID

### 2.2 广告单元代码示例

```tsx
// 在需要展示广告的位置添加
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

### 2.3 基于同意状态加载广告

```tsx
'use client';

import { useEffect, useRef } from 'react';

export default function AdUnit({ slot }: { slot: string }) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 检查用户是否同意了广告 Cookie
    const stored = localStorage.getItem('tonegen_cookie_consent');
    if (stored) {
      try {
        const prefs = JSON.parse(stored);
        if (prefs.advertising && adRef.current) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch {
        // 未同意，不加载广告
      }
    }
  }, []);

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

---

## 3. GA4 IP 匿名化配置

已在 `layout.tsx` 中启用：

```tsx
gtag('config', 'G-XXXXXXXXXX', {
  'anonymize_ip': true,        // IP 匿名化
  'allow_google_signals': false,  // 禁用 Google Signals
  'restricted_data_processing': true  // 受限数据处理
});
```

**需要替换:**
- `G-XXXXXXXXXX` → 你的实际 GA4 Measurement ID

---

## 4. 检查清单

- [ ] 替换 `G-XXXXXXXXXX` 为实际 GA4 ID
- [ ] 替换 `ca-pub-XXXXXXXXXXXXXXXX` 为实际 AdSense Publisher ID
- [ ] 在 AdSense 后台提交 `/privacy` URL
- [ ] 在 AdSense 后台配置 GDPR 消息
- [ ] 测试 Cookie 同意横幅正常工作
- [ ] 测试拒绝广告 Cookie 后广告不加载
- [ ] 测试同意广告 Cookie 后广告正常加载
- [ ] 验证 GA4 IP 匿名化生效（在 GA4 DebugView 中检查）

---

## 5. 测试验证

### 5.1 检查 Cookie 同意状态
```javascript
// 在浏览器控制台运行
JSON.parse(localStorage.getItem('tonegen_cookie_consent'))
// 应该返回 { analytics: true/false, advertising: true/false, timestamp: "..." }
```

### 5.2 检查 GA4 同意状态
```javascript
// 在浏览器控制台运行
dataLayer.filter(e => e[0] === 'consent')
// 应该显示 consent default 和可能的 consent update
```

### 5.3 检查 AdSense 是否加载
```javascript
// 同意广告后运行
window.adsbygoogle
// 应该返回数组
```
