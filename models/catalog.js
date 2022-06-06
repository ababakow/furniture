const mongose = require('mongoose');
const categories = require('../settings/categories.json');

const imageSchema = new mongose.Schema({
	name: String,
	url: String
});

const productSchema = new mongose.Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
	category: {
		type: String,
		enum: Object.keys(categories),
		required: true
	},
	images: [ imageSchema ]
});

productSchema.methods.categoryToUa = function categoryToUa() {
	return categories[this.category];
};

const Product = mongose.model('Product', productSchema);

module.exports = Product;
