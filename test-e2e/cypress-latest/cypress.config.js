const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const defaults = webpackPreprocessor.defaultOptions;

module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      require("../../src/plugin")(on, config);
      delete defaults.webpackOptions.module.rules[0].use[0].options.presets;
      on("file:preprocessor", webpackPreprocessor(defaults));
      return config;
    },
    specPattern: [
      "../specs/cypress/e2e/*.cy.js",
      "../specs/cypress/e2e/across-specs/save.cy.js",
      "../specs/cypress/e2e/across-specs/restore.cy.js",
      "../specs/cypress/e2e/named-across-specs/save.cy.js",
      "../specs/cypress/e2e/named-across-specs/restore.cy.js",
      "../specs/cypress/e2e/named-across-specs/restore-after-clear.cy.js",
    ],
  },
  video: false,
};
