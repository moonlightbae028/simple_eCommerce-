const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming you have a separate db module for database connections

// Route to get the order summary
router.get('/order/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    // Fetching order details
    db.query('SELECT * FROM orders WHERE id = ?', [orderId], (error, orderResults) => {
        if (error) {
            console.error('Error fetching order:', error);
            return res.status(500).send('Internal Server Error');
        }

        if (orderResults.length === 0) {
            return res.status(404).send('Order not found');
        }

        // Fetching order items
        db.query('SELECT * FROM order_items WHERE orderId = ?', [orderId], (error, itemsResults) => {
            if (error) {
                console.error('Error fetching order items:', error);
                return res.status(500).send('Internal Server Error');
            }

            // Render order summary view
            res.render('order_summary', {
                order: orderResults[0],
                orderItems: itemsResults,
            });
        });
    });
});

module.exports = router;
