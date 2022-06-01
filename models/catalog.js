const mongose = require('mongoose');

const catalogSchema = new mongose.Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
	category: {
		type: String,
		enum: [ 'kitchens', 'wardrobes', 'living', 'chests', 'hallways', 'glass' ],
		required: true
	},
	image: String
});

const Catalog = mongose.model('Catalog', catalogSchema);

module.exports = Catalog;
