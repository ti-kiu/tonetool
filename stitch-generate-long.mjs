import { stitch } from './node_modules/@google/stitch-sdk/dist/src/index.js';

async function main() {
  try {
    console.log('Creating project...');
    
    const project = await stitch.createProject("Tone Generator Landing Page");
    console.log(`Project created: ${project.id}`);

    const prompt = `Design a dark-theme landing page for Tone Generator — a free online tone generator.

Key design specs:
- Dark theme with bg #08080F, surface #0F0F1A, accent cyan #00E5CC, CTA amber #FFBF00
- Industrial/technical vibe
- Split hero: left headline + CTA, right tool panel
- Tool panel: waveform viz, frequency display, controls
- Sections: How It Works, Use Cases, Features (bento), Pricing, FAQ, CTA, Footer
- Responsive, mobile-first
- Lucide icons, Space Grotesk + DM Sans + JetBrains Mono fonts`;

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
