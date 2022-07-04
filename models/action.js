const mongoose = require('mongoose');
const imageSchema = require('./image');

const actionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	finishDate: {
		type: Date
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true
	},
	image: imageSchema
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;
