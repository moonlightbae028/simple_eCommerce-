const db = require('../db'); // MySQL connection

// Function to get pending orders
exports.getPendingOrders = (req, res) => {
    const query = `
        SELECT o.id AS order_id, u.username, o.total, o.createdAt 
        FROM orders o 
        JOIN users u ON o.userId = u.id 
        WHERE o.status = "pending"`;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching pending orders:', error);
            return res.status(500).render('500'); // Render the 500 error page
        }
        res.render('pendingOrders', { orders: results }); // Pass the fetched orders to the view
    });
};

// Function to approve an order
exports.approveOrder = (req, res) => {
    const orderId = req.params.id;
    db.query('UPDATE orders SET status = "approved" WHERE id = ?', [orderId], (error) => {
        if (error) {
            console.error('Error approving order:', error);
            return res.status(500).render('500');
        }
        res.redirect('/pending-orders'); // Redirect to the pending orders page
    });
};

// Function to reject an order
exports.rejectOrder = (req, res) => {
    const orderId = req.params.id;
    db.query('UPDATE orders SET status = "rejected" WHERE id = ?', [orderId], (error) => {
        if (error) {
            console.error('Error rejecting order:', error);
            return res.status(500).render('500');
        }
        res.redirect('/pending-orders'); // Redirect to the pending orders page
    });
};
