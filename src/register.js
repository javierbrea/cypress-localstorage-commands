const LocalStorage = require("./LocalStorage");

const register = (Cypress, localStorage) => {
  const localStorageCommands = new LocalStorage(localStorage);
  LocalStorage.cypressCommands.forEach(commandName => {
    Cypress.Commands.add(
      commandName,
      localStorageCommands[commandName].bind(localStorageCommands)
    );
  });
};

module.exports = {
  register
};
