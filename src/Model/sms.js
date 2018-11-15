const mongoose = require('mongoose');
const { Schema } = mongoose;

const SmsSchema = new Schema({
    user : { type : Schema.ObjectId , ref : "user" } ,
    //call_states: { type : [ { type: Schema.ObjectId, ref: 'call_state' } ] } ,
	calls: { type : [ { type: Schema.ObjectId, ref: 'call' } ]} ,
	name: { type: String, required: true, trim: true },
    status: { type: String , default: "C"  , trim: true },
    link : { type : String , default : null ,  trim : true} ,
    sms_text : { type : String, required : true , trim: true },
    start_time: { type: String , trim: true , default : null },
    start_date: { type: String , trim: true , default : null },
	creation_date: { type: String , trim: true },
	modification_date: { type: String , trim: true }
});

module.exports = mongoose.model('sms', SmsSchema);