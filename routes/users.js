const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const { validateRegisterUser, validateUpdateUser, isLoggedIn } = require('../middleware');

router.get('/login', users.renderLogin);
router.post(
	'/login',
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login'
	}),
	users.login
);

router.post('/logout', users.logout);

router.get('/registration', users.renderRegistration);
router.post('/registration', validateRegisterUser, catchAsync(users.registration));

router.get('/profile', isLoggedIn, catchAsync(users.renderProfile));
router.put('/profile', isLoggedIn, validateUpdateUser, catchAsync(users.updateProfile));

router.get('/my-orders', isLoggedIn, catchAsync(users.renderOrders));

router.get('/my-orders/status', isLoggedIn, catchAsync(users.getStatusImages));

module.exports = router;
