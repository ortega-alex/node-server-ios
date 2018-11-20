const _TTRL = {}
const _TTRLMDL = require("../Model/tutorial");
const _DATE = require("dateformat");

_TTRL.setTuto = async (req, res) => {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ status: "err", msj: "informarion is missing" });
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    const tuto = new _TTRLMDL({
        name: name,
        url: url,
        creation_date: day
    });
    await tuto.save((err) => {
        if (err) return res.status(500).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully" });
    });
}

_TTRL.getTutos = async (req, res) => {
    await _TTRLMDL.find({}, { _id : 0 , name: 1, url: 1 }, (err, tutorials) => {
        if (err) return res.status(500).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully", tutorials });
    })
}

_TTRL.getTuto = async (req, res) => {
    const { id } = req.params;
    await _TTRLMDL.findById(id, { _id : 0 , name: 1, url: 1 }, (err, tutorial) => {
        if (err) return res.status(500).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully", tutorial });
    })
}

_TTRL.deleteTuto = async (req, res) => {
    const { id } = req.params;
    await _TTRLMDL.findByIdAndRemove(id, (err) => {
        if (err) return res.status(500).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "tutorial removed" });
    });
}

_TTRL.updateTuto = async (req, res) => {
    const { id } = req.params;
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ status: "err", msj: "informarion is missing" });
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    const tuto = ({
        name: name,
        url: url,
        modification_date: day
    });
    await _TTRLMDL.findByIdAndUpdate(id, { $set: tuto }, { new: true }, (err) => {
        if (err) return res.status(500).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "updated tutorial" });
    });
}

module.exports = _TTRL