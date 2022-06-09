import assert from 'assert';

const obj = {};
const arr = [];
const fn = () => {};

assert.deepStrictEqual(obj.__proto__, Object.prototype);

assert.deepStrictEqual(arr.__proto__, Array.prototype);

assert.deepStrictEqual(fn.__proto__, Function.prototype);

assert.deepStrictEqual(obj.__proto__.__proto__, null);

// eslint-disable-next-line no-new-object
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

function Employee() {}

Employee.prototype.salary = () => {
  return 'salary**';
};

function Surpevisor() {}

Surpevisor.prototype = Object.create(Employee.prototype);

Surpevisor.prototype.profitShare = () => {
  return 'profitShare**';
};

function Manager() {}

Manager.prototype = Object.create(Surpevisor.prototype);

Manager.prototype.monthlyBonuses = () => {
  return 'monthlyBonuses**';
};

assert.deepStrictEqual(Manager.__proto__, Function.prototype);

assert.deepStrictEqual(Manager.prototype.__proto__, Surpevisor.prototype);

assert.deepStrictEqual(
  Manager.prototype.__proto__.__proto__,
  Employee.prototype
);

assert.deepStrictEqual(Manager.prototype.salary(), 'salary**');

assert.deepStrictEqual(new Manager().salary(), 'salary**');

assert.deepStrictEqual(
  new Manager().__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

class T1 {
  ping() {
    return 'ping';
  }
}

class T2 extends T1 {
  pong() {
    return 'pong';
  }
}

class T3 extends T2 {
  shoot() {
    return 'shoot';
  }
}

const t3 = new T3();

assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
