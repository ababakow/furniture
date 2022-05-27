const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('shop');
});
router.get('/new', (req, res) => {
	res.render('shop/new');
});
router.post('/', (req, res) => {
	res.redirect('/shop');
});
router.get('/:category', (req, res) => {
	const { category } = req.params;
	res.render(`shop/${category}`);
});
router.get('/:category/:id', (req, res) => {
	const { category, id } = req.params;
	res.render('shop/show', { category, id });
});

router.get('/:category/:id/edit', (req, res) => {
	res.render('shop/edit');
});

router.put('/:category/:id', (req, res) => {
	const { category, id } = req.params;
	res.redirect(`/shop/${category}/${id}`);
});

router.delete('/:category/:id', (req, res) => {
	res.redirect('/shop');
});

module.exports = router;
