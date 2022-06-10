const express = require('express');
const router = express.Router();
const catalog = require('../controllers/catalog');

const catchAsync = require('../utils/catchAsync');

const multer = require('multer');
const upload = multer({ dest: './public/imgs/catalog' });

router.route('/').get(catchAsync(catalog.index)).post(upload.array('images'), catchAsync(catalog.createProduct));

router.route('/new').get(catalog.renderNewForm);

router
	.route('/:id')
	.get(catchAsync(catalog.showProduct))
	.put(upload.array('images'), catchAsync(catalog.updateProduct))
	.delete(catchAsync(catalog.deleteProduct));

router.get('/:id/edit', catchAsync(catalog.renderEditForm));

module.exports = router;
