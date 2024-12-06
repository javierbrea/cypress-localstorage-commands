describe("Cookies buttons", () => {
  const ACCEPT_BUTTON = "#accept-cookies";

  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("accept should be visible", () => {
    cy.get(ACCEPT_BUTTON).should("be.visible");
    cy.saveLocalStorage("cookies-not-accepted");
  });

  it("accept should not be visible after clicked", () => {
    cy.get(ACCEPT_BUTTON).click();
    cy.get(ACCEPT_BUTTON).should("not.exist");
    cy.saveLocalStorage("cookies-accepted");
  });

  it("accept should be visible when cookies are not accepted", () => {
    cy.restoreLocalStorage("cookies-not-accepted");
    cy.visit("/");
    cy.get(ACCEPT_BUTTON).should("be.visible");
  });

  it("should not be visible when cookies are accepted", () => {
    cy.restoreLocalStorage("cookies-accepted");
    cy.visit("/");
    cy.get(ACCEPT_BUTTON).should("not.exist");
  });
});
