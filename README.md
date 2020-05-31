[![Build status][travisci-image]][travisci-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Quality Gate][quality-gate-image]][quality-gate-url] [![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fjavierbrea%2Fcypress-localstorage-commands%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/javierbrea/cypress-localstorage-commands/master)

[![NPM dependencies][npm-dependencies-image]][npm-dependencies-url] [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com) [![Last commit][last-commit-image]][last-commit-url] [![Last release][release-image]][release-url]

[![NPM downloads][npm-downloads-image]][npm-downloads-url] [![License][license-image]][license-url] [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjavierbrea%2Fcypress-localstorage-commands.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjavierbrea%2Fcypress-localstorage-commands?ref=badge_shield)

# Cypress localStorage commands

Extends Cypress' cy commands with localStorage methods. Allows preserving localStorage between tests.

## The problem

You want to preserve localStorage between Cypress tests.

## This solution

This solution allows you to use all browser localStorage methods through Cypress commands, and preserve it between tests.

## Installation

This module is distributed via npm which is bundled with node and should be installed as one of your project's devDependencies:

```bash
npm i --save-dev cypress-localstorage-commands
```

## Usage

`cypress-localstorage-commands` extends Cypress' cy command.

Add this line to your project's `cypress/support/commands.js`:

```js
import "cypress-localstorage-commands"
```

You can now use all next commands:

### Commands

Save current localStorage values into an internal "snapshot":

```js
cy.saveLocalStorage();
```

Restore localStorage to previously "snapshot" saved values:

```js
cy.restoreLocalStorage();
```

Clear localStorage "snapshot" values:

```js
cy.clearLocalStorageSnapshot();
```

Get localStorage item. Equivalent to `localStorage.getItem` in browser:

```js
cy.getLocalStorage("item");
```

Set localStorage item. Equivalent to `localStorage.setItem` in browser:

```js
cy.setLocalStorage("item", "value");
```

Remove localStorage item. Equivalent to `localStorage.removeItem` in browser:

```js
cy.removeLocalStorage("item");
```

### Preserving local storage between tests

Use `saveLocalStorage` to save a snapshot of current `localStorage` at the end of one test, and use the `restoreLocalStorage` command to restore it at the beginning of another one. _The usage of `beforeEach` and `afterEach` is recommended for this purpose._

### Examples

#### Cookies button example

Next example shows how this package can be used to test a "cookies button" _(which theorically sets a flag into `localStorage` and can be clicked only once)_

```js
describe("Accept cookies button", () => {
  const COOKIES_BUTTON = "#accept-cookies";

  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("should be visible", () => {
    cy.get(COOKIES_BUTTON).should("be.visible");
  });

  it("should not be visible after clicked", () => {
    cy.get(COOKIES_BUTTON).click();
    cy.get(COOKIES_BUTTON).should("not.be.visible");
  });

  it("should not be visible after reloading", () => {
    cy.get(COOKIES_BUTTON).should("not.be.visible");
  });
});
```

> Note the usage of `beforeEach` and `afterEach` for preserving `localStorage` between all tests. Also `clearLocalStorageSnapshot` is used in the `before` statement to avoid possible conflicts with other test files preserving localStorage.

#### localStorage assertions

Based on the previous example, assertions could be added to check values of `localStorage`:

```js
describe("localStorage cookies-accepted item", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("should be null first time page is visited", () => {
    cy.getLocalStorage("cookies-accepted").should("equal", null);
  });

  it("should be true after clicking cookies button", () => {
    cy.get("#accept-cookies").click();
    cy.getLocalStorage("cookies-accepted").should("equal", "true");
  });

  it("should be true after reloading", () => {
    cy.getLocalStorage("cookies-accepted").then(cookiesAccepted => {
      expect(cookiesAccepted).to.equal("true");
    });
  });
});
```

## Usage with TypeScript

For those writing [TypesScript tests in Cypress][cypress-typescript], this package includes TypeScript declarations.

Add "cypress-localstorage-commands" to the `types` property of the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "types": ["cypress", "cypress-localstorage-commands"]
  }
}
```

Or reference the package in the files using it:

```typescript
/// <reference types="cypress-localstorage-commands" />
```

## Contributing

Contributors are welcome.
Please read the [contributing guidelines](.github/CONTRIBUTING.md) and [code of conduct](.github/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](./LICENSE) for details.

[coveralls-image]: https://coveralls.io/repos/github/javierbrea/cypress-localstorage-commands/badge.svg
[coveralls-url]: https://coveralls.io/github/javierbrea/cypress-localstorage-commands
[travisci-image]: https://travis-ci.com/javierbrea/cypress-localstorage-commands.svg?branch=master
[travisci-url]: https://travis-ci.com/javierbrea/cypress-localstorage-commands
[last-commit-image]: https://img.shields.io/github/last-commit/javierbrea/cypress-localstorage-commands.svg
[last-commit-url]: https://github.com/javierbrea/cypress-localstorage-commands/commits
[license-image]: https://img.shields.io/npm/l/cypress-localstorage-commands.svg
[license-url]: https://github.com/javierbrea/cypress-localstorage-commands/blob/master/LICENSE
[npm-downloads-image]: https://img.shields.io/npm/dm/cypress-localstorage-commands.svg
[npm-downloads-url]: https://www.npmjs.com/package/cypress-localstorage-commands
[npm-dependencies-image]: https://img.shields.io/david/javierbrea/cypress-localstorage-commands.svg
[npm-dependencies-url]: https://david-dm.org/javierbrea/cypress-localstorage-commands
[quality-gate-image]: https://sonarcloud.io/api/project_badges/measure?project=cypress-localstorage-commands&metric=alert_status
[quality-gate-url]: https://sonarcloud.io/dashboard?id=cypress-localstorage-commands
[release-image]: https://img.shields.io/github/release-date/javierbrea/cypress-localstorage-commands.svg
[release-url]: https://github.com/javierbrea/cypress-localstorage-commands/releases

[cypress-typescript]: https://docs.cypress.io/guides/tooling/typescript-support.html
