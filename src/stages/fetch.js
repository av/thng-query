'use strict';

const axios = require('axios');
const _ = require('lodash');
const url = require('url');
const qs = require('qs');

const signals = require('../signals');
const settings = require('../settings');

const linkUrlRegex = /<?([^>]*)>/;

module.exports = config => {
  if (config.done) {
    return Promise.reject(signals.terminate);
  }

  _.merge(config, {
    params: {
      perPage: settings.perPage,
      sortOrder: 'DESCENDING'
    }
  });

  return axios(config)
    .then(processResponseFor(config))
    .catch(err => {
      if (err.response) {
        throw new Error(`Fetch Stage: request not fulfilled ${err}`);
      } else {
        throw new Error(`Fetch Stage: ${err}`);
      }
    });
};

function processResponseFor(config) {
  return response => {
    if (response.headers) {
      if (response.headers.link) {
        config.done = false;

        const link = decodeURIComponent(response.headers.link);
        const urlMatch = link.match(linkUrlRegex);

        if (urlMatch[1]) {
          const linkUrl = urlMatch[1];
          const linkParams = qs.parse(url.parse(linkUrl).query);

          if (linkParams.nextPageToken) {
            _.merge(config, {
              params: {
                nextPageToken: linkParams.nextPageToken
              }
            });
          }
        }
      } else {
        config.done = true;
      }
    }

    return response.data;
  }
}