import json from "@eslint/json";
import markdown from "@eslint/markdown";
import prettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";
import js from "@eslint/js";
import globals from "globals";
// eslint-disable-next-line import/no-unresolved
import typescriptParser from "@typescript-eslint/parser";
// eslint-disable-next-line import/no-unresolved
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import pluginJest from "eslint-plugin-jest";
import importPlugin from "eslint-plugin-import";
// eslint-disable-next-line import/no-unresolved
import pluginCypress from "eslint-plugin-cypress/flat";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    ignores: [
      "**/node_modules/**",
      ".husky/**",
      "dist/**",
      "test-e2e/*/cypress/integration/**",
      "test-e2e/app/build/**",
      "test-e2e/cypress-typescript/cypress/support/cypress-localstorage-commands/**",
      "reports/**",
    ],
  },
  {
    files: ["**/*.json"],
    language: "json/json",
    plugins: {
      json,
    },
    rules: {
      "json/no-duplicate-keys": "error",
      "json/no-empty-keys": "error",
    },
  },
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
    language: "markdown/commonmark",
    rules: {
      "markdown/no-html": [0],
    },
  },
  {
    files: [
      "**/*.js",
      "**/*.cjs",
      "**/*.mjs",
      "**/*.jsx",
      "**/*.ts",
      "**/*.tsx",
    ],
    plugins: {
      prettier,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      ...js.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...eslintPluginPrettierRecommended.rules,
      camelcase: [2, { properties: "never" }],
      "no-console": [2, { allow: ["warn", "error"] }],
      "no-shadow": [2, { builtinGlobals: true, hoist: "all" }],
      "no-undef": [2],
      "no-unused-vars": [
        2,
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
    },
    settings: {
      "import/resolver": {
        typescript: {
          extensions: [".ts", ".tsx"],
          alwaysTryTypes: true,
        },
        node: true,
      },
    },
  },
  {
    files: ["**/plugin.d.ts"],
    languageOptions: {
      globals: {
        Cypress: "readonly",
      },
    },
  },
  {
    files: ["test/**/*.spec.js"],
    plugins: {
      jest: pluginJest,
    },
    ...pluginJest.configs["flat/recommended"],
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      ...pluginJest.configs["flat/recommended"].rules,
      "jest/no-disabled-tests": "error",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "error",
      "jest/valid-expect": "error",
      "jest/prefer-strict-equal": [0],
      "jest/prefer-importing-jest-globals": [0],
      "jest/prefer-expect-assertions": [0],
      "jest/no-hooks": [0],
      "jest/prefer-called-with": [0],
      "jest/require-to-throw-message": [0],
    },
  },
  {
    files: ["test-e2e/app/src/**/*.js"],
    plugins: {
      react: reactPlugin,
    },
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        pragma: "React",
        version: "^17.0.0",
      },
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/*.cy.js", "**/*.cy.ts"],
    plugins: {
      cypress: pluginCypress,
    },
    ...pluginCypress.configs.recommended,
  },
  // TODO: Add config for cypress tests
];
