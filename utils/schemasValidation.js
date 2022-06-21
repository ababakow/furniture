const baseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
	type: 'string',
	base: joi.string(),
	messages: {
		'string.escapeHTML': '{{#label}} не може включати HTML!'
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {}
				});
				if (clean !== value) return helpers.error('string.escapeHTML', { value });
				return clean;
			}
		}
	}
});

const Joi = baseJoi.extend(extension);

module.exports.catalogSchema = Joi.object({
	title: Joi.string().required().max(250).escapeHTML(),
	description: Joi.string().required().max(10000).escapeHTML(),
	category: Joi.string().required().escapeHTML(),
	images: Joi.array().max(10).items(
		Joi.object({
			name: Joi.string().required().escapeHTML(),
			url: Joi.string().required().escapeHTML()
		}).required()
	),
	deleteImages: Joi.array()
});

module.exports.shopSchema = Joi.object({
	title: Joi.string().required().max(250).escapeHTML(),
	description: Joi.string().required().max(10000).escapeHTML(),
	price: Joi.number().required().min(0).max(1000000),
	inStock: Joi.boolean().required(),
	images: Joi.array().max(10).items(
		Joi.object({
			name: Joi.string().required().escapeHTML(),
			url: Joi.string().required().escapeHTML()
		}).required()
	),
	deleteImages: Joi.array()
});

module.exports.userSchema = Joi.object({
	username: Joi.string().alphanum().required().min(3).max(250).escapeHTML(),
	password: Joi.string().required().min(6).max(250).escapeHTML(),
	email: Joi.string().email().required().max(250).escapeHTML(),
	f_name: Joi.string().empty('').max(50).escapeHTML(),
	l_name: Joi.string().empty('').max(50).escapeHTML(),
	// phone: Joi.number().integer().positive().min(100000000).max(999999999),
	phone: Joi.string().empty('').min(9).max(20).escapeHTML(),
	adress: Joi.object({
		city: Joi.string().empty('').max(50).escapeHTML(),
		street: Joi.string().empty('').max(50).escapeHTML(),
		house: Joi.string().empty('').max(10).escapeHTML(),
		apt: Joi.string().empty('').max(10).escapeHTML()
	})
});
