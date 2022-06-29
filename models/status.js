const mongoose = require('mongoose');
const imageSchema = require('./image');

const statusSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	desc: {
		type: String
	},
	date: {
		type: Date,
		default: Date()
	},
	images: [ imageSchema ]
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
