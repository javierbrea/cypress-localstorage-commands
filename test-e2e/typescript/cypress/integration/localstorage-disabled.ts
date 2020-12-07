// Next reference is commented as package is not available at node_modules
//// <reference types="cypress-localstorage-commands" />

describe("when localStorage is disabled", () => {
  beforeEach(() => {
    cy.disableLocalStorage();
    cy.visit("/");
  });

  it("should display localStorage warning", () => {
    cy.get("#localstorage-disabled-warning").should("be.visible");
  });

  it("should display accept-cookies button disabled", () => {
    cy.get("#accept-cookies").should("be.disabled");
  });
});
