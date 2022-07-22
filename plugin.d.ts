/// <reference types="cypress" />

/**
 * Installs cypress-localstorage-commands node events
 * @example plugin(on, config);
 * @param on Cypress plugin events
 * @param config Cypress plugin config options
 * @returns Cypress plugin config options
*/
declare function _exports(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Cypress.PluginConfigOptions
export = _exports;
