import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';

/* import { Transform } from 'node:stream';
const upperCase = Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
}); */

async function* upperCase(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().toUpperCase();
  }
}

async function run() {
  try {
    await pipeline(
      fs.createReadStream('./file.txt'),
      upperCase,
      fs.createWriteStream('./newFile.txt'),
      {
        signal: AbortSignal.timeout(2500),
      }
    );
  } catch (err) {
    console.error(err);
  }
}

run();
