function decorator(prototypeClass) {
  const fns = Reflect.ownKeys(prototypeClass).filter(
    item => item !== 'constructor'
  );

  for (const fn of fns) {
    prototypeClass[fn] = new Proxy(prototypeClass[fn], {
      __proto__: null,
      apply(fn, thisArg, argumentsList) {
        const start = performance.now();

        const result = fn.apply(thisArg, argumentsList);

        const end = performance.now() - start;

        console.log(`${fn.name} took ${end} ms`);

        return result;
      },
    });
  }
}

class DataBase {
  person = new Proxy(
    { name: '' },
    {
      set(target, prop, value) {
        target[prop] = value;

        return true;
      },
    }
  );

  constructor() {
    decorator(DataBase.prototype);
  }

  create() {
    const counter = 10e6;

    for (let index = 0; index < counter; index++) {}

    this.person.name = 'test';

    return 'created!';
  }
}

const database = new DataBase();
database.create();
// console.log('person', database.person);
