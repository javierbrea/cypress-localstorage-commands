describe("Cookies buttons", () => {
  const ACEPT_BUTTON = "#accept-cookies";
  const REJECT_BUTTON = "#reject-cookies";

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  it("accept should be visible after loading", () => {
    cy.get(ACEPT_BUTTON).should("be.visible");
  });

  it("reject should not exist", () => {
    cy.get(REJECT_BUTTON).should("not.exist");
  });
});
