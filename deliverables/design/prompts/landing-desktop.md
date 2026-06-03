# Stitch Prompt — Tone Generator Landing Page (Desktop)

Design a dark-theme landing page for **Tone Generator** — a free online tone generator for testing headphones, tuning instruments, and generating precise audio frequencies from 1Hz to 20kHz.

Target users:
- Headphone/speaker testers (40%) — need quick frequency response checks
- Hearing test/tinnitus matchers (25%) — need precise frequency identification
- Audio/electronics experimenters (20%) — need waveform variety
- Meditation/therapy users (10%) — need clean tones

Design vibe: **Industrial / Technical / Precise**
Keywords: precise, trustworthy, developer-first, clean, no-nonsense

Typography:
Use **Space Grotesk** for headings.
Use **DM Sans** for body text.
Use **JetBrains Mono** for frequency numbers and data display.
Do not use Inter, Roboto, Arial, or system default fonts.

Color scheme:
Background: `#08080F`
Surface: `#0F0F1A`
Primary accent: `#00E5CC`
CTA / highlight: `#FFBF00`
Text primary: `#E8ECF0`
Text secondary: `#6B7280`
Border: `#1E1E2E`

---

## 1. NAVIGATION

Fixed top nav, height 64px, background `#08080F` with subtle bottom border `#1E1E2E`.
- Left: Logo icon (simple waveform SVG in `#00E5CC`) + "Tone Generator" wordmark in Space Grotesk, weight 700
- Center: Links — Product, Pricing, FAQ, Blog — DM Sans 14px, `#6B7280`, hover `#E8ECF0`
- Right: Primary CTA button "Start Testing — Free" — bg `#FFBF00`, text `#08080F`, font-weight 600, padding 10px 20px, border-radius 12px

---

## 2. HERO SECTION

Full viewport height (100vh), split layout: left 45% / right 55%.

**Left side (copy):**
- Eyebrow text: "FREE ONLINE TOOL" — JetBrains Mono 12px, uppercase, tracking wide, `#00E5CC`
- Headline: "Generate Any Frequency in Seconds" — Space Grotesk 56px, weight 700, `#E8ECF0`, line-height 1.1
- Subheadline: "Test headphones, tune instruments, match tinnitus tones — all in your browser. No download. No signup. Completely free." — DM Sans 18px, `#6B7280`, line-height 1.6, max-width 480px
- Primary CTA: "Start Testing — Free" — bg `#FFBF00`, text `#08080F`, padding 16px 32px, border-radius 12px, font-weight 600, Space Grotesk 16px
- Secondary CTA: "See How It Works" — text `#00E5CC`, underline on hover, DM Sans 14px
- Trust line: "No signup required · Works on mobile · 100% free" — JetBrains Mono 12px, `#6B7280`, with dot separators

**Right side (embedded tool):**
- A dark panel (`#0F0F1A`, border-radius 20px, border 1px `#1E1E2E`) containing the tone generator interface:
  - Canvas waveform visualization at top (height 120px, full width, cyan waveform on dark background)
  - Large frequency display: "440" in JetBrains Mono 72px, `#E8ECF0`, with "Hz" label in `#6B7280` 16px
  - Frequency slider: range input, track `#1E1E2E`, thumb `#00E5CC`, height 6px
  - Waveform buttons: Sine / Square / Triangle / Sawtooth — pill-shaped, active state bg `#00E5CC` text `#08080F`, inactive bg `#1E1E2E` text `#6B7280`
  - Volume slider + percentage display
  - Large Play/Stop button: bg `#00E5CC` when stopped, bg `#FF4D4D` when playing, full width, border-radius 12px
  - Keyboard hint: "Space: Play/Stop · ← →: Adjust" — JetBrains Mono 11px, `#4B5563`

**Visual treatment:**
- Tool panel has subtle inner glow (box-shadow: inset 0 0 60px rgba(0, 229, 204, 0.03))
- Background has very subtle radial gradient from `#0F1720` center to `#08080F` edges
- No decorative illustrations — the tool IS the visual

---

## 3. HOW IT WORKS

Background: `#08080F`
Padding: 120px vertical

Section header:
- Eyebrow: "HOW IT WORKS" — JetBrains Mono 12px, `#00E5CC`
- Title: "Three Steps to Any Tone" — Space Grotesk 40px, `#E8ECF0`

3 cards in a row, gap 24px:
Each card: bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px, padding 32px
- Step number: "01" / "02" / "03" — JetBrains Mono 48px, weight 700, `#00E5CC` at 20% opacity
- Title: Space Grotesk 20px, `#E8ECF0`
- Description: DM Sans 16px, `#6B7280`

Card 1:
- Title: "Set Your Frequency"
- Description: "Drag the slider or type any value from 1Hz to 20,000Hz."

Card 2:
- Title: "Pick Your Waveform"
- Description: "Choose sine, square, triangle, or sawtooth — whatever your test needs."

Card 3:
- Title: "Hit Play"
- Description: "Hear the tone instantly. Adjust volume anytime. Share settings via URL."

---

## 4. USE CASES

Background: `#0A0A12` (slightly different shade for section separation)
Padding: 120px vertical

Section header:
- Eyebrow: "USE CASES" — JetBrains Mono 12px, `#00E5CC`
- Title: "What Will You Test?" — Space Grotesk 40px, `#E8ECF0`

3 cards, asymmetric layout:
- Card 1 (large, 60% width): Test Your New Headphones
- Card 2 (small, 40% width): Describe Tinnitus to Your Doctor
- Card 3 (full width below): Tune Instruments Without Gear

Each card structure:
- bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px
- Small label tag: bg `#00E5CC` at 10%, text `#00E5CC`, padding 4px 12px, border-radius 6px, JetBrains Mono 11px uppercase
- Title: Space Grotesk 24px, `#E8ECF0`
- "Before" paragraph: DM Sans 16px, `#6B7280`, prefixed with "Before:"
- "After" paragraph: DM Sans 16px, `#E8ECF0`, prefixed with "After:"
- "Bridge" paragraph: DM Sans 16px, `#00E5CC`

Card 1 label: "HEADPHONE TESTING"
Card 2 label: "HEARING CARE"
Card 3 label: "MUSIC & AUDIO"

Medical disclaimer (small text below Card 2): "Note: This is not a medical device. Use it to prepare for your appointment, not to self-diagnose." — DM Sans 12px, `#6B7280`, italic

---

## 5. FEATURES

Background: `#08080F`
Padding: 120px vertical

Section header:
- Eyebrow: "FEATURES" — JetBrains Mono 12px, `#00E5CC`
- Title: "Built for Precision" — Space Grotesk 40px, `#E8ECF0`

Bento Grid layout (2 columns, asymmetric):
- Row 1: Large card (spans 2 columns) — Full 1Hz–20kHz Range
- Row 2: Medium card (left) — Real-Time Waveform Visualization + Medium card (right) — Mobile-First Design
- Row 3: Medium card (left) — URL Sharing + Medium card (right) — Pro Features

Each card:
- bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px, padding 32px
- Icon: Lucide-style line icon in `#00E5CC`, 24px
- Title: Space Grotesk 20px, `#E8ECF0`
- Description: DM Sans 16px, `#6B7280`
- For visualization card: include a small mock Canvas waveform graphic (cyan line on dark)

Large card extra:
- Include a frequency range bar graphic: 1Hz ———— 20kHz with markers at 20Hz, 1kHz, 10kHz

---

## 6. PRICING

Background: `#0A0A12`
Padding: 120px vertical

Section header:
- Eyebrow: "PRICING" — JetBrains Mono 12px, `#00E5CC`
- Title: "Simple, Transparent Pricing" — Space Grotesk 40px, `#E8ECF0`

3 pricing cards, equal width, gap 24px:

Card 1 — Free:
- bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px
- Plan name: "Free" — Space Grotesk 24px, `#E8ECF0`
- Price: "$0" — Space Grotesk 48px, `#E8ECF0`
- Period: "/ forever" — DM Sans 16px, `#6B7280`
- Description: "Casual testing, headphone checks, quick frequency lookups"
- Feature list with checkmarks (Lucide check icon, `#00E5CC`):
  - All frequency generation (1Hz–20kHz)
  - 4 waveforms: sine, square, triangle, sawtooth
  - Real-time visualization
  - URL sharing
  - Mobile support
- CTA: "Start Testing — Free" — border 1px `#E8ECF0`, text `#E8ECF0`, bg transparent, full width, border-radius 12px

Card 2 — Pro (HIGHLIGHTED):
- bg `#0F0F1A`, border 2px `#FFBF00`, border-radius 16px
- "MOST POPULAR" badge: bg `#FFBF00`, text `#08080F`, JetBrains Mono 11px uppercase, padding 4px 12px, border-radius 6px, positioned at top center overlapping border
- Plan name: "Pro" — Space Grotesk 24px, `#E8ECF0`
- Price: "$4.99" — Space Grotesk 48px, `#E8ECF0`
- Period: "/ month" — DM Sans 16px, `#6B7280`
- Description: "Regular testers, audio professionals, students who need export"
- Feature list (all Free features +):
  - No ads
  - Advanced waveforms (pulse, noise)
  - Export audio as WAV
  - Frequency sweep mode
  - Save custom presets
- CTA: "Go Pro — $4.99/month" — bg `#FFBF00`, text `#08080F`, full width, border-radius 12px, font-weight 600

Card 3 — Lifetime:
- bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 16px
- Plan name: "Lifetime" — Space Grotesk 24px, `#E8ECF0`
- Price: "$29.99" — Space Grotesk 48px, `#E8ECF0`
- Period: "one-time" — DM Sans 16px, `#6B7280`
- Description: "Power users who want permanent access"
- Feature list (all Pro features +):
  - Lifetime updates
  - No recurring payments
- CTA: "Claim Lifetime Access" — border 1px `#00E5CC`, text `#00E5CC`, bg transparent, full width, border-radius 12px

Trust line below cards: "Cancel anytime via Creem Customer Portal · 14-day unconditional refund" — DM Sans 14px, `#6B7280`, centered

---

## 7. FAQ

Background: `#08080F`
Padding: 120px vertical

Section header:
- Eyebrow: "FAQ" — JetBrains Mono 12px, `#00E5CC`
- Title: "Common Questions" — Space Grotesk 40px, `#E8ECF0`

Accordion style, max-width 800px, centered:
Each item:
- bg `#0F0F1A`, border 1px `#1E1E2E`, border-radius 12px, margin-bottom 12px
- Question: Space Grotesk 18px, `#E8ECF0`, padding 24px
- Chevron icon right side, rotates on open
- Answer: DM Sans 16px, `#6B7280`, padding 0 24px 24px, border-top 1px `#1E1E2E`

Questions (8 total):
1. Is it really free?
2. Do I need to create an account?
3. How accurate are the frequencies?
4. Can I use this for medical diagnosis?
5. Is my audio data stored?
6. What happens if I cancel Pro?
7. How is this different from onlinetonegenerator.com?
8. Can I export the audio?

---

## 8. FINAL CTA

Background: gradient from `#08080F` to `#0A1518` (subtle cyan tint)
Padding: 160px vertical

Centered layout:
- Headline: "You already know what frequency you need to hear." — Space Grotesk 48px, `#E8ECF0`, centered, max-width 600px
- Subtext: "The hard part is finding a tool that works instantly, doesn't bombard you with ads, and runs on your phone." — DM Sans 18px, `#6B7280`, centered, max-width 500px, margin-top 24px
- CTA: "Start Testing — Free" — bg `#FFBF00`, text `#08080F`, padding 18px 40px, border-radius 12px, font-weight 600, Space Grotesk 18px, margin-top 40px
- Trust line: "No signup · No download · Works on any device" — JetBrains Mono 12px, `#6B7280`, margin-top 16px

---

## 9. FOOTER

Background: `#050508`
Padding: 64px vertical
Border-top: 1px `#1E1E2E`

Layout: 4 columns

Col 1 — Brand:
- Logo icon + "Tone Generator" wordmark
- Tagline: "Precise audio frequencies in your browser." — DM Sans 14px, `#6B7280`

Col 2 — Product:
- Links: Features, Pricing, FAQ, Blog — DM Sans 14px, `#6B7280`, hover `#E8ECF0`

Col 3 — Legal:
- Links: Privacy Policy, Terms of Service, Cookie Policy, Refund Policy — DM Sans 14px, `#6B7280`, hover `#E8ECF0`

Col 4 — Contact:
- "[email placeholder]" — DM Sans 14px, `#6B7280`

Bottom bar:
- "© 2026 Tone Generator. All rights reserved." — JetBrains Mono 12px, `#4B5563`

---

## Design Constraints

- NOT a generic SaaS template.
- No purple-blue gradient on white background.
- No centered hero with generic 3-column features.
- No emoji icons; use Lucide-style line icons.
- Use asymmetric layout where appropriate.
- CTA must be the most visible element above the fold.
- Keep strong information hierarchy.
- Make the design look like a real brand, not AI-generated.
- Tool panel in Hero must look functional, not decorative.
- All frequency numbers use JetBrains Mono for technical credibility.
- Dark theme throughout — no light sections.
