let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let BookSchema = mongoose.Schema({
	title : String,
	author : String,
	url : String
});

module.exports = mongoose.model('bookcollection',BookSchema);
