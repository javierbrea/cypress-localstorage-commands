function logDisabled(method) {
  return function () {
    this._cy.log(`localStorage.${method} is disabled`);
  };
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
    this._logSetDisabled = logDisabled("setItem").bind(this);
    this._logGetDisabled = logDisabled("getItem").bind(this);
    this._logRemoveDisabled = logDisabled("removeItem").bind(this);
    this._logClearDisabled = logDisabled("clear").bind(this);
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

  disableLocalStorage() {
    this._cy.on("window:before:load", (win) => {
      if (
        win.localStorage &&
        !win.localStorage.setItem.wrappedMethod &&
        !this._localStorage.setItem.wrappedMethod
      ) {
        this._cy.stub(this._localStorage, "setItem").callsFake(this._logSetDisabled);
        this._cy.stub(this._localStorage, "getItem").callsFake(this._logGetDisabled);
        this._cy.stub(this._localStorage, "removeItem").callsFake(this._logRemoveDisabled);
        this._cy.stub(this._localStorage, "clear").callsFake(this._logClearDisabled);
        this._cy.stub(win.localStorage, "setItem").throws();
        this._cy.stub(win.localStorage, "getItem").throws();
        this._cy.stub(win.localStorage, "removeItem").throws();
        this._cy.stub(win.localStorage, "clear").throws();
      }
    });
  }
}

module.exports = LocalStorage;
