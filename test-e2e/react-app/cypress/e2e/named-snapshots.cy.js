describe("Accept cookies button using named snapshots", () => {
  const COOKIES_BUTTON = "#accept-cookies";

  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  it("should be visible", () => {
    cy.visit("/");
    cy.get(COOKIES_BUTTON).should("be.visible");
    cy.saveLocalStorage("cookies-not-accepted");
  });

  it("should not be visible after clicked", () => {
    cy.get(COOKIES_BUTTON).click();
    cy.get(COOKIES_BUTTON).should("not.exist");
    cy.saveLocalStorage("cookies-accepted");
  });

  it("should be visible when cookies are not accepted", () => {
    cy.restoreLocalStorage("cookies-not-accepted");
    cy.visit("/");
    cy.get(COOKIES_BUTTON).should("be.visible");
  });

  it("should not be visible when cookies are accepted", () => {
    cy.restoreLocalStorage("cookies-accepted");
    cy.visit("/");
    cy.get(COOKIES_BUTTON).should("not.exist");
  });

  it("should be visible after clearing localStorage snapshot", () => {
    cy.clearLocalStorageSnapshot("cookies-accepted");
    cy.restoreLocalStorage("cookies-accepted");
    cy.visit("/");
    cy.get(COOKIES_BUTTON).should("be.visible");
  });
});
