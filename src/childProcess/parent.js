import { fork } from 'node:child_process';
import { join } from 'node:path';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const forked = fork(join(__dirname, 'child.js'));

forked.on('message', msg => {
  console.log('Message from child', msg);
});

forked.send('Hello from parent');
