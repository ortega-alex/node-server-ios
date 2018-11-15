const _ACCMDL = require('../Model/access');
const _ACC = {}

_ACC.getAccess = async (req,res) => {
	 await _ACCMDL.find({}, (err, access) => {
        if (err) return res.status(400).json({ status: 'err', msj: err })
        res.status(200).json({ status: 'ok', msj: 'successful', access });
    });
}

_ACC.deleteAccess = async (req , res) => {
	const { id } = req.params;
    await _ACCMDL.findByIdAndRemove(id , (err) => {
        if (err) return res.status(400).json({ status: 'err', msj: err });
        res.status(200).json({ status: "ok", msj: "removed access" });
    });
}

module.exports = _ACC;