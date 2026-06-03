# SEO Matrix Page Template Prompt

For each SEO keyword page, use this template. Reuse all design tokens from the homepage.

## Page Structure

```
1. NAVIGATION (same as homepage)
2. HERO (keyword-specific)
3. TOOL EMBED (the actual AudioEngine component)
4. USE CASES (keyword-specific)
5. RELATED FEATURES
6. FAQ (keyword-specific, 4-6 questions)
7. FINAL CTA (same as homepage)
8. FOOTER (same as homepage)
```

## Design Rules

- Same colors, fonts, spacing as homepage
- Hero headline must include the target keyword naturally
- Tool embed is identical to homepage (same component)
- FAQ questions must be specific to the keyword intent
- Internal link back to homepage and other SEO pages

## Example: /headphone-test

**Hero:**
- Headline: "Test Your Headphones with Precise Audio Tones"
- Subheadline: "Find dead spots, frequency drops, and distortion in any headphones. Generate test tones from 20Hz to 20kHz instantly."

**Use Cases:**
- New headphone quality check
- Left/right channel balance test
- Bass response evaluation

**FAQ:**
- What frequency should I test my headphones at?
- How do I know if my headphones have a dead driver?
- Can this damage my headphones?
- What's the difference between sine and square wave testing?

## SEO Pages to Create

| URL | Target Keyword | Headline |
|-----|---------------|----------|
| / | tone generator | Generate Any Frequency in Seconds |
| /headphone-test | headphone test | Test Your Headphones with Precise Audio Tones |
| /tinnitus-frequency | tinnitus frequency matcher | Match Your Tinnitus Frequency |
| /online-tone-generator | online tone generator | Free Online Tone Generator — 1Hz to 20kHz |
| /sine-wave-generator | sine wave generator | Generate Pure Sine Waves Instantly |
| /frequency-sweep | frequency sweep | Sweep Through Any Frequency Range |
| /instrument-tuner | instrument tuner | Tune Any Instrument Without Hardware |
| /subwoofer-test | subwoofer test | Test Your Subwoofer's Low Frequency Response |
| /hearing-test | hearing test | Check Your Hearing Range Online |
| /binaural-beats | binaural beats | Generate Binaural Beats for Focus & Sleep |
| /white-noise | white noise generator | Generate White, Pink & Brown Noise |
| /440hz | 440hz tone | 440Hz Tuning Tone — Standard A4 Reference |
| /432hz | 432hz tone | 432Hz Tone — Alternative Tuning Frequency |

## Mobile Rule

All SEO pages follow the same mobile rules as homepage:
- Single column
- Tool embed full width
- FAQ accordion collapsed by default
- CTA buttons full width
