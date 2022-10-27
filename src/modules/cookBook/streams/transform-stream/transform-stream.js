import { createReadStream, createWriteStream } from 'node:fs';
import { Transform } from 'node:stream';

const rs = createReadStream('./file.txt');
const ws = createWriteStream('./newFile.txt');

const upperCase = Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

rs.pipe(upperCase).pipe(ws);
