const mongoose = require('mongoose');
const Order = require('../models/order');
const User = require('../models/user');

const dbUrl = 'mongodb://localhost:27017/furniture';
mongoose
	.connect(dbUrl)
	.then(() => {
		console.log('DB connected!');
	})
	.catch((err) => {
		console.log(err);
	});

const seedData = async () => {
	await Order.deleteMany({});
	const users = await User.find(null, { _id: 1 });
	for (let i = 0; i < 10; i++) {
		const randClient = Math.floor(Math.random() * users.length);
		const images = [
			{
				name: `1.jpg`,
				url: `/imgs/main/1.jpg`
			},
			{
				name: `2.jpg`,
				url: `/imgs/main/2.jpg`
			},
			{
				name: `3.jpg`,
				url: `/imgs/main/3.jpg`
			}
		];

		const order = new Order({
			name: `Project-${i}`,
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			startDate: Date(),
			finishDate: Date(),
			// estimFinishDate: Date(),
			status: [
				{
					name: `Status 1 - Project-${i}`,
					desc: 'Some status description. Some status description. Some status description.',
					images
				},
				{
					name: `Status 2 - Project-${i}`,
					images
				},
				{
					name: `Status 3 - Project-${i}`,
					desc: 'Some status description. Some status description. Some status description.',
					images
				}
			],
			client: users[randClient]
		});

		await order.save();
	}
};

seedData()
	.then(() => {
		mongoose.connection.close();
	})
	.catch((err) => {
		console.log(err);
	});
