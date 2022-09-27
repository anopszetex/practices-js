#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { argv } = yargs(hideBin(process.argv))
  .command('createHero', 'create a hero', builder => {
    return builder
      .option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'Hero name',
        type: 'string',
      })
      .option('age', {
        alias: 'a',
        demandOption: true,
        describe: 'Hero age',
        type: 'number',
      })
      .option('power', {
        alias: 'p',
        demandOption: true,
        describe: 'Hero power',
        type: 'string',
      })
      .example(
        'createHero --name=Superman --age=30 --power Flying',
        'create a hero'
      )
      .example('createHero --n=Superman --a=30 --p Flying', 'create a hero');
  })
  .epilog('This is the end of the CLI');

function hero({ name, age, power }) {
  return {
    name,
    age,
    power,
    id: Date.now(),
  };
}

console.log(hero(argv));

// node cli-yargs.mjs --help // to see the help
// node cli-yargs.mjs createHero --help // to see the help of the command
// or
// ./cli-yargs.mjs createHero --n=Superman --a=30 --p Flying
