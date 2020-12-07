/* global Cypress, cy, localStorage */

const { register } = require("./src/register");

register(Cypress, cy, localStorage);
