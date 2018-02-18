'use strict';

const nearley = require('nearley');
const axios = require('axios');

const Runner = require('./runner');
const settings = require('./settings');
const grammar = require('./grammar/grammar');
const example = require('./examples');

module.exports = {
  setup: settings.setup,
  parse,
  run,
  runAST,
  example
};

////////////////////////////////////////////////////////////////

/**
 * Runs given expression
 *
 * @param {String} expression
 * @returns {Promise}
 */
function run(expression) {
  try {
    beforeParse(expression);
    const ast = parse(expression);
    afterParse(expression);

    return runAST(ast);
  } catch(e) {
    return Promise.reject(e);
  }
}

/**
 * Executes before running given ast
 *
 * @param {Object[]} ast
 * @returns {Object[]}
 */
function beforeRun(ast) {
  if (settings.debug) {
    console.log('## AST');
    console.log('###########################');
    console.log(ast);
    console.log('\n\n\n');
    console.time('run');
  }

  return ast;
}

/**
 * Runs given expression AST as is, without parsing
 * @param {Node[]} ast
 * @returns {Promise}
 */
function runAST(ast) {
  beforeRun(ast);
  return Runner.fromAST(ast).execute()
    .then(result => {
      afterRun(result);
      return result;
    });
}

/**
 * Executes after given ast have been run
 *
 * @param {Object[]} ast
 * @returns {Object[]}
 */
function afterRun(ast) {
  if (settings.debug) {
    console.timeEnd('run');
  }

  return ast;
}

/**
 * Executes before parsing given expression
 * @param expression
 * @returns {*}
 */
function beforeParse(expression) {
  if (settings.debug) {
    console.time('parse');
  }

  return expression;
}

/**
 * Parses given expression based on generated grammar
 *
 * @param {String} expression
 * @returns {*}
 */
function parse(expression) {
  const parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar)
  );

  parser.feed(expression);

  return parser.results[0];
}


function afterParse(expression) {
  if (settings.debug) {
    console.timeEnd('parse');
  }

  return expression;
}
