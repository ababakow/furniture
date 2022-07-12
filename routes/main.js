const express = require('express');
const router = express.Router();
const { mailWriteToUs, mailCallBack } = require('../nodemailer/mail-handlers');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/', (req, res) => {
	res.render('home');
});
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
