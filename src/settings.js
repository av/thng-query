'use strict';

const axios = require('axios');
let settings;

/**
 * @typedef {Object} Settings
 * Holds global settings for given tq instance
 *
 * @property {Boolean} debug
 * @property {Number} depth
 * @property {Number} perPage
 * @property {Number} maxResults
 * @property {String} authorization
 * @property {String} apiUrl
 */

/**
 * @type {Settings}
 */
module.exports = settings = {
  debug: false,
  depth: 20,
  perPage: 100,
  maxResults: 100,

  authorization: '',
  apiUrl: 'https://api.evrythng.com',

  setup
};

/**
 * Injects given config to settings
 *
 * @param {Settings} config
 */
function setup(config) {
  if (config.authorization) {
    axios.defaults.headers.common['Authorization'] = config.authorization;
  }

  if (config.apiUrl) {
    axios.defaults.baseURL = config.apiUrl;
  }

  Object.assign(settings, config);
}