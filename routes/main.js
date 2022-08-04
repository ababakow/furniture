const express = require('express');
const router = express.Router();
const { mailWriteToUs, mailCallBack } = require('../nodemailer/mail-handlers');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Shop = require('../models/shop');
const Actions = require('../models/action');

router.get('/', catchAsync(async (req, res) => {
	const shop = await Shop.find({ inStock: true, $expr: { $lt: [0.5, { $rand: {} }] } }, { _id: 1, title: 1, price: 1, images: 1 }).limit(5);
	const actions = await Actions.find({ isActive: true });
	res.render('home', {shop, actions});
}));
router.get(
	'/contacts',
	catchAsync(async (req, res) => {
		let userData = { name: '', email: '', phone: '' };
		if (req.isAuthenticated()) {
			const user = await User.findById(req.user._id);
			userData = { name: `${user.f_name} ${user.l_name}`, email: user.email, phone: user.phone };
		}
		res.render('contacts', { userData });
	})
);
router.post(
	'/contacts',
	catchAsync(async (req, res) => {
		await mailWriteToUs(req.body);
		req.flash('success', `Повідомлення відправлено! Дякуємо за звернення!`);
		res.redirect('/contacts');
	})
);
router.post(
	'/contacts/callback',
	catchAsync(async (req, res) => {
		await mailCallBack(req.body);
		req.flash('success', `Ваш номер відправлено. Ми перетелефонуємо вам найближчим часом.`);
		const path = req.session.preUrl || '/contacts';
		res.redirect(path);
	})
);

module.exports = router;
