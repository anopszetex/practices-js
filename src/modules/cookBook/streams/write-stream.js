import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const file = fs.createWriteStream(path.join(__dirname, './read-stream.txt'));

for (let index = 0; index < 5; index++) {
  file.write(
    'Node.js is a javascript runtime built on Google Chrome V8 Javascript Engine'
  );
}
