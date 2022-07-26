module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 99,
        parser: "flow",
      },
    ],
    "no-undef": "error",
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
  },
  extends: ["prettier"],
  root: true,
};
