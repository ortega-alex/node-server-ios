const express = require('express');
const _RTR = express.Router();
const _LGNCTRL = require('../Controller/login-controller');

_RTR.post('/' , _LGNCTRL.login)

module.exports = _RTR ;