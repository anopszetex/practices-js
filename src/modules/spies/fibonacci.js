export default class Fibonacci {
  /**
   *
   * @param {number} input
   * @param {number} current
   * @param {number} next
   * @returns {GeneratorFunction}
   */
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return;
    }

    yield current;
    yield* this.execute(input - 1, next, current + next);
  }

  sync() {
    const generator = this.myGen();
    this.syncR(generator);
  }

  syncR(gen, result) {
    const obj = gen.next(result);

    if (obj.done) {
      return;
    }

    this.syncR(gen, obj.value);
  }

  *myGen() {
    yield 1;
  }
}
