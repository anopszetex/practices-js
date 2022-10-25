import fs from 'node:fs';

const rs = fs.createReadStream('./file.txt');

rs.pipe(process.stdout);
