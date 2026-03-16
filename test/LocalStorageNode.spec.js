const LocalStorageMock = require("./LocalStorage.mock");
const CyMock = require("./Cy.mock");
const CypressMock = require("./Cypress.mock");
const LocalStorage = require("../src/LocalStorage");
const plugin = require("../src/plugin");

describe("LocalStorage with node events", () => {
  let localStorageMock;
  let localStorage;
  let cyMock;
  let cypressMock;
  let cypressTasks;
  let config;

  const setupTest = (useExpose) => {
    cyMock = new CyMock();
    cypressMock = new CypressMock();
    config = useExpose ? { expose: {} } : { env: {} };

    cypressTasks = {};

    plugin((cyEvent, tasks) => {
      if (cyEvent === "task") {
        Object.keys(tasks).forEach((taskName) => {
          cypressTasks[taskName] = tasks[taskName];
        });
      }
    }, config);

    cyMock.stubs.task.callsFake((taskName, arg) => {
      if (!taskName) {
        throw new Error("Task name is required");
      }
      return new Promise((resolve, reject) => {
        const result = cypressTasks[taskName](arg);
        if (result === undefined) {
          reject(new Error("Task did not return a value"));
        }
        resolve(result);
      });
    });

    if (useExpose) {
      cypressMock.stubs.expose.callsFake((envVarName) => {
        if (!envVarName) {
          throw new Error("Env var name is required");
        }
        return config.expose[envVarName];
      });
    } else {
      cypressMock.stubs.env.callsFake((envVarName) => {
        if (!envVarName) {
          throw new Error("Env var name is required");
        }
        return config.env[envVarName];
      });
      // Mock expose to be undefined to simulate older Cypress versions
      cypressMock.stubs.expose = undefined;
    }

    localStorageMock = new LocalStorageMock();
    localStorage = new LocalStorage(
      localStorageMock.stubs,
      cyMock.stubs,
      cypressMock.stubs,
    );
  };

  afterEach(() => {
    cyMock.restore();
    localStorageMock.restore();
  });

  describe("when using Cypress.env (Cypress < 15.10.0)", () => {
    beforeEach(() => {
      setupTest(false);
    });

    it("should configure and read node events status correctly", () => {
      expect(config.env.LOCALSTORAGE_NODE_EVENTS_INSTALLED).toEqual(true);
      expect(localStorage._nodeEventsInstalled).toEqual(true);
    });
  });

  describe("when using Cypress.expose (Cypress >= 15.10.0)", () => {
    beforeEach(() => {
      setupTest(true);
    });

    it("should configure and read node events status correctly", () => {
      expect(config.expose.LOCALSTORAGE_NODE_EVENTS_INSTALLED).toEqual(true);
      expect(localStorage._nodeEventsInstalled).toEqual(true);
    });
  });

  describe("LocalStorage", () => {
    beforeEach(() => {
      setupTest(false); // Can use either for standard testing
      // clear memory to ensure that plugin is working
      localStorage._namedSnapshots = {};
      localStorage._snapshot = {};
    });

    describe("save and restore methods", () => {
      it("should restore values that localStorage had when save method was called", async () => {
        expect.assertions(2);
        localStorageMock.stubs.setItem("foo", "foo-value");
        localStorageMock.stubs.setItem("var", "var-value");
        await localStorage.saveLocalStorage();
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        await localStorage.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
      });

      it("should restore values from node snapshot when memory snapshot is empty", async () => {
        expect.assertions(1);
        localStorageMock.stubs.setItem("foo", "foo-value");
        await localStorage.saveLocalStorage();
        localStorageMock.stubs.clear();
        localStorage._snapshot = {};
        localStorage._namedSnapshots = {};
        await localStorage.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
      });

      it("should restore values after calling localStorage clear", async () => {
        expect.assertions(2);
        localStorageMock.stubs.setItem("var", "var-value");
        await localStorage.saveLocalStorage();
        localStorageMock.stubs.clear();
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
        await localStorage.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("var")).toEqual("var-value");
      });

      it("should restore new values if Save is called again", async () => {
        expect.assertions(2);
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        localStorageMock.stubs.removeItem("var");
        await localStorage.saveLocalStorage();
        localStorageMock.stubs.setItem("foo", "foo-another-new-value");
        localStorageMock.stubs.setItem("var", "foo-var-value");
        await localStorage.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });

    describe("Clear method", () => {
      it("should clear values in localStorage snapshot, but maintain localStorage values", async () => {
        expect.assertions(4);
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        localStorageMock.stubs.setItem("var", "foo-var-value");
        await localStorage.saveLocalStorage();
        await localStorage.clearLocalStorageSnapshot();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual("foo-var-value");
        await localStorage.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });
  });

  describe("LocalStorage named snapshots", () => {
    beforeEach(() => {
      setupTest(false);
      localStorage._namedSnapshots = {};
      localStorage._snapshot = {};
    });
    describe("save and restore methods", () => {
      it("should restore values that localStorage had when save method was called", async () => {
        expect.assertions(3);
        localStorageMock.stubs.setItem("foo", "foo-value");
        localStorageMock.stubs.setItem("var", "var-value");
        await localStorage.saveLocalStorage("first");
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        await localStorage.saveLocalStorage("second");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        await localStorage.restoreLocalStorage("first");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
        await localStorage.restoreLocalStorage("second");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
      });

      it("should clear whole localStorage if snapshot to restore does not exists", async () => {
        await localStorage.restoreLocalStorage("fourth");
        expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });

    describe("Clear method", () => {
      it("should clear values in localStorage snapshot, but maintain localStorage values", async () => {
        expect.assertions(4);
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        localStorageMock.stubs.setItem("var", "foo-var-value");
        await localStorage.saveLocalStorage("second");
        await localStorage.restoreLocalStorage("second");
        localStorageMock.stubs.setItem("var", "foo-var-value");
        await localStorage.clearLocalStorageSnapshot("second");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual("foo-var-value");
        await localStorage.restoreLocalStorage("second");
        expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });

      it("should not clear values from other snapshot", async () => {
        localStorageMock.stubs.setItem("foo", "foo-value");
        localStorageMock.stubs.setItem("var", "var-value");
        await localStorage.saveLocalStorage("first");
        await localStorage.restoreLocalStorage("first");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual("var-value");
      });
    });
  });

  describe("setLocalStorage method", () => {
    beforeEach(() => {
      setupTest(false);
      localStorage._namedSnapshots = {};
      localStorage._snapshot = {};
    });
    it("should set values in localStorage", async () => {
      expect.assertions(2);
      await localStorage.setLocalStorage("foo", "foo-value");
      await localStorage.setLocalStorage("var", "var-value");
      expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
      expect(localStorageMock.stubs.getItem("var")).toEqual("var-value");
    });

    it("should not have set values in localStorage snapshot", async () => {
      expect.assertions(2);
      await localStorage.restoreLocalStorage();
      expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
      expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
    });
  });
});
