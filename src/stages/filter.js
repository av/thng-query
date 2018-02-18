'use strict';

module.exports = (config, targets) => {
  if (!Array.isArray(targets)) {
    throw new Error('Filter Stage: unexpected targets type', typeof targets);
  }

  return targets.filter(target => config.where(target));
};