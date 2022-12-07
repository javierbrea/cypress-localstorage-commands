const path = require("path");

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "@babel/eslint-parser",
  extends: ["plugin:react/recommended"],
  parserOptions: {
    sourceType: "module",
    babelOptions: {
      presets: ["@babel/preset-react"],
      configFile: path.resolve(__dirname, "babel.config.js"),
    },
  },
  globals: {},
  settings: {
    react: {
      pragma: "React",
      version: "^17.0.0",
    },
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
