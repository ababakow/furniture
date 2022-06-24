const mongoose = require('mongoose');
const imageSchema = require('./image');

const shopItemSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		images: [ imageSchema ],
		price: {
			type: Number,
			required: true
		},
		inStock: {
			type: Boolean,
			required: true
		}
	},
	{ timestamps: true }
);

const ShopItem = mongoose.model('ShopItem', shopItemSchema);

module.exports = ShopItem;
