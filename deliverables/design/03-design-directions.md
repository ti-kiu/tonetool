# Tone Generator — 3 个设计方向

---

## 方向 A: Industrial Dark（推荐）

**调性关键词**: Precise, Technical, Trustworthy, No-nonsense

**灵感来源**: 音频测试设备、示波器、频谱分析仪、专业录音棚硬件

**配色**:
- Background: `#08080F` (近黑，带微蓝)
- Surface: `#0F0F1A` (卡片/面板)
- Primary: `#00E5CC` (赛博青 — 示波器轨迹色)
- CTA: `#FFBF00` (琥珀金 — 音频设备旋钮色)
- Text Primary: `#E8ECF0` (冷白)
- Text Secondary: `#6B7280` (中性灰)
- Border: `#1E1E2E` ( subtle 分隔)

**字体**:
- Display: Space Grotesk (标题，工业感)
- Body: DM Sans (正文，清晰)
- Numbers: JetBrains Mono (频率显示，等宽仪表感)

**Hero 布局**: Split — 左侧文案(40%) + 右侧嵌入工具(60%)
- 工具面板有微妙内发光(glow)，像通电的设备
- 频率数字用大号 JetBrains Mono，像示波器读数

**Features 布局**: Bento Grid — 2+1 非对称
- 大卡片: 波形可视化截图
- 小卡片: 移动端、URL 分享、Pro 功能

**整体感觉**: 你打开的是一个专业音频测试设备，不是一个网站

**适合**: 强调技术精度、专业感、与竞品的最大差异化

---

## 方向 B: Minimal Dark

**调性关键词**: Clean, Focused, Calm, Essential

**灵感来源**: Linear.app、Vercel、Stripe — 开发者工具极简美学

**配色**:
- Background: `#0A0A0A` (纯黑)
- Surface: `#141414` (卡片)
- Primary: `#FFFFFF` (纯白 — 无彩色主色)
- CTA: `#00E5CC` (青 — 唯一彩色)
- Text Primary: `#FFFFFF`
- Text Secondary: `#737373`
- Border: `#262626`

**字体**:
- Display: Sora (几何感，极简)
- Body: Inter (等等 — 禁用。改用 **Outfit**)
- Numbers: JetBrains Mono

**Hero 布局**: Embedded Tool — 工具全宽居中，文案在工具上方极简一行
- 类似 Linear 的「产品即 Hero」
- 没有装饰，只有功能和文字

**Features 布局**: 单列大卡片，每个 Feature 一张全宽卡片
- 大量留白，信息密度低
- 每个卡片一个截图 + 一句话

**整体感觉**: 像 Linear 或 Vercel 做了一个音频工具

**适合**: 强调极简、速度感、开发者审美

---

## 方向 C: Retro-Futurism

**调性关键词**: Nostalgic, Playful, Analog, Warm

**灵感来源**: 80 年代音频设备、合成器面板、CRT 示波器、霓虹灯

**配色**:
- Background: `#0D0221` (深紫黑)
- Surface: `#1A0B2E` (卡片)
- Primary: `#FF00A0` (霓虹粉 — 合成器旋钮色)
- CTA: `#00F0FF` (霓虹青 — CRT 荧光色)
- Accent: `#FFD700` (金色 — 复古设备)
- Text Primary: `#F0E6FF` (暖白)
- Text Secondary: `#8B7AA8` (紫灰)

**字体**:
- Display: Clash Display (大胆、几何)
- Body: DM Sans
- Numbers: JetBrains Mono + 微妙 glow 效果

**Hero 布局**: Dashboard — 工具面板像合成器前面板
- 旋钮式控件（视觉上是旋钮，交互可用）
- 波形显示像 CRT 屏幕，有扫描线效果

**Features 布局**: 3 列等宽，每个像合成器模块
- 边框粗，有「设备面板」感
- 图标用线条风格，像电路图符号

**整体感觉**: 像打开了一台 1985 年的高端音频测试仪，但运行在浏览器里

**适合**: 强调创意、个性、记忆点强

---

## 方向对比

| 维度 | A: Industrial | B: Minimal | C: Retro |
|---|---|---|---|
| 差异化强度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 开发复杂度 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 专业信任感 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 移动端适配 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 长期维护 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 记忆点 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 推荐: 方向 A — Industrial Dark

**理由**:
1. 竞品全部浅色+简陋，深色工业风是最大差异化
2. 目标用户 40% 是耳机/音箱测试者，他们需要「专业设备」感
3. 赛博青+琥珀金配色在深色上对比度极佳，可读性强
4. 与现有代码的 `#0a0a0f` + `cyan-500` 基调一致，迁移成本低
5. 技术感强但不冰冷，适合音频工具场景
