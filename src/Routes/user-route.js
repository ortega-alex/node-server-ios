const express = require('express');
const _ROUTER = express.Router();
const _USRCTRL = require('../Controller/user-controller')

_ROUTER.post('/' , _USRCTRL.register);
_ROUTER.delete('/:id' , _USRCTRL.deleteUser);
_ROUTER.get('/' , _USRCTRL.getUsers);
_ROUTER.get('/:id' , _USRCTRL.getUser);
_ROUTER.put('/:id' , _USRCTRL.editUser);

module.exports = _ROUTER;