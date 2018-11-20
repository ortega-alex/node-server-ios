const mongoose = require("mongoose");
const { Schema }  = mongoose

const TutorialSchema = new Schema({
    name : { type : String , required : true , trim : true } ,
    url : { type : String , required : true , trim : true } ,
    creation_date: { type: String , trim: true },
	modification_date: { type: String , trim: true }
});

module.exports = mongoose.model("tutorial"  , TutorialSchema );