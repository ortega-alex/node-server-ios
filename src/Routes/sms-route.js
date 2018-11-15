const express = require('express');
const _RTR = express.Router();
const _SMSCTRL = require("../Controller/sms-controller")

_RTR.post("/:id" , _SMSCTRL.setSms);
_RTR.get("/" , _SMSCTRL.getSmss);
_RTR.get("/:id" , _SMSCTRL.getSms);
_RTR.delete("/:id" , _SMSCTRL.removeSms);

module.exports = _RTR;