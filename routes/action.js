const express = require('express');
const router = express.Router();
const action = require('../controllers/action');

const { fileFilter, storage } = require('../config/multer');
const multer = require('multer');
const upload = multer({ storage: storage('./public/imgs/action'), fileFilter });

const catchAsync = require('../utils/catchAsync');
const { validateAction } = require('../middleware');

router
	.route('/')
	.get(catchAsync(action.index))
	.post(upload.single('image'), validateAction, catchAsync(action.createAction));
router.route('/new').get(catchAsync(action.renderNewAction));
router
	.route('/:id')
	.put(upload.single('image'), validateAction, catchAsync(action.updateAction))
	.delete(catchAsync(action.deleteAction));
router.get('/:id/edit', catchAsync(action.renderEditAction));

module.exports = router;
