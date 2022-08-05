const addCbAsync = (a, b, cb) => {
  setTimeout(() => {
    cb(a + b);
  }, 100);
};

console.log('before');

addCbAsync(1, 2, result => {
  console.log('result', result);
});

console.log('after');
