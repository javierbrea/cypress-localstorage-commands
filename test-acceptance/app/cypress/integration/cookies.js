describe("Cookies", () => {
  const SELECTORS = {
    ACCEPT_BUTTON: "#accept-cookies",
    REJECT_BUTTON: "#reject-cookies"
  };

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
        cy.reload();
        cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      });
    });

    describe("saving and restoring local storage", () => {
      it("should display reject cookies button", () => {
        cy.get(SELECTORS.ACCEPT_BUTTON).click();
        cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
        cy.saveLocalStorage();
      });

      it("should display reject cookies button after reloading page", () => {
        cy.restoreLocalStorage();
        cy.reload();
        cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      });
    });
  });

  describe("restoring localStorage, when user click rejects cookies button", () => {
    it("should display accept cookies button", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.get(SELECTORS.REJECT_BUTTON).click();
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.saveLocalStorage();
    });

    it("should display accept-cookies cookies button after reloading page", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
    });

    it("should display reject-cookies cookies button after clicking accept-cookies button again", () => {
      cy.restoreLocalStorage();
      cy.reload();
      cy.get(SELECTORS.ACCEPT_BUTTON).click();
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
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.saveLocalStorage();
    });
  });
});
