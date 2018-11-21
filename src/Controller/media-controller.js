const _MD = {};
const _MDMDL = require("../Model/media");
const _DATE = require("dateformat");
const path = require('path');
const fs = require("fs");

_MD.setMedia = async (req, res) => {
    const { file } = req.files

    if (!file) return res.status(400).json({ status: "err", msj: 'information is missing' });
    if (!file.name.match(/\.(png|jpg|mp4)$/i)) return res.status(400).json({ status: "err", msj: 'file not allowed' });
    
    let temp = file.name.split('.');
    let type = (temp[1] == 'mp4') ? 'video' : 'img'
    let rute = path.join(__dirname, `../public/media/${type}/${file.name}`);
   
    var day = _DATE(new Date, "yyyy-mm-dd h:MM:ss");
    await file.mv(rute, err => {
        if (err) return res.status(500).send({ message: err });
        const media = new _MDMDL({
            name : file.name , 
            rute : rute ,
            type : type,
            date_creation: day
        });
        media.save((err) => {
            if (err) return res.status(500).json({ status: "err", msj: err });
            res.status(200).json({ status: "ok", msj: "successfully registered file"});
        });       
    });
};

_MD.getMedias = async (req , res) => {
    const { type } = req.params;
    await _MDMDL.find({ type } , { name : 1 , rute : 1 } , (err , medias) => {
        if (err) return res.status(500).json({ status: "err", msj: err });
        res.status(200).json({ status: "ok", msj: "successfully" , medias});
    })
}

_MD.getMedia = async (req , res) => {
    const { name } = req.params;
    ruta = path.join(__dirname, `../public/media/img/${name}`);
    fs.createReadStream(ruta).pipe(res);
}

module.exports = _MD;