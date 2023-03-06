import Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

const MAX = 5000;

const LocalDate = {
  random: Array.from({ length: 500 }, () => Math.floor(Math.random() * MAX)),
  serialize(value) {
    // console.log(this.random);
    return String(value);
  },
};

const oldSerialize = LocalDate.serialize;

suite
  .add('using apply', function () {
    LocalDate.serialize = function (...args) {
      return oldSerialize.apply(this, args);
    };

    LocalDate.serialize('2020-01-01');
  })
  .add('using call', function () {
    LocalDate.serialize = function (...args) {
      return oldSerialize.call(this, args[0]);
    };

    LocalDate.serialize('2020-01-01');
  })
  .add('using bind', function () {
    LocalDate.serialize = function (...args) {
      return oldSerialize.bind(this, args[0])();
    };

    LocalDate.serialize('2020-01-01');
  })
  .add('using reflect', function () {
    LocalDate.serialize = function (...args) {
      return Reflect.apply(oldSerialize, this, args);
    };

    LocalDate.serialize('2020-01-01');
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
