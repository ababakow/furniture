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
	title: Joi.string().required().escapeHTML(),
	description: Joi.string().required().escapeHTML(),
	category: Joi.string().required().escapeHTML(),
	images: Joi.array().items(
		Joi.object({
			name: Joi.string().required().escapeHTML(),
			url: Joi.string().required().escapeHTML()
		}).required()
	),
	deleteImages: Joi.array()
});
