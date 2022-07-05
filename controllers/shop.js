const ShopItem = require('../models/shop');

const { unlink } = require('fs/promises');
const { normaliseImage } = require('../utils/sharp');

module.exports.index = async (req, res) => {
	const shopItems = await ShopItem.find({});
	res.render('shop', { shopItems });
};

module.exports.renderNewForm = (req, res) => {
	res.render('shop/new');
};

module.exports.createShopItem = async (req, res) => {
	const newItem = new ShopItem(req.body);
	newItem.images = req.files.map((f) => ({
		url: `/imgs/shop/${f.filename}`,
		name: f.filename
	}));
	for (let img of newItem.images) {
		await normaliseImage(`public${img.url}`, img.name, { md: true, hd: true });
	}
	await newItem.save();
	req.flash('success', `Продукт успішно додано!`);
	res.redirect('/shop');
};

module.exports.showShopItem = async (req, res) => {
	const { id } = req.params;
	const item = await ShopItem.findById(id);
	if (!item) {
		req.flash('error', `Нажаль, продукт не знайдено`);
		return res.redirect('/shop');
	}
	res.render('shop/show', { item });
};

module.exports.renderEditForm = async (req, res) => {
	const { id } = req.params;
	const item = await ShopItem.findById(id);
	if (!item) {
		req.flash('error', `Нажаль, продукт не знайдено`);
		return res.redirect('/shop');
	}
	res.render('shop/edit', { item });
};

module.exports.updateShopItem = async (req, res) => {
	const { id } = req.params;
	const item = await ShopItem.findByIdAndUpdate(id, req.body, { new: true });
	const imgs = req.files.map((f) => ({ url: `/imgs/shop/${f.filename}`, name: f.filename }));
	for (let img of imgs) {
		await normaliseImage(`public${img.url}`, img.name, { md: true, hd: true });
	}
	item.images.push(...imgs);
	await item.save();
	if (req.body.deleteImages) {
		for (let img of req.body.deleteImages) {
			try {
				await unlink(`./public/imgs/shop/${img}`);
				await unlink(`./public/imgs/shop/md/${img}`);
				await unlink(`./public/imgs/shop/hd/${img}`);
			} catch (e) {
				throw e;
			}
		}
		await item.updateOne({ $pull: { images: { name: { $in: req.body.deleteImages } } } });
	}
	req.flash('success', `Продукт успішно оновлено!`);
	res.redirect(`/shop/${id}`);
};

module.exports.deleteShopItem = async (req, res) => {
	const { id } = req.params;
	const deletedItem = await ShopItem.findByIdAndDelete(id);
	for (let img of deletedItem.images) {
		try {
			await unlink(`./public/imgs/shop/${img.name}`);
			await unlink(`./public/imgs/shop/md/${img.name}`);
			await unlink(`./public/imgs/shop/hd/${img.name}`);
		} catch (e) {
			throw e;
		}
	}
	req.flash('success', `Продукт успішно видалено!`);
	res.redirect('/shop');
};
