import sinon from 'sinon';
import Fibonacci from './fibonacci.js';
import assert from 'node:assert';

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    [...fibonacci.execute(3)];

    const expectedCallCount = 4;

    assert.deepStrictEqual(spy.callCount, expectedCallCount);

    fibonacci.sync();

    const { args } = spy.getCall(2);

    // [3] => execute(3, 0, 1) => 0
    // [2] => execute(2, 1, 1) => 1
    // [1] => execute(1, 1, 2) => 1
    // [0] => execute(0, 2, 3) => undefined
    const expectedParams = Object.values({
      input: 1,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(args, expectedParams);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    for (const some of fibonacci.execute(3)) {
    }

    const expectedCallCount = 4;

    assert.deepStrictEqual(spy.callCount, expectedCallCount);

    fibonacci.sync();
  }
})();
