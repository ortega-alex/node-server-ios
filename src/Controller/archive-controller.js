const _ARCH = {};
const _ARCHMDL = require('../Model/archive');
const _DATE = require('dateformat');

_ARCH.setArchivo = async (req, res) => {
    const { name, headers } = req.body;
    if (!name || !headers) return res.json({ status: "err", msj: 'information is missing' });
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    const archivo = new _ARCHMDL({
        name: name,
        headers: headers,
        fecha_creacion: day
    });
    await archivo.save((err) => {
        if (err) return res.status(400).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully registered file" });
    });
};

_ARCH.getArchivos = async (req, res) => {
    await _ARCHMDL.findOne({}, { "name": 1, "headers": 1, "fecha_creacion": 1 }, (err, archivos) => {
        if (err) return res.status(400).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully", archivos });
    })
};

_ARCH.getArchivo = async (req, res) => {
    const { id } = req.params;
    await _ARCHMDL.findById(id, { "name": 1, "headers": 1, "fecha_creacion": 1 }, (err, archivo) => {
        if (err) return res.status(400).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully", archivo });
    });
};

_ARCH.removeArchivo = async (req, res) => {
    const { id } = req.params;
    await _ARCHMDL.findByIdAndRemove(id, (err) => {
        if (err) return res.status(400).json({ status: 'err', msj: err });
        res.status(200).json({ status: "ok", msj: "file removed" });
    });
}

_ARCH.editArchivo = async (req, res) => {
    const { id } = req.params;
    const { name, headers } = req.body;
    if (!name || !headers) return res.status(400).json({ status: 'err', msj: err });
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    const archivo = {
        name: name,
        headers: headers,
        fecha_modificacion: day
    }
    await _ARCHMDL.findByIdAndUpdate(id, { $set: archivo }, { new: true }, (err) => {
        if (err) return res.status(400).json({ status: 'err', msj: err });
        res.status(200).json({ status: "ok", msj: "file updated" });
    });
}

module.exports = _ARCH;
