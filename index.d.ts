/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Command to save current localStorage values into an internal "snapshot"
     * @param {string} snapshotName - Name of the snapshot
     * @example cy.saveLocalStorage()
    */
    saveLocalStorage(snapshotName?: string): Chainable<undefined>

    /**
     * Command to restore localStorage to previously "snapshot" saved values
     * @param {string} snapshotName - Name of the snapshot
     * @example cy.restoreLocalStorage()
    */
    restoreLocalStorage(snapshotName?: string): Chainable<undefined>

    /**
     * Command to clear localStorage "snapshot" values
     * @param {string} snapshotName - Name of the snapshot
     * @example cy.clearLocalStorageSnapshot()
    */
    clearLocalStorageSnapshot(snapshotName?: string): Chainable<undefined>

    /**
     * Command to get localStorage item value
     * @param {string} itemKeyName - localStorage item to get
     * @example cy.getLocalStorage("cookies-accepted")
    */
    getLocalStorage(itemKeyName: string): Chainable<string|null>

    /**
     * Command to set localStorage item value
     * @param {string} itemKeyName - localStorage item to set
     * @param {string} value - value to be set
     * @example cy.setLocalStorage("cookies-accepted", "true")
    */
    setLocalStorage(itemKeyName: string, value: string): Chainable<undefined>

    /**
     * Command to remove localStorage item
     * @param {string} itemKeyName - localStorage item to remove
     * @example cy.removeLocalStorage("cookies-accepted")
    */
    removeLocalStorage(itemKeyName: string): Chainable<undefined>

    /**
     * Command to disable localStorage
     * @param {object} options - Options for disabling localStorage
     * @example cy.disableLocalStorage()
    */
    disableLocalStorage(options?: {
      withError: Error
    }): Chainable<undefined>
  }
}
