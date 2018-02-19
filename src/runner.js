'use strict';

const settings = require('./settings');
const Pipeline = require('./pipeline');

class Runner {
  static fromAST(ast) {
    return new Runner(ast);
  }

  constructor(ast) {
    this.stages = ast;
    this.pipeline = Pipeline.fromStages(this.stages);
  }

  execute() {
    const runner = this;

    function next() {
      return runner.pipeline
        .execute()
        .then(handleResult);
    }

    function done() {
      return runner.pipeline.results;
    }

    function handleResult() {
      return runner.pipeline.done
        ? done()
        : next();
    }

    return next();
  }
}

module.exports = Runner;