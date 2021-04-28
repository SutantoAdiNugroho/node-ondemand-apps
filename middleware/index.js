const authCustMiddleware = require("./authCust");
const authDrvMiddleware = require("./authDriver");
const authAllMiddleware = require("./authAll");

module.exports = {
  authCustMiddleware: authCustMiddleware,
  authDrvMiddleware: authDrvMiddleware,
  authAllMiddleware: authAllMiddleware,
};
