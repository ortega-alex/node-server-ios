const express = require('express');
const _RTT = express.Router();
const _MDCTRL = require("../Controller/media-controller");
const path = require('path');

_RTT.post("/" , _MDCTRL.setMedia);
_RTT.get("/:type" , _MDCTRL.getMedias);

module.exports = _RTT;