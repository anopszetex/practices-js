// import { setTimeout } from 'node:timers/promises';
import { fork } from 'node:child_process';
import { join } from 'node:path';
import * as url from 'node:url';
/* 
* bad plataform usage
async function runLongOperation() {
  return setTimeout(4000);
}

async function main() {
  const timerStart = performance.now();

  for (let index = 1; index <= 1e1; index++) {
    await runLongOperation();
  }

  const executionTime = performance.now() - timerStart;

  console.log(`Elapsed: ${new Intl.NumberFormat().format(executionTime)}ms`);
}

main(); */

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function main() {
  for (let index = 1; index <= 5; index++) {
    const child = fork(join(__dirname, 'child.js'));

    child.on('message', msg => {
      console.log('Message from child', msg);
    });
  }
}

main();
