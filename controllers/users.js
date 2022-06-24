const User = require('../models/user');
const Order = require('../models/order');

module.exports.renderLogin = (req, res) => {
	res.render('user/login');
};

module.exports.login = (req, res) => {
	// req.flash('success', 'Вітаємо!');
	res.redirect('/');
};

module.exports.logout = (req, res, next) => {
	req.logout(function(err) {
		if (err) {
			return next(err);
		}
		// req.flash('success', 'До нової зустрічі!');
		res.redirect('/');
	});
};

module.exports.renderRegistration = (req, res) => {
	res.render('user/registration');
};

module.exports.registration = async (req, res, next) => {
	try {
		const { username, password, email, f_name, l_name, phone, adress } = req.body;
		const user = new User({ username, email, f_name, l_name, phone, adress });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', 'Вітаємо! Ви успішно зареєстровані.');
			res.redirect('/profile');
		});
	} catch (e) {
		if (e.code === 11000) e.message = 'Користувач з вказаним email вже існує. Використайте інший email';
		req.flash('error', e.message);
		res.redirect('/registration');
	}
};

module.exports.renderProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	res.render('user/profile', { user });
};

module.exports.updateProfile = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
	if (req.body.password) {
		await user.setPassword(req.body.password);
	}
	await user.save();
	req.flash('success', 'Профіль успішно оновлено!');
	res.redirect('/profile');
};

module.exports.renderOrders = async (req, res) => {
	const orders = await Order.find({ client: req.user._id });
	// if (orders.length === 0) {
	// 	return res.render('user/orders', { orders: 'У вас ще немає замовлень.' });
	// }
	res.render('user/orders', { orders });
};

module.exports.getStatusImages = async (req, res) => {
	const { order_id, status_id } = req.query;
	const order = await Order.findOne({ order_id });
	const { name, images } = order.status.filter((item) => item._id == status_id)[0];
	const data = {
		name,
		images: images.map((img) => img.url)
	};
	res.json(data);
};
