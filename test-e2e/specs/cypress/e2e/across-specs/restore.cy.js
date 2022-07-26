describe("Cookies buttons", () => {
  const ACEPT_BUTTON = "#accept-cookies";
  const REJECT_BUTTON = "#reject-cookies";

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  it("accept should not be visible after loading", () => {
    cy.get(ACEPT_BUTTON).should("not.exist");
  });

  it("reject should be visible", () => {
    cy.get(REJECT_BUTTON).should("be.visible");
  });
});
