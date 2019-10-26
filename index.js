/* global Cypress, localStorage */

const { register } = require("./src/register");

register(Cypress, localStorage);
