const mongose = require('mongoose');

const categories = {
	kitchens: 'Кухні',
	wardrobes: 'Шафи',
	living: 'Вітальні',
	chests: 'Комоди та тумби',
	hallways: 'Передпокої',
	glass: 'Вироби зі скла'
};

const catalogSchema = new mongose.Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
	category: {
		type: String,
		enum: Object.keys(categories),
		required: true
	},
	image: String
});

catalogSchema.methods.categoryToUa = function categoryToUa() {
	return categories[this.category];
};

const Catalog = mongose.model('Catalog', catalogSchema);

module.exports = Catalog;
