const Action = require('../models/action');

const { unlink } = require('fs/promises');
const { normaliseImage } = require('../utils/sharp');

module.exports.index = async (req, res) => {
	const actions = await Action.find();
	const sortedActions = [].concat(
		actions.filter((item) => item.isActive === true),
		actions.filter((item) => item.isActive === false)
	);
	res.render('actions', { actions: sortedActions });
};

module.exports.renderNewAction = async (req, res) => {
	res.render('actions/new');
};

module.exports.createAction = async (req, res) => {
	const action = new Action(req.body);
	const image = { name: req.file.filename, url: `/imgs/action/${req.file.filename}` };
	await normaliseImage(`public${image.url}`, image.name, { hd: true });
	action.image = image;
	await action.save();
	req.flash('success', `Акцію успішно додано!`);
	res.redirect(`/actions`);
};

module.exports.renderEditAction = async (req, res) => {
	const { id } = req.params;
	const action = await Action.findById(id);
	if (!action) {
		req.flash('error', `Нажаль, акцію не знайдено`);
		return res.redirect('/actions');
	}
	res.render('actions/edit', { action });
};

module.exports.updateAction = async (req, res) => {
	const { id } = req.params;
	const action = await Action.findByIdAndUpdate(id, req.body, { new: true });
	if (req.file) {
		if (action.image) {
			await unlink(`./public/imgs/action/${action.image.name}`);
			await unlink(`./public/imgs/action/hd/${action.image.name}`);
		}
		const image = { name: req.file.filename, url: `/imgs/action/${req.file.filename}` };
		await normaliseImage(`public${image.url}`, image.name, { hd: true });
		action.image = image;
	}
	await action.save();
	req.flash('success', `Акцію успішно оновлено!`);
	res.redirect(`/actions`);
};

module.exports.deleteAction = async (req, res) => {
	const { id } = req.params;
	const deletedAction = await Action.findByIdAndDelete(id);
	if (deletedAction.image) {
		await unlink(`./public/imgs/action/${deletedAction.image.name}`);
		await unlink(`./public/imgs/action/hd/${deletedAction.image.name}`);
	}
	req.flash('success', `Акцію успішно видалено!`);
	res.redirect('/actions');
};
