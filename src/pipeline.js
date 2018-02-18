'use strict';

const _ = require('lodash');

const settings = require('./settings');
const stages = require('./stages');
const signals = require('./signals');

class Pipeline {
  static fromStages(stages) {
    return new Pipeline(stages);
  }

  constructor(stages) {
    this.timesExecuted = 0;
    this.done = false;

    this.stages = stages
      .filter(_.negate(this.ofType('until')));

    this.until = [
      results => this.timesExecuted < settings.depth,
      results => results.length < settings.maxResults
    ].concat(
      stages
        .filter(this.ofType('until'))
        .map(stage => stage.condition)
    );

    this.results = [];
  }

  ofType(type) {
    return stage => stage.type === type;
  }

  beforeExecute() {
    if (settings.debug) {
      console.log('## Execution №', this.timesExecuted + 1);
      console.log('#####################')
    }
  }

  execute() {
    this.beforeExecute();
    let promise = Promise.resolve(this.results);

    this.stages.forEach(stage => {
      promise = promise
        .then(result => this.executeStage(stage, result))
    });

    return promise
      .then(results => this.results = this.results.concat(results))
      .then(this.afterExecute.bind(this))
      .catch(
        signals.handle(signals.terminate, () => {
          this.done = true;
          return [];
        })
      );
  }

  afterExecute(results) {
    debugger;

    this.timesExecuted += 1;
    this.done = this.until.some(
      condition => !condition(results)
    );

    return results;
  }

  beforeStage(stage, result) {
    if (settings.debug) {
      console.time(stage.type);
      console.log('Running', stage);
    }

    return result;
  }

  executeStage(stage, result) {
    if (stages[stage.type]) {
      return Promise.resolve(result)
        .then(result => this.beforeStage(stage, result))
        .then(result => stages[stage.type](stage, result))
        .then(result => this.afterStage(stage, result));
    } else {
      throw new Error('Runner: unknown stage type', stage.type);
    }
  }

  afterStage(stage, result) {
    if (settings.debug) {
      console.timeEnd(stage.type);
      console.log('Done', stage);
      console.log('---------------');
      console.log('');
    }

    return result;
  }
}

module.exports = Pipeline;