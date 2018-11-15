const express = require("express");
const _RTR = express.Router();
const _CLLCTRL = require("../Controller/call-controller");

_RTR.post("/:id" , _CLLCTRL.setCall);
_RTR.get("/" , _CLLCTRL.getCalls);
_RTR.get("/:id/:campaign" , _CLLCTRL.getCall);

module.exports = _RTR ;