import { setTimeout } from 'node:timers/promises';

process.on('message', msg => {
  console.log('Message from parent', msg);
});

function generate() {
  return {
    async *[Symbol.asyncIterator]() {
      for (let index = 0; index < 100; index++) {
        await setTimeout(100);
        yield index;
      }
    },
  };
}

for await (const iterator of generate()) {
  process.send(iterator);
}
