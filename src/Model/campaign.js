const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampaignSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'user' },	
	//call_state : { type : Array  , required: true} ,
	call_states: { type : [ { type: Schema.ObjectId, ref: 'call_state' } ] } ,
	name: { type: String, required: true, trim: true },
	type : { type: String  , required : true , trim: true} ,
	status: { type: Boolean, default: true },	
	creation_date: { type: String },
	modification_date: { type: String }
});

module.exports = mongoose.model('campaign', CampaignSchema);