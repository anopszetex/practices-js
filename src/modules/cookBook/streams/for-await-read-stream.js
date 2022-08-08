import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const data = fs.createReadStream(path.join(__dirname, './read-stream.txt'));

const run = async () => {
  for await (const chunk of data) {
    console.log('Read chunk:', chunk.toString());
  }

  console.log('No more data');
};

run();
