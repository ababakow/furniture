const mongoose = require('mongoose');
const imageSchema = require('./image');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		startDate: {
			type: Date,
			required: true
		},
		finishDate: {
			type: Date
		},
		// estimFinishDate: {
		// 	type: Date
		// },
		status: [
			{
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
			}
		],
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}
	// { timestamps: true }
);

orderSchema.plugin(AutoIncrement, { inc_field: 'order_id', start_seq: 100 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
