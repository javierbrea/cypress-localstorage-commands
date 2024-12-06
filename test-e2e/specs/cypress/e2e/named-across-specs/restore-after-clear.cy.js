describe("Cookies buttons", () => {
  const ACCEPT_BUTTON = "#accept-cookies";

  it("accept should be visible after clearing localStorage snapshot", () => {
    cy.restoreLocalStorage("cookies-accepted");
    cy.visit("/");
    cy.get(ACCEPT_BUTTON).should("be.visible");
  });
});
