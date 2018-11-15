const express = require('express');
const _ROUTER = express.Router();
const _ACCCRTL = require('../Controller/access-controller')

_ROUTER.get('/' , _ACCCRTL.getAccess);
_ROUTER.delete('/:id' , _ACCCRTL.deleteAccess);

module.exports = _ROUTER;