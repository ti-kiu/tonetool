import { StitchToolClient } from './node_modules/@google/stitch-sdk/dist/src/client.js';
import { Stitch } from './node_modules/@google/stitch-sdk/dist/generated/src/stitch.js';

async function main() {
  try {
    console.log('Creating StitchToolClient with accessToken + projectId...');
    
    const client = new StitchToolClient({
      accessToken: process.env.STITCH_ACCESS_TOKEN,
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      baseUrl: "https://stitch.googleapis.com/mcp"
    });
    
    console.log('Creating Stitch instance...');
    const stitch = new Stitch(client);
    
    console.log('Creating project...');
    const project = await stitch.createProject("Tone Generator Landing Page");
    console.log(`Project created: ${project.id || project.name || JSON.stringify(project)}`);

    const prompt = `Design a dark-theme landing page for Tone Generator — a free online tone generator.

Key design specs:
- Dark theme with bg #08080F, surface #0F0F1A, accent cyan #00E5CC, CTA amber #FFBF00
- Industrial/technical vibe
- Split hero: left headline + CTA, right tool panel
- Tool panel: waveform viz, frequency display, controls
- Sections: How It Works, Use Cases, Features (bento), Pricing, FAQ, CTA, Footer
- Responsive, mobile-first
- Lucide icons, Space Grotesk + DM Sans + JetBrains Mono fonts`;

    console.log('Generating screen (this may take 1-2 minutes)...');
    const screen = await project.generate(prompt);
    console.log(`Screen generated: ${screen.id || JSON.stringify(screen)}`);

    console.log('Getting HTML URL...');
    const htmlUrl = await screen.getHtml();
    console.log(`HTML: ${htmlUrl}`);

    console.log('Getting Image URL...');
    const imageUrl = await screen.getImage();
    console.log(`Image: ${imageUrl}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code) console.error('Code:', error.code);
    console.error('Full error:', error);
    process.exit(1);
  }
}

main();
