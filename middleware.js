const { catalogSchema, shopSchema, userSchema } = require('./utils/schemasValidation');
const AppError = require('./utils/appError');

module.exports.validateProduct = (req, res, next) => {
	const { error } = catalogSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateShopItem = (req, res, next) => {
	const { error } = shopSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		// throw error;
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		// req.session.returnTo = req.originalUrl;
		req.flash('error', 'Будь ласка, увійти у свій аккаунт.');
		return res.redirect('/login');
	}
	next();
};
