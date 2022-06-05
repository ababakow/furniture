const express = require('express');
const router = express.Router();
const flash = require('connect-flash');

const Catalog = require('../models/catalog');

router.get('/', async (req, res) => {
	const { category } = req.query;
	if (category) {
		const products = await Catalog.find({ category });
		if (!products.length) {
			req.flash('error', `Категорії ${category} не існує. Спробуйте обрати іншу категорію.`);
			return res.redirect('/catalog');
		}
		return res.render('catalog', { products });
	}
	const products = await Catalog.find({});
	res.render('catalog', { category: 'Всі роботи', products });
});
router.get('/new', (req, res) => {
	res.render('catalog/new');
});
router.post('/', (req, res) => {
	res.redirect('/catalog');
});
router.get('/:id', (req, res) => {
	const { category, id } = req.params;
	res.render('catalog/show', { category, id });
});
router.get('/:id/edit', (req, res) => {
	res.render('catalog/edit');
});
router.put('/:id', (req, res) => {
	const { category, id } = req.params;
	res.redirect(`/catalog/${category}/${id}`);
});
router.delete('/:id', (req, res) => {
	res.redirect('/catalog');
});

module.exports = router;
