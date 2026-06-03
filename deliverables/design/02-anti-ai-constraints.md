# Tone Generator — 反 AI 味约束表

## 字体约束

| AI 默认 | 我们使用 | 理由 |
|---|---|---|
| Inter / Roboto / Arial | **Space Grotesk** (Display) + **DM Sans** (Body) | 工业感+可读性，竞品全用系统字体 |
| 系统默认 mono | **JetBrains Mono** (数字/频率显示) | 频率数字需要等宽字体，工业仪表感 |

## 配色约束

| AI 默认 | 我们使用 | 理由 |
|---|---|---|
| 紫蓝渐变 + 白背景 | **深色主题** `#08080F` 背景 | 竞品全浅色，深色=差异化 |
| 蓝色主色 | **赛博青 `#00E5CC`** 主色 | 音频/波形/示波器联想，竞品无此色系 |
| 绿色成功 / 红色错误 | **琥珀金 `#FFBF00`** 强调/CTA | 暖色在深色上最醒目，音频设备常用金色 |
| 灰色文字 | `#E8ECF0` 主文字 / `#6B7280` 次级 | 高对比度，深色主题标准 |

## 布局约束

| AI 默认 | 我们使用 | 理由 |
|---|---|---|
| 对称居中 3 列 Features | **非对称 2+1 Bento Grid** | 打破模板感，视觉节奏变化 |
| 统一 border-radius | **按钮 12px / 卡片 16px / 工具面板 20px** | 有层次，工具面板更圆=更友好 |
| 白灰交替 section | **深色统一 + 色块分隔** | 深色主题不需要交替，用间距和边框分隔 |
| 居中 Hero | **Split 布局：左文案 + 右工具** | 工具是核心，首屏必须看到 |

## 图标约束

| AI 默认 | 我们使用 | 理由 |
|---|---|---|
| Emoji 做 icon | **Lucide React icons** | 专业、一致、可定制 stroke-width |
| 彩色图标 | **单色线条图标，主色高亮** | 统一、不抢视觉焦点 |

## 文案禁词

以下词汇绝对禁止出现在任何 UI 文案中：

```
Revolutionize / Empower / Seamless / Cutting-edge / Next-generation
Unlock your potential / Transform your workflow / Harness the power
AI-powered / Smart / Intelligent / Innovative / Disruptive
```

## 文案风格指南

| 禁止 | 改用 |
|---|---|
| "Revolutionize audio testing" | "Test any frequency in seconds" |
| "Seamless experience" | "Works on mobile. No download." |
| "Cutting-edge technology" | "Web Audio API. Sample-accurate." |
| "Unlock your potential" | "Find the exact Hz you need" |
| "Empowering users" | "You control every frequency" |

## 图像约束

| AI 默认 | 我们使用 | 理由 |
|---|---|---|
| 3D 抽象渐变图形 | **真实产品截图 + 波形可视化** | 工具站，真实截图 > 假图 |
|  stock photo 人物 | **无人物图** | 音频工具不需要假笑脸 |
| 通用 SaaS 插画 | **示波器/波形/频率谱抽象图形** | 与产品功能直接相关 |

## 交互约束

| AI 默认 | 我们使用 | 理由 |
|---|---|---|
| 平滑淡入动画 | **即时响应，微交互仅用于反馈** | 工具站，速度 > 动画 |
| 悬浮大阴影 | **细微边框变化 + 主色 glow** | 深色主题，glow 比阴影有效 |
| 模态弹窗引导 | **内联提示，不阻断操作** | 用户来用工具，不要打断 |
