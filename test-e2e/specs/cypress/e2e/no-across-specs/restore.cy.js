describe("Cookies buttons", () => {
  const ACCEPT_BUTTON = "#accept-cookies";
  const REJECT_BUTTON = "#reject-cookies";

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  it("accept should be visible after loading", () => {
    cy.get(ACCEPT_BUTTON).should("be.visible");
  });

  it("reject should not exist", () => {
    cy.get(REJECT_BUTTON).should("not.exist");
  });
});
