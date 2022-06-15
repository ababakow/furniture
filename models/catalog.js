const mongose = require('mongoose');
const categories = require('../settings/categories.json');

const imageSchema = new mongose.Schema({
	name: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

const productSchema = new mongose.Schema(
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

const Product = mongose.model('Product', productSchema);

module.exports = Product;
