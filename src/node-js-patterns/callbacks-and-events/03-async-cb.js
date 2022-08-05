const addCbAsync = (a, b, cb) => {
  queueMicrotask(() => {
    cb(a + b);
  });
};

console.log('before');

addCbAsync(1, 2, result => {
  console.log('result', result);
});

console.log('after');
