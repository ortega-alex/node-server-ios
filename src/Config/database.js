const mongoose = require('mongoose');
const URL = 'mongodb://localhost/ios';

mongoose.connect(URL).then(() => {
	console.log("DB is connectd")
}).catch((err) => console.log('err: ' , err.toString()));

module.exports = mongoose;