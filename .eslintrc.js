module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ["prettier", "jest", "no-only-tests", "mocha"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 99,
        parser: "flow",
      },
    ],
    "no-shadow": [2, { builtinGlobals: true, hoist: "all" }],
    "no-undef": "error",
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    "mocha/no-setup-in-describe": [0],
    "mocha/no-mocha-arrows": [0],
    "no-only-tests/no-only-tests": [2],
    "jest/expect-expect": [0],
  },
  extends: ["prettier", "plugin:jest/recommended", "plugin:mocha/recommended"],
  overrides: [
    {
      files: ["test-e2e/**/e2e/*.js"],
      rules: {
        "jest/valid-expect": [0],
        "jest/valid-expect-in-promise": [0],
      },
    },
  ],
  root: true,
};
