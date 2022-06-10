const express = require('express');
const router = express.Router();
const catalog = require('../controllers/catalog');

const catchAsync = require('../utils/catchAsync');

const multer = require('multer');
const upload = multer({ dest: './public/imgs/catalog' });

router.get('/', catchAsync(catalog.index));
router.get('/new', catalog.renderNewForm);
router.post('/', upload.array('images'), catchAsync(catalog.createProduct));
router.get('/:id', catchAsync(catalog.showProduct));
router.get('/:id/edit', catchAsync(catalog.renderEditForm));
router.put('/:id', upload.array('images'), catchAsync(catalog.updateProduct));
router.delete('/:id', catchAsync(catalog.deleteProduct));

module.exports = router;
