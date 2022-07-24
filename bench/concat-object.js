import Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

suite
  .add('using object define property', function () {
    const data = {
      x: 1,
      y: 2,
      z: 3,
      a: 4,
      b: 5,
    };

    Object.defineProperty(data, 'database', { value: 'mysql' });

    data.y;
    data.z;
    data.a;
    data.b;
    data.x;
    data.database;
  })
  .add('using object assign', function () {
    const data = {
      x: 1,
      y: 2,
      z: 3,
      a: 4,
      b: 5,
    };

    Object.assign(data, { database: 'mysql' });

    data.y;
    data.z;
    data.a;
    data.b;
    data.x;
    data.database;
  })
  .add('using reflect define property', function () {
    const data = {
      x: 1,
      y: 2,
      z: 3,
      a: 4,
      b: 5,
    };

    Reflect.defineProperty(data, 'database', { value: 'mysql' });

    data.y;
    data.z;
    data.a;
    data.b;
    data.x;
    data.database;
  })
  .add('using default assignment', function () {
    const data = {
      x: 1,
      y: 2,
      z: 3,
      a: 4,
      b: 5,
    };

    data.database = 'mysql';

    data.y;
    data.z;
    data.a;
    data.b;
    data.x;
    data.database;
  })
  .add('using dynamic assignment', function () {
    const data = {
      x: 1,
      y: 2,
      z: 3,
      a: 4,
      b: 5,
    };

    data['database'] = 'mysql';

    data.y;
    data.z;
    data.a;
    data.b;
    data.x;
    data.database;
  })
  .add('using spread operator #imutable', function () {
    const data = {
      x: 1,
      y: 2,
      z: 3,
      a: 4,
      b: 5,
    };

    const newData = { ...data, database: 'mysql' };

    newData.y;
    newData.z;
    newData.a;
    newData.b;
    newData.x;
    newData.database;
  })
  .add('using object assign #imutable', function () {
    const data = {
      x: 1,
      y: 2,
      z: 3,
      a: 4,
      b: 5,
    };

    const newData = Object.assign({}, data, { database: 'mysql' });

    newData.y;
    newData.z;
    newData.a;
    newData.b;
    newData.x;
    newData.database;
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
