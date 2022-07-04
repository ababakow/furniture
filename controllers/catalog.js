const Products = require('../models/catalog');
const categories = require('../settings/categories.json');

const { unlink } = require('fs/promises');
const { normaliseImage } = require('../utils/sharp');

module.exports.index = async (req, res) => {
	const { category } = req.query;
	if (category && category in categories) {
		const products = await Products.find({ category });
		return res.render('catalog', { category: categories[category], products });
	}
	if (!category) {
		const products = await Products.find({});
		return res.render('catalog', { category: 'Всі роботи', products });
	}
	req.flash('error', `Категорії ${category} не існує. Спробуйте обрати іншу категорію.`);
	res.redirect('/catalog');
};

module.exports.renderNewForm = (req, res) => {
	res.render('catalog/new', { categories });
};

module.exports.createProduct = async (req, res) => {
	const newProduct = new Products(req.body);
	newProduct.images = req.files.map((f) => ({ url: `/imgs/catalog/${f.filename}`, name: f.filename }));
	for (let img of newProduct.images) {
		await normaliseImage(`public${img.url}`, img.name, { md: true, hd: true });
	}
	await newProduct.save();
	req.flash('success', `Продукт успішно додано!`);
	res.redirect('/catalog');
};

module.exports.showProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Products.findById(id);
	if (!product) {
		req.flash('error', `Нажаль, продукт не знайдено`);
		return res.redirect('/catalog');
	}
	res.render('catalog/show', { product });
};

module.exports.renderEditForm = async (req, res) => {
	const { id } = req.params;
	const product = await Products.findById(id);
	if (!product) {
		req.flash('error', `Нажаль, продукт не знайдено`);
		return res.redirect('/catalog');
	}
	res.render('catalog/edit', { product, categories });
};

module.exports.updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Products.findByIdAndUpdate(id, req.body, { new: true });
	const imgs = req.files.map((f) => ({ url: `/imgs/catalog/${f.filename}`, name: f.filename }));
	for (let img of imgs) {
		await normaliseImage(`public${img.url}`, img.name, { md: true, hd: true });
	}
	product.images.push(...imgs);
	await product.save();
	if (req.body.deleteImages) {
		for (let img of req.body.deleteImages) {
			await unlink(`./public/imgs/catalog/${img}`);
			await unlink(`./public/imgs/catalog/md/${img}`);
			await unlink(`./public/imgs/catalog/hd/${img}`);
		}
		await product.updateOne({ $pull: { images: { name: { $in: req.body.deleteImages } } } });
	}
	req.flash('success', `Продукт успішно оновлено!`);
	res.redirect(`/catalog/${id}`);
};

module.exports.deleteProduct = async (req, res) => {
	const { id } = req.params;
	const deletedProduct = await Products.findByIdAndDelete(id);
	for (let img of deletedProduct.images) {
		await unlink(`./public${img.url}`);
		await unlink(`./public/imgs/catalog/md/${img.name}`);
		await unlink(`./public/imgs/catalog/hd/${img.name}`);
	}
	req.flash('success', `Продукт успішно видалено!`);
	res.redirect('/catalog');
};
