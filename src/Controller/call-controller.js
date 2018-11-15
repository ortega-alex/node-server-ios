const _CLL = {};
const _CLLMDL = require("../Model/call");
const _DATE = require('dateformat');
const ObjectId = require('mongodb').ObjectID;
const _CLLSTTMDL = require("../Model/call_state");

_CLL.setCall = async (req, res) => {
    const { id } = req.params;
    const { id_stado, name, notes, sms, sms_tex, reminder, phone } = req.body;
    if (id_stado == null || !name || !phone) return res.json({ status: "err", msj: 'information is missing' });
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    const call = new _CLLMDL({
        campaign: ObjectId(id),
        id: id_stado,
        name: name,
        notes: notes,
        sms: sms,
        sms_tex: sms_tex,
        reminder: reminder,
        phone: phone,
        creation_date: day
    });
    await call.save((err) => {
        if (err) return res.status(400).json({ status: "err", msj: err });
        _CLLSTTMDL.findOneAndUpdate({ campaign: id, id: id_stado }, { $inc: { calls: 1 } }, (err) => {
            if (err) return res.status(400).json({ status: "err", msj: err });
            res.status(200).json({ status: "ok", msj: "successfully registered calls" });
        })
    });
};

_CLL.getCalls = async (req, res) => {
    await _CLLMDL.find({}, (err, calls) => {
        if (err) return res.status(400).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully", calls });
    })
};


_CLL.getCall = async (req, res) => {
    const { id, campaign } = req.params;
    await _CLLMDL.find({ campaign, id }, { "name": 1, "notes": 1, "sms": 1, "sms_tex": 1, "reminder": 1, "phone": 1 }, (err, calls) => {
        if (err) return res.status(400).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully", calls });
    })
};

module.exports = _CLL;