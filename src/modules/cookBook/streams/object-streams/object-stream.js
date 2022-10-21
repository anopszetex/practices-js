import { Transform } from 'node:stream';

const Name = Transform({
  transform(chunk, encoding, callback) {
    const result = chunk.toString().toUpperCase();
    callback(null, result);
  },
});

Name.write('Hello');
Name.write('Dude!');

Name.pipe(process.stdout);
