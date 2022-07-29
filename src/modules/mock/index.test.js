import { error } from './constants.js';
import { rejects, deepStrictEqual } from 'node:assert';
import File from './file.js';

(async () => {
  {
    const filePath = './mocks/empty-file.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/threeItems-valid.csv';

    const result = await File.csvToJson(filePath);

    const expected = [
      {
        id: 123,
        name: 'John',
        profession: 'Student',
      },
      {
        id: 124,
        name: 'Mary',
        profession: 'Student',
      },
      {
        id: 125,
        name: 'Peter',
        profession: 'Student',
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
