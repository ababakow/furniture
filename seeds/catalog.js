const mongoose = require('mongoose');
const Product = require('../models/catalog');

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
	await Product.deleteMany({});
	for (let i = 0; i < 20; i++) {
		const randCategory = Math.floor(Math.random() * 6);
		const randImg = Math.floor(Math.random() * 3 + 1);

		const product = new Product({
			title: `product-${i}`,
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			category: Product.schema.path('category').enumValues[randCategory],
			images: [
				{
					name: `${randImg}.jpg`,
					url: `/imgs/main/${randImg}.jpg`
				},
				{
					name: `${randImg + 1}.jpg`,
					url: `/imgs/main/${randImg + 1}.jpg`
				}
			]
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
