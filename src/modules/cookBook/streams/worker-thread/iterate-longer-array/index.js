import { randomUUID as uuid } from 'node:crypto';

/* {
  const MAX = 100;

  function buildEntries(_, index) {
    return {
      index,
      id: uuid(),
      name: 'John',
      email: 'john@john.com',
      age: Math.floor(Math.random() * MAX),
      occupation: 'gardener',
      hobbies: ['gardening', 'reading', 'cooking'],
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: Math.floor(Math.random() * 5000),
      },
    };
  }

  const users = Array.from({ length: 900000 }, buildEntries);

  const timerStart = performance.now();

  const res = users
    .map(function callbackCopyUser(user) {
      return {
        ...user,
      };
    })
    .filter(function callbackIsEven(user) {
      return user.index % 2 === 0;
    })
    .filter(function callbackCheckAge(user) {
      return user.age > 30;
    })
    .map(function callbackGetName(user) {
      return {
        name: user.name,
      };
    });

  const timerEnd = performance.now() - timerStart;

  console.log(`Elapsed: ${new Intl.NumberFormat().format(timerEnd)}ms`);
  console.log('-------------------------');
  console.log(`Users: ${new Intl.NumberFormat().format(res.length)}`);
} */

import {
  Worker,
  isMainThread,
  workerData,
  parentPort,
} from 'node:worker_threads';

import url from 'node:url';

{
  const SUCESS_EXIT_CODE = 0;
  const MAX = 100;

  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

  function buildEntries(_, index) {
    return {
      index,
      id: uuid(),
      name: 'John',
      email: 'john@john.com',
      age: Math.floor(Math.random() * MAX),
      occupation: 'gardener',
      hobbies: ['gardening', 'reading', 'cooking'],
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: Math.floor(Math.random() * 5000),
      },
    };
  }

  const users = Array.from({ length: 10 }, buildEntries);

  if (isMainThread) {
    const worker = new Worker(__dirname, {
      workerData: users,
    });

    worker.on('message', data => {
      console.log('Received message from worker');

      const strArr = [];
      for (let i = 0; i < data.byteLength; i++) {
        strArr.push(String.fromCharCode(data.getUint8(i)));
      }

      console.log('final:', JSON.parse(strArr.join('')));
    });

    worker.on('error', err => {
      console.error(`[Main][Thread error] ${err.message}`);
    });

    worker.on('exit', code => {
      if (code !== SUCESS_EXIT_CODE) {
        console.error(`[Main][Thread unexpected exit]: ${code}`);
      }
    });
  } else {
    const OString = JSON.stringify(workerData);
    const SABuffer = new SharedArrayBuffer(OString.length);
    const sArray = new DataView(SABuffer);

    for (let i = 0; i < OString.length; i++) {
      sArray.setUint8(i, OString.charCodeAt(i));
    }

    parentPort.postMessage(sArray);
  }

  /* const timerStart = performance.now();

  const data = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.index % 2 === 0 && user.age > 30) {
      data.push({
        name: user.name,
      });
    }
  }

  const timerEnd = performance.now() - timerStart;

  console.log(`Elapsed: ${new Intl.NumberFormat().format(timerEnd)}ms`);
  console.log('-------------------------');
  console.log(`Users: ${new Intl.NumberFormat().format(data.length)}`); */
}
