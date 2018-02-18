#!/usr/bin/env node

'use strict';

const program = require('commander');
const tq = require('../src/index');

program
  .description('Runs thng-query against')
  .usage('[options] <query>')
  .option('-k, --key <key>', 'API Key to use')
  .option('-u, --url [url]', 'API URL to use to run queries', 'https://api.evrythng.com')
  .parse(process.argv);

const query = process.argv[process.argv.length - 1];

if (!query) {
  throw new Error('TQ: Undefined query')
} else {
  tq.setup({
    apiUrl: program.url,
    authorization: program.key
  });

  tq.run(query)
    .then(JSON.stringify)
    .then(console.log)
    .catch(err => {
      console.error('TQ: Failed to execute', err);
    });
}
