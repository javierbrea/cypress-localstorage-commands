/* global Cypress, cy */

const { register } = require("./src/register");

register(Cypress, cy, localStorage);
