import { stitch } from '@google/stitch-sdk';
import fs from 'fs';
import path from 'path';

async function generateLogo() {
  console.log('Creating project...');
  
  const project = await stitch.createProject({
    name: 'Tone Generator Logo',
  });

  console.log('Project created:', project.name);

  const result = await stitch.generate({
    projectId: project.id,
    prompt: `Minimalist logo icon for an audio tone generator app.

Design requirements:
- Clean, geometric, modern style
- Abstract representation of sound wave or frequency
- Simple curves or equalizer bars
- No text, icon only
- Centered with generous padding
- Professional tech aesthetic
- Suitable for dark background (#08080F)
- Primary color: cyan/teal (#00E5CC)`,
    width: 512,
    height: 512,
    numImages: 1,
  });

  console.log('Generated images:', result.images?.length);

  if (result.images && result.images[0]) {
    const html = await stitch.getHtml({
      projectId: project.id,
      screenId: result.images[0].screenId,
    });
    
    console.log('HTML retrieved, length:', html?.length);
    
    // Save HTML for reference
    fs.writeFileSync('logo-design.html', html);
    console.log('HTML saved to logo-design.html');
  }
}

generateLogo().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
