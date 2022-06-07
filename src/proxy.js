/* Observer with proxy */
const sum = (a, b) => a + b;

const handler = {
  __proto__: null,
  apply(fn, thisArg, argumentsList) {
    console.log(`${fn.name} was called with: [${argumentsList}] args`);

    return fn.apply(thisArg, argumentsList);
  },
};

const applySum = new Proxy(sum, handler);

applySum(5, 5);

/* lazy loading with proxy */
const services = {
  users(config) {
    if (config.production) {
      return 'is production';
    }

    return () => {
      return [
        { id: 1, hero: 'syml' },
        { id: 2, hero: 'eden' },
      ];
    };
  },
  dog() {
    return 'dog';
  },
};

const isFunction = fn => typeof fn === 'function';

const factoryContainer = config => {
  const cache = new Map();

  return new Proxy(
    {},
    {
      get(target, prop) {
        if (cache.has(prop)) {
          return cache.get(prop);
        }

        target[prop] = services[prop];

        target[prop] = isFunction(target[prop])
          ? target[prop](config)
          : target[prop];

        cache.set(prop, target[prop]);

        return target[prop];
      },
      set() {
        throw new Error('It is not possible to modify the factoryContainer');
      },
    }
  );
};

const container = factoryContainer({ production: true });

console.log(container);
console.log(container.users);
console.log(container.dog);
// container.users = 2 = throw exception;
