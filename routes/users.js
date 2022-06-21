const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const { validateUser, isLoggedIn } = require('../middleware');

router.get('/login', (req, res) => {
	res.render('user/login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login'
	}),
	(req, res) => {
		// req.flash('success', 'Вітаємо!');
		res.redirect('/');
	}
);

router.post('/logout', (req, res, next) => {
	req.logout(function(err) {
		if (err) {
			return next(err);
		}
		// req.flash('success', 'До нової зустрічі!');
		res.redirect('/');
	});
});

router.get('/registration', (req, res) => {
	res.render('user/registration');
});

router.post('/registration', validateUser, async (req, res, next) => {
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
});

router.get('/profile', isLoggedIn, (req, res) => {
	res.render('user/profile', { user: req.user });
});

router.put('/profile', isLoggedIn, async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
	if (req.body.password) {
		await user.setPassword(req.body.password);
	}
	await user.save();
	req.flash('success', 'Профіль успішно оновлено!');
	res.redirect('/profile');
});

module.exports = router;
