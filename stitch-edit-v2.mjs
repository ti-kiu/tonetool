import { stitch } from '/root/node_modules/@google/stitch-sdk/dist/src/index.js';

async function main() {
  try {
    console.log('Loading v2 project...');
    
    const project = stitch.project('14230594293766437443');
    console.log('Project loaded: ' + project.id);

    // 获取 screens
    console.log('Listing screens...');
    const screens = await project.screens();
    console.log('Found ' + screens.length + ' screens');
    
    if (screens.length === 0) {
      console.log('No screens found');
      return;
    }
    
    const screen = screens[0];
    console.log('Editing screen: ' + screen.id);

    const editPrompt = 'Refine this landing page with these exact specifications:\n\n' +
      'COLORS (use exact hex):\n' +
      '- Background: #08080F\n' +
      '- Surface: #0F0F1A\n' +
      '- Primary accent: #00E5CC\n' +
      '- CTA: #FFBF00\n' +
      '- Text primary: #E8ECF0\n' +
      '- Text secondary: #6B7280\n' +
      '- Border: #1E1E2E\n\n' +
      'FONTS:\n' +
      '- Headings: Space Grotesk, weight 700\n' +
      '- Body: DM Sans, weight 400\n' +
      '- Numbers: JetBrains Mono\n' +
      '- NO Material Symbols\n\n' +
      'NAVIGATION:\n' +
      '- Fixed top, height 64px\n' +
      '- Left: waveform icon + "Tone Generator" wordmark\n' +
      '- Center: Product, Pricing, FAQ, Blog links\n' +
      '- Right: "Start Testing — Free" button in amber #FFBF00\n\n' +
      'HERO (split 45/55):\n' +
      '- Left: Eyebrow "FREE ONLINE TOOL" in #00E5CC, Headline "Generate Any Frequency in Seconds", Subheadline, CTA button\n' +
      '- Right: Tool panel with waveform canvas, frequency display "440 Hz", slider, 4 waveform buttons, volume, play/stop\n\n' +
      'HOW IT WORKS: 3 cards - Set Frequency, Pick Waveform, Hit Play\n\n' +
      'USE CASES: 3 cards - Test Headphones, Describe Tinnitus, Tune Instruments\n\n' +
      'FEATURES: Bento grid - Full Range, Waveform Viz, Mobile Design, URL Sharing, Pro Features\n\n' +
      'PRICING: 3 tiers - Free $0, Pro $4.99/month (highlighted), Lifetime $29.99\n\n' +
      'FAQ: 8 accordion questions about the tool\n\n' +
      'FINAL CTA: "You already know what frequency you need to hear."\n\n' +
      'FOOTER: 4 columns\n\n' +
      'Generate complete React + Tailwind CSS.';

    console.log('Sending edit request (this may take 2-3 minutes)...');
    const editedScreen = await screen.edit(editPrompt);
    console.log('Screen edited: ' + editedScreen.id);

    const htmlUrl = await editedScreen.getHtml();
    console.log('HTML: ' + htmlUrl);

    const imageUrl = await editedScreen.getImage();
    console.log('Image: ' + imageUrl);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code) console.error('Code:', error.code);
    process.exit(1);
  }
}

main();
