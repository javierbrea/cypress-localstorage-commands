describe("localStorage cookies-accepted item", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("should be null first time page is visited", () => {
    cy.getLocalStorage("cookies-accepted").should("equal", null);
  });

  it("should be true after clicking cookies button", () => {
    cy.get("#accept-cookies").click();
    cy.getLocalStorage("cookies-accepted").should("equal", "true");
  });

  it("should be true after reloading", () => {
    cy.getLocalStorage("cookies-accepted").then((cookiesAccepted) => {
      expect(cookiesAccepted).to.equal("true");
    });
  });
});
