import fs from 'node:fs';
import { pipeline, Transform } from 'node:stream';

const upperCase = Transform({
  transform(chunk, encoding, callback) {
    // Data processing
    callback(null, chunk.toString().toUpperCase());
  },
});

pipeline(
  fs.createReadStream('./file.txt'),
  upperCase,
  fs.createWriteStream('./newFile1.txt'),
  err => {
    if (err) {
      console.error('Pipeline failed', err);
      return;
    }

    console.log('Pipeline succeeded');
  }
);
