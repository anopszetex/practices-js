import { setTimeout } from 'node:timers/promises';

async function runLongOperation() {
  return setTimeout(2000);
}

async function main() {
  const timerStart = performance.now();

  for (let index = 1; index <= 1e1; index++) {
    await runLongOperation();
  }

  const executionTime = performance.now() - timerStart;

  console.log(
    `Tempo de execução: ${new Intl.NumberFormat().format(executionTime)}ms`
  );
}

main();
