import { readFile } from 'node:fs/promises';
import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  // eslint-disable-next-line no-unused-vars
  const [_, myPromise] = await Promise.all([...promisified()]);

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

assert.deepStrictEqual(Array.from(obj), [4, 3, 2, 1]);
assert.deepStrictEqual([...obj], [4, 3, 2, 1]);
