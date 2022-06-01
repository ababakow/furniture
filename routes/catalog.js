const express = require('express');
const router = express.Router();

const Catalog = require('../models/catalog');

// router.get('/', (req, res) => {
// 	res.render('catalog');
// });
router.get('/new', (req, res) => {
	res.render('catalog/new');
});
router.post('/', (req, res) => {
	res.redirect('/catalog');
});
router.get('/:category', async (req, res) => {
	const { category } = req.params;
	const products = await Catalog.find({ category });
	console.log(products);
	res.render('catalog/category', { category, products });
});
router.get('/:category/:id', (req, res) => {
	const { category, id } = req.params;
	res.render('catalog/show', { category, id });
});
router.get('/:category/:id/edit', (req, res) => {
	res.render('catalog/edit');
});
router.put('/:category/:id', (req, res) => {
	const { category, id } = req.params;
	res.redirect(`/catalog/${category}/${id}`);
});
router.delete('/:category/:id', (req, res) => {
	res.redirect('/catalog');
});

module.exports = router;
