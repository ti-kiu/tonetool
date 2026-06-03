# Tone Generator 工具站 — Product Requirements Document

## 0. 结论先行

- **要不要做**：✅ 值得做
- **为什么做**：美国月搜索 18,000，全球 47,000，CPC $0.76，需求长期稳定；SERP 头部有独立小站（szynalski.com、onlinetonegenerator.com），证明小站可以排进前 10；纯前端工具，零版权风险，技术成本低。
- **一句话定位**：一个现代化的在线音频频率发生器，用更好的设计、更强的功能、更全的 SEO 页面矩阵，从老旧竞品手中抢搜索流量。
- **首版做什么**：核心频率发生器（4 种波形 + 音量 + 频率滑块 + 实时可视化），配套 5 个 SEO 场景页（白噪声、双耳节拍、听力测试、音箱测试、调音）。
- **明确不做什么**：不做音频素材库/下载站（版权风险），不做移动端 App（先 Web），不做社交/社区功能，不做用户上传/UGC。

---

## 1. 市场概述

### 1.1 目标关键词
| 关键词 | 美国搜索量 | 全球搜索量 | CPC | KD |
|--------|-----------|-----------|-----|-----|
| tone generator | 18,000 | 47,000 | $0.76 | 53 |
| online tone generator | 11,000 | 28,000 | ~$0.60 | 45 |
| frequency generator | 8,000 | 21,000 | ~$0.55 | 42 |
| white noise generator | 9,000 | 24,000 | ~$0.50 | 48 |
| binaural beats generator | 7,800 | 20,000 | ~$0.65 | 44 |
| signal generator | 12,000 | 31,000 | ~$0.70 | 47 |
| function generator | 10,000 | 26,000 | ~$0.55 | 43 |
| waveform generator | 7,000 | 18,000 | ~$0.50 | 39 |
| sine wave generator | 6,500 | 17,000 | ~$0.45 | 38 |
| hearing test tone | 5,800 | 15,000 | ~$0.40 | 36 |
| pink noise generator | 5,200 | 14,000 | ~$0.45 | 35 |
| speaker test tone | 3,900 | 10,000 | ~$0.35 | 28 |
| subwoofer test tone | 3,200 | 8,500 | ~$0.30 | 25 |
| tinnitus frequency finder | 2,600 | 7,000 | ~$0.80 | 22 |

**长尾总量**：美国 ~116,000/月，全球 ~303,500/月

### 1.2 趋势判断
- 需求长期稳定：音频测试、听力测试、冥想是 evergreen 需求
- 无季节性波动，全年稳定
- 移动端占比高（用户用手机测试耳机）

### 1.3 机会判断
| 维度 | 评估 |
|------|------|
| 长期需求 | ✅ 稳定 evergreen |
| SERP 有小站 | ✅ szynalski.com、onlinetonegenerator.com、hzgenerator.com |
| 付费场景 | ✅ CPC $0.76，广告+高级功能可变现 |
| 首版成本 | ✅ 纯前端，2-3 周可上线 |

**判定：4/4 强，继续做 PRD。**

---

## 2. SERP 与竞品分析

### 2.1 SERP 观察
- **搜索日期**：2025-01-XX
- **Top 10 类型分布**：
  - 工具页：6 个（onlinetonegenerator.com, szynalski.com, hzgenerator.com, audiocheck.net, audioheck.com, nerds.de）
  - 信息页：2 个（Wikipedia, Britannica）
  - 电商/品牌：2 个（Amazon 信号发生器硬件, 音频设备品牌）
- **大站**：2 个（Wikipedia, Amazon）
- **独立小站**：6 个

**搜索意图判断**：工具型（用户想直接在线生成音频测试音）
**产品方向**：工具站，首屏必须可直接使用工具

### 2.2 Top 3 竞品深度分析

#### 竞品 A：szynalski.com/tone-generator
- **定位**：个人开发者维护的简单工具
- **功能**：正弦/方波/三角/锯齿波，频率滑块，音量控制，键盘快捷键
- **设计**：极简，无现代 UI，无深色模式
- **变现**：PayPal 捐赠
- **弱点**：
  - 界面老旧（2010 年代风格）
  - 无移动端优化
  - 无频谱可视化
  - 无 SEO 页面矩阵（只有一个页面）
  - 无噪声生成
  - 加载慢
- **威胁**：中（有品牌认知但产品弱）

#### 竞品 B：onlinetonegenerator.com
- **定位**：功能最全的 tone generator 站
- **功能**：基础发生器 + 多音发生器 + 音高变换 + 时间拉伸 + 语音生成 + 扫频 + 调音 + 听力测试 + 噪声 + 双耳节拍 + 432Hz + DTMF + 节拍器
- **设计**：功能多但界面杂乱，广告多
- **变现**：Google AdSense + Ko-fi 捐赠
- **弱点**：
  - 界面杂乱，新手难用
  - 广告干扰严重
  - 移动端体验差
  - 加载慢（大量广告脚本）
  - 设计不统一（各功能页风格不一致）
- **威胁**：高（功能最全，SEO 强）

#### 竞品 C：hzgenerator.com
- **定位**：现代感 tone generator
- **功能**：基础发生器 + 常用频率预设 + 音频可视化 + L/R 平衡 + 分享链接
- **设计**：相对现代，有可视化，有预设频率
- **变现**：Google AdSense
- **弱点**：
  - 功能仍较基础
  - SEO 页面少
  - 广告插入生硬
  - 无高级功能（噪声、双耳节拍等）
- **威胁**：中（设计较好但功能浅）

### 2.3 三层竞品分级

| 层级 | 竞品 | 关系 |
|------|------|------|
| Tier 1（直接） | szynalski.com, onlinetonegenerator.com, hzgenerator.com | 同类在线工具 |
| Tier 2（相邻） | audiocheck.net（综合音频测试）, audioheck.com（多功能音频） | 功能重叠 |
| Tier 3（现状） | 手机 App（Tone Generator Pro 等）, 硬件信号发生器 | 用户可能转向 |

### 2.4 用户痛点证据
- Reddit r/headphones 频繁有人询问"如何测试新耳机"
- Reddit r/tinnitus 用户寻找匹配耳鸣频率的工具
- 竞品评论区常见："界面太老"、"广告太多"、"移动端难用"
- szynalski.com 的捐赠说明暗示维护困难（"需要赚钱养家"）

---

## 3. 目标用户

### 3.1 用户细分

#### 用户 A：耳机/音箱测试者（主力用户，40%）
- **Who**：刚买了新耳机或音箱，想测试频率响应
- **Pain**：不知道耳机低音/高音表现如何，需要简单工具快速测试
- **Current**：用 onlinetonegenerator.com 或手机 App
- **Trigger**：收到新耳机/音箱，或发现音质问题
- **Hangout**：Reddit r/headphones, r/audiophile, 耳机论坛
- **Willingness**：低（免费工具，广告可接受）

#### 用户 B：听力测试/耳鸣匹配者（25%）
- **Who**：怀疑自己听力下降，或有耳鸣想找到匹配频率
- **Pain**：耳鸣频率难以描述，医生问"什么音调"答不上来
- **Current**：去医院做听力测试，或用 szynalski.com
- **Trigger**：耳鸣加重，或体检发现听力问题
- **Hangout**：Reddit r/tinnitus, 听力健康论坛
- **Willingness**：中（愿意为精准测试付费少量）

#### 用户 C：音频/电子实验者（20%）
- **Who**：学生、DIY 爱好者、音频工程师
- **Pain**：需要特定频率做实验，但不想买硬件信号发生器
- **Current**：用 onlinetonegenerator.com 或手机 App
- **Trigger**：学校作业、DIY 项目、设备调试
- **Hangout**：Reddit r/electronics, r/diyaudio, 电子论坛
- **Willingness**：低（学生群体）

#### 用户 D：冥想/治疗使用者（10%）
- **Who**：冥想爱好者、尝试声音治疗的人
- **Pain**：需要特定频率（432Hz、528Hz、双耳节拍）做冥想
- **Current**：YouTube 视频、专用 App
- **Trigger**：冥想练习、尝试 40Hz 阿尔茨海默治疗
- **Hangout**：Reddit r/meditation, r/binaural, 冥想社区
- **Willingness**：中（愿意为无广告体验付费）

### 3.2 主力用户
**耳机/音箱测试者** — 搜索量最大，需求最明确，最容易触达。

---

## 4. 产品定位

### 4.1 竞争替代
- **Tier 1**：szynalski.com（极简但老旧）、onlinetonegenerator.com（功能全但杂乱）、hzgenerator.com（现代但功能浅）
- **Tier 2**：audiocheck.net（综合音频测试站）
- **Tier 3**：手机 App、硬件信号发生器、YouTube 测试视频

### 4.2 独有属性
| 属性 | 解决的问题 |
|------|-----------|
| 现代 UI/UX | 竞品界面老旧，用户体验差 |
| 首屏即工具 | 无需滚动即可使用 |
| 实时频谱可视化 | 竞品大多无可视化 |
| 移动端优先 | 60%+ 用户用手机 |
| 深色模式 | 减少眼部疲劳 |
| SEO 页面矩阵 | 每个长尾词有独立落地页 |
| 无广告干扰（Pro） | 竞品广告多，体验差 |

### 4.3 定位语句

```
FOR 耳机爱好者、音频测试者、学生
WHO 需要快速生成特定频率测试音频
ToneGen IS A 在线音频频率发生器
THAT 用现代设计、实时可视化、移动端优化，提供零摩擦的测试体验
UNLIKE onlinetonegenerator.com（广告多、界面杂乱）和 szynalski.com（老旧、功能少）
ToneGen 提供干净、快速、美观的音频生成工具，无需下载、无需注册、3 秒出结果
```

### 4.4 消息层级

| 层级 | 内容 |
|------|------|
| Headline | "Free Online Tone Generator — Test Your Headphones in Seconds" |
| Subhead | "Generate precise sine, square, triangle & sawtooth waves from 1Hz to 20kHz. No download. No signup. Works on any device." |
| Benefits | 1. Instant testing — hear any frequency in 1 click<br>2. Works everywhere — phone, tablet, desktop<br>3. Visual feedback — see the waveform in real time<br>4. Completely free — no credit card required |
| Features | 4 waveforms, 1Hz–20kHz range, volume control, frequency slider, keyboard shortcuts, dark mode, mobile optimized |
| Proof | "Trusted by 10,000+ users monthly" / "Works in all modern browsers" |

### 4.5 差异化优先级
1. **更聚焦的单点定位** — 不做大而全，先把核心发生器做到极致
2. **更清楚的场景切入** — 每个场景有独立页面（耳机测试、听力测试、调音）
3. **更低摩擦的免费使用** — 首屏即工具，无需注册
4. **更强的 SEO 页面结构** — 每个长尾词一个独立页面
5. **更现代的视觉设计** — 深色模式、流畅动画、移动端优先

---

## 5. 功能规划

### 5.1 P0（首版必做，2-3 周）

#### 核心工具
- [ ] 频率发生器（1Hz – 20,000Hz）
- [ ] 4 种波形：正弦波、方波、三角波、锯齿波
- [ ] 频率滑块 + 精确数字输入
- [ ] 音量控制（0-100%）
- [ ] 播放/暂停/停止
- [ ] 实时波形可视化（Canvas）
- [ ] 键盘快捷键（Space 播放/暂停，←→ 调频）
- [ ] URL 参数分享（?freq=440&waveform=sine）

#### 首页
- [ ] Hero 区域嵌入工具
- [ ] 使用场景卡片（耳机测试、听力测试、调音、冥想）
- [ ] How It Works（3 步流程）
- [ ] FAQ（5-8 个常见问题）
- [ ] SEO 文本区域

#### SEO 场景页（5 个）
- [ ] /white-noise — 白噪声生成器
- [ ] /binaural-beats — 双耳节拍生成器
- [ ] /hearing-test — 在线听力测试
- [ ] /speaker-test — 音箱/低音炮测试
- [ ] /tuning — 乐器调音

#### 基础设施
- [ ] 响应式设计（移动端优先）
- [ ] 深色模式（默认）
- [ ] Google Analytics 4
- [ ] Privacy Policy / Terms
- [ ] Core Web Vitals 优化
- [ ] 静态导出（Cloudflare Pages）

### 5.2 P1（上线后 1-2 月）
- [ ] 噪声生成器（白/粉/棕噪声）
- [ ] 双耳节拍生成器
- [ ] 频率扫描（自动从低到高）
- [ ] 预设频率库（A4=440Hz, 432Hz, 常见测试频率）
- [ ] 博客系统（3-5 篇种子文章）
- [ ] 多语言支持（中文、西班牙语）
- [ ] Pro 版本（去广告 + 高级波形 + 导出）

### 5.3 NOT-DO（明确不做）
- ❌ 音频素材库/下载站（版权风险）
- ❌ 用户上传/UGC（DMCA 责任）
- ❌ 社交/社区功能（偏离核心）
- ❌ 移动端原生 App（先 Web）
- ❌ 后端服务器/用户账户（纯前端优先）
- ❌ 实时协作/分享社区
- ❌ AI 生成内容（无关）
- ❌ 复杂 DAW 功能（不是目标）

---

## 6. 页面信息架构

### 6.1 首页结构

```
1. Hero（首屏）
   ├── 大标题："Free Online Tone Generator"
   ├── 副标题："Test headphones, tune instruments, match tinnitus frequencies — instantly"
   ├── 核心工具面板（频率输入 + 波形选择 + 播放按钮 + 音量 + 可视化）
   └── 信任标识："No signup · Works on mobile · 100% free"

2. Use Cases（3-4 个场景卡片）
   ├── 🎧 Test Your Headphones — /speaker-test
   ├── 🧠 Match Tinnitus Frequency — /hearing-test
   ├── 🎵 Tune Your Instrument — /tuning
   └── 🧘 Meditation & Focus — /binaural-beats

3. How It Works（3 步）
   ├── Step 1: Set frequency — drag slider or type number
   ├── Step 2: Choose waveform — sine, square, triangle, sawtooth
   └── Step 3: Click play — hear the tone instantly

4. Features（功能亮点）
   ├── 4 Waveforms
   ├── 1Hz – 20kHz Range
   ├── Real-time Visualization
   ├── Mobile Optimized
   └── Dark Mode

5. FAQ（8 个问题）
   ├── What is a tone generator?
   ├── Is it safe for my ears?
   ├── Can I use it to test headphones?
   ├── What frequency can humans hear?
   ├── What's the difference between waveforms?
   ├── Can I use it for tinnitus?
   ├── Does it work on iPhone/Android?
   └── Is it really free?

6. Footer CTA
   └── "Start generating tones now →"（回到 Hero 工具）
```

### 6.2 SEO 页面矩阵

| 页面 | URL | 目标关键词 | 目的 | 优先级 |
|------|-----|-----------|------|--------|
| 首页 | / | tone generator, online tone generator | 转化 | P0 |
| 白噪声 | /white-noise | white noise generator | SEO+转化 | P0 |
| 双耳节拍 | /binaural-beats | binaural beats generator | SEO+转化 | P0 |
| 听力测试 | /hearing-test | hearing test tone, tinnitus frequency | SEO+转化 | P0 |
| 音箱测试 | /speaker-test | speaker test tone, subwoofer test | SEO+转化 | P0 |
| 调音 | /tuning | instrument tuning, 440hz tuning | SEO+转化 | P0 |
| 博客-什么是 | /blog/what-is-tone-generator | what is a tone generator | 引流 | P1 |
| 博客-如何测试耳机 | /blog/how-to-test-headphones | how to test headphones | 引流 | P1 |
| 博客-频率指南 | /blog/audio-frequency-guide | audio frequency range | 引流 | P1 |
| 博客-波形区别 | /blog/waveform-types | sine vs square wave | 引流 | P1 |
| 竞品对比 | /vs/onlinetonegenerator | onlinetonegenerator alternative | 截流 | P2 |

---

## 7. 定价设计

### 7.1 竞品价格锚点
| 竞品 | 模式 | 价格 |
|------|------|------|
| szynalski.com | 捐赠 | 任意 |
| onlinetonegenerator.com | 广告 + 捐赠 | 免费 |
| hzgenerator.com | 广告 | 免费 |
| Tone Generator Pro (App) | 一次性 | $2.99 |
| SignalScope (App) | 一次性 | $14.99 |

### 7.2 定价方案

**Free（免费版）**
- 核心频率发生器（全部功能）
- 4 种波形
- 基础可视化
- 有广告（非侵入式，底部横幅）

**Pro（$4.99/月 或 $29.99/终身）**
- 去广告
- 高级波形（脉冲波、噪声波形）
- 录音/导出 WAV
- 频率扫描模式
- 保存预设
- 优先支持

**为什么不免费限制功能？**
- 工具站的核心价值是"能用"，限制功能会降低 SEO 价值
- 广告足以覆盖成本，Pro 是增值服务
- 参考 onlinetonegenerator.com 模式：全功能免费 + 广告

### 7.3 成本验算
- 开发成本：2-3 周（1 人）
- 部署成本：Cloudflare Pages = $0
- 域名成本：~$10/年
- 广告收入预估：10,000 PV/月 × $2 RPM = $20/月（初期）
- 盈亏平衡点：~5,000 PV/月（很容易达到）

---

## 8. 域名与技术栈

### 8.1 域名候选

| 域名 | 状态 | 评价 |
|------|------|------|
| tonegenerator.org | 需查询 | 关键词强，.org 适合工具站，首选 |
| tonetool.net | 需查询 | 简洁，品牌感好 |
| audiogenerator.io | 需查询 | 现代感，适合品牌 |
| frequencygenerator.net | 需查询 | SEO 友好，长尾覆盖 |
| gettonegen.com | 需查询 | 品牌型，顺口 |
| tonelab.app | 需查询 | .app 适合工具，简洁 |

**推荐 Top 3：**
1. **tonegenerator.org** — 关键词精确匹配，.org 权威感，适合长期 SEO
2. **tonetool.net** — 短、顺口、好记，品牌潜力大
3. **frequencygenerator.net** — 覆盖 "frequency generator" 关键词，SEO 友好

### 8.2 技术栈
- **框架**：Next.js 14 (App Router) + TypeScript
- **样式**：Tailwind CSS + shadcn/ui
- **音频**：Web Audio API
- **可视化**：Canvas API
- **部署**：Cloudflare Pages（静态导出）
- **分析**：Google Analytics 4 + Plausible（隐私友好）
- **SEO**：Next.js Metadata API + 结构化数据

---

## 9. GTM 策略

### 9.1 首发渠道
1. **Product Hunt** — 工具类产品适合，准备截图+演示视频
2. **Reddit** — r/headphones, r/audiophile, r/webdev, r/SideProject
3. **Hacker News** — Show HN
4. **Twitter/X** — 音频/开发者社区

### 9.2 首周动作
- Day 1: Product Hunt 发布
- Day 2-3: Reddit 各子版块发帖
- Day 4: Hacker News Show HN
- Day 5-7: 收集反馈，修复 bug，回复评论

### 9.3 内容计划（前 3 月）
- Month 1: 发布 4 篇博客（什么是 tone generator、如何测试耳机、频率指南、波形类型）
- Month 2: 发布 4 篇博客（双耳节拍科普、听力测试方法、调音教程、音箱摆放）
- Month 3: 发布 4 篇博客（tinnitus 管理、40Hz 阿尔茨海默研究、音频设备推荐、FAQ 汇总）

---

## 10. 转化漏斗与埋点

| 事件 | 触发条件 | 用途 |
|------|---------|------|
| page_view | 页面加载 | 流量分析 |
| tool_play | 点击 Play | 核心功能使用 |
| tool_stop | 点击 Stop | 使用时长分析 |
| frequency_change | 调整频率 | 用户行为 |
| waveform_change | 切换波形 | 功能偏好 |
| cta_click | 点击场景卡片 | 导航转化 |
| upgrade_click | 点击 Pro 升级 | 付费意向 |
| checkout_start | 进入支付页 | 付费漏斗 |
| payment_success | 支付成功 | 收入追踪 |
| share_click | 点击分享 | 病毒传播 |

---

## 11. 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|---------|
| SEO 排名上不去 | 中 | 高 | 持续内容+外链；6 个月无起色则 pivot 到相邻关键词 |
| 竞争对手复制设计 | 高 | 中 | 持续迭代，建立品牌认知，社区运营 |
| 浏览器限制 Web Audio | 低 | 高 | 提供 fallback，监控兼容性，及时修复 |
| 广告收入不及预期 | 中 | 中 | 优化广告位，增加 Pro 转化，联盟营销 |
| 移动端音频延迟 | 中 | 中 | 使用 Web Audio API 低延迟模式，测试多设备 |
| 法律风险（听力损伤） | 低 | 高 | 明确免责声明，音量警告，安全提示 |

---

## 12. 交接摘要

### 给文案
```
产品名：ToneGen（暂定）
定位语句：Free Online Tone Generator — Test Your Headphones in Seconds
Headline：Free Online Tone Generator — Test Your Headphones in Seconds
Subhead：Generate precise sine, square, triangle & sawtooth waves from 1Hz to 20kHz. No download. No signup. Works on any device.
核心 Benefits：
1. Instant testing — hear any frequency in 1 click
2. Works everywhere — phone, tablet, desktop
3. Visual feedback — see the waveform in real time
4. Completely free — no credit card required
FAQ 必须覆盖：安全性、耳机测试、耳鸣、移动端、免费、波形区别
不能把产品说成：医疗设备、专业音频软件、硬件替代
CTA 格式：动词 + 结果（如 "Test your headphones now"）
```

### 给设计
```
首页结构：Hero（工具嵌入）→ Use Cases → How It Works → Features → FAQ → Footer CTA
首屏重点：频率发生器工具面板必须首屏可见，无需滚动
核心交互：播放/暂停、频率滑块、波形切换、音量控制
视觉参考：深色模式为主，类似 Linear.app 的简洁风格，青色/紫色主色调
移动端要求：所有控件拇指可操作，频率输入用数字键盘
不需要设计：用户账户页、社交功能、复杂仪表盘
```

### 给开发
```
技术栈建议：Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
P0 功能：频率发生器（4波形）、音量控制、频率滑块、Canvas可视化、键盘快捷键、5个SEO页面
P1 功能：噪声生成、双耳节拍、频率扫描、博客系统、Pro版本
API 链路：纯前端，无后端API。音频用 Web Audio API，可视化用 Canvas
数据结构：频率状态（number）、波形类型（enum）、音量（number）、播放状态（boolean）
NOT-DO：后端服务器、用户认证、数据库、文件上传、UGC
验收标准：
- 频率范围 1Hz-20kHz 准确
- 4 种波形正确生成
- 移动端可正常使用
- Lighthouse 性能评分 >90
- Core Web Vitals 全部通过
```

---

*PRD Version: 2.0*
*Created: 2025-01-XX*
*Status: Ready for Development*
