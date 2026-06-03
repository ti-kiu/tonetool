import https from 'https';
import fs from 'fs';

const imageUrl = 'https://lh3.googleusercontent.com/aida/AP1WRLsm5RipcZe02P11-UV3OroZaEJB4wpmqetuD4I4MaFnlK0KlmowHGPKT7y1hQ7hBDWqmD2kIxqloFIefENN1ILd5Ut3Vsq7c1q8bWeeDbsXxTIXeN87QcyIL0TuBYb-kgHFjCx9onI_o6s8h_yWIcJRczOkUAnOfjS51sJmhvJFyY86Rd4ZQBMZNFCial0PtgSPt6A0TLitmZ2cD5SWwHd8TELSxLWtfLSNpWd7rkS_dVsnyejFiYMbkpdt';

https.get(imageUrl, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed: ${res.statusCode}`);
    process.exit(1);
  }
  const file = fs.createWriteStream('stitch-design-new.png');
  res.pipe(file);
  file.on('finish', () => {
    console.log('Downloaded: stitch-design-new.png');
    file.close();
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
