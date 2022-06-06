const express = require('express');
const router = express.Router();

const Product = require('../models/catalog');
const categories = require('../settings/categories.json');

const multer = require('multer');
const upload = multer({ dest: './public/imgs/catalog' });

router.get('/', async (req, res) => {
	const { category } = req.query;
	if (category && category in categories) {
		const products = await Product.find({ category });
		return res.render('catalog', { category: categories[category], products });
	}
	if (!category) {
		const products = await Product.find({});
		return res.render('catalog', { category: 'Всі роботи', products });
	}
	req.flash('error', `Категорії ${category} не існує. Спробуйте обрати іншу категорію.`);
	res.redirect('/catalog');
});
router.get('/new', (req, res) => {
	res.render('catalog/new', { categories });
});
router.post('/', upload.array('images'), async (req, res) => {
	const newProduct = new Product(req.body);
	newProduct.images = req.files.map((f) => ({ url: `/imgs/catalog/${f.filename}`, name: f.filename }));
	await newProduct.save();
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
