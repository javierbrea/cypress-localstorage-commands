const LocalStorageMock = require("./LocalStorage.mock");
const CyMock = require("./Cy.mock");
const LocalStorage = require("../src/LocalStorage");

describe("LocalStorage", () => {
  let windowLocalStorageMock;
  let localStorageMock;
  let localStorage;
  let cyMock;

  beforeAll(() => {
    cyMock = new CyMock();
    localStorageMock = new LocalStorageMock();
    localStorage = new LocalStorage(localStorageMock.stubs, cyMock.stubs);
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
        localStorage.saveLocalStorage();
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        localStorage.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
      });

      it("should restore values after calling localStorage clear", () => {
        expect.assertions(2);
        localStorageMock.stubs.clear();
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
        localStorage.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("var")).toEqual("var-value");
      });

      it("should restore new values if Save is called again", () => {
        expect.assertions(2);
        localStorageMock.stubs.setItem("foo", "foo-new-value");
        localStorageMock.stubs.removeItem("var");
        localStorage.saveLocalStorage();
        localStorageMock.stubs.setItem("foo", "foo-another-new-value");
        localStorageMock.stubs.setItem("var", "foo-var-value");
        localStorage.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });

    describe("Clear method", () => {
      it("should clear values in localStorage snapshot, but maintain localStorage values", () => {
        expect.assertions(4);
        localStorageMock.stubs.setItem("var", "foo-var-value");
        localStorage.clearLocalStorageSnapshot();
        expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-new-value");
        expect(localStorageMock.stubs.getItem("var")).toEqual("foo-var-value");
        localStorage.restoreLocalStorage();
        expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });
  });

  describe("setLocalStorage method", () => {
    it("should set values in localStorage", () => {
      expect.assertions(2);
      localStorage.setLocalStorage("foo", "foo-value");
      localStorage.setLocalStorage("var", "var-value");
      expect(localStorageMock.stubs.getItem("foo")).toEqual("foo-value");
      expect(localStorageMock.stubs.getItem("var")).toEqual("var-value");
    });

    it("should not have set values in localStorage snapshot", () => {
      expect.assertions(2);
      localStorage.restoreLocalStorage();
      expect(localStorageMock.stubs.getItem("foo")).toEqual(undefined);
      expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
    });
  });

  describe("getLocalStorage method", () => {
    it("should get localStorage items", () => {
      expect.assertions(2);
      localStorage.setLocalStorage("foo", "foo-value");
      localStorage.setLocalStorage("var", "var-value");
      expect(localStorage.getLocalStorage("foo")).toEqual("foo-value");
      expect(localStorage.getLocalStorage("var")).toEqual("var-value");
    });
  });

  describe("removeLocalStorage", () => {
    it("should remove local storage items", () => {
      expect.assertions(2);
      localStorage.saveLocalStorage();
      localStorage.removeLocalStorage("foo");
      expect(localStorage.getLocalStorage("foo")).toEqual(undefined);
      expect(localStorage.getLocalStorage("var")).toEqual("var-value");
    });

    it("should not remove local storage items from localstorage snapshot", () => {
      expect.assertions(2);
      localStorage.restoreLocalStorage();
      expect(localStorage.getLocalStorage("foo")).toEqual("foo-value");
      expect(localStorage.getLocalStorage("var")).toEqual("var-value");
    });
  });

  describe("disableLocalStorage", () => {
    beforeEach(() => {
      windowLocalStorageMock = new CyMock();
      cyMock = new CyMock();
      localStorage = new LocalStorage(windowLocalStorageMock.window.localStorage, cyMock.stubs);
    });

    afterEach(() => {
      windowLocalStorageMock.restore();
    });

    it("should do nothing if page is not reloaded", () => {
      expect.assertions(3);
      localStorage.disableLocalStorage();
      expect(() => cyMock.window.localStorage.setItem()).not.toThrow();
      expect(() => cyMock.window.localStorage.getItem()).not.toThrow();
      expect(() => cyMock.window.localStorage.removeItem()).not.toThrow();
    });

    it("should use Cypress window:before:load event to create stubs", () => {
      localStorage.disableLocalStorage();
      expect(cyMock.stubs.on.getCall(0).args[0]).toEqual("window:before:load");
    });

    it("should make localStorage methods to throw after reloading page", () => {
      expect.assertions(3);
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      expect(() => cyMock.window.localStorage.setItem()).toThrow();
      expect(() => cyMock.window.localStorage.getItem()).toThrow();
      expect(() => cyMock.window.localStorage.removeItem()).toThrow();
    });

    it("should make cy.setLocalStorage command to log after reloading page", () => {
      expect.assertions(1);
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      localStorage.setLocalStorage("foo", "foo");
      expect(cyMock.stubs.log.calledWith("localStorage.setItem is disabled")).toEqual(true);
    });

    it("should make cy.getLocalStorage command to log after reloading page", () => {
      expect.assertions(1);
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      localStorage.getLocalStorage("foo");
      expect(cyMock.stubs.log.calledWith("localStorage.getItem is disabled")).toEqual(true);
    });

    it("should make cy.removeLocalStorage command to log after reloading page", () => {
      expect.assertions(1);
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      localStorage.removeLocalStorage("foo");
      expect(cyMock.stubs.log.calledWith("localStorage.removeItem is disabled")).toEqual(true);
    });

    it("should make cy.restoreLocalStorage command to log after reloading page", () => {
      expect.assertions(1);
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      localStorage.restoreLocalStorage();
      expect(cyMock.stubs.log.calledWith("localStorage.clear is disabled")).toEqual(true);
    });

    it("should make cy.saveLocalStorage command to do nothing", () => {
      expect.assertions(1);
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      localStorage.saveLocalStorage();
      expect(windowLocalStorageMock.window.localStorage.getItem.callCount).toEqual(0);
    });

    it("should do nothing if window.localStorage is not available", () => {
      cyMock.window.localStorage = null;
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      localStorage.setLocalStorage("foo", "foo");
      expect(cyMock.stubs.log.callCount).toEqual(0);
    });

    it("should work when reloading page multiple times", () => {
      expect.assertions(3);
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      cyMock.loadWindow();
      cyMock.loadWindow();
      expect(() => cyMock.window.localStorage.setItem()).toThrow();
      expect(() => cyMock.window.localStorage.getItem()).toThrow();
      expect(() => cyMock.window.localStorage.removeItem()).toThrow();
    });

    it("should work when called multiple times", () => {
      expect.assertions(3);
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      localStorage.disableLocalStorage();
      localStorage.disableLocalStorage();
      cyMock.loadWindow();
      expect(() => cyMock.window.localStorage.setItem()).toThrow();
      expect(() => cyMock.window.localStorage.getItem()).toThrow();
      expect(() => cyMock.window.localStorage.removeItem()).toThrow();
    });
  });
});
