const express = require('express');
const _RTR = express.Router();
const _ARCHCTRL = require('../Controller/archive-controller');

_RTR.post('/' ,  _ARCHCTRL.setArchivo );
_RTR.get('/' , _ARCHCTRL.getArchivos );
_RTR.get('/:id' , _ARCHCTRL.getArchivo );
_RTR.delete('/:id' , _ARCHCTRL.removeArchivo );
_RTR.put('/:id' , _ARCHCTRL.editArchivo);

module.exports = _RTR;