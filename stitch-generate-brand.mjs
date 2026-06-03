import { stitch } from '/root/node_modules/@google/stitch-sdk/dist/src/index.js';

async function main() {
  try {
    console.log('Creating project for Brand Assets...');
    
    const project = await stitch.createProject("Tone Generator Brand Assets");
    console.log('Project created: ' + project.id);

    // 1. Logo
    console.log('\n=== Generating LOGO ===');
    const logoPrompt = 'Design a logo for "Tone Generator" — a free online audio frequency tool.\n\n' +
      'Requirements:\n' +
      '- Clean, modern, technical/industrial vibe\n' +
      '- Icon: abstract waveform or sine wave in cyan #00E5CC on dark bg #08080F\n' +
      '- Text: "Tone Generator" in Space Grotesk, weight 700, #E8ECF0\n' +
      '- Layout: icon left, text right\n' +
      '- Size: 200x48px for nav bar use\n' +
      '- Transparent background\n' +
      '- Minimal, no gradients, flat design\n' +
      '- The waveform should look precise and scientific, not playful\n\n' +
      'Generate as SVG or high-res PNG.';

    const logoScreen = await project.generate(logoPrompt);
    console.log('Logo screen: ' + logoScreen.id);
    const logoImage = await logoScreen.getImage();
    console.log('Logo Image: ' + logoImage);

    // 2. OG Image
    console.log('\n=== Generating OG IMAGE ===');
    const ogPrompt = 'Design an Open Graph (social media preview) image for "Tone Generator".\n\n' +
      'Requirements:\n' +
      '- Dimensions: 1200x630px (landscape)\n' +
      '- Dark theme: bg #08080F\n' +
      '- Large headline: "Generate Any Frequency in Seconds" — Space Grotesk 48px, #E8ECF0, centered\n' +
      '- Subheadline: "Free Online Tone Generator · No Signup Required" — DM Sans 24px, #6B7280\n' +
      '- Visual element: abstract waveform visualization in cyan #00E5CC across the bottom\n' +
      '- CTA badge: "100% FREE" — bg #FFBF00, text #08080F, rounded\n' +
      '- Clean, premium, developer-tool aesthetic\n' +
      '- No clutter, lots of breathing room\n' +
      '- Must look good when shared on Twitter/Facebook/LinkedIn\n\n' +
      'Generate as high-res image.';

    const ogScreen = await project.generate(ogPrompt);
    console.log('OG screen: ' + ogScreen.id);
    const ogImage = await ogScreen.getImage();
    console.log('OG Image: ' + ogImage);

    // 3. Hero Illustration
    console.log('\n=== Generating HERO ILLUSTRATION ===');
    const heroPrompt = 'Design a hero illustration/background for "Tone Generator" landing page.\n\n' +
      'Requirements:\n' +
      '- Abstract, technical, audio-themed\n' +
      '- Dark bg #08080F with subtle grid pattern\n' +
      '- Central element: glowing cyan #00E5CC waveform/oscilloscope visualization\n' +
      '- Frequency spectrum visualization (like FFT analyzer) in background, very subtle\n' +
      '- Floating frequency numbers (20Hz, 440Hz, 1kHz, 10kHz, 20kHz) in JetBrains Mono, #6B7280 at low opacity\n' +
      '- Subtle amber #FFBF00 accent dots or highlights\n' +
      '- Must work as background behind text (low contrast, not distracting)\n' +
      '- Size: 1440x900px for desktop hero background\n' +
      '- Premium, scientific, precise aesthetic\n\n' +
      'Generate as high-res image or SVG.';

    const heroScreen = await project.generate(heroPrompt);
    console.log('Hero screen: ' + heroScreen.id);
    const heroImage = await heroScreen.getImage();
    console.log('Hero Image: ' + heroImage);

    console.log('\n=== ALL BRAND ASSETS GENERATED ===');
    console.log('Logo: ' + logoImage);
    console.log('OG: ' + ogImage);
    console.log('Hero: ' + heroImage);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code) console.error('Code:', error.code);
    process.exit(1);
  }
}

main();
