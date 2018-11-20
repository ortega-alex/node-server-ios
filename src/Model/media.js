const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediaSchema = new Schema({
    name: { type: String, required: true, trim: true },
    rute: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    creation_date: { type: String, trim: true },
    modification_date: { type: String, trim: true }
});

module.exports = mongoose.model("media", MediaSchema);