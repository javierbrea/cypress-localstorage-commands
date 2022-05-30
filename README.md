[![Build status][build-image]][build-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Quality Gate][quality-gate-image]][quality-gate-url] [![Mutation testing status][mutation-image]][mutation-url]

[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com) [![Last commit][last-commit-image]][last-commit-url] [![Last release][release-image]][release-url]

[![NPM downloads][npm-downloads-image]][npm-downloads-url] [![License][license-image]][license-url]

# Cypress localStorage commands

Extends Cypress' cy commands with localStorage methods. Allows preserving localStorage between tests and disabling localStorage.

## The problems

* You want to preserve localStorage between Cypress tests.
* You want to disable localStorage to check error handling.

## This solution

This solution allows you to use all browser localStorage methods through Cypress commands, and preserve it between tests. It also allows to simulate that localStorage is disabled in the browser.

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

##### `cy.saveLocalStorage([snapshotName])`

Saves current localStorage values into an internal "snapshot".

* `snapshotName` _(String)_: Optionally, a `snapshotName` can be provided, and then data from localStorage will be saved into a snapshot with that name. So, multiple snapshots can be stored.

##### `cy.restoreLocalStorage([snapshotName])`

Restores localStorage to previously "snapshot" saved values. __

* `snapshotName` _(String)_: Optional. If provided, the localStorage will be restored using data from that specific snapshot.

##### `cy.clearLocalStorageSnapshot([snapshotName])`

Clears localStorage "snapshot" values, so previously saved values are cleaned.

* `snapshotName` _(String)_: Optional. If provided, only data from that specific snapshot will be cleared.

##### `cy.getLocalStorage(item)`

Gets localStorage item. Equivalent to `localStorage.getItem` in browser.

* `item` _(String)_: Item to get from `localStorage`.

##### `cy.setLocalStorage(item, value)`

Sets localStorage item. Equivalent to `localStorage.setItem` in browser.

* `item` _(String)_: Item to set value.
* `value` _(String)_: Value to be set.

##### `cy.removeLocalStorage(item)`

Removes localStorage item. Equivalent to `localStorage.removeItem` in browser.

* `item` _(String)_: Item to be removed.

##### `cy.disableLocalStorage(options)`

Disables localStorage. It produces localStorage methods to throw errors.

* `options` _(Object)_: Options to use when disabling `localStorage`.
  * `withError` _(Error)_: If provided, invocations to `localStorage` methods will throw this error.

### Preserving local storage between tests

Use `cy.saveLocalStorage()` to save a snapshot of current `localStorage` at the end of one test, and use the `cy.restoreLocalStorage()` command to restore it at the beginning of another one. _The usage of `beforeEach` and `afterEach` is recommended for this purpose._

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

> Note the usage of `beforeEach` and `afterEach` for preserving `localStorage` between all tests. Also `cy.clearLocalStorageSnapshot` is used in the `before` statement to avoid possible conflicts with other test files preserving localStorage.

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

#### Named snapshots

Next example shows how named snapshots can be used to storage different states of `localStorage` and restore one or another depending of the test:

```js
describe("Accept cookies button", () => {
  const COOKIES_BUTTON = "#accept-cookies";

  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  it("should be visible", () => {
    cy.visit("/");
    cy.get(COOKIES_BUTTON).should("be.visible");
    cy.saveLocalStorage("cookies-not-accepted");
  });

  it("should not exist after clicked", () => {
    cy.get(COOKIES_BUTTON).click();
    cy.get(COOKIES_BUTTON).should("not.exist");
    cy.saveLocalStorage("cookies-accepted");
  });

  it("should be visible when cookies are not accepted", () => {
    cy.restoreLocalStorage("cookies-not-accepted");
    cy.visit("/");
    cy.get(COOKIES_BUTTON).should("be.visible");
  });

  it("should not exist when cookies are accepted", () => {
    cy.restoreLocalStorage("cookies-accepted");
    cy.visit("/");
    cy.get(COOKIES_BUTTON).should("not.exist");
  });
});
```

### Disabling localStorage

Use `cy.disableLocalStorage()` to simulate that `localStorage` is disabled, producing that any invocation to `localStorage.setItem`, `localStorage.getItem`, `localStorage.removeItem` or `localStorage.clear` will throw an error. [As MDN docs recommend](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem), _"developers should make sure to always catch possible exceptions from setItem()"_. This command allows to test that possible exceptions are handled correctly.

Note that:

* Only pages loaded after calling this command will have `localStorage` disabled, so always use `cy.reload` or `cy.visit` after executing it.
* The `localStorage` only remains disabled for all pages loaded during the current test. If you want to disable it for multiple tests, execute it in all of them, or in a `beforeEach` statement.
* If any of the other plugin commands (except `clearLocalStorageSnapshot`) is executed while `localStorage` is disabled, it will do nothing but producing a Cypress log as: _"localStorage.setItem is disabled"_

### Examples

#### Disabling localStorage in a single test

Based on previous "Accept cookies button" example, next tests could be added:

```js
//...
const LOCALSTORAGE_DISABLED_WARNING = "#localstorage-disabled-warning";
const LOCALSTORAGE_ERROR = "#localstorage-error";

//... should not be visible after clicked

it("should still be visible when reloading if localStorage is disabled", () => {
  cy.disableLocalStorage();
  cy.reload();
  cy.get(COOKIES_BUTTON).should("be.visible");
});

it("should display warning if localStorage is disabled", () => {
  cy.disableLocalStorage();
  cy.reload();
  cy.get(LOCALSTORAGE_DISABLED_WARNING).should("be.visible");
});

it("should display localStorage error message", () => {
  cy.disableLocalStorage();
  cy.reload();
  cy.get(LOCALSTORAGE_ERROR).should("have.text", "Error");
});

// ...should not be visible after reloading
```

#### Disabling localStorage in multiple tests

```js
describe("when localStorage is disabled", () => {
  beforeEach(() => {
    cy.disableLocalStorage({
      withError: new Error("Disabled by cypress-localstorage-commands"),
    });
    cy.visit("/");
  });

  it("should display localStorage warning", () => {
    cy.get("#localstorage-disabled-warning").should("be.visible");
  });

  it("should display localStorage error message", () => {
    cy.get("#localstorage-error").should("have.text", "Disabled by cypress-localstorage-commands");
  });

  it("should display accept-cookies button disabled", () => {
    cy.get("#accept-cookies").should("be.disabled");
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
[build-image]: https://github.com/javierbrea/cypress-localstorage-commands/workflows/build/badge.svg?branch=master
[build-url]: https://github.com/javierbrea/cypress-localstorage-commands/actions?query=workflow%3Abuild+branch%3Amaster
[mutation-image]: https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fjavierbrea%2Fcypress-localstorage-commands%2Fmaster
[mutation-url]: https://dashboard.stryker-mutator.io/reports/github.com/javierbrea/cypress-localstorage-commands/master
[last-commit-image]: https://img.shields.io/github/last-commit/javierbrea/cypress-localstorage-commands.svg
[last-commit-url]: https://github.com/javierbrea/cypress-localstorage-commands/commits
[license-image]: https://img.shields.io/npm/l/cypress-localstorage-commands.svg
[license-url]: https://github.com/javierbrea/cypress-localstorage-commands/blob/master/LICENSE
[npm-downloads-image]: https://img.shields.io/npm/dm/cypress-localstorage-commands.svg
[npm-downloads-url]: https://www.npmjs.com/package/cypress-localstorage-commands
[quality-gate-image]: https://sonarcloud.io/api/project_badges/measure?project=javierbrea_cypress-localstorage-commands&metric=alert_status
[quality-gate-url]: https://sonarcloud.io/dashboard?id=javierbrea_cypress-localstorage-commands
[release-image]: https://img.shields.io/github/release-date/javierbrea/cypress-localstorage-commands.svg
[release-url]: https://github.com/javierbrea/cypress-localstorage-commands/releases

[cypress-typescript]: https://docs.cypress.io/guides/tooling/typescript-support.html
