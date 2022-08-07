const express = require('express');
const router = express.Router();
const action = require('../controllers/action');

const { fileFilter, storage } = require('../config/multer');
const multer = require('multer');
const upload = multer({ storage: storage('./public/imgs/action'), fileFilter });

const catchAsync = require('../utils/catchAsync');
const { validateAction, isLoggedIn, isAdmin } = require('../middleware');

router
	.route('/')
	.get(catchAsync(action.index))
	.post(isLoggedIn, isAdmin, upload.single('image'), validateAction, catchAsync(action.createAction));
router.route('/new').get(isLoggedIn, isAdmin, catchAsync(action.renderNewAction));
router
	.route('/:id')
	.put(isLoggedIn, isAdmin, upload.single('image'), validateAction, catchAsync(action.updateAction))
	.delete(isLoggedIn, isAdmin, catchAsync(action.deleteAction));
router.get('/:id/edit', isLoggedIn, isAdmin, catchAsync(action.renderEditAction));

module.exports = router;
