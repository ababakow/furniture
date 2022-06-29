const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders');

const catchAsync = require('../utils/catchAsync');
const { validateOrder } = require('../middleware');

router.route('/').get(catchAsync(orders.index)).post(validateOrder, catchAsync(orders.createOrder));
router.route('/new').get(catchAsync(orders.renderNewOrder));
router
	.route('/:id')
	.get(catchAsync(orders.showOrder))
	.put(validateOrder, catchAsync(orders.updateOrder))
	.delete(catchAsync(orders.deleteOrder));
router.get('/:id/edit', catchAsync(orders.renderEditOrder));

module.exports = router;
