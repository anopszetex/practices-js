process.stdin.on('data', data => {
  const name = data.toString().trim().toUpperCase();

  if (!name) {
    process.stderr.write('Input was empty.');
    return;
  }

  process.stdout.write(`Hello ${name}!`);
});
