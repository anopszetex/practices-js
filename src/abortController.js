async function longOperation(signal) {
  return new Promise((resolve, reject) => {
    if (!signal.aborted) {
      /* signal.addEventListener('abort', () => {
        reject(new Error('Aborted'));
      });
 */
      signal.onabort = () => reject(new Error('Aborted'));
    }

    setTimeout(resolve, 6000);
  });
}

const controller = new AbortController();

setTimeout(() => controller.abort(), 3000);

await longOperation(controller.signal).catch(err => {
  console.log('Aborted', err);
  process.exit(1);
});
