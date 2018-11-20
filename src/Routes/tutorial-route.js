const express = require("express");
const _RTR = express.Router();
const _TTRLCTRL = require("../Controller/tutorial-controller");

_RTR.post("/", _TTRLCTRL.setTuto);
_RTR.get("/", _TTRLCTRL.getTutos);
_RTR.get("/:id", _TTRLCTRL.getTuto);
_RTR.delete("/:id", _TTRLCTRL.deleteTuto);
_RTR.put("/:id", _TTRLCTRL.updateTuto);

module.exports = _RTR;