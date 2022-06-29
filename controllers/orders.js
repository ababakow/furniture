const Order = require('../models/order');
const User = require('../models/user');

const { unlink } = require('fs/promises');

module.exports.index = async (req, res) => {
	if (JSON.stringify(req.query) == '{}' || req.query.filter == 'all') {
		const orders = await Order.find().populate('client').populate('status');
		return res.render('orders', { orders });
	}
	if ('filter' in req.query) {
		if (req.query.filter === 'active') {
			const orders = await Order.find({ finishDate: { $exists: false } }).populate('client').populate('status');
			return res.render('orders', { orders });
		}
		if (req.query.filter === 'closed') {
			const orders = await Order.find({ finishDate: { $exists: true } }).populate('client').populate('status');
			return res.render('orders', { orders });
		}
		req.flash('error', `Помилка фільтрування данних`);
		return res.redirect('/orders');
	}
	if ('search' in req.query) {
		let orders = await Order.find({ name: { $regex: '.*' + req.query.search + '.*' } })
			.populate('client')
			.populate('status');
		if (orders.length != 0) return res.render('orders', { orders });
		if (+req.query.search) {
			orders = await Order.find({ order_id: req.query.search }).populate('client').populate('status');
			if (orders.length != 0) return res.render('orders', { orders });
		}
	}
	res.render('orders', { orders: '' });
};

module.exports.showOrder = async (req, res) => {
	const { id } = req.params;
	const order = await Order.findById(id).populate('client').populate('status');
	if (!order) {
		req.flash('error', `Нажаль, замовлення не знайдено`);
		return res.redirect('/orders');
	}
	res.render('orders/show', { order });
};

module.exports.renderNewOrder = async (req, res) => {
	const users = await User.find(null, { _id: 1, username: 1 });
	res.render('orders/new', { users, today: new Date() });
};

module.exports.createOrder = async (req, res) => {
	const order = new Order(req.body);
	await order.save();
	req.flash('success', `Замовлення успішно додано!`);
	res.redirect(`/orders/${order._id}`);
};

module.exports.renderEditOrder = async (req, res) => {
	const { id } = req.params;
	const order = await Order.findById(id);
	if (!order) {
		req.flash('error', `Нажаль, замовлення не знайдено`);
		return res.redirect('/orders');
	}
	const users = await User.find(null, { _id: 1, username: 1 });
	res.render('orders/edit', { order, users, selected: order.client });
};

module.exports.updateOrder = async (req, res) => {
	const { id } = req.params;
	const order = await Order.findByIdAndUpdate(id, req.body);
	await order.save();
	req.flash('success', `Замовлення успішно оновлено!`);
	res.redirect(`/orders/${id}`);
};

module.exports.deleteOrder = async (req, res) => {
	const { id } = req.params;
	const deletedOrder = await Order.findByIdAndDelete(id).populate('status');
	for (let status of deletedOrder.status) {
		for (let img of status.images) {
			await unlink(`./public${img.url}`);
		}
	}
	req.flash('success', `Замовлення успішно видалено!`);
	res.redirect('/orders');
};
