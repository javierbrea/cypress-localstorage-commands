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
import 'cypress-localstorage-commands'
```

You can now use all next commands:

```js
cy.localStorageSave() // Save current localStorage values
```

```js
cy.localStorageRestore() // Restore localStorage to previously saved values
```


## Contributing

Contributors are welcome.
Please read the [contributing guidelines](.github/CONTRIBUTING.md) and [code of conduct](.github/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](./LICENSE) for details.
