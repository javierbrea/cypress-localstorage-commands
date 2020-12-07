const LOCAL_STORAGE_METHODS = ["setItem", "getItem", "removeItem", "clear"];

function logDisabled(method) {
  return function () {
    this._cy.log(`localStorage.${method} is disabled`);
  };
}

function logDisabledMethodName(localStorageMethod) {
  return `_log${localStorageMethod}Disabled`;
}

class LocalStorage {
  static get cypressCommands() {
    return [
      "clearLocalStorageSnapshot",
      "saveLocalStorage",
      "restoreLocalStorage",
      "setLocalStorage",
      "getLocalStorage",
      "removeLocalStorage",
      "disableLocalStorage",
    ];
  }

  constructor(localStorage, cy) {
    this._cy = cy;
    this._localStorage = localStorage;
    LOCAL_STORAGE_METHODS.forEach((localStorageMethod) => {
      this[logDisabledMethodName(localStorageMethod)] = logDisabled(localStorageMethod).bind(this);
    });
    this.clearLocalStorageSnapshot();
  }

  clearLocalStorageSnapshot() {
    this._snapshot = {};
  }

  saveLocalStorage() {
    if (!this._localStorage.getItem.wrappedMethod) {
      this.clearLocalStorageSnapshot();
      Object.keys(this._localStorage).forEach((key) => {
        this._snapshot[key] = this._localStorage.getItem(key);
      });
    }
  }

  restoreLocalStorage() {
    this._localStorage.clear();
    Object.keys(this._snapshot).forEach((key) => {
      this._localStorage.setItem(key, this._snapshot[key]);
    });
  }

  getLocalStorage(key) {
    return this._localStorage.getItem(key);
  }

  setLocalStorage(key, value) {
    return this._localStorage.setItem(key, value);
  }

  removeLocalStorage(key) {
    return this._localStorage.removeItem(key);
  }

  disableLocalStorage(options = {}) {
    this._cy.on("window:before:load", (win) => {
      if (
        win.localStorage &&
        !win.localStorage[LOCAL_STORAGE_METHODS[0]].wrappedMethod &&
        !this._localStorage[LOCAL_STORAGE_METHODS[0]].wrappedMethod
      ) {
        LOCAL_STORAGE_METHODS.forEach((localStorageMethod) => {
          this._cy
            .stub(this._localStorage, localStorageMethod)
            .callsFake(this[logDisabledMethodName(localStorageMethod)]);
          this._cy.stub(win.localStorage, localStorageMethod).throws(options.withError);
        });
      }
    });
  }
}

module.exports = LocalStorage;
