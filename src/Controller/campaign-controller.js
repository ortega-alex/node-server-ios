const _CMPN = {};
const _CMPNMDL = require('../Model/campaign');
const _DATE = require('dateformat');
const ObjectId = require('mongodb').ObjectID;
const _CLLMDL = require("../Model/call");
const _CLLSTTMDL = require("../Model/call_state");

_CMPN.setCampaign = async (req, res) => {
    const { name, type } = req.body;
    const { id } = req.params;
    if (!name || !type) return res.json({ status: "err", msj: 'information is missing' });
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    //await _CMPNMDL.findOne({ user : id } , { "_id" : 0 , "id" : 1 } , { sort: { id: -1 } , limit: 1 } , (err , result ) => {
    const campaign = new _CMPNMDL({
        user: ObjectId(id),
        //call_state : call_state ,
        name: name,
        type: type,
        creation_date: day
    });
    campaign.save((err) => {
        if (err) return res.status(400).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "campania registered successfully" });
    });
};

_CMPN.getCampaigns = async (req, res) => {
    await _CMPNMDL.find({}, { "name": 1, "type": 1, "creation_date": 1 })
        .populate({ path: "call_states", select: ["id", "name", "calls"] })
        .exec((err, campaigns) => {
            if (err) return res.status(400).json({ status: "err", msj: err });
            res.status(200).json({ status: "ok", msj: "successfully", campaigns });
        });
};

_CMPN.getCampaign = async (req, res) => {
    const { id } = req.params;
    await _CMPNMDL.find({ user: id }, { "name": 1, "type": 1, "creation_date": 1 })
        .populate({ path: "call_states", select: ["id", "name", "calls"] })
        .exec((err, campaigns) => {
            if (err) return res.status(400).json({ status: "err", msj: err });
            res.status(200).json({ status: "ok", msj: "successfully", campaigns });
        });
};

_CMPN.removeCampaign = async (req, res) => {
    const { id } = req.params;
    await _CMPNMDL.findByIdAndRemove(id, (err) => {
        if (err) return res.status(400).json({ status: 'err', msj: err });
        _CLLSTTMDL.remove({ campaign: id }, (err) => {
            if (err) return res.status(400).json({ status: 'err', msj: err });
            _CLLMDL.remove({ campaign: id }, (err) => {
                if (err) return res.status(400).json({ status: 'err', msj: err });
                res.status(200).json({ status: "ok", msj: "campaign removed" });
            });
        });
    });
}

module.exports = _CMPN;