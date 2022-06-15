const mongoose = require('mongoose');
const ShopItem = require('../models/shop');

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
	await ShopItem.deleteMany({});
	for (let i = 0; i < 20; i++) {
		const randInStock = Math.floor(Math.random() * 4);
		const randImg = Math.floor(Math.random() * 7 + 1);
		const inStock = randInStock > 1 ? false : true;
		const price = Math.floor(Math.random() * 10000);

		const shopItem = new ShopItem({
			title: `product-${i}`,
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
			images: [
				{
					name: `${randImg}.jpg`,
					url: `/imgs/shop/seeds/${randImg}.jpg`
				},
				{
					name: `${randImg + 1}.jpg`,
					url: `/imgs/shop/seeds/${randImg + 1}.jpg`
				}
			],
			price,
			inStock
		});

		await shopItem.save();
	}
};

seedData()
	.then(() => {
		mongoose.connection.close();
	})
	.catch((err) => {
		console.log(err);
	});
