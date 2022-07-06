import assert from 'assert';

const obj = {
  [Symbol('name')]: 'and',
  [Symbol('age')]: 23,
  city: null,
};

console.log(Object.getOwnPropertySymbols(obj));

const uniqueKey = Symbol('Batman');

const user = {
  [uniqueKey]: 'value for symbol',
};

assert.deepStrictEqual(user[uniqueKey], 'value for symbol');
assert.deepStrictEqual(user[Symbol('Batman')], undefined);

const kItems = Symbol('kItems');

class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg));
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') {
      throw new TypeError('Only string coercion is supported');
    }

    return '🥰'.repeat(this[kItems].length);
  }

  get [Symbol.toStringTag]() {
    return 'what 😕';
  }
}

const myDate = new MyDate([2020, 3, 4], [2020, 2, 5]);

assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  '[object what 😕]'
);

assert.throws(() => myDate + 1, TypeError('Only string coercion is supported'));

assert.deepStrictEqual(String(myDate), '🥰🥰');
