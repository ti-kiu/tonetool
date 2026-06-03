# Tone Generator 收款方案 — Creem

## 为什么选 Creem

| 对比项 | Creem | Paddle | PayPal |
|--------|-------|--------|--------|
| 费率 | **3.9% + $0.40** | 5% + $0.50 | 3.49% + $0.49 |
| 税务处理 | **自动** | 自动 | 自己处理 |
| 联盟系统 | **内置** | 无 | 无 |
| 收入分账 | **内置** | 无 | 无 |
| 稳定性 | 较新（2024） | 成熟（2012） | 成熟 |

**Creem 适合 Tone Generator：**
- 费率最低（比 Paddle 省 1.1% + $0.10/笔）
- 税务自动处理（和 Paddle 一样）
- 内置联盟系统（后期推广用）
- 适合小额订阅工具

---

## Creem 费用计算

### Pro 版定价
| 方案 | 价格 |
|------|------|
| 月付 | $4.99/月 |
| 终身 | $29.99 一次性 |

### 实际到账

**月付 $4.99：**
- Creem 手续费：3.9% + $0.40 = $0.19 + $0.40 = **$0.59**
- 实际到账：$4.99 - $0.59 = **$4.40**（88.2%）

**终身 $29.99：**
- Creem 手续费：3.9% + $0.40 = $1.17 + $0.40 = **$1.57**
- 实际到账：$29.99 - $1.57 = **$28.42**（94.8%）

### 对比其他平台

| 平台 | 月付 $4.99 手续费 | 月付 $4.99 到账 | 终身 $29.99 手续费 | 终身 $29.99 到账 |
|------|------------------|----------------|-------------------|-----------------|
| **Creem** | **$0.59** | **$4.40** | **$1.57** | **$28.42** |
| Paddle | $0.75 | $4.24 | $2.00 | $27.99 |
| Lemon Squeezy | $0.85 | $4.14 | $2.60 | $27.39 |
| Gumroad | $0.50 | $4.49 | $3.00 | $26.99 |

**结论：Creem 费率最低，到账最多。**

---

## Creem 集成方案

### 1. 注册 Creem
- https://creem.io
- 需要：邮箱、公司/个人名称、网站 URL
- 审核时间：通常 1-2 个工作日

### 2. 创建产品

```
产品名：ToneGen Pro
描述：Remove ads, unlock advanced waveforms, export audio
类型：Subscription（订阅）+ One-time（终身）
```

### 3. 创建价格

| 价格方案 | 类型 | 金额 | 计费周期 |
|---------|------|------|---------|
| Pro Monthly | 订阅 | $4.99 | 每月 |
| Pro Lifetime | 一次性 | $29.99 | 无 |

### 4. 前端集成代码

```typescript
// 初始化 Creem
import { Creem } from '@creem/js-sdk';

const creem = new Creem({
  publicKey: process.env.NEXT_PUBLIC_CREEM_PUBLIC_KEY!,
  environment: 'production', // 或 'sandbox'
});

// 打开结账
const handleCheckout = async (priceId: string) => {
  await creem.checkout.open({
    priceId,
    customer: {
      email: 'user@example.com', // 可选
    },
    successUrl: 'https://tonegen.org/success',
    cancelUrl: 'https://tonegen.org',
    theme: 'dark', // 匹配我们的深色模式
  });
};
```

### 5. React 组件

```tsx
// components/UpgradeButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { Creem } from '@creem/js-sdk';

const CREEM_PUBLIC_KEY = process.env.NEXT_PUBLIC_CREEM_PUBLIC_KEY!;
const PRICE_MONTHLY = 'price_monthly_pro'; // Creem 后台获取
const PRICE_LIFETIME = 'price_lifetime_pro'; // Creem 后台获取

export default function UpgradeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [creem, setCreem] = useState<Creem | null>(null);

  useEffect(() => {
    if (isOpen && !creem) {
      const instance = new Creem({
        publicKey: CREEM_PUBLIC_KEY,
        environment: 'production',
      });
      setCreem(instance);
    }
  }, [isOpen]);

  const handleCheckout = (priceId: string) => {
    if (!creem) return;
    
    creem.checkout.open({
      priceId,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: window.location.origin,
      theme: 'dark',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-2">Upgrade to Pro</h2>
        <p className="text-gray-400 mb-6">Unlock advanced features and remove ads</p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Remove all ads
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Advanced waveforms (pulse, noise)
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Export audio as WAV
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Frequency sweep mode
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Save custom presets
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleCheckout(PRICE_MONTHLY)}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 text-center transition"
          >
            <div className="text-2xl font-bold text-white">$4.99</div>
            <div className="text-gray-400 text-sm">/month</div>
          </button>
          <button
            onClick={() => handleCheckout(PRICE_LIFETIME)}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 rounded-xl p-4 text-center transition relative"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
              BEST VALUE
            </div>
            <div className="text-2xl font-bold text-white">$29.99</div>
            <div className="text-white/80 text-sm">lifetime</div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full text-gray-500 hover:text-gray-300 text-sm transition"
        >
          Continue with free version
        </button>
      </div>
    </div>
  );
}
```

### 6. Webhook 处理（解锁 Pro）

```typescript
// app/api/creem/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get('creem-signature')!;

  // 验证签名
  const expectedSignature = createHmac('sha256', CREEM_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(payload);

  switch (event.type) {
    case 'checkout.completed':
      // 生成 license key
      const licenseKey = generateLicenseKey();
      
      // 发送邮件给用户（Creem 自动发送收据，这里发 license key）
      await sendLicenseEmail(event.data.customer_email, licenseKey);
      
      // 可选：存储到数据库
      // await db.licenses.create({ key: licenseKey, customer: event.data.customer_id });
      break;

    case 'subscription.canceled':
      // 标记 license 为过期
      // await db.licenses.update({ status: 'canceled' });
      break;
  }

  return NextResponse.json({ received: true });
}

function generateLicenseKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = 4;
  const segmentLength = 4;
  
  return Array.from({ length: segments }, () =>
    Array.from({ length: segmentLength }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
  ).join('-');
}

// 示例: TONE-X8KJ-4MNP-2QRT
```

### 7. License Key 验证（前端）

```typescript
// lib/license.ts
const LICENSE_KEY = 'tonegen_license';
const LICENSE_STATUS = 'tonegen_pro';

export function validateLicense(key: string): boolean {
  // 格式验证: TONE-XXXX-XXXX-XXXX
  const pattern = /^TONE-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/;
  return pattern.test(key);
}

export function activateLicense(key: string): boolean {
  if (!validateLicense(key)) return false;
  
  localStorage.setItem(LICENSE_KEY, key);
  localStorage.setItem(LICENSE_STATUS, 'true');
  return true;
}

export function isPro(): boolean {
  // 检查 localStorage
  if (localStorage.getItem(LICENSE_STATUS) === 'true') return true;
  
  // 检查 URL 参数（用于测试或分享）
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const license = params.get('license');
    if (license && validateLicense(license)) {
      activateLicense(license);
      return true;
    }
  }
  
  return false;
}

export function getLicenseKey(): string | null {
  return localStorage.getItem(LICENSE_KEY);
}

export function revokeLicense(): void {
  localStorage.removeItem(LICENSE_KEY);
  localStorage.removeItem(LICENSE_STATUS);
}
```

---

## 环境变量

```bash
# .env.local
NEXT_PUBLIC_CREEM_PUBLIC_KEY=pk_live_xxxxxxxxxx
CREEM_WEBHOOK_SECRET=whsec_xxxxxxxxxx

# 可选：用于发送 license key 邮件
RESEND_API_KEY=re_xxxxxxxxxx  # 或 SendGrid, AWS SES
```

---

## 收入预测

| 用户数 | 转化率 | Pro 用户 | 月收入 | Creem 费用 | 净收入 |
|--------|--------|---------|--------|-----------|--------|
| 10,000 | 1% | 100 | $499 | $59 | **$440** |
| 50,000 | 1% | 500 | $2,495 | $295 | **$2,200** |
| 100,000 | 1% | 1,000 | $4,990 | $590 | **$4,400** |
| 100,000 | 2% | 2,000 | $9,980 | $1,180 | **$8,800** |

---

## 实施步骤

1. **注册 Creem**（5 分钟）
   - https://creem.io
   - 邮箱验证
   - 提交 KYC（身份证/护照）

2. **创建产品**（10 分钟）
   - 产品名：ToneGen Pro
   - 添加两个价格：$4.99/月 + $29.99 终身

3. **获取 API Key**（2 分钟）
   - Dashboard → Settings → API Keys
   - 复制 Public Key 和 Webhook Secret

4. **集成 SDK**（2-3 小时）
   - 安装 `@creem/js-sdk`
   - 实现结账按钮
   - 测试沙盒环境

5. **配置 Webhook**（1 小时）
   - Dashboard → Webhooks
   - 添加 endpoint: `https://tonegen.org/api/creem/webhook`
   - 选择事件：`checkout.completed`, `subscription.canceled`

6. **实现 License 系统**（2 小时）
   - 生成 license key
   - 前端验证
   - Pro 功能解锁

7. **测试支付流程**（30 分钟）
   - 用 Creem 测试卡号测试
   - 验证 webhook 接收
   - 确认 license 发送

8. **上线**（10 分钟）
   - 切换 production key
   - 部署

**总实施时间：1-2 天**

---

## 联盟营销（后期扩展）

Creem 内置联盟系统，后期可以：

1. **开启联盟计划**
   - Dashboard → Affiliates
   - 设置佣金比例（如 30%）

2. **博主/YouTuber 推广**
   - 耳机评测博主
   - 音频设备频道
   - 独立开发者社区

3. **佣金计算**
   - 月付 $4.99 × 30% = **$1.50/月/用户**
   - 终身 $29.99 × 30% = **$9.00 一次性**

---

## 总结

| 指标 | 数值 |
|------|------|
| 费率 | **3.9% + $0.40**（最低） |
| 月付 $4.99 到账 | **$4.40** |
| 终身 $29.99 到账 | **$28.42** |
| 税务处理 | **自动** |
| 联盟系统 | **内置** |
| 实施时间 | **1-2 天** |

**Creem 是 Tone Generator 的最佳收款方案：费率最低、功能最全、税务省心。**
