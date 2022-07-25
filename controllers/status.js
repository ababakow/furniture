const Order = require('../models/order');
const Status = require('../models/status');

const { unlink } = require('fs/promises');
const { normaliseImage } = require('../utils/sharp');

module.exports.renderNewStatus = async (req, res) => {
	const { id } = req.params;
	const order = await Order.findById(id);
	if (!order) {
		req.flash('error', `Нажаль, замовлення не знайдено`);
		return res.redirect(`/orders/${id}`);
	}
	res.render(`orders/status/new`, { order, today: new Date() });
};

module.exports.createStatus = async (req, res) => {
	const { id } = req.params;
	const status = new Status(req.body);
	const order = await Order.findById(id);
	status.images = req.files.map((f) => ({ url: `/imgs/orders/${id}/${f.filename}`, name: f.filename }));
	for (let img of status.images) {
		await normaliseImage(`public${img.url}`, img.name, { md: true, hd: true });
	}
	order.status.unshift(status);
	await status.save();
	await order.save();
	req.flash('success', `Статус успішно додано!`);
	res.redirect(`/orders/${id}`);
};

module.exports.renderEditStatus = async (req, res) => {
	const { id, statusId } = req.params;
	const order = await Order.findById(id);
	if (!order) {
		req.flash('error', `Нажаль, замовлення не знайдено`);
		return res.redirect(`/orders/${id}`);
	}
	const status = await Status.findById(statusId);
	if (!status) {
		req.flash('error', `Нажаль, статус замовлення не знайдено`);
		return res.redirect(`/orders/${id}`);
	}
	res.render('orders/status/edit', { status, order });
};

module.exports.updateStatus = async (req, res) => {
	const { id, statusId } = req.params;
	const status = await Status.findByIdAndUpdate(statusId, req.body, { new: true });
	const imgs = req.files.map((f) => ({ url: `/imgs/orders/${id}/${f.filename}`, name: f.filename }));
	for (let img of imgs) {
		await normaliseImage(`public${img.url}`, img.name, { md: true, hd: true });
	}
	status.images.push(...imgs);
	await status.save();
	if (req.body.deleteImages) {
		for (let img of req.body.deleteImages) {
			try {
				await unlink(`./public/imgs/orders/${id}/${img}`);
				await unlink(`./public/imgs/orders/${id}/md/${img}`);
				await unlink(`./public/imgs/orders/${id}/hd/${img}`);
			} catch (e) {
				throw e;
			}
		}
		await status.updateOne({ $pull: { images: { name: { $in: req.body.deleteImages } } } });
	}
	req.flash('success', `Статус успішно оновлено!`);
	res.redirect(`/orders/${id}`);
};

module.exports.deleteStatus = async (req, res) => {
	const { id, statusId } = req.params;
	await Order.findByIdAndUpdate(id, { $pull: { status: statusId } });
	const deletedItem = await Status.findByIdAndDelete(statusId);
	for (let img of deletedItem.images) {
		try {
			await unlink(`./public/imgs/orders/${id}/${img.name}`);
			await unlink(`./public/imgs/orders/${id}/md/${img.name}`);
			await unlink(`./public/imgs/orders/${id}/hd/${img.name}`);
		} catch (e) {
			throw e;
		}
	}
	req.flash('success', `Статус успішно видалено!`);
	res.redirect(`/orders/${id}`);
};
