const mongoose = require('mongoose');
const Catalog = require('../models/catalog');

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
	await Catalog.deleteMany({});
	for (let i = 0; i < 100; i++) {
		const randCategory = Math.floor(Math.random() * 6);
		const randImg = Math.floor(Math.random() * 3 + 1);

		const product = new Catalog({
			title: 'product1',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			category: Catalog.schema.path('category').enumValues[randCategory],
			image: `/imgs/main/${randImg}.jpg`
		});

		await product.save();
	}
};

seedData()
	.then(() => {
		mongoose.connection.close();
	})
	.catch((err) => {
		console.log(err);
	});
