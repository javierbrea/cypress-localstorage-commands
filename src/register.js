const LocalStorage = require("./LocalStorage");

const register = (Cypress, localStorage) => {
  const localStorageCommands = new LocalStorage(localStorage);
  LocalStorage.publicMethods.forEach(methodName => {
    Cypress.Commands.add(methodName, localStorageCommands[methodName].bind(localStorageCommands));
  });
};

module.exports = {
  register
};
