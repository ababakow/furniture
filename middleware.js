const { catalogSchema, shopSchema } = require('./utils/schemasValidation');
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
