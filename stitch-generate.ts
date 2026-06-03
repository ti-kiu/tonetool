import { stitch } from '@google/stitch-sdk';

async function main() {
  try {
    console.log('Creating project...');
    
    // 1. Create a project
    const project = await stitch.createProject("Tone Generator Landing Page");
    console.log(`Project created: ${project.id}`);

    // 2. Generate a screen with our prompt
    const prompt = `Design a dark-theme landing page for Tone Generator — a free online tone generator.

Design specs:
- Dark theme: bg #08080F, surface #0F0F1A, accent #00E5CC, CTA #FFBF00
- Fonts: Space Grotesk (headings), DM Sans (body), JetBrains Mono (numbers)
- Hero: Split layout - left copy, right embedded tool panel
- Tool panel shows: waveform visualization canvas, frequency display (440 Hz), slider, waveform buttons (sine/square/triangle/sawtooth), volume, play/stop button
- Sections: Hero, How It Works (3 cards), Use Cases (3 cards), Features (bento grid), Pricing (3 tiers), FAQ (accordion), Final CTA, Footer
- Navigation: fixed top, logo left, links center, CTA right
- Must be fully responsive
- Use Lucide icons

Generate complete, production-ready React code using Tailwind CSS.`;

    console.log('Generating screen...');
    const screen = await project.generate(prompt);
    console.log(`Screen generated: ${screen.id}`);

    // 3. Get outputs
    console.log('Getting HTML URL...');
    const htmlUrl = await screen.getHtml();
    console.log(`HTML:  ${htmlUrl}`);

    console.log('Getting Image URL...');
    const imageUrl = await screen.getImage();
    console.log(`Image: ${imageUrl}`);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
