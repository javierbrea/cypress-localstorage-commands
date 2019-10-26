class LocalStorage {
  constructor(localStorage) {
    this._localStorage = localStorage;
    this.clear();
  }

  get publicMethods() {
    return ["Clear", "Restore", "Save"];
  }

  Clear() {
    this._memory = {};
    this._localStorage.clear();
  }

  Save() {
    Object.keys(this._localStorage).forEach(key => {
      this._memory[key] = this._localStorage[key];
    });
  }

  Restore() {
    Object.keys(this._memory).forEach(key => {
      this._localStorage.setItem(key, this._memory[key]);
    });
  }
}

module.exports = LocalStorage;
