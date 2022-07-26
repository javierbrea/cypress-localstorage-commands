import plugin = require("./cypress/support/cypress-localstorage-commands/plugin");

export default {
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      plugin(on, config);
    },
  },
  video: false,
}
