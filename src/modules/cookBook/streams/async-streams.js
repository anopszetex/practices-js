import { pipeline } from 'node:stream/promises';
import { setTimeout } from 'node:timers/promises';

const myCustomReadable = async function* () {
  yield Buffer.from('Hello');
  await setTimeout(1500);
  yield Buffer.from('world');
  yield Buffer.from('!');
};

const myCustomWritable = async function (stream) {
  for await (const chunk of stream) {
    console.log('[Writable]', chunk.toString());
  }
};

const run = async function () {
  await pipeline(myCustomReadable, myCustomWritable, {
    signal: AbortSignal.timeout(2500),
  });
};

run();
