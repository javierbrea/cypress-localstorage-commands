// Next reference is commented as package is not available at node_modules
//// <reference types="cypress-localstorage-commands" />

describe("Accept cookies button", () => {
  const COOKIES_BUTTON = "#accept-cookies";
  const LOCALSTORAGE_DISABLED_WARNING = "#localstorage-disabled-warning";
  const LOCALSTORAGE_ERROR = "#localstorage-error";

  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("should be visible", () => {
    cy.get(COOKIES_BUTTON).should("be.visible");
  });

  it("should not be visible after clicked", () => {
    cy.get(COOKIES_BUTTON).click();
    cy.get(COOKIES_BUTTON).should("not.exist");
  });

  it("should still be visible when reloading if localStorage is disabled", () => {
    cy.disableLocalStorage();
    cy.reload();
    cy.get(COOKIES_BUTTON).should("be.visible");
  });

  it("should display warning if localStorage is disabled", () => {
    cy.disableLocalStorage();
    cy.reload();
    cy.get(LOCALSTORAGE_DISABLED_WARNING).should("be.visible");
  });

  it("should display localStorage error message", () => {
    cy.disableLocalStorage();
    cy.reload();
    cy.get(LOCALSTORAGE_ERROR).should("have.text", "Error");
  });

  it("should not be visible after reloading", () => {
    cy.get(COOKIES_BUTTON).should("not.exist");
  });
});
