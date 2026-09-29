const LocalStorage = require("./LocalStorage");

const register = (Cypress, cy, windowLocalStorage) => {
  const localStorageCommands = new LocalStorage(
    windowLocalStorage,
    cy,
    Cypress,
  );

  // Register commands
  LocalStorage.cypressCommands.forEach((commandName) => {
    Cypress.Commands.add(
      commandName,
      localStorageCommands[commandName].bind(localStorageCommands),
    );
  });
};

module.exports = {
  register,
};
