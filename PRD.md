# Tone Generator - Product Requirements Document

## 1. 产品概述

### 1.1 产品定位
一个现代化的在线音频 tone generator 工具站，面向需要生成测试音、实验音、白噪声等音频的用户。

### 1.2 目标用户
- 测试耳机/音箱的用户 (40%)
- 做听力测试的用户 (25%)
- 音频学习/实验的学生 (20%)
- 冥想/治疗用途 (10%)
- 其他 (5%)

### 1.3 核心关键词
| 关键词 | 美国搜索量 | KD |
|--------|-----------|-----|
| tone generator | 18,000 | 51 |
| online tone generator | 11,000 | 45 |
| frequency generator | 8,000 | 42 |
| white noise generator | 9,000 | 48 |
| binaural beats generator | 7,800 | 44 |

---

## 2. 功能需求

### 2.1 MVP 功能 (Phase 1)

#### 核心功能：频率发生器
- [ ] 频率滑块：20Hz - 20,000Hz
- [ ] 精确输入框：可手动输入频率值
- [ ] 播放/暂停按钮
- [ ] 音量控制

#### 波形选择
- [ ] 正弦波 (Sine)
- [ ] 方波 (Square)
- [ ] 三角波 (Triangle)
- [ ] 锯齿波 (Sawtooth)

#### 基础 UI
- [ ] 深色模式（默认）
- [ ] 响应式设计（移动端优先）
- [ ] 现代简洁界面

### 2.2 Phase 2 功能

#### 噪声生成
- [ ] 白噪声 (White Noise)
- [ ] 粉红噪声 (Pink Noise)
- [ ] 棕噪声 (Brown Noise)

#### 频谱可视化
- [ ] 实时波形显示
- [ ] 频谱分析图

#### 预设模式
- [ ] 听力测试模式
- [ ] 音箱测试模式
- [ ] 冥想模式（binaural beats）

#### 高级功能
- [ ] 键盘快捷键（空格播放/暂停，方向键调频）
- [ ] 频率扫描（自动从低到高）
- [ ] 双声道独立控制

### 2.3 Phase 3 功能

- [ ] 录音/导出功能（WAV）
- [ ] 保存预设
- [ ] URL 分享（带参数）
- [ ] 全屏模式

---

## 3. 技术架构

### 3.1 技术栈
- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **音频**: Web Audio API
- **可视化**: Canvas API
- **部署**: Cloudflare Pages
- **分析**: Google Analytics 4

### 3.2 核心算法

```typescript
// 音频上下文初始化
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 振荡器创建
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // 'sine' | 'square' | 'triangle' | 'sawtooth'
oscillator.frequency.value = 440; // Hz

// 增益节点（音量控制）
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5;

// 连接
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// 播放
oscillator.start();

// 停止
oscillator.stop();
```

### 3.3 噪声生成算法

```typescript
// 白噪声
const bufferSize = audioContext.sampleRate * 2;
const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const data = buffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  data[i] = Math.random() * 2 - 1;
}
```

---

## 4. 页面结构

### 4.1 首页 (/)
- Hero 区域：大标题 + 主要控制面板
- 功能介绍卡片
- 使用场景说明
- FAQ 区域

### 4.2 工具页面
- /tone-generator - 主工具页
- /white-noise - 白噪声
- /pink-noise - 粉红噪声
- /binaural-beats - 双耳节拍
- /hearing-test - 听力测试

### 4.3 内容页面
- /blog - 博客列表
- /blog/what-is-tone-generator - 什么是 tone generator
- /blog/how-to-test-headphones - 如何测试耳机
- /blog/frequency-range-guide - 频率范围指南

---

## 5. SEO 策略

### 5.1 页面标题模板
- 首页: "Tone Generator - Free Online Frequency Generator | [Brand]"
- 工具页: "[功能] Generator - Free Online [功能] | [Brand]"
- 博客: "[标题] | [Brand]"

### 5.2 Meta 描述模板
- 首页: "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 20Hz to 20kHz. Perfect for testing headphones, speakers, and hearing."

### 5.3 结构化数据
- WebApplication schema
- FAQPage schema
- HowTo schema（听力测试指南）

### 5.4 技术 SEO
- Core Web Vitals 优化
- 懒加载非关键资源
- 预加载音频上下文
- 静态生成所有页面

---

## 6. UI/UX 设计

### 6.1 设计原则
- 深色模式为主（减少眼部疲劳）
- 大按钮、易触控
- 实时反馈（播放状态可视化）
- 无障碍支持（ARIA 标签）

### 6.2 色彩方案
```
背景: #0a0a0f (深蓝黑)
主色: #00d4ff (青色)
次色: #7c3aed (紫色)
文字: #e2e8f0 (浅灰)
强调: #f59e0b (琥珀色)
```

### 6.3 布局
```
+------------------+
|     Header       |
+------------------+
|                  |
|  Frequency       |
|  Display         |
|  (Large)         |
|                  |
+------------------+
|  Waveform        |
|  Buttons         |
+------------------+
|  Play/Pause      |
|  Volume          |
+------------------+
|  Frequency       |
|  Slider          |
+------------------+
|  Presets         |
+------------------+
|  Visualizer      |
+------------------+
|  Info/SEO Text   |
+------------------+
|     Footer       |
+------------------+
```

---

## 7. 变现策略

### 7.1 Phase 1: 广告
- Google AdSense
- 位置：侧边栏、底部

### 7.2 Phase 2: 高级功能
- 更多波形类型
- 录音导出（WAV/MP3）
- 无广告体验
- 价格: $4.99/月 或 $29.99/年

### 7.3 Phase 3: 联盟营销
- 推荐耳机、音箱
- 音频设备联盟链接

---

## 8. 开发计划

### Phase 1: MVP (1-2 周)
- [ ] 项目初始化
- [ ] 核心音频引擎
- [ ] 基础 UI
- [ ] 部署上线

### Phase 2: 功能扩展 (2-4 周)
- [ ] 噪声生成
- [ ] 频谱可视化
- [ ] 预设模式
- [ ] SEO 优化

### Phase 3: 增长 (持续)
- [ ] 博客内容
- [ ] 外链建设
- [ ] 高级功能
- [ ] 变现优化

---

## 9. 成功指标

| 指标 | 3个月 | 6个月 | 12个月 |
|------|-------|-------|--------|
| 月访问量 | 1,000 | 5,000 | 20,000 |
| 自然搜索流量 | 30% | 50% | 70% |
| 用户停留时间 | 2分钟 | 3分钟 | 4分钟 |
| 回访率 | 10% | 15% | 20% |
| 月收入 | $0 | $50 | $500 |

---

## 10. 风险与应对

| 风险 | 概率 | 影响 | 应对 |
|------|------|------|------|
| SEO 排名上不去 | 中 | 高 | 持续内容+外链，6个月无起色则 pivot |
| 竞争对手复制 | 高 | 中 | 持续迭代，建立品牌 |
| 浏览器限制 Web Audio | 低 | 高 | 提供 fallback，监控兼容性 |
| 变现不及预期 | 中 | 中 | 降低广告密度，优化用户体验 |

---

## 11. 域名与品牌

### 推荐域名
1. tonegenerator.org（首选）
2. tonetool.net
3. audiogenerator.io
4. frequencygenerator.net

### 品牌名
- ToneGen
- AudioLab
- SoundWave
- Frequency

---

*PRD Version: 1.0*
*Created: 2025-01-XX*
*Status: Draft*
