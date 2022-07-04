const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

imageSchema.virtual('urlSm').get(function() {
	return this.url.replace(this.name, `sm/${this.name}`);
});
imageSchema.virtual('urlMd').get(function() {
	return this.url.replace(this.name, `md/${this.name}`);
});
imageSchema.virtual('urlHd').get(function() {
	return this.url.replace(this.name, `hd/${this.name}`);
});

module.exports = imageSchema;
