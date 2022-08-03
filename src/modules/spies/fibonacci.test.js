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
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    for await (const some of fibonacci.execute(3)) {
    }

    const expectedCallCount = 4;

    assert.deepStrictEqual(spy.callCount, expectedCallCount);

    fibonacci.sync();
  }
})();
