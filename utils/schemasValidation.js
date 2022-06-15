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
