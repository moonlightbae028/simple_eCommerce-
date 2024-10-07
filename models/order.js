// models/Order.js
const db = require('../db'); // Adjust the path to your db connection

const Order = {
    // Get all orders
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, userId, status, total, createdAt FROM orders', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results); // Return the results (list of orders)
            });
        });
    },

    // Get order by ID
    getById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, userId, status, total, createdAt FROM orders WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                // Check if an order was found
                if (results.length > 0) {
                    resolve(results[0]); // Return the first result (the order with the matching ID)
                } else {
                    resolve(null); // Return null if no order is found
                }
            });
        });
    },

    // Add a new order
    add: (orderData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO orders (userId, status, total) VALUES (?, ?, ?)';
            const { userId, status, total } = orderData;
            db.query(query, [userId, status, total], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId); // Return the ID of the newly inserted order
            });
        });
    },

    // Update an existing order
    update: (id, orderData) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE orders SET userId = ?, status = ?, total = ? WHERE id = ?';
            const { userId, status, total } = orderData;
            db.query(query, [userId, status, total, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows); // Return the number of affected rows
            });
        });
    },

    // Delete an order
    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM orders WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows); // Return the number of affected rows
            });
        });
    }
};

module.exports = Order;
