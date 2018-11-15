const ObjectId = require('mongodb').ObjectID;
const _DATE = require("dateformat");
const _CLLSTTMDL = require("../Model/call_state");
const _CMPMDL = require("../Model/campaign");
const _CLLMDL = require("../Model/call");
const _CLLSTT = {};

_CLLSTT.setCallState = async (req, res) => {
    const { id } = req.params;
    const { name, id_status } = req.body;
    if (!name || id_status == null) return res.status(400).json({
        status: "err",
        sms: "information is missing"
    });
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    const count = await _CLLMDL.find({ campaign: id, id: id_status }, (err) => {
        if (err) return res.status(400).json({
            status: 'err',
            sms: err
        });
    }).count()

    const call_state = new _CLLSTTMDL({
        campaign: ObjectId(id),
        id: id_status,
        name: name,
        calls: count,
        create_date: day
    });

    await call_state.save((err, state) => {
        if (err) return res.status(400).json({
            status: 'err',
            sms: err
        });
        _CMPMDL.findByIdAndUpdate(id, { $push: { "call_states": ObjectId(state._id) } }, { new: true }, (err) => {
            if (err) return res.status(400).json({
                status: 'err',
                sms: err
            });
            res.status(200).json({
                status: "ok",
                sms: "call state creted"
            });
        });
    });
};

_CLLSTT.getCallStates = async (req, res) => {
    await _CLLSTTMDL.find({}, { "_id": 0, "id": 1, "name": 1, "calls": 1 }, (err, call_sates) => {
        if (err) return res.status(400).json({
            status: "err",
            sms: err
        });
        res.status(200).json({
            status: "ok",
            sms: "successfully",
            call_sates
        });
    });
};

_CLLSTT.getCallState = async (req, res) => {
    const { id } = req.params;
    await _CLLSTTMDL.find({ campaign: id }, { "_id": 0, "id": 1, "name": 1, "calls": 1 }, (err, call_sates) => {
        if (err) return res.status(400).json({
            status: "err",
            sms: err
        });
        res.status(200).json({
            status: "ok",
            sms: "successfully",
            call_sates
        });
    });
};

module.exports = _CLLSTT;