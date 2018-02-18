'use strict';

module.exports = {
  terminate: {},

  handle: function(signal, handler) {
    return object => {
      if (object === signal) {
        return handler();
      } else {
        throw object;
      }
    }
  }
};