describe("Cookies buttons", () => {
  const ACEPT_BUTTON = "#accept-cookies";
  const REJECT_BUTTON = "#reject-cookies";

  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("accept should be visible", () => {
    cy.get(ACEPT_BUTTON).should("be.visible");
  });

  it("accept should not be visible after clicked", () => {
    cy.get(ACEPT_BUTTON).click();
    cy.get(ACEPT_BUTTON).should("not.exist");
  });

  it("reject should not be visible", () => {
    cy.get(REJECT_BUTTON).should("be.visible");
  });

  it("reject should still be visible after reloading", () => {
    cy.get(REJECT_BUTTON).should("be.visible");
    cy.get(ACEPT_BUTTON).should("not.exist");
  });
});
