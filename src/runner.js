'use strict';

const settings = require('./settings');
const Pipeline = require('./pipeline');

// thngs tagged WIFI where properties.online = true
const readThngs = [
  {
    type: 'fetch',
    url: '/thngs?filter=tags=WIFI'
  },
  {
    type: 'filter',
    where: thng => thng.properties.online === true
  }
];

// thngs from collection with name London* where name = 'Hidden One'
const readFromCollection = [
  {
    type: 'fetch',
    url: '/collections?filter=name=London*'
  },
  {
    type: 'thngsFromCollections',
  },
  {
    type: 'filter',
    where: thng => thng.name === 'Hidden One'
  }
];

// thngs of product named Waterheater where customFields.softwareVersion ~ '0.15'
const readOfProduct = [
  {
    type: 'fetch',
    url: '/collections?filter=name=London*'
  },
  {
    type: 'thngsFromProducts'
  },
  {
    type: 'filter',
    where: thng => thng.customFields.softwareVersion.includes('0.15')
  }
];

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