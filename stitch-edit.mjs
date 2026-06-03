import { stitch } from '/root/node_modules/@google/stitch-sdk/dist/src/index.js';

async function main() {
  try {
    console.log('Loading existing project...');
    
    // 使用 project(id) 方法获取已有项目
    const project = stitch.project('5988886597423221378');
    console.log(`Project loaded: ${project.id}`);

    // 列出所有 screens - 方法名是 screens()
    console.log('Listing screens...');
    const screens = await project.screens();
    console.log(`Found ${screens.length} screens`);
    
    if (screens.length === 0) {
      console.log('No screens found.');
      return;
    }
    
    const screen = screens[0];
    console.log(`Editing screen: ${screen.id}`);

    const editPrompt = `Refine this landing page design with these specific changes:

1. FONTS: Use Space Grotesk for all headings, DM Sans for body text, JetBrains Mono for numbers and data display. Remove Material Symbols font entirely.

2. HERO LAYOUT: Change to split layout - LEFT side 45% width for copy (eyebrow "FREE ONLINE TOOL", headline "Generate Any Frequency in Seconds", subheadline, CTA button), RIGHT side 55% width for the embedded tool panel.

3. TOOL PANEL: Dark card (#0F0F1A) with: waveform canvas visualization at top, large frequency display "440" with "Hz" label, frequency slider, 4 waveform buttons (Sine/Square/Triangle/Sawtooth), volume slider, Play/Stop button.

4. COLORS: Use exact hex values - Background #08080F, Surface #0F0F1A, Primary accent #00E5CC, CTA #FFBF00, Text primary #E8ECF0, Text secondary #6B7280, Border #1E1E2E.

5. NAVIGATION: Fixed top bar, height 64px. Left: logo icon + "Tone Generator" wordmark. Center: links (Product, Pricing, FAQ, Blog). Right: "Start Testing — Free" CTA button in amber #FFBF00.

6. HOW IT WORKS: 3 cards in a row. Step 01 "Set Your Frequency", Step 02 "Pick Your Waveform", Step 03 "Hit Play".

7. USE CASES: 3 cards - "Test Your New Headphones", "Describe Tinnitus to Your Doctor", "Tune Instruments Without Gear". Each with Before/After/Bridge text format.

8. FEATURES: Bento grid layout. Large card "Full 1Hz–20kHz Range", medium cards for "Real-Time Waveform Visualization", "Mobile-First Design", "URL Sharing", "Pro Features".

9. PRICING: 3 cards side by side. Free $0/forever, Pro $4.99/month (highlighted with "MOST POPULAR" badge in amber), Lifetime $29.99 one-time. Pro card has amber border.

10. FAQ: 8 accordion items - Is it really free? Do I need to create an account? How accurate are the frequencies? Can I use this for medical diagnosis? Is my audio data stored? What happens if I cancel Pro? How is this different from onlinetonegenerator.com? Can I export the audio?

11. FINAL CTA: Centered section with headline "You already know what frequency you need to hear." and "Start Testing — Free" button.

12. FOOTER: 4 columns - Brand, Product links, Legal links, Contact.

Generate complete React + Tailwind CSS code with all sections.`;

    console.log('Sending edit request (this may take 2-3 minutes)...');
    const editedScreen = await screen.edit(editPrompt);
    console.log(`Screen edited: ${editedScreen.id}`);

    console.log('Getting updated HTML URL...');
    const htmlUrl = await editedScreen.getHtml();
    console.log(`HTML: ${htmlUrl}`);

    console.log('Getting updated Image URL...');
    const imageUrl = await editedScreen.getImage();
    console.log(`Image: ${imageUrl}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code) console.error('Code:', error.code);
    if (error.stack) console.error('Stack:', error.stack);
    process.exit(1);
  }
}

main();
