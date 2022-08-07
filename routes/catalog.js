const express = require('express');
const router = express.Router();
const catalog = require('../controllers/catalog');

const catchAsync = require('../utils/catchAsync');
const { validateProduct, isLoggedIn, isAdmin } = require('../middleware');

const { fileFilter, storage } = require('../config/multer');
const multer = require('multer');
const upload = multer({ storage: storage('./public/imgs/catalog'), fileFilter });

router
	.route('/')
	.get(catchAsync(catalog.index))
	.post(isLoggedIn, isAdmin, upload.array('images'), validateProduct, catchAsync(catalog.createProduct));

router.route('/new').get(isLoggedIn, isAdmin, catalog.renderNewForm);

router
	.route('/:id')
	.get(catchAsync(catalog.showProduct))
	.put(isLoggedIn, isAdmin, upload.array('images'), validateProduct, catchAsync(catalog.updateProduct))
	.delete(isLoggedIn, isAdmin, catchAsync(catalog.deleteProduct));

router.get('/:id/edit', isLoggedIn, isAdmin, catchAsync(catalog.renderEditForm));

module.exports = router;
