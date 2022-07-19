import assert from 'node:assert';
/* function printStatus(name, fn) {
  switch (%GetOptimizationStatus(fn)) {
    case 1:
      console.log(`${name} function is optimized`);
      break;
    case 2:
      console.log(`${name} function is not optimized`);
      break;
    case 3:
      console.log(`${name} function is always optimized`);
      break;
    case 4:
      console.log(`${name} function is never optimized`);
      break;
    case 6:
      console.log(`${name} function is maybe deoptimized`);
      break;
    case 7:
      console.log(`${name} function is optimized by TurboFan`);
      break;
    default:
      console.log(`${name} function optimization status unknown`);
      break;
  }
}

const sum = (a, b) => a + b;

printStatus('sum', sum);

node --allow-natives-syntax app.js. */

const arr = [1, 2, 3, 4, 5];

const binSearch = (arr, left, right, value) => {
  if (right >= left) {
    const index = parseInt(left + (right - left) / 2);
    const current = arr[index];

    if (current === value) {
      return value;
    }

    if (current > value) {
      return binSearch(arr, left, index - 1, value);
    }

    return binSearch(arr, index + 1, right, value);
  }

  return -1;
};

const first = 0;
const last = arr.length - 1;

assert.deepStrictEqual(binSearch(arr, first, last, 12), 12);
