import { setTimeout } from 'node:timers/promises';

async function runLongOperation() {
  await setTimeout(30000);
  process.send('finished');
}

await runLongOperation();
