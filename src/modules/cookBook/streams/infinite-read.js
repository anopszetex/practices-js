import fs from 'node:fs';

const data = fs.createReadStream(`/dev/urandom`);

let size = 0;

data.on('data', chunk => {
  size += chunk.length;

  console.log(`File size: ${size}`);
});
