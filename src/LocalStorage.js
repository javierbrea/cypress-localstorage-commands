const {
  GET_SNAPSHOT_TASK,
  SET_SNAPSHOT_TASK,
  CLEAR_SNAPSHOT_TASK,
  NODE_EVENTS_INSTALLED,
} = require("./constants");

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

  constructor(localStorage, cy, Cypress) {
    this._nodeEventsInstalled = Cypress.env(NODE_EVENTS_INSTALLED) === true;
    this._snapshot = {};
    this._namedSnapshots = {};
    this._cy = cy;
    this._localStorage = localStorage;

    LOCAL_STORAGE_METHODS.forEach((localStorageMethod) => {
      this[logDisabledMethodName(localStorageMethod)] = logDisabled(localStorageMethod).bind(this);
    });
  }

  _saveLocalStorageKeyToMemory(key, snapshotName) {
    if (snapshotName) {
      this._namedSnapshots[snapshotName][key] = this._localStorage.getItem(key);
    } else {
      this._snapshot[key] = this._localStorage.getItem(key);
    }
  }

  _saveLocalStorageToMemory(snapshotName) {
    Object.keys(this._localStorage).forEach((key) => {
      this._saveLocalStorageKeyToMemory(key, snapshotName);
    });
  }

  _clearMemorySnapshot(snapshotName) {
    if (snapshotName) {
      this._namedSnapshots[snapshotName] = {};
    } else {
      this._snapshot = {};
    }
  }

  _getSnapshotFromMemory(snapshotName) {
    return snapshotName ? this._namedSnapshots[snapshotName] : this._snapshot;
  }

  _restoreLocalStorageFromSnapshot(obj = {}) {
    Object.keys(obj).forEach((key) => {
      this._localStorage.setItem(key, obj[key]);
    });
  }

  _restoreLocalStorageFromMemory(snapshotName) {
    this._restoreLocalStorageFromSnapshot(this._getSnapshotFromMemory(snapshotName));
  }

  _copySnapshotFromMemoryToNode(snapshotName) {
    if (this._nodeEventsInstalled) {
      return this._cy.task(SET_SNAPSHOT_TASK, {
        name: snapshotName,
        snapshot: this._getSnapshotFromMemory(snapshotName),
      });
    }
  }

  _clearNodeSnapshot(snapshotName) {
    if (this._nodeEventsInstalled) {
      return this._cy.task(CLEAR_SNAPSHOT_TASK, snapshotName);
    }
  }

  _restoreLocalStorageFromNode(snapshotName) {
    return this._cy.task(GET_SNAPSHOT_TASK, snapshotName).then((snapshot) => {
      this._restoreLocalStorageFromSnapshot(snapshot);
    });
  }

  clearLocalStorageSnapshot(snapshotName) {
    this._clearMemorySnapshot(snapshotName);
    return this._clearNodeSnapshot(snapshotName);
  }

  saveLocalStorage(snapshotName) {
    if (!this._localStorage.getItem.wrappedMethod) {
      this.clearLocalStorageSnapshot(snapshotName);
      this._saveLocalStorageToMemory(snapshotName);
      return this._copySnapshotFromMemoryToNode(snapshotName);
    }
  }

  restoreLocalStorage(snapshotName) {
    this._localStorage.clear();
    if (this._nodeEventsInstalled) {
      return this._restoreLocalStorageFromNode(snapshotName);
    } else {
      this._restoreLocalStorageFromMemory(snapshotName);
    }
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
