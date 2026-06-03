import https from 'https';
import fs from 'fs';

const imageUrl = 'https://lh3.googleusercontent.com/aida/AP1WRLsMyHDbLN5MTGNAPBF2ia2OgrUx125ZFdvVawmNYu83-rkxzdGwyHhOanfpUunivY08BG23IDw9P6e_nVfNY-WHGTbUjdx8wYp7epKfdusblXe7EyAyb0Ji1sQqZQACAAzO8K4w2zqgLFH1ZL1jIKCnuRytg1HcDAP0y14EzTYnKxLSvVB7vkKPU-rUHo1gSq0Jkp2kvHV4EcjSL9ZdTfUe-t3us_UqbOrW9rXLlUwzHdpczLnjDYT2AAs';

https.get(imageUrl, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed: ${res.statusCode}`);
    process.exit(1);
  }
  const file = fs.createWriteStream('stitch-design-exact.png');
  res.pipe(file);
  file.on('finish', () => {
    console.log('Downloaded: stitch-design-exact.png');
    file.close();
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
