const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const defaults = webpackPreprocessor.defaultOptions;

module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      delete defaults.webpackOptions.module.rules[0].use[0].options.presets;
      on("file:preprocessor", webpackPreprocessor(defaults));
    },
    specPattern: [
      "../specs/cypress/e2e/*.cy.js",
      "../specs/cypress/e2e/no-across-specs/save.cy.js",
      "../specs/cypress/e2e/no-across-specs/restore.cy.js",
    ],
  },
  video: false,
};
