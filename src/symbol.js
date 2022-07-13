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

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const wait = timeout => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout);
      });
    };

    for (const item of this[kItems]) {
      await wait(3000);
      yield item.toISOString();
    }
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

const expectedDates = [new Date(2020, 3, 4), new Date(2020, 2, 5)];
assert.deepStrictEqual([...myDate], expectedDates);

(async () => {
  for await (const item of myDate) {
    console.log(item);
  }
})();

const kItem = Symbol('kItem');

const ab = {
  text: 'hello',
  prototype: null,
  __proto__: {
    exec() {
      throw new Error('💩');
    },
  },
  [kItem]() {
    return '🥰';
  },
};

{
  assert.rejects(
    async () => {
      ab.__proto__.exec();
    },
    {
      message: '💩',
      name: 'Error',
    }
  );
}

const kHero = Symbol('kHero');
const _myObj = {
  [kHero]: 'Batman',
};

assert.deepStrictEqual(
  _myObj[kHero],
  _myObj[Object.getOwnPropertySymbols(_myObj)[0]]
);

const _myMap = new Map();
_myMap.set(kItem, 'value_with_symbol');

assert.deepStrictEqual(
  _myMap.get(_myMap.keys().next().value),
  'value_with_symbol'
);
