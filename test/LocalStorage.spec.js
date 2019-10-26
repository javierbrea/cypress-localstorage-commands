const LocalStorageMock = require("./LocalStorage.mock");
const LocalStorage = require("../src/LocalStorage");

describe("LocalStorage", () => {
  let localStorageMock;
  let localStorage;

  beforeAll(() => {
    localStorageMock = new LocalStorageMock();
    localStorage = new LocalStorage(localStorageMock.stubs);
  });

  afterAll(() => {
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
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
        expect(localStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });
  });
});
