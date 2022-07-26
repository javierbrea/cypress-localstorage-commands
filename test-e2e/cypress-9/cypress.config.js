module.exports = {
  baseUrl: "http://localhost:3000",
  video: false,
  testFiles: [
    "*.cy.js",
    "across-specs/save.cy.js",
    "across-specs/restore.cy.js",
    "named-across-specs/save.cy.js",
    "named-across-specs/restore.cy.js",
    "named-across-specs/restore-after-clear.cy.js",
  ],
};
