const express = require("express");
const _RTT = express.Router();
const _CLLSTTCTRL = require("../Controller/call_state-controller");

_RTT.post("/:id" , _CLLSTTCTRL.setCallState);
_RTT.get("/" , _CLLSTTCTRL.getCallStates);
_RTT.get("/:id" , _CLLSTTCTRL.getCallState);

module.exports = _RTT;