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

  beforeAll(() => {
    cyMock = new CyMock();
    cypressMock = new CypressMock();
    config = { env: {} };

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
        throw new Error();
      }
      return new Promise((resolve, reject) => {
        const result = cypressTasks[taskName](arg);
        if (typeof result === "undefined") {
          reject(new Error());
        }
        resolve(result);
      });
    });

    cypressMock.stubs.env.callsFake((envVarName) => {
      if (!envVarName) {
        throw new Error();
      }
      return config.env[envVarName];
    });

    localStorageMock = new LocalStorageMock();
    localStorage = new LocalStorage(localStorageMock.stubs, cyMock.stubs, cypressMock.stubs);
  });

  afterAll(() => {
    cyMock.restore();
    localStorageMock.restore();
  });

  describe("LocalStorage", () => {
    beforeEach(() => {
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

      it("should restore values after calling localStorage clear", async () => {
        expect.assertions(2);
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
        localStorageMock.stubs.setItem("var", "foo-var-value");
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
        await localStorage.restoreLocalStorage("first");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual("var-value");
      });
    });
  });

  describe("setLocalStorage method", () => {
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
