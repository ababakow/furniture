const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders');

const catchAsync = require('../utils/catchAsync');
const { validateOrder, isLoggedIn, isAdmin } = require('../middleware');

router.route('/')
	.get(isLoggedIn, isAdmin, catchAsync(orders.index))
	.post(isLoggedIn, isAdmin, validateOrder, catchAsync(orders.createOrder));
router.route('/new').get(isLoggedIn, isAdmin, catchAsync(orders.renderNewOrder));
router
	.route('/:id')
	.get(isLoggedIn, isAdmin, catchAsync(orders.showOrder))
	.put(isLoggedIn, isAdmin, validateOrder, catchAsync(orders.updateOrder))
	.delete(isLoggedIn, isAdmin, catchAsync(orders.deleteOrder));
router.get('/:id/edit', isLoggedIn, isAdmin, catchAsync(orders.renderEditOrder));

module.exports = router;
