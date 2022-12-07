describe("Cookies", () => {
  const SELECTORS = {
    ACCEPT_BUTTON: "#accept-cookies",
    REJECT_BUTTON: "#reject-cookies",
    LOCALSTORAGE_DISABLED_WARNING: "#localstorage-disabled-warning",
  };

  beforeEach(() => {
    cy.visit("/");
  });

  describe("when cookies are not accepted", () => {
    before(() => {
      cy.visit("/");
    });

    it("should display accept cookies button", () => {
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
    });
  });

  describe("when user click accept cookies button", () => {
    describe("without using localStorage commands", () => {
      it("should display reject cookies button", () => {
        cy.get(SELECTORS.ACCEPT_BUTTON).click();
        cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      });

      it("should accept cookies button after reloading page", () => {
        cy.getLocalStorage("cookies-accepted").should("not.exist");
        cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      });
    });

    describe("saving and restoring local storage", () => {
      it("should display reject cookies button", () => {
        cy.getLocalStorage("cookies-accepted").should("not.exist");
        cy.get(SELECTORS.ACCEPT_BUTTON).click();
        cy.getLocalStorage("cookies-accepted").should("equal", "true");
        cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
        cy.saveLocalStorage();
      });

      it("should display reject cookies button after reloading page", () => {
        cy.restoreLocalStorage();
        cy.reload();
        cy.getLocalStorage("cookies-accepted").should("equal", "true");
        cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      });
    });
  });

  describe("restoring localStorage, when user click rejects cookies button", () => {
    it("should display accept cookies button", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("cookies-accepted").should("equal", "true");
      cy.get(SELECTORS.REJECT_BUTTON).click();
      cy.getLocalStorage("cookies-accepted").should("equal", "false");
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.saveLocalStorage();
    });

    it("should display accept-cookies cookies button after reloading page", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("cookies-accepted").should("equal", "false");
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
    });

    it("should display reject-cookies cookies button after clicking accept-cookies button again", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("cookies-accepted").should("equal", "false");
      cy.get(SELECTORS.ACCEPT_BUTTON).click();
      cy.getLocalStorage("cookies-accepted").should("equal", "true");
      cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      cy.saveLocalStorage();
    });
  });

  describe("after clearing localStorage snapshot", () => {
    before(() => {
      cy.clearLocalStorageSnapshot();
    });

    it("should display accept cookies button", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("cookies-accepted").should("not.exist");
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.saveLocalStorage();
    });

    it("should display reject cookies button after clicking button", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("cookies-accepted").should("not.exist");
      cy.get(SELECTORS.ACCEPT_BUTTON).click();
      cy.getLocalStorage("cookies-accepted").should("equal", "true");
      cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      cy.saveLocalStorage();
    });
  });

  describe("disabling localStorage", () => {
    it("should not get previous localStorage value", () => {
      cy.disableLocalStorage();
      cy.reload();
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("cookies-accepted").should("not.exist");
    });

    it("should display warning if localStorage is disabled", () => {
      cy.disableLocalStorage();
      cy.reload();
      cy.get(SELECTORS.LOCALSTORAGE_DISABLED_WARNING).should("be.visible");
    });

    it("should not set cookiesAccepted localStorage value when user clicks accept cookies button", () => {
      cy.disableLocalStorage();
      cy.reload();
      cy.getLocalStorage("cookies-accepted").should("not.exist");
      cy.get(SELECTORS.ACCEPT_BUTTON).click({ force: true });
      cy.getLocalStorage("cookies-accepted").should("not.exist");
      cy.wait(500);
      cy.get(SELECTORS.REJECT_BUTTON).should("not.exist");
    });

    it("should not throw when calling to setLocalStorage, getLocalStorage or removeLocalStorage commands", () => {
      cy.disableLocalStorage();
      cy.reload();
      cy.setLocalStorage("user-preferences", '{"cookiesAccepted":false}');
      cy.getLocalStorage("user-preferences").should("not.exist");
      cy.removeLocalStorage("user-preferences");
      cy.getLocalStorage("user-preferences").should("not.exist");
    });

    it("should not throw when calling to restoreLocalStorage", () => {
      cy.disableLocalStorage();
      cy.reload();
      cy.restoreLocalStorage();
      cy.getLocalStorage("user-preferences").should("not.exist");
    });

    it("should keep storage disabled in the same test", () => {
      cy.setLocalStorage("user-preferences", '{"cookiesAccepted":true}');
      cy.saveLocalStorage();
      cy.disableLocalStorage();
      cy.reload();
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("user-preferences").should("not.exist");
    });

    it("should not clear previous localStorage snapshot", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("user-preferences").should("equal", '{"cookiesAccepted":true}');
    });

    it("should not throw when reloading multiple times", () => {
      cy.disableLocalStorage();
      cy.reload();
      cy.getLocalStorage("user-preferences").should("not.exist");
      cy.disableLocalStorage();
      cy.reload();
      cy.getLocalStorage("user-preferences").should("not.exist");
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("user-preferences");
      cy.disableLocalStorage();
      cy.reload();
      cy.getLocalStorage("user-preferences").should("not.exist");
    });
  });

  describe("when using setLocalStorage command to manually set user-preferences value", () => {
    it("should display reject cookies button", () => {
      cy.setLocalStorage("user-preferences", '{"cookiesAccepted":true}');
      cy.reload();
      cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      cy.saveLocalStorage();
    });
  });

  describe("when using getLocalStorage command to manually get localStorage items", () => {
    it("should return current localStorage values", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      cy.getLocalStorage("user-preferences").should("equal", '{"cookiesAccepted":true}');
      cy.setLocalStorage("user-preferences", '{"cookiesAccepted":false}');
      cy.getLocalStorage("user-preferences").should("equal", '{"cookiesAccepted":false}');
      cy.saveLocalStorage();
    });
  });

  describe("when using removeLocalStorage command to manually remove localStorage item", () => {
    it("should remove item from localStorage", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("user-preferences").should("equal", '{"cookiesAccepted":false}');
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.removeLocalStorage("user-preferences");
      cy.getLocalStorage("user-preferences").should("equal", null);
    });

    it("should have not removed item from localStorage snapshot", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.getLocalStorage("user-preferences").should("equal", '{"cookiesAccepted":false}');
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.removeLocalStorage("user-preferences");
      cy.saveLocalStorage();
    });

    it("should have removed item from localStorage snapshot after saving it", () => {
      cy.setLocalStorage("user-preferences", '{"cookiesAccepted":true}');
      cy.reload();
      cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      cy.restoreLocalStorage();
      cy.getLocalStorage("user-preferences").should("not.exist");
    });
  });
});
