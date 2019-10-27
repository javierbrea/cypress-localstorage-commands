class LocalStorage {
  static get cypressCommands() {
    return [
      "clearLocalStorageSnapshot",
      "saveLocalStorage",
      "restoreLocalStorage",
      "setLocalStorage",
      "getLocalStorage",
      "removeLocalStorage"
    ];
  }

  constructor(localStorage) {
    this._localStorage = localStorage;
    this.clearLocalStorageSnapshot();
  }

  clearLocalStorageSnapshot() {
    this._snapshot = {};
  }

  saveLocalStorage() {
    this.clearLocalStorageSnapshot();
    Object.keys(this._localStorage).forEach(key => {
      this._snapshot[key] = this._localStorage.getItem(key);
    });
  }

  restoreLocalStorage() {
    this._localStorage.clear();
    Object.keys(this._snapshot).forEach(key => {
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
}

module.exports = LocalStorage;
