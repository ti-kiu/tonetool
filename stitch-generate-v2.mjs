import { stitch } from '/root/node_modules/@google/stitch-sdk/dist/src/index.js';

async function main() {
  try {
    console.log('Creating new project for v2...');
    
    const project = await stitch.createProject("Tone Generator Landing Page v2");
    console.log('Project created: ' + project.id);

    const prompt = 'Design a complete dark-theme landing page for Tone Generator.';

    console.log('Generating screen...');
    const screen = await project.generate(prompt);
    console.log('Screen generated: ' + screen.id);

    const htmlUrl = await screen.getHtml();
    console.log('HTML: ' + htmlUrl);

    const imageUrl = await screen.getImage();
    console.log('Image: ' + imageUrl);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
