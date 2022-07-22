describe("Cookies buttons", () => {
  const ACEPT_BUTTON = "#accept-cookies";

  it("accept should not be visible after loading", () => {
    cy.restoreLocalStorage("cookies-accepted");
    cy.visit("/");
    cy.get(ACEPT_BUTTON).should("not.exist");
  });

  it("accept should be visible after clearing localStorage snapshot", () => {
    cy.clearLocalStorageSnapshot("cookies-accepted");
    cy.restoreLocalStorage("cookies-accepted");
    cy.visit("/");
    cy.get(ACEPT_BUTTON).should("be.visible");
  });
});
