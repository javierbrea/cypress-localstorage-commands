const LocalStorageMock = require("./LocalStorage.mock");
const CypressMock = require("./Cypress.mock");

const LocalStorage = require("../src/LocalStorage");
const { register } = require("../src/register");

describe("register", () => {
  let cypressMock;
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = new LocalStorageMock();
    cypressMock = new CypressMock();
    register(cypressMock.stubs, localStorageMock.stubs);
  });

  afterEach(() => {
    localStorageMock.restore();
    cypressMock.restore();
  });

  describe("methods", () => {
    it("should register all LocalStorage public methods as commands on Cypress", () => {
      expect(cypressMock.stubs.Commands.add.callCount).toEqual(
        LocalStorage.cypressCommands.length,
      );
    });

    it("should register clearLocalStorageSnapshot method", () => {
      expect(cypressMock.stubs.Commands.add.calledWith("clearLocalStorageSnapshot")).toBe(true);
    });

    it("should register saveLocalStorage method", () => {
      expect(cypressMock.stubs.Commands.add.calledWith("saveLocalStorage")).toBe(true);
    });

    it("should register restoreLocalStorage method", () => {
      expect(cypressMock.stubs.Commands.add.calledWith("restoreLocalStorage")).toBe(true);
    });
  });
});
