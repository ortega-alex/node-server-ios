const mongoose = require('mongoose');
const { Schema } = mongoose;

const CallSchema = new Schema({
	campaign: { type: Schema.ObjectId, ref: 'campaign' },	
	id : { type : Number , required : true } ,
	name: { type: String, required: true, trim: true },
	notes : { type : Array } ,
	sms: { type: Boolean, default: false },
	sms_text : { type: String , default : null , trim: true} ,
	reminder : { type: String , default : null , trim: true} ,
	phone : { type: String  , required : true , trim: true} ,
	creation_date: { type: String },
	modification_date: { type: String }
});

module.exports = mongoose.model('call', CallSchema);