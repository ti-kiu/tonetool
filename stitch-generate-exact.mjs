import { stitch } from './node_modules/@google/stitch-sdk/dist/src/index.js';

async function main() {
  try {
    console.log('Creating project...');
    
    const project = await stitch.createProject("Tone Generator Landing Page");
    console.log(`Project created: ${project.id}`);

    const prompt = `Design a dark-theme landing page for "Tone Generator" (tonetool.org) — a free online audio frequency generator tool.

EXACT BRANDING:
- Brand name: "Tone Generator" (NOT "Precise Audio" or anything else)
- Logo: simple waveform icon in cyan #00E5CC + "Tone Generator" text
- Tagline: "Generate Any Frequency in Seconds"

EXACT COLOR SCHEME (use these exact hex values):
- Background: #08080F
- Surface/card bg: #0F0F1A
- Primary accent: #00E5CC (cyan)
- CTA button: #FFBF00 (amber/gold)
- Text primary: #E8ECF0
- Text secondary: #6B7280
- Border: #1E1E2E

EXACT SECTIONS (in this order):

1. NAVIGATION: Fixed top bar. Left: waveform icon + "Tone Generator". Center: Product, Pricing, FAQ, Blog links. Right: "Start Testing — Free" button in amber #FFBF00.

2. HERO: Split layout 45%/55%. Left: eyebrow "FREE ONLINE TOOL" in cyan, headline "Generate Any Frequency in Seconds", subheadline "Test headphones, tune instruments, match tinnitus tones — all in your browser. No download. No signup. Completely free.", amber CTA "Start Testing — Free", trust line "No signup required · Works on mobile · 100% free". Right: dark tool panel showing waveform visualization, frequency "440 Hz", slider, waveform buttons (Sine/Square/Triangle/Sawtooth), Play button.

3. HOW IT WORKS: 3 cards. "01 Set Your Frequency" — "Drag the slider or type any value from 1Hz to 20,000Hz." "02 Pick Your Waveform" — "Choose sine, square, triangle, or sawtooth." "03 Hit Play" — "Hear the tone instantly. Adjust volume anytime. Share settings via URL."

4. USE CASES: 3 cards. "Test Your New Headphones", "Describe Tinnitus to Your Doctor" (with medical disclaimer), "Tune Instruments Without Gear". Each has Before/After/Bridge text.

5. FEATURES: Bento grid. "Full 1Hz–20kHz Range", "Real-Time Waveform Visualization", "Mobile-First Design", "URL Sharing", "Pro Features".

6. PRICING: 3 cards. Free $0/forever, Pro $4.99/month (highlighted with "MOST POPULAR" badge in amber), Lifetime $29.99 one-time.

7. FAQ: 8 accordion questions about free usage, account, accuracy, medical use, data storage, cancellation, competitors, export.

8. FINAL CTA: "You already know what frequency you need to hear." with amber CTA.

9. FOOTER: 4 columns — Brand, Product links, Legal links, Contact.

FONTS: Space Grotesk headings, DM Sans body, JetBrains Mono for numbers.
STYLE: Industrial dark, technical, precise. No generic SaaS look.`;

    console.log('Generating screen (this may take 2-5 minutes)...');
    console.time('generate');
    const screen = await project.generate(prompt);
    console.timeEnd('generate');
    console.log(`Screen generated: ${screen.id}`);

    console.log('Getting HTML URL...');
    const htmlUrl = await screen.getHtml();
    console.log(`HTML: ${htmlUrl}`);

    console.log('Getting Image URL...');
    const imageUrl = await screen.getImage();
    console.log(`Image: ${imageUrl}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code) console.error('Code:', error.code);
    process.exit(1);
  }
}

main();
