'use strict';

const _ = require('lodash');

module.exports = {
  fetch,
  fetchQuantity,

  filter,
  selector
};

function compare(a = '', b = '', operator) {
  a = a.toString();
  b = b.toString();

  if (!a || !b) {
    return false;
  }

  switch (operator) {
    case '=':
      return a === b;
      break;

    case '~':
      return a.includes(b) || b.includes(a);
      break;

    case '^':
      return a.startsWith(b);
      break;

    case '$':
      return a.endsWith(b);
      break;

    default:
      return a === b;
      break;
  }
}

function fetch([target,,selector]) {
  let base = target;
  let query = '';

  if (selector) {
    query += `?filter=${selector.field}=${selector.value}`;
  }

  return {
    type: 'fetch',
    url: base + query
  };
}

function fetchQuantity([quantifier,,target,,selector]) {
  return [
    until((res) => res.length < quantifier),
    fetch([target,,selector])
  ];
}

function until(condition) {
  return {
    type: 'until',
    condition
  };
}

function filter([field,,operator,,value]) {
  return {
    type: 'filter',
    where: entity => {
      const targetValue = _.get(entity, field);
      return compare(targetValue, value, operator);
    }
  }
}

function selector([field,,value]) {
  return { field, value };
}

