const express = require('express');
const router = express.Router();
const shop = require('../controllers/shop');

const catchAsync = require('../utils/catchAsync');
const { validateShopItem } = require('../middleware');

const multer = require('multer');
const upload = multer({ dest: './public/imgs/shop' });

router
	.route('/')
	.get(catchAsync(shop.index))
	.post(upload.array('images'), validateShopItem, catchAsync(shop.createShopItem));

router.route('/new').get(shop.renderNewForm);

router
	.route('/:id')
	.get(catchAsync(shop.showShopItem))
	.put(upload.array('images'), validateShopItem, catchAsync(shop.updateShopItem))
	.delete(catchAsync(shop.deleteShopItem));

router.get('/:id/edit', catchAsync(shop.renderEditForm));

module.exports = router;
