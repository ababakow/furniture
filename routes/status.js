const express = require('express');
const router = express.Router({ mergeParams: true });
const status = require('../controllers/status');

const catchAsync = require('../utils/catchAsync');
const { validateStatus, isLoggedIn, isAdmin } = require('../middleware');

const { fileFilter, storageStatus } = require('../config/multer');
const multer = require('multer');
const upload = multer({ storage: storageStatus('./public/imgs/orders'), fileFilter });

router.route('/').post(isLoggedIn, isAdmin, upload.array('images'), validateStatus, catchAsync(status.createStatus));
router.route('/new').get(isLoggedIn, isAdmin, catchAsync(status.renderNewStatus));
router.route('/:statusId/edit').get(isLoggedIn, isAdmin, catchAsync(status.renderEditStatus));
router
	.route('/:statusId')
	.put(isLoggedIn, isAdmin, upload.array('images'), validateStatus, catchAsync(status.updateStatus))
	.delete(isLoggedIn, isAdmin, catchAsync(status.deleteStatus));

module.exports = router;
