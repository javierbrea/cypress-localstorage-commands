const BRANCH_NAME = process.env.BRANCH_NAME;
const STRYKER_DASHBOARD_API_KEY = process.env.STRYKER_DASHBOARD_API_KEY;

const BASE_CONFIG = {
  ignorePatterns: ["**", "!*.js", "!src/**/*.js", "!test/**/*.js"],
  packageManager: "npm",
  thresholds: {
    high: 80,
    low: 60,
    break: 80,
  },
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "jest",
  coverageAnalysis: "off",
};

const config = {
  ...BASE_CONFIG,
  dashboard:
    BRANCH_NAME && STRYKER_DASHBOARD_API_KEY
      ? {
          project: "github.com/javierbrea/cypress-localstorage-commands",
          version: BRANCH_NAME,
        }
      : undefined,
};

module.exports = config;
