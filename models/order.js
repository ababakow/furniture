const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Status = require('./status');

const orderSchema = new mongoose.Schema({
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
	status: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Status'
		}
	],
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

orderSchema.post('findOneAndDelete', async function(doc) {
	if (doc) {
		await Status.deleteMany({
			_id: {
				$in: doc.status
			}
		});
	}
});

orderSchema.plugin(AutoIncrement, { inc_field: 'order_id', start_seq: 100 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
