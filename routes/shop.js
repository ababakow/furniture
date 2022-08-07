const express = require('express');
const router = express.Router();
const shop = require('../controllers/shop');

const catchAsync = require('../utils/catchAsync');
const { validateShopItem, isLoggedIn, isAdmin } = require('../middleware');

const { fileFilter, storage } = require('../config/multer');
const multer = require('multer');
const upload = multer({ storage: storage('./public/imgs/shop'), fileFilter });

router
	.route('/')
	.get(catchAsync(shop.index))
	.post(isLoggedIn, isAdmin, upload.array('images'), validateShopItem, catchAsync(shop.createShopItem));

router.route('/new').get(isLoggedIn, isAdmin, shop.renderNewForm);

router
	.route('/:id')
	.get(catchAsync(shop.showShopItem))
	.put(isLoggedIn, isAdmin, upload.array('images'), validateShopItem, catchAsync(shop.updateShopItem))
	.delete(isLoggedIn, isAdmin, catchAsync(shop.deleteShopItem));

router.get('/:id/edit', isLoggedIn, isAdmin, catchAsync(shop.renderEditForm));

module.exports = router;
