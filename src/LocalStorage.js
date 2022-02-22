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
    this._namedSnapshots = {};
    this._cy = cy;
    this._localStorage = localStorage;
    LOCAL_STORAGE_METHODS.forEach((localStorageMethod) => {
      this[logDisabledMethodName(localStorageMethod)] = logDisabled(localStorageMethod).bind(this);
    });
    this.clearLocalStorageSnapshot();
  }

  _saveLocalStorageKey(key, snapshotName) {
    if (snapshotName) {
      this._namedSnapshots[snapshotName][key] = this._localStorage.getItem(key);
    } else {
      this._snapshot[key] = this._localStorage.getItem(key);
    }
  }

  clearLocalStorageSnapshot(snapshotName) {
    if (snapshotName) {
      this._namedSnapshots[snapshotName] = {};
    } else {
      this._snapshot = {};
    }
  }

  saveLocalStorage(snapshotName) {
    if (!this._localStorage.getItem.wrappedMethod) {
      this.clearLocalStorageSnapshot(snapshotName);
      Object.keys(this._localStorage).forEach((key) => {
        this._saveLocalStorageKey(key, snapshotName);
      });
    }
  }

  restoreLocalStorage(snapshotName) {
    this._localStorage.clear();
    const snapshotToRestore = !!snapshotName
      ? this._namedSnapshots[snapshotName] || {}
      : this._snapshot;
    Object.keys(snapshotToRestore).forEach((key) => {
      this._localStorage.setItem(key, snapshotToRestore[key]);
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
