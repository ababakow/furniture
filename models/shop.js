const mongose = require('mongoose');

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

const shopItemSchema = new mongose.Schema(
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

const ShopItem = mongose.model('ShopItem', shopItemSchema);

module.exports = ShopItem;
