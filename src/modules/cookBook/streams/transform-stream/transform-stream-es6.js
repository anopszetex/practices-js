import { createReadStream, createWriteStream } from 'node:fs';
import { Transform } from 'node:stream';

const rs = createReadStream('./file.txt');
const ws = createWriteStream('./newFile.txt');

class UpperCase extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

rs.pipe(new UpperCase()).pipe(ws);
