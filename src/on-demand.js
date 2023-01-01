import { randomUUID as UUID } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//* mock data
function* findAll(query = '') {
  yield {
    id: UUID(),
    name: `name-${1}`,
  };

  yield {
    id: UUID(),
    name: `name-${2}`,
  };
}

function* selectAsStream() {
  const page = 100;
  const current = 0;

  const data = findAll(`SELECT * FROM table LIMIT ${page} OFFSET ${current}`);

  for (const item of data) {
    yield item;
  }
}

await pipeline(
  selectAsStream,
  async function* (source) {
    for (const item of source) {
      yield JSON.stringify(item).concat('\n');
    }
  },
  createWriteStream(path.join(__dirname, './data/output.njson'))
);

/* 

  const stream = Readable.from(selectAsStream());

  await pipeline(stream, async function* (source) {
  for await (const item of source) {
    yield item;
  }
});

  async function* selectAsStream() {
  let page = 100;
  let current = 0;

  const data = findAll(`SELECT * FROM table LIMIT ${page} OFFSET ${current}`);

  let iteratorResult = data.next();

  console.log(iteratorResult);

  while (true) {
    const data = await findAll(
      `SELECT * FROM table LIMIT ${page} OFFSET ${current}`
    );

    current += page;

    if (data.length === 0) {
      break;
    }

    for (const item of data) {
      yield item;
    }
  }
} */

// selectAsStream();
