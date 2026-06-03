# Stitch Prompt — Tone Generator Landing Page (Mobile)

Design a dark-theme mobile landing page for **Tone Generator** — a free online tone generator for testing headphones, tuning instruments, and generating precise audio frequencies from 1Hz to 20kHz.

Target users: Headphone testers, tinnitus matchers, audio experimenters, meditation users — all on mobile devices.

Design vibe: **Industrial / Technical / Precise**
Keywords: precise, trustworthy, mobile-first, clean

Typography:
Use **Space Grotesk** for headings.
Use **DM Sans** for body text.
Use **JetBrains Mono** for frequency numbers.
Do not use Inter, Roboto, Arial.

Color scheme:
Background: `#08080F`
Surface: `#0F0F1A`
Primary accent: `#00E5CC`
CTA / highlight: `#FFBF00`
Text primary: `#E8ECF0`
Text secondary: `#6B7280`
Border: `#1E1E2E`

Device: Mobile, 375px width. Single column. No horizontal overflow.
Touch targets: minimum 44x44px.

---

## 1. NAVIGATION

Fixed top nav, height 56px, background `#08080F` with bottom border `#1E1E2E`.
- Left: Logo icon (waveform SVG, `#00E5CC`, 28px) only — no wordmark on mobile
- Right: Hamburger menu icon (Lucide Menu, `#E8ECF0`)
- CTA hidden in nav on mobile (moved to Hero)

Mobile menu (fullscreen overlay):
- bg `#08080F`, full screen
- Close button top right (Lucide X)
- Links: Product, Pricing, FAQ, Blog — Space Grotesk 24px, `#E8ECF0`, stacked, padding 24px each
- CTA at bottom: "Start Testing — Free" — bg `#FFBF00`, text `#08080F`, full width minus 32px margin, padding 16px, border-radius 12px

---

## 2. HERO SECTION

Padding: 80px top (below nav) / 48px bottom.
Single column, centered.

- Eyebrow: "FREE ONLINE TOOL" — JetBrains Mono 11px, `#00E5CC`, centered
- Headline: "Generate Any Frequency in Seconds" — Space Grotesk 32px, weight 700, `#E8ECF0`, centered, line-height 1.2
- Subheadline: "Test headphones, tune instruments, match tinnitus tones — all in your browser." — DM Sans 16px, `#6B7280`, centered, line-height 1.5, max-width 320px, margin 0 auto
- Primary CTA: "Start Testing — Free" — bg `#FFBF00`, text `#08080F`, full width minus 32px, padding 16px, border-radius 12px, font-weight 600, Space Grotesk 16px, margin-top 24px
- Trust line: "No signup · Works on mobile · 100% free" — JetBrains Mono 11px, `#6B7280`, centered, margin-top 12px

**Embedded Tool (below CTA, margin-top 32px):**
Full width minus 16px margin, bg `#0F0F1A`, border-radius 16px, border 1px `#1E1E2E`.

Tool layout (stacked vertically):
- Canvas waveform: height 100px, full width, border-radius 12px 12px 0 0
- Frequency display: "440" — JetBrains Mono 56px, `#E8ECF0`, centered
- "Hz" label: DM Sans 14px, `#6B7280`
- Frequency slider: full width, height 6px, track `#1E1E2E`, thumb `#00E5CC`
- Frequency input: centered, bg `#1E1E2E`, border-radius 8px, width 120px, text centered
- Waveform buttons: 2x2 grid, gap 8px
  - Each: bg `#1E1E2E`, text `#6B7280`, border-radius 10px, padding 12px, font-size 14px
  - Active: bg `#00E5CC`, text `#08080F`
- Volume: label + slider + percentage, horizontal row
- Play/Stop button: full width, padding 16px, border-radius 12px
  - Stopped: bg `#00E5CC`, text `#08080F`
  - Playing: bg `#FF4D4D`, text `#FFFFFF`
- Keyboard hint: hidden on mobile (no physical keyboard)

---

## 3. HOW IT WORKS

Padding: 64px vertical.

- Eyebrow: "HOW IT WORKS" — JetBrains Mono 11px, `#00E5CC`, centered
- Title: "Three Steps to Any Tone" — Space Grotesk 28px, `#E8ECF0`, centered

3 cards, stacked vertically, gap 16px:
Each card: bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px, padding 24px.
- Step number: "01" — JetBrains Mono 36px, `#00E5CC` at 20% opacity
- Title: Space Grotesk 18px, `#E8ECF0`
- Description: DM Sans 15px, `#6B7280`

---

## 4. USE CASES

Padding: 64px vertical.

- Eyebrow: "USE CASES" — JetBrains Mono 11px, `#00E5CC`, centered
- Title: "What Will You Test?" — Space Grotesk 28px, `#E8ECF0`, centered

3 cards, stacked vertically, gap 16px:
Each card: bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px, padding 24px.
- Label tag: bg `#00E5CC` at 10%, text `#00E5CC`, padding 4px 10px, border-radius 6px, JetBrains Mono 10px uppercase
- Title: Space Grotesk 20px, `#E8ECF0`
- Before/After/Bridge: DM Sans 15px, `#6B7280` / `#E8ECF0` / `#00E5CC`

Medical disclaimer: DM Sans 12px, `#6B7280`, italic, padding 16px.

---

## 5. FEATURES

Padding: 64px vertical.

- Eyebrow: "FEATURES" — JetBrains Mono 11px, `#00E5CC`, centered
- Title: "Built for Precision" — Space Grotesk 28px, `#E8ECF0`, centered

Single column, stacked cards, gap 16px:
Each card: bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px, padding 24px.
- Icon: Lucide line icon, `#00E5CC`, 24px
- Title: Space Grotesk 18px, `#E8ECF0`
- Description: DM Sans 15px, `#6B7280`

Cards:
1. Full 1Hz–20kHz Range (include frequency bar graphic)
2. Real-Time Waveform Visualization (include mock waveform)
3. Mobile-First Design
4. URL Sharing
5. Pro Features

---

## 6. PRICING

Padding: 64px vertical.

- Eyebrow: "PRICING" — JetBrains Mono 11px, `#00E5CC`, centered
- Title: "Simple Pricing" — Space Grotesk 28px, `#E8ECF0`, centered

3 cards, stacked vertically, gap 16px:

Card 1 — Free:
- bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px, padding 24px
- "Free" — Space Grotesk 22px
- "$0 / forever" — Space Grotesk 36px + DM Sans 14px
- Feature list: DM Sans 14px, `#6B7280`, checkmarks in `#00E5CC`
- CTA: "Start Testing — Free" — border `#E8ECF0`, text `#E8ECF0`, full width, padding 14px, border-radius 12px

Card 2 — Pro (HIGHLIGHTED):
- bg `#0F0F1A`, border 2px `#FFBF00`, border-radius 16px, padding 24px
- "MOST POPULAR" badge: bg `#FFBF00`, text `#08080F`, JetBrains Mono 10px, padding 4px 10px, border-radius 6px
- "Pro" — Space Grotesk 22px
- "$4.99 / month" — Space Grotesk 36px + DM Sans 14px
- Feature list + Pro extras
- CTA: "Go Pro" — bg `#FFBF00`, text `#08080F`, full width, padding 14px, border-radius 12px, font-weight 600

Card 3 — Lifetime:
- bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px, padding 24px
- "Lifetime" — Space Grotesk 22px
- "$29.99 one-time" — Space Grotesk 36px + DM Sans 14px
- CTA: "Claim Lifetime" — border `#00E5CC`, text `#00E5CC`, full width

Trust line: "Cancel anytime · 14-day refund" — DM Sans 13px, `#6B7280`, centered, margin-top 16px

---

## 7. FAQ

Padding: 64px vertical.

- Eyebrow: "FAQ" — JetBrains Mono 11px, `#00E5CC`, centered
- Title: "Common Questions" — Space Grotesk 28px, `#E8ECF0`, centered

Accordion, full width minus 16px margin:
Each item: bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 12px, margin-bottom 10px.
- Question: Space Grotesk 16px, `#E8ECF0`, padding 20px
- Chevron right, rotates on open
- Answer: DM Sans 15px, `#6B7280`, padding 0 20px 20px

8 questions (same as desktop).

---

## 8. FINAL CTA

Padding: 80px vertical.
Background: gradient from `#08080F` to `#0A1518`.

Centered:
- Headline: "You already know what frequency you need." — Space Grotesk 28px, `#E8ECF0`, centered
- Subtext: "Find a tool that works instantly, without ads, on your phone." — DM Sans 16px, `#6B7280`, centered, margin-top 16px
- CTA: "Start Testing — Free" — bg `#FFBF00`, text `#08080F`, full width minus 32px, padding 16px, border-radius 12px, font-weight 600, margin-top 32px
- Trust line: "No signup · No download" — JetBrains Mono 11px, `#6B7280`, margin-top 12px

---

## 9. FOOTER

Padding: 48px vertical.
Background: `#050508`.
Border-top: 1px `#1E1E2E`.

Single column, centered:
- Logo icon + "Tone Generator" — centered
- Links row 1: Features · Pricing · FAQ — DM Sans 14px, `#6B7280`
- Links row 2: Privacy · Terms · Cookies · Refund — DM Sans 14px, `#6B7280`
- "© 2026 Tone Generator" — JetBrains Mono 11px, `#4B5563`, margin-top 24px

---

## Mobile-Specific Constraints

- Headlines max 2 lines. If longer, reduce font size.
- All buttons full width with 16px side margins.
- Cards stack vertically. No multi-column layouts.
- Touch targets minimum 44x44px.
- No horizontal overflow at 375px.
- Keyboard shortcuts hidden (mobile has no physical keyboard).
- Tool panel takes full width, no side padding inside.
- Reduce decorative elements — mobile needs density control.
- FAQ accordion starts collapsed to save space.
