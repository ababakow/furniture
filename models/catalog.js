const mongoose = require('mongoose');
const categories = require('../settings/categories.json');
const imageSchema = require('./image');

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		category: {
			type: String,
			enum: Object.keys(categories),
			required: true
		},
		images: [ imageSchema ]
	},
	{ timestamps: true }
);

productSchema.methods.categoryToUa = function categoryToUa() {
	return categories[this.category];
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
