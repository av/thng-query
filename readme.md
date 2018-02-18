# thng-query

DSL for working with EVRYTHNG Platform API
```bash
tq --key $OPERATOR_KEY 'products tagged embedded where photos~gif'
```
```javascript
const tq = require('tq');

tq.setup({
  authorization: process.env.OPERATOR_KEY
});

tq.run('thngs with name Advanced* where identifiers.ser^673')
    .then(console.log)
    .catch(console.error);
```
## Interface
#### As library
```javascript
const tq = require('tq');

/**
 * Runs a given query. Throws if any errors during parsing
 * @param {String} query 
 */
tq.run('query');

/**
 * Consumes global settings for tq
 * @param {Settings} settings   
 */
tq.setup({})
```
#### As CLI app
```bash
# To see all available options
tq --help 
# Will dump output json straight to stdout
tq -k $OPERATOR_KEY 'thngs where properties.online = true'
# Could be used with formatters, like jq
tq -k $OPERATOR_KEY 'products with tag overcomplicated' | jq .
```
## Settings
```javascript
tq.setup({
  /**
   * Defines if tq will produce 
   * debug output
   * 
   * @type {Boolean}
   */
  debug: false,
  
  /**
   * Defines max depth of query pipeline i.e. max amount of 
   * pipeline repetitions attempted to fulfill output.
   * Imagine, account has 10k thngs, tagged "connected"
   * running a query with settings.perPage=1 against them would attempt
   * to fulfill settings.maxItems (100 by default) which would be actually 
   * capped at 20 by default.
   * 
   * @type {Number}
   */
  depth: 20,
  
  /**
   * Defines how many entities will be queries by fetch stage
   * Ends up as a "perPage" query param on all outgoing requests
   * 
   * @type {Number}
   */
  perPage: 100,
  
  /**
   * Defines how many results at max pipeline will expect
   * 
   * @type {Number}
   */
  maxResults: 100,
  
  /**
   * API Key to use for queries
   * 
   * @see https://developers.evrythng.com/docs/api-key-scopes-and-permissions
   * @type {String} 
   */
  authorization: '',
  
  /**
   * API Url to use
   * 
   * @type {String}
   */
  apiUrl: 'https://api.evrythng.com',
});
```
## Development
```bash
# Will complile current grammar and run nearley-test 
# against given expression
npm run debug -- 'thngs where createdAt $ 65'

# Will complile nearley grammar to parser
npm run compile

# Will produce a random string which will be valid
# when feed to the runner
# i.e. "PrOdUCTs    with nAMe j where  YG ~pol"
npm run unparse
```