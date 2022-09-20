import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const rs = fs.createReadStream(path.join(__dirname, './read-stream.txt'));

rs.on('data', () => {
  console.log('Read chunk:', data.toString());
});

rs.on('end', () => {
  console.log('No more data');
});
