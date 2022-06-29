const mongoose = require('mongoose');
const Order = require('../models/order');
const User = require('../models/user');
const Status = require('../models/status');

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
	await Status.deleteMany({});
	const users = await User.find(null, { _id: 1 });
	for (let i = 0; i < 30; i++) {
		const randClient = Math.floor(Math.random() * users.length);
		const isFinish = Math.floor(Math.random() * 4);
		const randStatusNum = Math.floor(Math.random() * 5);
		let finishDate;

		if (!isFinish) finishDate = Date();

		const order = new Order({
			name: `Project-${i}`,
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			startDate: Date(),
			finishDate,
			// estimFinishDate: Date(),
			status: [],
			client: users[randClient]
		});

		if (randStatusNum) {
			for (let j = 0; j < randStatusNum; j++) {
				const status = new Status({
					name: `Some Status - ${j} - ${i}`,
					desc: 'Some status description. Some status description. Some status description.',
					images: generateImages()
				});
				status.save();
				order.status.unshift(status);
			}
		}

		await order.save();
	}
};

const generateImages = () => {
	const randImageNum = Math.floor(Math.random() * 4);
	let images = [];
	if (randImageNum === 1) {
		images = [
			{
				name: `1.jpg`,
				url: `/imgs/main/1.jpg`
			}
		];
	}
	if (randImageNum === 2) {
		images = [
			{
				name: `1.jpg`,
				url: `/imgs/main/1.jpg`
			},
			{
				name: `2.jpg`,
				url: `/imgs/main/2.jpg`
			}
		];
	}
	if (randImageNum === 3) {
		images = [
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
	}
	return images;
};

seedData()
	.then(() => {
		mongoose.connection.close();
	})
	.catch((err) => {
		console.log(err);
	});
