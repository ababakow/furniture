const express = require('express');
const router = express.Router({ mergeParams: true });
const status = require('../controllers/status');

const catchAsync = require('../utils/catchAsync');
const { validateStatus } = require('../middleware');

const { fileFilter, storageStatus } = require('../settings/multer');
const multer = require('multer');
const upload = multer({ storage: storageStatus('./public/imgs/orders'), fileFilter });

router.route('/').post(upload.array('images'), validateStatus, catchAsync(status.createStatus));
router.route('/new').get(catchAsync(status.renderNewStatus));
router.route('/:statusId/edit').get(catchAsync(status.renderEditStatus));
router
	.route('/:statusId')
	.put(upload.array('images'), validateStatus, catchAsync(status.updateStatus))
	.delete(catchAsync(status.deleteStatus));

module.exports = router;
