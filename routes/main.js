const express = require('express');
const router = express.Router();
const mailer = require('../nodemailer/nodemailer');
const catchAsync = require('../utils/catchAsync');

router.get('/', (req, res) => {
	res.render('home');
});
router.get('/contacts', (req, res) => {
	res.render('contacts');
});
router.post(
	'/contacts',
	catchAsync(async (req, res) => {
		await mailer.mailer(req.body);
		res.render('contacts');
	})
);

module.exports = router;
