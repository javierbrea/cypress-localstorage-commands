class LocalStorage {
  static get cypressCommands() {
    return ["clearLocalStorageSnapshot", "saveLocalStorage", "restoreLocalStorage"];
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
}

module.exports = LocalStorage;
