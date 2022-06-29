const {
	catalogSchema,
	shopSchema,
	userRegisterSchema,
	userUpdateSchema,
	orderSchema,
	statusSchema
} = require('./utils/schemasValidation');
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

module.exports.validateRegisterUser = (req, res, next) => {
	const { error } = userRegisterSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateUpdateUser = (req, res, next) => {
	const { error } = userUpdateSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateOrder = (req, res, next) => {
	const { error } = orderSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateStatus = (req, res, next) => {
	const { error } = statusSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'Будь ласка, увійти у свій аккаунт.');
		return res.redirect('/login');
	}
	next();
};
