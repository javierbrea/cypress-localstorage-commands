const LocalStorage = require("./LocalStorage");

const register = (Cypress, cy, localStorage) => {
  const localStorageCommands = new LocalStorage(localStorage, cy, Cypress);

  // Register commands
  LocalStorage.cypressCommands.forEach((commandName) => {
    Cypress.Commands.add(
      commandName,
      localStorageCommands[commandName].bind(localStorageCommands)
    );
  });
};

module.exports = {
  register,
};
