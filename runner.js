const cypress = require('cypress')
const configImported = require('./cypress.config')

// cypress
cypress.run({
  // specs to run here
  spec: 'cypress/e2e/',
  // browser to run here
  browser: 'chrome',
  headed: true,
  config: configImported.e2e,
})
