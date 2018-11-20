const _ARCH = {};
const _ARCHMDL = require('../Model/archive');
const _DATE = require('dateformat');
const path = require("path");
const xlsx = require('xlsx');

_ARCH.setArchivo = async (req, res) => {
    const { file } = req.files

    if (!file) return res.status(400).json({ status: "err", msj: 'information is missing' });
    if (!file.name.match(/\.(xlsx|csv)$/i)) return res.status(400).json({ status: "err", msj: 'file not allowed' });
   
    let rute = path.join(__dirname, `../public/files/${file.name}`);
    await file.mv(rute, err => {
        if (err) return res.status(500).send({ message: err });
        let read = xlsx.readFile(rute);
        let sheets = read.SheetNames;
        let json = xlsx.utils.sheet_to_json(read.Sheets[sheets]);
        let keys = Object.keys(json[0]);

        let headers = [];
        keys.forEach((res, index) => {
            let objc = { text: res, position: index };
            headers.push(objc);
        });

        var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
        const archive = new _ARCHMDL({
            name: file.name,
            rute: rute,
            headers: headers,
            date_creation: day
        });
        archive.save((err, file) => {
            if (err) return res.status(500).json({ status: "err2", msj: err });
            res.status(200).json({ status: "ok", msj: "successfully registered file", file });
        });
    });
};

_ARCH.getArchivos = async (req, res) => {
    await _ARCHMDL.find({}, { name: 1, headers: 1, date_creation: 1, rute: 1 }, (err, files) => {
        if (err) return res.status(500).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully", files });
    })
};

_ARCH.getArchivo = async (req, res) => {
    const { id } = req.params;
    await _ARCHMDL.findById(id, { name: 1, headers: 1, date_creation: 1, rute: 1 }, (err, file) => {
        if (err) return res.status(500).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully", file });
    });
};

_ARCH.removeArchivo = async (req, res) => {
    const { id } = req.params;
    await _ARCHMDL.findByIdAndRemove(id, (err) => {
        if (err) return res.status(500).json({ status: 'err', msj: err });
        res.status(200).json({ status: "ok", msj: "file removed" });
    });
}

_ARCH.editArchivo = async (req, res) => {
    const { id } = req.params;
    const { name, headers } = req.body;
    if (!name || !headers) return res.status(400).json({ status: "err", msj: 'information is missing' });
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    const archive = {
        name: name,
        headers: headers,
        date_modification: day
    }
    await _ARCHMDL.findByIdAndUpdate(id, { $set: archive }, { new: true }, (err) => {
        if (err) return res.status(500).json({ status: 'err', msj: err });
        res.status(200).json({ status: "ok", msj: "file updated" });
    });
}

module.exports = _ARCH;