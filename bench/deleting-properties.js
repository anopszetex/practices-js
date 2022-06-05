import Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

const data = {
  x: 1,
  y: 2,
  z: 3,
  a: 4,
  b: 5,
};

suite
  .add('using delete property', function () {
    delete data.x;

    data.y;
    data.z;
    data.a;
    data.b;
  })
  .add('using undefined assignment', function () {
    data.x = undefined;

    data.y;
    data.z;
    data.a;
    data.b;
  })
  .add('using reflect.deleteProperty', function () {
    Reflect.deleteProperty(data, 'x');

    data.y;
    data.z;
    data.a;
    data.b;
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
