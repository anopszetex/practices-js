import assert from 'assert';

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

import { readFile } from 'fs/promises';

function* promisified() {
  yield readFile('generators-iterators.js', 'utf8');
  yield Promise.resolve('ok 🥱');
}

(async () => {
  const [_, myPromise] = await Promise.all([...promisified()]);

  assert.deepStrictEqual(myPromise, 'ok 🥱');
})();
