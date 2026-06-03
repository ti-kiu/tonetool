# Tone Generator (tonetool.org) — 合规审计报告

> 基于 PRD (v1/v2) + PAYMENT-CREEM.md + 项目配置信息生成
> 原则：信息不足标 [待确认]，不编造

---

## 1. 风险等级评估

### 1.1 总体风险：**中低**

| 维度 | 等级 | 说明 |
|------|------|------|
| 版权风险 | 🟢 极低 | 纯算法生成音频（Web Audio API），无第三方素材 |
| 隐私合规 | 🟡 中低 | 使用 GA4 + AdSense + Creem + Resend，需披露 |
| 支付合规 | 🟡 中低 | Creem 自动处理税务，但需退款政策页面 |
| 产品责任 | 🟡 中低 | 音频工具涉及听力安全，需免责声明 |
| 广告合规 | 🟡 中低 | AdSense 需 Cookie 同意 + 隐私政策 |
| GDPR/CCPA | 🟡 中低 | 全球用户，需数据处理披露 + 选择退出机制 |
| 医疗声明 | 🟢 低 | PRD 明确不做医疗宣称，但用户可能用于听力测试/耳鸣 |

### 1.2 风险热力图

```
高影响 ┤                    🟡 听力损伤诉讼（低概率）
       │
       │         🟡 GDPR 罚款（中概率）
       │
中影响 ┤    🟡 AdSense 暂停（中概率）    🟡 退款纠纷（中概率）
       │
       │ 🟢 版权诉讼（极低）
       │
低影响 ┤
       └─────────────────────────────────────────────
            低概率          中概率          高概率
```

### 1.3 关键风险项详解

**R1: 听力损伤责任**（概率：低，影响：高）
- 场景：用户长时间高音量使用导致听力损伤
- 缓解：音量警告、安全提示、免责声明、默认低音量
- PRD 已有："明确免责声明，音量警告，安全提示" ✅

**R2: 隐私合规缺口**（概率：中，影响：中）
- 场景：未正确披露 GA4/AdSense 数据收集，被欧盟用户投诉
- 缓解：完整隐私政策、Cookie 同意横幅、数据删除机制
- 状态：需创建合规页面 ⚠️

**R3: 退款纠纷**（概率：中，影响：中）
- 场景：用户通过 Creem 支付后要求退款，流程不清晰
- 缓解：明确退款政策页面、14 天无条件退款、Creem Customer Portal
- 配置已有：14 天无条件退款 ✅

---

## 2. 数据流图

### 2.1 用户数据全链路

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│   用户浏览器   │────▶│  tonetool.org │────▶│ Cloudflare Pages │
│  (Web Audio)  │     │  (Next.js)    │     │   (静态托管)      │
└─────────────┘     └─────────────┘     └─────────────────┘
       │
       │ 音频生成（本地，不上传）
       ▼
┌─────────────┐
│ Web Audio API│  ← 纯本地计算，零服务器传输
│  Oscillator  │
└─────────────┘

       │
       │ 分析/追踪数据
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   GA4       │◀───│  gtag.js    │◀───│  用户行为    │
│ (Google)    │     │             │     │  page_view   │
└─────────────┘     └─────────────┘     │  tool_play   │
                                        │  etc.        │
       │                                └─────────────┘
       │ 广告相关数据
       ▼
┌─────────────┐     ┌─────────────┐
│  AdSense    │◀───│  adsbygoogle│◀─── 页面上下文 + Cookie
│  (Google)   │     │             │
└─────────────┘     └─────────────┘

       │
       │ 支付数据
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Creem     │◀───│  Creem SDK  │◀───│  结账点击    │
│  (支付网关)  │     │  (前端弹窗)  │     │  支付完成    │
└─────────────┘     └─────────────┘     └─────────────┘
       │
       │ Webhook
       ▼
┌─────────────┐     ┌─────────────┐
│  /api/creem │────▶│  License Key│
│  /webhook   │     │  生成 + 邮件  │
└─────────────┘     └─────────────┘
       │
       │ 邮件发送
       ▼
┌─────────────┐     ┌─────────────┐
│   Resend    │◀───│  后端 API   │
│  (邮件服务)  │     │  (Serverless)│
└─────────────┘     └─────────────┘
```

### 2.2 数据分类

| 数据类型 | 内容 | 存储位置 | 保留期 | 敏感度 |
|----------|------|----------|--------|--------|
| 音频参数 | 频率、波形、音量 | 纯本地，不上传 | N/A | 无 |
| License Key | TONE-XXXX-XXXX-XXXX | localStorage + [待确认: 是否存后端] | 永久/直到取消 | 低 |
| 分析数据 | page_view, events | GA4 (Google) | 14个月(默认) | 中 |
| 广告数据 | 页面上下文、Cookie | AdSense (Google) | 按Google政策 | 中 |
| 支付数据 | 邮箱、交易ID、金额 | Creem (支付网关) | 按Creem政策 | 高 |
| 邮件地址 | 用户邮箱 | Resend + [待确认: 是否存数据库] | [待确认] | 高 |
| IP/UA | 访问日志 | Cloudflare (边缘) | 按CF政策 | 中 |

### 2.3 跨境数据传输

| 流向 | 服务 | 目的地 | 合规机制 |
|------|------|--------|----------|
| 分析数据 | GA4 | 美国 | [待确认: 是否启用 GA4 IP 匿名化] |
| 广告数据 | AdSense | 美国 | Google 标准条款 |
| 支付数据 | Creem | [待确认: Creem 服务器位置] | [待确认: Creem DPA] |
| 邮件数据 | Resend | [待确认: Resend 服务器位置] | [待确认: Resend DPA] |

---

## 3. 第三方服务清单

| 服务 | 用途 | 数据类型 | 隐私政策 | DPA | 位置 |
|------|------|----------|----------|-----|------|
| Cloudflare Pages | 静态托管 | 访问日志(IP/UA) | cloudflare.com/privacypolicy | ✅ | 全球边缘 |
| Google Analytics 4 | 流量分析 | 事件、设备信息、Cookie | policies.google.com/privacy | ✅ | 美国 |
| Google AdSense | 广告投放 | 页面上下文、Cookie、兴趣数据 | policies.google.com/privacy | ✅ | 美国 |
| Creem | 支付处理 | 邮箱、支付信息、交易记录 | creem.io/privacy | [待确认] | [待确认] |
| Resend | 邮件发送 | 邮箱地址、邮件内容 | resend.com/privacy | [待确认] | [待确认] |

### 3.1 第三方脚本加载

| 脚本 | 加载方式 | 是否阻塞渲染 | Cookie 设置 |
|------|----------|-------------|-------------|
| GA4 (gtag) | async | 否 | 是 (_ga, _gid) |
| AdSense | async | 否 | 是 (__gads, IDE) |
| Creem SDK | 按需 (点击升级时) | N/A | [待确认] |

---

## 4. 必需合规页面

### 4.1 页面清单与状态

| 页面 | URL | 法律要求 | 当前状态 | 优先级 |
|------|-----|----------|----------|--------|
| 隐私政策 | /privacy | GDPR/CCPA/AdSense 强制 | ❌ 未创建 | P0 |
| 服务条款 | /terms | 推荐（责任限制） | ❌ 未创建 | P0 |
| Cookie 政策 | /cookie-policy | GDPR 强制 | ❌ 未创建 | P0 |
| 退款政策 | /refund | 支付合规/消费者保护 | ❌ 未创建 | P0 |
| 免责声明 | /disclaimer 或合并到 Terms | 产品责任保护 | ❌ 未创建 | P1 |
| DPA (数据处理协议) | 无需公开页面 | GDPR 要求（与服务商） | [待确认: Creem/Resend DPA] | P1 |

### 4.2 页面内容要求

**隐私政策必须包含：**
- 收集的数据类型（分析、广告、支付）
- 数据用途
- 第三方共享清单（Google, Creem, Resend）
- Cookie 说明
- 用户权利（查看、删除、导出）
- 联系方式（[待确认: 联系邮箱]）
- 最后更新日期

**Cookie 政策必须包含：**
- 使用的 Cookie 列表
- 用途说明
- 如何禁用
- 同意撤回方式

**退款政策必须包含：**
- 14 天无条件退款窗口
- 退款流程（Creem Customer Portal）
- 退款到账时间
- 例外情况（如有）

---

## 5. 数据处理表 (ROPA 简化版)

| # | 处理活动 | 数据主体 | 数据类型 | 法律依据 | 目的 | 存储期 | 接收方 |
|---|----------|----------|----------|----------|------|--------|--------|
| 1 | 网站访问 | 访客 | IP, UA, 页面路径 | 合法利益 (分析) | 流量分析、性能优化 | 14个月 (GA4默认) | Google (GA4) |
| 2 | 广告投放 | 访客 | Cookie, 页面上下文 | 同意 (Cookie横幅) | 展示相关广告 | 按Google政策 | Google (AdSense) |
| 3 | 支付处理 | 购买者 | 邮箱、支付信息 | 合同履行 | 处理订阅/终身购买 | 按Creem政策 | Creem |
| 4 | License 交付 | 购买者 | 邮箱、License Key | 合同履行 | 发送购买凭证 | [待确认] | Resend |
| 5 | 退款处理 | 购买者 | 交易ID、邮箱 | 合同履行 | 处理退款请求 | 按Creem政策 | Creem |
| 6 | 音频生成 | 所有用户 | 频率、波形、音量 | N/A (纯本地) | 工具功能 | 不存储 | 无 |

### 5.1 法律基础说明

| 处理活动 | GDPR 法律基础 | 说明 |
|----------|---------------|------|
| GA4 分析 | Art. 6(1)(f) 合法利益 | 需平衡测试，建议启用 IP 匿名化 |
| AdSense | Art. 6(1)(a) 同意 | 必须等用户同意后才加载 |
| 支付处理 | Art. 6(1)(b) 合同履行 | 购买即建立合同关系 |
| 邮件发送 | Art. 6(1)(b) 合同履行 | 发送购买凭证是合同必要部分 |

---

## 6. 支付/订阅合规检查

### 6.1 Creem 集成检查

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 税务自动处理 | ✅ Creem 负责 | PRD: "税务自动处理" |
| PCI DSS 合规 | ✅ Creem 负责 | 支付页面由 Creem 托管 |
| 退款处理 | ⚠️ 需配置 | 14 天退款政策需页面 + Creem 设置 |
| 订阅取消 | ✅ Creem Customer Portal | 用户自助取消 |
| 收据发送 | ✅ Creem 自动 | 无需额外处理 |
| License Key 邮件 | ⚠️ 需实现 | PRD 有 webhook 代码，需 Resend 集成 |

### 6.2 消费者保护合规

| 要求 | 状态 | 说明 |
|------|------|------|
| 价格透明 | ✅ | 价格显示在升级弹窗 |
| 计费周期明确 | ✅ | 月付/终身清晰标注 |
| 退款权利告知 | ⚠️ 需页面 | 需 /refund 页面 |
| 取消路径明确 | ✅ | "Creem Customer Portal" |
| 服务描述准确 | ✅ | PRD 功能描述清晰 |

### 6.3 税务相关

| 项目 | 状态 | 说明 |
|------|------|------|
| VAT/GST 处理 | ✅ Creem 自动 | 无需操作 |
| 销售税 (美国) | ✅ Creem 自动 | 无需操作 |
| 年度税务报表 | [待确认] | Creem 是否提供 1099-K / 税务摘要 |
| 个人报税 | [待确认] | 用户作为个人主体，需自行申报收入 |

---

## 7. AI 内容安全检查

### 7.1 产品是否涉及 AI 生成内容

| 检查项 | 结果 | 说明 |
|--------|------|------|
| AI 生成音频 | ❌ 否 | 纯算法（Web Audio API Oscillator），非 ML |
| AI 生成文本 | ❌ 否 | 无 AI 文案生成 |
| AI 推荐/个性化 | ❌ 否 | 无 AI 推荐系统 |
| AI 客服 | ❌ 否 | 无客服系统 |

**结论：本产品不涉及 AI 生成内容，无需 AI 相关合规披露。**

### 7.2 算法透明度

虽然非 AI，但音频生成算法可透明说明：

```
Tone Generator 使用 Web Audio API 的 OscillatorNode 生成音频信号。
所有音频在您的浏览器本地实时计算，不涉及服务器处理或机器学习。
波形类型：
- Sine: 纯音，数学公式 y = sin(2πft)
- Square: 方波，含奇次谐波
- Triangle: 三角波，含奇次谐波（衰减更快）
- Sawtooth: 锯齿波，含所有谐波
```

---

## 8. 上线 Checklist

### 8.1 法律合规（阻塞项）

- [ ] **隐私政策页面** (/privacy) — 必须上线前完成
- [ ] **服务条款页面** (/terms) — 必须上线前完成
- [ ] **Cookie 同意横幅** — GDPR/AdSense 强制，必须上线前完成
- [ ] **Cookie 政策页面** (/cookie-policy) — 必须上线前完成
- [ ] **退款政策页面** (/refund) — 支付合规，必须上线前完成
- [ ] **AdSense 隐私合规** — 隐私政策 URL 需在 AdSense 后台配置
- [ ] **GA4 IP 匿名化** — 建议启用（GDPR 友好）

### 8.2 支付合规（阻塞项）

- [ ] **Creem 账户 KYC 完成** — 个人身份验证
- [ ] **Creem 产品配置** — ToneGen Pro + 两个价格
- [ ] **Creem Webhook 配置** — /api/creem/webhook
- [ ] **Webhook 签名验证** — 防伪造
- [ ] **License Key 生成逻辑** — 安全随机
- [ ] **Resend API Key 配置** — 邮件发送
- [ ] **退款政策在 Creem 配置** — 14 天窗口
- [ ] **测试支付流程** — 沙盒环境完整测试

### 8.3 产品安全（阻塞项）

- [ ] **音量警告提示** — 首次使用或高音量时
- [ ] **免责声明** — 非医疗工具，听力损伤风险
- [ ] **默认音量 ≤ 50%** — 保护用户听力
- [ ] **高频警告** — >15kHz 提示可能不适

### 8.4 SEO/技术（非阻塞但重要）

- [ ] **结构化数据** — WebApplication schema
- [ ] **sitemap.xml** — 包含所有合规页面
- [ ] **robots.txt** — 允许合规页面索引
- [ ] **Core Web Vitals** — LCP < 2.5s

### 8.5 上线后 30 天内

- [ ] **DPA 签署** — 与 Creem、Resend 确认数据处理协议
- [ ] **域名邮箱配置** — 替换临时联系邮箱
- [ ] **隐私政策更新** — 添加域名邮箱联系方式
- [ ] **Cookie 同意记录** — 保存用户同意选择（如有要求）
- [ ] **数据删除流程** — 用户请求删除数据的处理流程

---

## 9. 合规页面草稿

### 9.1 隐私政策 (/privacy) — 草稿

```markdown
# Privacy Policy

**Last updated:** [日期]

## 1. Introduction

Tone Generator ("we", "our", or "us") operates tonetool.org. This Privacy Policy explains how we collect, use, and protect your information when you use our website.

## 2. Information We Collect

### 2.1 Information You Provide
- **Email address**: When you purchase a Pro license, collected by Creem (our payment processor) and used by us to send your license key via Resend.

### 2.2 Information Collected Automatically
- **Usage data**: Pages visited, time spent, clicks — via Google Analytics 4
- **Device data**: Browser type, screen size, operating system — via Google Analytics 4
- **Cookie data**: See our [Cookie Policy](/cookie-policy)

### 2.3 Information We Do NOT Collect
- We do not collect or store audio you generate. All audio processing happens locally in your browser.
- We do not require account registration.
- We do not collect payment information directly (handled by Creem).

## 3. How We Use Your Information

| Purpose | Legal Basis |
|---------|-------------|
| Website analytics | Legitimate interest |
| Advertising | Your consent (via cookie banner) |
| Processing purchases | Contract performance |
| Sending license keys | Contract performance |

## 4. Third-Party Services

| Service | Purpose | Privacy Policy |
|---------|---------|----------------|
| Google Analytics 4 | Traffic analysis | google.com/privacy |
| Google AdSense | Advertising | google.com/privacy |
| Creem | Payment processing | creem.io/privacy |
| Resend | Email delivery | resend.com/privacy |
| Cloudflare | Hosting/CDN | cloudflare.com/privacy |

## 5. Cookies

We use cookies for analytics and advertising. See our [Cookie Policy](/cookie-policy) for details.

## 6. Your Rights (GDPR/CCPA)

- **Access**: Request a copy of your data
- **Deletion**: Request deletion of your data
- **Portability**: Receive your data in a portable format
- **Objection**: Object to processing based on legitimate interest
- **Withdraw consent**: Disable cookies at any time

To exercise these rights, contact us at: [待确认: 联系邮箱]

## 7. Data Retention

- Analytics data: 14 months (GA4 default)
- License records: [待确认: 保留期]
- Email addresses: [待确认: 保留期]

## 8. International Transfers

Your data may be transferred to and processed in the United States by our service providers (Google, Creem, Resend). These transfers are protected by standard contractual clauses.

## 9. Children's Privacy

Our service is not intended for children under 13. We do not knowingly collect data from children.

## 10. Changes to This Policy

We may update this policy. Changes will be posted here with an updated date.

## 11. Contact

[待确认: 联系邮箱]
[待确认: 是否有实体地址]
```

### 9.2 服务条款 (/terms) — 草稿

```markdown
# Terms of Service

**Last updated:** [日期]

## 1. Acceptance of Terms

By using tonetool.org, you agree to these Terms of Service.

## 2. Description of Service

Tone Generator is a free online tool for generating audio frequencies. The Pro version offers additional features for a fee.

## 3. Free Version

The free version is provided "as is" at no cost. It includes advertising.

## 4. Pro Version

### 4.1 Pricing
- Monthly: $4.99/month
- Lifetime: $29.99 one-time

### 4.2 Payment
Payments are processed by Creem. We do not store your payment information.

### 4.3 Refunds
We offer a 14-day unconditional refund. To request a refund, use the [Creem Customer Portal](https://creem.io) or contact us.

### 4.4 Cancellation
You can cancel your subscription at any time through the Creem Customer Portal. Cancellation takes effect at the end of the current billing period.

## 5. License Key

Upon purchase, you receive a license key. This key is for your personal use only. Do not share or resell.

## 6. Intellectual Property

All code, design, and content on tonetool.org is our property. The audio you generate is yours.

## 7. Prohibited Use

You may not:
- Use the service for illegal purposes
- Attempt to reverse engineer the code
- Distribute license keys
- Abuse or overload our infrastructure

## 8. Disclaimer of Warranties

THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.

## 9. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF THE SERVICE.

## 10. Hearing Safety

**IMPORTANT**: Prolonged exposure to loud audio can cause hearing damage. Always start at low volume. We are not responsible for hearing damage resulting from use of this tool.

## 11. Not Medical Advice

This tool is not a medical device. It is not intended for diagnosis or treatment of hearing conditions.

## 12. Changes to Terms

We may update these terms. Continued use constitutes acceptance.

## 13. Governing Law

These terms are governed by the laws of [待确认: 管辖地].

## 14. Contact

[待确认: 联系邮箱]
```

### 9.3 Cookie 政策 (/cookie-policy) — 草稿

```markdown
# Cookie Policy

**Last updated:** [日期]

## 1. What Are Cookies

Cookies are small text files stored on your device when you visit websites.

## 2. Cookies We Use

| Cookie | Provider | Purpose | Duration |
|--------|----------|---------|----------|
| _ga | Google Analytics | Distinguish users | 2 years |
| _gid | Google Analytics | Distinguish users | 24 hours |
| _gat | Google Analytics | Throttle request rate | 1 minute |
| __gads | Google AdSense | Advertising | Varies |
| IDE | Google AdSense | Advertising | 1 year |
| tonegen_license | Tone Generator | Store license key | Persistent |
| tonegen_pro | Tone Generator | Store Pro status | Persistent |

## 3. Managing Cookies

You can disable cookies in your browser settings. Note that disabling cookies may affect functionality.

To opt out of Google Analytics, use the [Google Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).

To opt out of personalized ads, visit [Google Ad Settings](https://adssettings.google.com).

## 4. Cookie Consent

When you first visit our site, we ask for your consent to use non-essential cookies. You can change your preference at any time [待确认: 是否需要 consent management UI].
```

### 9.4 退款政策 (/refund) — 草稿

```markdown
# Refund Policy

**Last updated:** [日期]

## 1. Refund Window

We offer a **14-day unconditional refund** on all purchases.

## 2. How to Request a Refund

### Option 1: Creem Customer Portal (Recommended)
1. Visit [Creem Customer Portal](https://creem.io) [待确认: 确切 URL]
2. Log in with your purchase email
3. Find your ToneGen Pro purchase
4. Click "Request Refund"

### Option 2: Contact Us
Email us at [待确认: 联系邮箱] with:
- Your purchase email
- Purchase date
- Reason for refund (optional, helps us improve)

## 3. Refund Processing

- Refunds are processed within [待确认: 时间] business days
- Refunds are issued to your original payment method
- You will receive an email confirmation when the refund is processed

## 4. What Happens After Refund

- Your license key will be deactivated
- Pro features will no longer be accessible
- You can continue using the free version

## 5. Exceptions

There are no exceptions. All purchases are eligible for refund within 14 days, no questions asked.

## 6. Contact

[待确认: 联系邮箱]
```

---

## 10. [待确认] 事项汇总

| # | 事项 | 影响 | 建议 |
|---|------|------|------|
| 1 | 联系邮箱 | 所有合规页面需要 | 尽快配置域名邮箱或提供临时邮箱 |
| 2 | 法律管辖地 | Terms 需要 | 选择用户所在地或服务器所在地 |
| 3 | GA4 IP 匿名化 | GDPR 合规 | 建议在 GA4 配置中启用 |
| 4 | Creem DPA | GDPR 要求 | 联系 Creem 确认是否提供 DPA |
| 5 | Resend DPA | GDPR 要求 | 联系 Resend 确认是否提供 DPA |
| 6 | Creem 服务器位置 | 跨境传输披露 | 确认后更新隐私政策 |
| 7 | Resend 服务器位置 | 跨境传输披露 | 确认后更新隐私政策 |
| 8 | License Key 存储 | 数据保留期 | 确认是否存数据库及保留期 |
| 9 | 邮箱保留期 | 数据保留期 | 确认购买后邮箱保留多久 |
| 10 | Cookie Consent UI | GDPR 合规 | 确认使用第三方工具或自建 |
| 11 | 实体地址 | 部分司法管辖区要求 | 确认是否需要展示 |
| 12 | Creem 税务报表 | 个人报税 | 确认 Creem 是否提供年度税务文档 |
| 13 | 退款处理时间 | 退款政策 | 确认 Creem 退款到账时间 |
| 14 | Creem Customer Portal URL | 退款政策 | 确认确切 URL |

---

## 11. 执行建议

### 立即执行（上线前）
1. 创建 /privacy, /terms, /cookie-policy, /refund 四个页面
2. 实现 Cookie 同意横幅
3. 在 AdSense 后台提交隐私政策 URL
4. 配置 GA4 IP 匿名化
5. 添加音量警告和免责声明到工具界面

### 短期执行（上线后 30 天）
1. 联系 Creem 和 Resend 确认 DPA
2. 配置域名邮箱
3. 更新所有合规页面中的邮箱地址
4. 确认数据保留期并更新隐私政策

### 持续监控
1. 定期检查第三方服务隐私政策更新
2. 监控 AdSense 合规通知
3. 跟踪 GDPR/CCPA 法规变化

---

*Report generated: 2026-05-30*
*Based on: PRD v1/v2, PAYMENT-CREEM.md, project config*
*Status: Draft — pending [待确认] items*
