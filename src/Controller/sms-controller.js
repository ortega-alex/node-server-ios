const ObjectId = require("mongodb").ObjectID;
const _DATE = require('dateformat');
const _SMS = {};
const _SMSMDL = require('../Model/sms');

_SMS.setSms = async (req, res) => {
    const { id } = req.params;
    const { name, sms_text, link, start_date, start_time, calls, call_states } = req.body;
    if (!name || !sms_text || calls.length == 0) return res.status(400).json({
        status: "err",
        smj: "information is missing"
    });
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    const sms = new _SMSMDL({
        user: ObjectId(id),
        calls: calls,
        name: name,
        sms_text: sms_text,
        link: link,
        start_date: start_date,
        start_time: start_time,
        creation_date: day
    });
    await sms.save((err) => {
        if (err) return res.status(400).json({
            status: "err",
            smj: err
        });
        res.status(200).json({
            status: "ok",
            smj: "campaign sms created"
        });
    });
};

_SMS.getSmss = async (req, res) => {
    await _SMSMDL.find({}, {
        "status": 1,
        "link": 1,
        "start_time": 1,
        "start_date": 1,
        "name": 1,
        "sms campaign": 1,
        "sms_text": 1,
        "creation_date": 1
    }).populate({ path: "calls", select: "phone" })
        .exec((err, smss) => {
            if (err) return res.status(400).json({
                status: "err",
                smj: err
            });
            res.status(200).json({
                status: "ok",
                smj: "successfully",
                smss
            });
        })
};

_SMS.getSms = async (req, res) => {
    const { id } = req.params;
    await _SMSMDL.find({ user: id }, {
        "status": 1,
        "link": 1,
        "start_time": 1,
        "start_date": 1,
        "name": 1,
        "sms campaign": 1,
        "sms_text": 1,
        "creation_date": 1
    }).populate({ path: "calls", select: "phone" })
        .exec((err, smss) => {
            if (err) return res.status(400).json({
                status: "err",
                smj: err
            });
            res.status(200).json({
                status: "ok",
                smj: "successfully",
                smss
            });
        })
};

_SMS.removeSms = async (req, res) => {
    const { id } = req.params;
    await _SMSMDL.findByIdAndRemove(id, (err) => {
        if (err) return res.status(400).json({
            status: "err",
            smj: err
        });
        res.status(200).json({
            status: "ok",
            smj: "campaign removed"
        });
    });
};

module.exports = _SMS;