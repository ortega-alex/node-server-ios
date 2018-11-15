const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArchivoSchema = new Schema({
	name: { type: String, required: true, trim: true },
	headers : { type : Array } ,
	date_creation: { type: String },
	date_modification: { type: String }
});

module.exports = mongoose.model('archive', ArchivoSchema);