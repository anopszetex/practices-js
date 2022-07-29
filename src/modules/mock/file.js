import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { error } from './constants.js';
import User from './user.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession'],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);

    const validation = File.isValid(content);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return File.parseCsvToJson(content);
  }

  static parseCsvToJson(csvString) {
    const lines = csvString.split('\n');

    const firstLine = lines.shift();
    const header = firstLine.split(',');

    const list = [];

    for (const line of lines) {
      const columns = line.split(',');

      const user = {};

      columns.forEach((row, index) => {
        user[header[index]] = row;
      });

      list.push(new User(user));
    }

    return list;
  }

  static getFileContent(filePath) {
    const filename = path.join(__dirname, filePath);

    return readFile(filename, { encoding: 'utf8' });
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split('\n');

    const isHeaderValid = header === options.fields.join(',');

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }
}

/* const files = [
  'fourItems-invalid.csv',
  'invalid-header.csv',
  'threeItems-valid.csv',
];

File.csvToJson(files[2]).then(result => {
  console.log('result\n', result);
}); */

export default File;
