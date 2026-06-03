import { stitch } from '/root/node_modules/@google/stitch-sdk/dist/src/index.js';

async function main() {
  try {
    console.log('Creating project for Mobile design...');
    
    const project = await stitch.createProject("Tone Generator Mobile Landing");
    console.log('Project created: ' + project.id);

    const prompt = 'Design a dark-theme MOBILE landing page for Tone Generator — a free online tone generator.\n\n' +
      '=== DEVICE ===\n' +
      'Mobile, 375px width. Single column. No horizontal overflow. Touch targets minimum 44x44px.\n\n' +
      '=== DESIGN SYSTEM ===\n' +
      '- Background: #08080F\n' +
      '- Surface: #0F0F1A\n' +
      '- Primary accent: #00E5CC\n' +
      '- CTA / highlight: #FFBF00\n' +
      '- Text primary: #E8ECF0\n' +
      '- Text secondary: #6B7280\n' +
      '- Border: #1E1E2E\n\n' +
      '=== TYPOGRAPHY ===\n' +
      '- Headings: Space Grotesk, weight 700\n' +
      '- Body: DM Sans, weight 400\n' +
      '- Numbers/data: JetBrains Mono\n' +
      '- NO Material Symbols, NO emoji\n\n' +
      '=== NAVIGATION ===\n' +
      '- Fixed top, height 56px, bg #08080F, border-bottom #1E1E2E\n' +
      '- Left: logo icon only (waveform SVG in #00E5CC, 28px)\n' +
      '- Right: hamburger menu icon\n' +
      '- CTA hidden in nav (moved to Hero)\n' +
      '- Mobile menu: fullscreen overlay with links and CTA at bottom\n\n' +
      '=== HERO SECTION ===\n' +
      '- Padding: 80px top, 48px bottom\n' +
      '- Single column, centered\n' +
      '- Eyebrow: "FREE ONLINE TOOL" — JetBrains Mono 11px, #00E5CC, centered\n' +
      '- Headline: "Generate Any Frequency in Seconds" — Space Grotesk 32px, #E8ECF0, centered\n' +
      '- Subheadline: "Test headphones, tune instruments, match tinnitus tones — all in your browser." — DM Sans 16px, #6B7280, centered\n' +
      '- CTA: "Start Testing — Free" — bg #FFBF00, text #08080F, full width minus 32px, padding 16px, border-radius 12px\n' +
      '- Trust line: "No signup · Works on mobile · 100% free" — JetBrains Mono 11px, #6B7280\n\n' +
      '=== EMBEDDED TOOL (below CTA) ===\n' +
      '- Full width minus 16px margin\n' +
      '- bg #0F0F1A, border-radius 16px, border 1px #1E1E2E\n' +
      '- Canvas waveform: height 100px, full width\n' +
      '- Frequency display: "440" — JetBrains Mono 56px, #E8ECF0, centered\n' +
      '- "Hz" label: DM Sans 14px, #6B7280\n' +
      '- Frequency slider: full width, height 6px\n' +
      '- Frequency input: centered, bg #1E1E2E, border-radius 8px, width 120px\n' +
      '- Waveform buttons: 2x2 grid, gap 8px\n' +
      '- Volume: label + slider + percentage, horizontal row\n' +
      '- Play/Stop button: full width, padding 16px, border-radius 12px\n' +
      '- Keyboard hints hidden on mobile\n\n' +
      '=== HOW IT WORKS ===\n' +
      '- Padding: 64px vertical\n' +
      '- 3 cards stacked vertically, gap 16px\n' +
      '- Each: bg #0F0F1A, border 1px #1E1E2E, border-radius 16px, padding 24px\n' +
      '- Step number: "01" — JetBrains Mono 36px, #00E5CC at 20% opacity\n' +
      '- Title: Space Grotesk 18px, #E8ECF0\n' +
      '- Description: DM Sans 15px, #6B7280\n\n' +
      '=== USE CASES ===\n' +
      '- Padding: 64px vertical\n' +
      '- 3 cards stacked vertically, gap 16px\n' +
      '- Each: bg #0F0F1A, border 1px #1E1E2E, border-radius 16px, padding 24px\n' +
      '- Label tag: bg #00E5CC at 10%, text #00E5CC, JetBrains Mono 10px uppercase\n' +
      '- Title: Space Grotesk 20px, #E8ECF0\n' +
      '- Before/After/Bridge: DM Sans 15px, #6B7280 / #E8ECF0 / #00E5CC\n' +
      '- Medical disclaimer: DM Sans 12px, #6B7280, italic\n\n' +
      '=== FEATURES ===\n' +
      '- Padding: 64px vertical\n' +
      '- Single column, stacked cards, gap 16px\n' +
      '- Each: bg #0F0F1A, border 1px #1E1E2E, border-radius 16px, padding 24px\n' +
      '- Icon: Lucide line icon, #00E5CC, 24px\n' +
      '- Title: Space Grotesk 18px, #E8ECF0\n' +
      '- Description: DM Sans 15px, #6B7280\n' +
      '- Cards: Full Range, Waveform Viz, Mobile Design, URL Sharing, Pro Features\n\n' +
      '=== PRICING ===\n' +
      '- Padding: 64px vertical\n' +
      '- 3 cards stacked vertically, gap 16px\n' +
      '- Free: "Free" — Space Grotesk 22px, "$0 / forever", feature list, CTA border #E8ECF0\n' +
      '- Pro: "MOST POPULAR" badge in #FFBF00, "$4.99 / month", CTA bg #FFBF00\n' +
      '- Lifetime: "$29.99 one-time", CTA border #00E5CC\n' +
      '- Trust line: "Cancel anytime · 14-day refund"\n\n' +
      '=== FAQ ===\n' +
      '- Padding: 64px vertical\n' +
      '- Accordion, full width minus 16px margin\n' +
      '- 8 questions, collapsed by default\n' +
      '- Each: bg #0F0F1A, border 1px #1E1E2E, border-radius 12px\n' +
      '- Question: Space Grotesk 16px, #E8ECF0\n' +
      '- Answer: DM Sans 15px, #6B7280\n\n' +
      '=== FINAL CTA ===\n' +
      '- Padding: 80px vertical\n' +
      '- Headline: "You already know what frequency you need." — Space Grotesk 28px, #E8ECF0\n' +
      '- CTA: "Start Testing — Free" — full width minus 32px, bg #FFBF00\n\n' +
      '=== FOOTER ===\n' +
      '- Padding: 48px vertical, bg #050508\n' +
      '- Single column, centered\n' +
      '- Logo + "Tone Generator"\n' +
      '- Links: Features · Pricing · FAQ\n' +
      '- Links: Privacy · Terms · Cookies · Refund\n' +
      '- "© 2026 Tone Generator"\n\n' +
      'Generate complete React + Tailwind CSS code for mobile.';

    console.log('Generating mobile screen (this will take 2-3 minutes)...');
    const screen = await project.generate(prompt);
    console.log('Screen generated: ' + screen.id);

    const htmlUrl = await screen.getHtml();
    console.log('HTML: ' + htmlUrl);

    const imageUrl = await screen.getImage();
    console.log('Image: ' + imageUrl);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code) console.error('Code:', error.code);
    process.exit(1);
  }
}

main();
