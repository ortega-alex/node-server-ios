const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	access: { type: Schema.ObjectId, ref: 'access' },
	name: { type: String, required: true, trim: true },
	status: { type: Boolean, default: true },
	language : { type : String, required : true , trim: true },
	creation_date: { type: String , trim: true },
	modification_date: { type: String , trim: true }
});

module.exports = mongoose.model('user', UserSchema);