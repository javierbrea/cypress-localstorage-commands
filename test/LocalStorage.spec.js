const LocalStorageMock = require("./LocalStorage.mock");
const CyMock = require("./Cy.mock");
const CypressMock = require("./Cypress.mock");
const LocalStorage = require("../src/LocalStorage");

describe("LocalStorage", () => {
  let windowLocalStorageMock;
  let localStorageMock;
  let localStorageCommands;
  let cyMock;
  let cypressMock;

  beforeAll(() => {
    cyMock = new CyMock();
    // Ensure that tasks are not called (plugin must be disabled in these tests)
    cyMock.stubs.task.throws();
    cypressMock = new CypressMock();
    localStorageMock = new LocalStorageMock();
    localStorageCommands = new LocalStorage(
      localStorageMock.stubs,
      cyMock.stubs,
      cypressMock.stubs,
    );
  });

  afterAll(() => {
    cyMock.restore();
    localStorageMock.restore();
  });

  describe("LocalStorage", () => {
    describe("save and restore methods", () => {
      it("should restore values that localStorage had when save method was called", () => {
        expect.assertions(2);
        localStorageMock.stubs.setItem("foo", "foo-value");
        localStorageMock.stubs.setItem("var", "var-value");
        localStorageCommands.saveLocalStorage();
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        localStorageCommands.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
      });

      it("should restore values after calling localStorage clear", () => {
        expect.assertions(2);
        localStorageMock.stubs.clear();
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
        localStorageCommands.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("var")).toEqual("var-value");
      });

      it("should restore new values if Save is called again", () => {
        expect.assertions(2);
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        localStorageMock.stubs.removeItem("var");
        localStorageCommands.saveLocalStorage();
        localStorageMock.stubs.setItem("foo", "foo-another-new-value");
        localStorageMock.stubs.setItem("var", "foo-var-value");
        localStorageCommands.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });

    describe("Clear method", () => {
      it("should clear values in localStorage snapshot, but maintain localStorage values", () => {
        expect.assertions(4);
        localStorageMock.stubs.setItem("var", "foo-var-value");
        localStorageCommands.clearLocalStorageSnapshot();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual("foo-var-value");
        localStorageCommands.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });
  });

  describe("LocalStorage named snapshots", () => {
    describe("save and restore methods", () => {
      it("should restore values that localStorage had when save method was called", () => {
        expect.assertions(3);
        localStorageMock.stubs.setItem("foo", "foo-value");
        localStorageMock.stubs.setItem("var", "var-value");
        localStorageCommands.saveLocalStorage("first");
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        localStorageCommands.saveLocalStorage("second");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        localStorageCommands.restoreLocalStorage("first");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
        localStorageCommands.restoreLocalStorage("second");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
      });

      it("should clear whole localStorage if snapshot to restore does not exists", () => {
        localStorageCommands.restoreLocalStorage("fourth");
        expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });

    describe("Clear method", () => {
      it("should clear values in localStorage snapshot, but maintain localStorage values", () => {
        expect.assertions(4);
        localStorageCommands.restoreLocalStorage("second");
        localStorageMock.stubs.setItem("var", "foo-var-value");
        localStorageCommands.clearLocalStorageSnapshot("second");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual("foo-var-value");
        localStorageCommands.restoreLocalStorage("second");
        expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });

      it("should not clear values from other snapshot", () => {
        localStorageCommands.restoreLocalStorage("first");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual("var-value");
      });
    });
  });

  describe("setLocalStorage method", () => {
    it("should set values in localStorage", () => {
      expect.assertions(2);
      localStorageCommands.setLocalStorage("foo", "foo-value");
      localStorageCommands.setLocalStorage("var", "var-value");
      expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
      expect(localStorageMock.stubs.getItem("var")).toEqual("var-value");
    });

    it("should not have set values in localStorage snapshot", () => {
      expect.assertions(2);
      localStorageCommands.restoreLocalStorage();
      expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
      expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
    });
  });

  describe("getLocalStorage method", () => {
    it("should get localStorage items", () => {
      expect.assertions(2);
      localStorageCommands.setLocalStorage("foo", "foo-value");
      localStorageCommands.setLocalStorage("var", "var-value");
      expect(localStorageCommands.getLocalStorage("foo")).toEqual("foo-value");
      expect(localStorageCommands.getLocalStorage("var")).toEqual("var-value");
    });
  });

  describe("removeLocalStorage", () => {
    it("should remove local storage items", () => {
      expect.assertions(2);
      localStorageCommands.saveLocalStorage();
      localStorageCommands.removeLocalStorage("foo");
      expect(localStorageCommands.getLocalStorage("foo")).toEqual(undefined);
      expect(localStorageCommands.getLocalStorage("var")).toEqual("var-value");
    });

    it("should not remove local storage items from localstorage snapshot", () => {
      expect.assertions(2);
      localStorageCommands.restoreLocalStorage();
      expect(localStorageCommands.getLocalStorage("foo")).toEqual("foo-value");
      expect(localStorageCommands.getLocalStorage("var")).toEqual("var-value");
    });
  });

  describe("LocalStorage when memory is cleaned", () => {
    describe("save and restore methods", () => {
      it("should not restore values that localStorage had when save method was called", () => {
        expect.assertions(2);
        localStorageMock.stubs.setItem("foo", "foo-value");
        localStorageMock.stubs.setItem("var", "var-value");
        localStorageCommands.saveLocalStorage();
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        localStorageCommands._namedSnapshots = {};
        localStorageCommands._snapshot = {};
        localStorageCommands.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
      });

      it("should not restore values after calling localStorage clear", () => {
        expect.assertions(2);
        localStorageMock.stubs.clear();
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
        localStorageCommands.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });

      it("should not restore new values if Save is called again", () => {
        expect.assertions(2);
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        localStorageMock.stubs.removeItem("var");
        localStorageCommands.saveLocalStorage();
        localStorageMock.stubs.setItem("foo", "foo-another-new-value");
        localStorageMock.stubs.setItem("var", "foo-var-value");
        localStorageCommands._namedSnapshots = {};
        localStorageCommands._snapshot = {};
        localStorageCommands.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });
  });

  describe("disableLocalStorage", () => {
    beforeEach(() => {
      windowLocalStorageMock = new CyMock();
      cyMock = new CyMock();
      cypressMock = new CypressMock();
      localStorageCommands = new LocalStorage(
        windowLocalStorageMock.window.localStorage,
        cyMock.stubs,
        cypressMock.stubs,
      );
    });

    afterEach(() => {
      windowLocalStorageMock.restore();
    });

    it("should do nothing if page is not reloaded", () => {
      expect.assertions(3);
      localStorageCommands.disableLocalStorage();
      expect(() => cyMock.window.localStorage.setItem()).not.toThrow();
      expect(() => cyMock.window.localStorage.getItem()).not.toThrow();
      expect(() => cyMock.window.localStorage.removeItem()).not.toThrow();
    });

    it("should use Cypress window:before:load event to create stubs", () => {
      localStorageCommands.disableLocalStorage();
      expect(cyMock.stubs.on.getCall(0).args[0]).toEqual("window:before:load");
    });

    it("should make localStorage methods to throw after reloading page", () => {
      expect.assertions(3);
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      expect(() => cyMock.window.localStorage.setItem()).toThrow();
      expect(() => cyMock.window.localStorage.getItem()).toThrow();
      expect(() => cyMock.window.localStorage.removeItem()).toThrow();
    });

    it("should make cy.setLocalStorage command to log after reloading page", () => {
      expect.assertions(1);
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      localStorageCommands.setLocalStorage("foo", "foo");
      expect(
        cyMock.stubs.log.calledWith("localStorage.setItem is disabled"),
      ).toEqual(true);
    });

    it("should make cy.getLocalStorage command to log after reloading page", () => {
      expect.assertions(1);
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      localStorageCommands.getLocalStorage("foo");
      expect(
        cyMock.stubs.log.calledWith("localStorage.getItem is disabled"),
      ).toEqual(true);
    });

    it("should make cy.removeLocalStorage command to log after reloading page", () => {
      expect.assertions(1);
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      localStorageCommands.removeLocalStorage("foo");
      expect(
        cyMock.stubs.log.calledWith("localStorage.removeItem is disabled"),
      ).toEqual(true);
    });

    it("should make cy.restoreLocalStorage command to log after reloading page", () => {
      expect.assertions(1);
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      localStorageCommands.restoreLocalStorage();
      expect(
        cyMock.stubs.log.calledWith("localStorage.clear is disabled"),
      ).toEqual(true);
    });

    it("should make cy.saveLocalStorage command to do nothing", () => {
      expect.assertions(1);
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      localStorageCommands.saveLocalStorage();
      expect(
        windowLocalStorageMock.window.localStorage.getItem.callCount,
      ).toEqual(0);
    });

    it("should do nothing if window.localStorage is not available", () => {
      cyMock.window.localStorage = null;
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      localStorageCommands.setLocalStorage("foo", "foo");
      expect(cyMock.stubs.log.callCount).toEqual(0);
    });

    it("should work when reloading page multiple times", () => {
      expect.assertions(3);
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      cyMock.loadWindow();
      cyMock.loadWindow();
      expect(() => cyMock.window.localStorage.setItem()).toThrow();
      expect(() => cyMock.window.localStorage.getItem()).toThrow();
      expect(() => cyMock.window.localStorage.removeItem()).toThrow();
    });

    it("should work when called multiple times", () => {
      expect.assertions(3);
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      localStorageCommands.disableLocalStorage();
      localStorageCommands.disableLocalStorage();
      cyMock.loadWindow();
      expect(() => cyMock.window.localStorage.setItem()).toThrow();
      expect(() => cyMock.window.localStorage.getItem()).toThrow();
      expect(() => cyMock.window.localStorage.removeItem()).toThrow();
    });

    it("should throw error provided in the 'withError' option", () => {
      expect.assertions(3);
      const error = new Error("foo");
      localStorageCommands.disableLocalStorage({
        withError: error,
      });
      cyMock.loadWindow();
      expect(() => cyMock.window.localStorage.setItem()).toThrow(error);
      expect(() => cyMock.window.localStorage.getItem()).toThrow(error);
      expect(() => cyMock.window.localStorage.removeItem()).toThrow(error);
    });
  });
});
