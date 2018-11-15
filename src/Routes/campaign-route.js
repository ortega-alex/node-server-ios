const express = require('express');
const _RTR = express.Router();
const _CMPNCTRL = require('../Controller/campaign-controller');

_RTR.post('/:id' ,  _CMPNCTRL.setCampaign );
_RTR.get('/' , _CMPNCTRL.getCampaigns );
_RTR.get('/:id' , _CMPNCTRL.getCampaign );
_RTR.delete('/:id' , _CMPNCTRL.removeCampaign );

module.exports = _RTR;