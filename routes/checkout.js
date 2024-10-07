const express = require('express');
const router = express.Router();
const db = require('../db'); // MySQL connection

// Checkout page (GET route to show the form)
router.get('/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    // Fetch the order to display details
    db.query('SELECT * FROM orders WHERE id = ? AND status = "approved"', [orderId], (error, orderResults) => {
        if (error) {
            console.error('Error fetching order:', error);
            return res.status(500).send('Internal Server Error');
        }

        if (orderResults.length === 0) {
            return res.status(404).send('Order not found or not approved.');
        }

        res.render('checkout', {
            orderId: orderId,
            totalAmount: orderResults[0].total,
        });
    });
});

// Handle checkout form submission (POST route to save data)
router.post('/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const { shippingAddress, paymentMethod } = req.body;

    // Step 1: Fetch the order items
    db.query('SELECT product_id, quantity FROM order_items WHERE order_id = ?', [orderId], (error, orderItems) => {
        if (error) {
            console.error('Error fetching order items:', error);
            return res.status(500).send('Internal Server Error');
        }

        // Step 2: Update the order with the shipping and payment details
        db.query(
            'UPDATE orders SET shipping_address = ?, payment_method = ?, payment_status = "pending" WHERE id = ?',
            [shippingAddress, paymentMethod, orderId],
            (error, results) => {
                if (error) {
                    console.error('Error updating order:', error);
                    return res.status(500).send('Internal Server Error');
                }

                // Step 3: Update stock for each product in the order
                const stockUpdates = orderItems.map(item => {
                    return new Promise((resolve, reject) => {
                        db.query(
                            'UPDATE products SET stock = stock - ? WHERE id = ?',
                            [item.quantity, item.product_id],
                            (error) => {
                                if (error) {
                                    console.error('Error updating stock:', error);
                                    return reject(error);
                                }
                                resolve();
                            }
                        );
                    });
                });

                // Execute all stock updates
                Promise.all(stockUpdates)
                    .then(() => {
                        // Redirect to a payment page or order summary
                        res.redirect(`/orders/${orderId}/summary`);
                    })
                    .catch(err => {
                        console.error('Error during stock update:', err);
                        res.status(500).send('Internal Server Error');
                    });
            }
        );
    });
});

module.exports = router;
