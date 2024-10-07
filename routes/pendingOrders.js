const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to get pending orders
router.get('/', orderController.getPendingOrders);

// Route to approve an order
router.post('/approve/:id', orderController.approveOrder);

// Route to reject an order
router.post('/reject/:id', orderController.rejectOrder);

module.exports = router;
