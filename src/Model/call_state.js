const mongoose = require("mongoose");
const { Schema } = mongoose;

const CallStateSchema = new Schema({
	campaign: { type: Schema.ObjectId, ref: 'campaign' },	
	id : { type : Number , required : true } ,
    name: { type: String, required: true, trim: true },
	calls : { type : Number , default : 0 } ,
	create_date: { type: String },
	modification_date: { type: String }
});

module.exports = mongoose.model( "call_state" , CallStateSchema );