const ObjectId = require('mongodb').ObjectID;
const _DATE = require('dateformat');
const _USR = {};
const _USRMDL = require('../Model/user');
const _ACCMDL = require('../Model/access');

_USR.register = async (req, res) => {
    const { name, username, password, language } = req.body;
    if (!name || !username || !password || !language) return res.status(400).json({ status: "err", msj: 'information is missing' });
    await _ACCMDL.findOne({ username }, (err, access) => {
        if (err) return res.status(400).json({ status: 'err', msj: err });
        if (access != null) return res.json({ status: "err", msj: 'the user is already registered' });
        var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
        const accesos = new _ACCMDL({
            username: username,
            password: password,
            creation_date: day
        });
        accesos.save((err, acceso) => {
            if (err) return res.status(400).json({ status: 'err', msj: err });
            const user = new _USRMDL({
                access: ObjectId(acceso._id),
                name: name,
                language: language,
                creation_date: day
            });
            user.save((err) => {
                if (err) return res.status(400).json({ status: "err", msj: err });
                res.status(200).json({ status: "ok", msj: "Registered user successfully" });
            });
        });

    });
}

_USR.deleteUser = async (req, res) => {
    const { id } = req.params;
    await _USRMDL.findById(id, (err, user) => {
        if (err) return res.status(400).json({ status: 'err', msj: err });
        console.log(user)
        _ACCMDL.findByIdAndRemove(user.access, (err) => {
            if (err) return res.status(400).json({ status: 'err', msj: err });
            _USRMDL.findByIdAndRemove(id, (err) => {
                if (err) return res.status(400).json({ status: 'err', msj: err });
                res.status(200).json({ status: "ok", msj: "user removed" });
            })
        });
    });
};

_USR.getUsers = async (req, res) => {
    await _USRMDL.find({}, { "name": 1, "language": 1 })
        .populate({ path: "access", select: 'username' })
        .exec((err, users) => {
            if (err) return res.status(400).json({ status: 'err', msj: err });
            res.status(200).json({
                status: 'ok',
                msj: 'successfully',
                users
            });
        })
};

_USR.getUser = async (req, res) => {
    const { id } = req.params;
    await _USRMDL.findById(id, { "name": 1, "language": 1 })
        .populate({ path: "access", select: 'username' })
        .exec((err, user) => {
            if (err) return res.status(400).json({ status: 'err', msj: err });
            res.status(200).json({
                status: 'ok',
                msj: 'successfully',
                user
            });
        })
};

_USR.editUser = async (req, res) => {
    const { id } = req.params;
    const { name, status, language, id_access, username, password } = req.body;
    if (!name || !status || !language) return res.json({ status: 'err', smj: 'information is missing' });
    var day = dateFormat(new Date, "yyyy-mm-dd h:MM:ss");
    const user = {
        name: name,
        status: status,
        language: language,
        modification_date: day
    };
    await _USRMDL.findByIdAndUpdate(id, { $set: user }, { new: true }, (err) => {
        if (err) return res.status(400).json({ status: 'err', msj: err });
        if (username || password) {
            const access = {
                username: username,
                password: password,
                modification_date: day
            }
            _ACCMDL.findByIdAndUpdate(id_access, { $set: access }, { new: true }, (err) => {
                if (err) return res.status(400).json({ status: 'err', msj: err });
                res.status(200).json({
                    status: 'ok',
                    msj: 'updated user'
                });
            });
        }
        res.status(200).json({
            status: 'ok',
            msj: 'updated user'
        });
    });
};

module.exports = _USR;