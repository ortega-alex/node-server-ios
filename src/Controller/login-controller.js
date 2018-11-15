const _LGN = {};
const _USRMDL = require('../Model/user');
const _ACCMDL = require('../Model/access');

_LGN.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.json({ status: "err", msj: 'information is missing' });
    await _ACCMDL.findOne({ username, password }, (err, access) => {
        if (err) return res.status(400).json({ status: 'err', msj: err });
        if (!access) return res.json({ status: 'err', msj: "Unregistered user" });
        _USRMDL.findOne({ access: access._id }, { "name": 1, "idioma": 1, "language": 1 })
            .populate({ path: "access", select: 'username' })
            .exec((err, user) => {
                if (err) return res.status(400).json({ status: 'err', msj: err });
                res.status(200).json({
                    status: "ok",
                    msj: "successfully",
                    user
                });
            })
    });
};

module.exports = _LGN;