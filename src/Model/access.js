const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccessSchema = new Schema({
	username: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true , trim: true },
	creation_date: { type: String , trim: true },
	modification_date: { type: String , trim: true }
});

module.exports = mongoose.model('access', AccessSchema);