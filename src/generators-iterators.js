import { readFile } from 'node:fs/promises';
import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout } from 'node:timers/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const absolute = dest => path.join(__dirname, dest);

function* calc(arg) {
  yield arg * 2;
}

function* main() {
  yield 'hello';
  yield* calc(2);
}

const generator = main();

assert.deepStrictEqual(generator.next(), { value: 'hello', done: false });
assert.deepStrictEqual(generator.next(), { value: 4, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ['hello', 4]);
assert.deepStrictEqual([...main()], ['hello', 4]);

function* promisified() {
  yield readFile(absolute('generators-iterators.js'), 'utf8');
  yield Promise.resolve('ok 🥱');
}

(async () => {
  const [, myPromise] = await Promise.all([...promisified()]);

  assert.deepStrictEqual(myPromise, 'ok 🥱');
})();

const obj = {
  [Symbol.iterator]() {
    return {
      items: [1, 2, 3, 4],
      next() {
        return {
          done: this.items.length === 0,
          value: this.items.pop(),
        };
      },
    };
  },
};

(async () => {
  async function mapAsync(list, mapper) {
    async function* myGen() {
      for await (const item of list) {
        yield mapper(item);
      }
    }

    const arr = [];

    for await (const item of myGen()) {
      arr.push(item);
    }

    return arr;
  }

  const listPromises = ['🦄', Promise.resolve(1), Promise.resolve(2)];

  const mapper = row => {
    return row;
  };

  assert.deepStrictEqual(await mapAsync(listPromises, mapper), ['🦄', 1, 2]);
})();

assert.deepStrictEqual(Array.from(obj), [4, 3, 2, 1]);
assert.deepStrictEqual([...obj], [4, 3, 2, 1]);

const medals = new Set(['gold', 'silver', 'bronze']);
assert.deepStrictEqual([...medals], ['gold', 'silver', 'bronze']);

const medallists = new Map([['Teddy Riner', 33]]);

for (const [judoka, medals] of medallists) {
  console.log(`${judoka} has won ${medals} medals`);
}

function* generator2() {
  yield* 'pizza';
}

assert.deepStrictEqual([...generator2()], ['p', 'i', 'z', 'z', 'a']);

const mutableArray = [1, 2, 3];

mutableArray[Symbol.iterator] = function* () {
  yield 2;
  yield 2;
  yield 4;
};

assert.deepStrictEqual([...mutableArray], [2, 2, 4]);

const fn = (...args) => {
  return args;
};

const unMutableArray = Reflect.apply(fn, {}, mutableArray);

assert.deepStrictEqual([...unMutableArray], [1, 2, 3]);

const list = {
  a: [setTimeout(50, '🌩️'), setTimeout(150, '🌩️'), setTimeout(10000, '🌩️')],
  async *[Symbol.asyncIterator]() {
    for (const item of this.a) {
      yield item;
    }
  },
};

const iterator = list[Symbol.asyncIterator]();

function loop() {
  iterator.next().then(v => {
    if (v.done) {
      return;
    }

    console.log(v.value);
    loop();
  });
}

loop();

const kStop = Symbol('kStop');

async function* generate(fn) {
  for (let i = 0; i < 20; i++) {
    const some = fn(i);

    if (some === kStop) {
      console.log('😮 break loop!');
      break;
    }

    await setTimeout(100);
    yield i;
  }
}

generate.stop = kStop;

for await (const iterator of generate(index =>
  index === 15 ? generate.stop : null
)) {
  console.log(iterator);
}

const person = {
  name: 'And',
  ...(false && { age: 23 }),
};

console.log({ person });
