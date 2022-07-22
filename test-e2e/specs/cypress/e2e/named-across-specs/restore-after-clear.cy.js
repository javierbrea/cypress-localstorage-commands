describe("Cookies buttons", () => {
  const ACEPT_BUTTON = "#accept-cookies";

  it("accept should be visible after clearing localStorage snapshot", () => {
    cy.restoreLocalStorage("cookies-accepted");
    cy.visit("/");
    cy.get(ACEPT_BUTTON).should("be.visible");
  });
});
