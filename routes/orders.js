const express = require('express');
const router = express.Router();
const db = require('../db'); // Your MySQL connection
const isAuthenticated = require('../middleware/authMiddleware');  // Import the middleware

// Get all orders for the logged-in user
router.get('/', isAuthenticated, (req, res) => {
    const userId = req.session.user?.id;

    if (!userId) {
        return res.status(401).send('Unauthorized: No user session found.');
    }

    db.query('SELECT * FROM orders WHERE userId = ?', [userId], (error, orders) => {
        if (error) {
            console.error('Error fetching orders:', error);
            return res.status(500).send('Internal Server Error');
        }

        res.render('orders', { orders });
    });
});


// Place an order (POST route)
router.post('/', isAuthenticated, async (req, res) => {  // Apply isAuthenticated middleware
    const { cartItems, totalAmount } = req.body;
    const userId = req.session.user?.id;

    try {
        const order = {
            userId,
            total: totalAmount,
            status: 'Pending',
            createdAt: new Date()
        };

        const result = await new Promise((resolve, reject) => {
            db.query('INSERT INTO orders SET ?', order, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        req.session.cart = []; // Clear cart after placing the order

        res.redirect('/orders'); // Redirect to orders page
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Order summary route
router.get('/:orderId/summary', isAuthenticated, (req, res) => {  // Apply isAuthenticated middleware
    const orderId = req.params.orderId;

    db.query('SELECT * FROM orders WHERE id = ?', [orderId], (error, orderResults) => {
        if (error || orderResults.length === 0) {
            return res.status(404).send('Order not found.');
        }

        db.query('SELECT * FROM order_items WHERE orderId = ?', [orderId], (error, itemsResults) => {
            if (error) {
                return res.status(500).send('Internal Server Error');
            }

            res.render('order_summary', {
                order: orderResults[0],
                orderItems: itemsResults,
            });
        });
    });
});

module.exports = router;
