const LocalStorage = require("./LocalStorage");

const COMMANDS_PREFIX = "localStorage";

const register = (Cypress, localStorage) => {
  const localStorageCommands = new LocalStorage(localStorage);
  localStorageCommands.publicMethods.forEach(methodName => {
    Cypress.Commands.add(
      `${COMMANDS_PREFIX}${methodName}`,
      localStorageCommands[methodName].bind(localStorageCommands)
    );
  });
};

module.exports = {
  register
};
