const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://google.com',
    env: {
      userName: 'deepa',
    },
    reporter: 'mochawesome',
    retries: 1,
    defaultCommandTimeout: 40000,
    // or
    // retries: {
    //   "runMode": 1, // Configure retry attempts for `cypress run`// Default is 0
    //   "openMode": 1 // Configure retry attempts for `cypress open`// Default is 0
    // }
    // reporter: 'reporters/oport.js',
  },
})
