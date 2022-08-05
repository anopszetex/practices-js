const addCbSync = (a, b, cb) => {
  cb(a + b);
};

console.log('before');

addCbSync(1, 2, result => {
  console.log('result', result);
});

console.log('after');
