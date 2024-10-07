const db = require('../db'); // Adjust the path to your db connection

const Product = {
    // Get all products
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, name, price, description, picture, stock, category FROM products', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results); // Return the results (list of products)
            });
        });
    },

    // Get products by category
    getByCategory: (category) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, name, price, description, picture, stock FROM products WHERE category = ?';
            db.query(query, [category], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results); // Return the results for the specific category
            });
        });
    },

    // Get a product by ID
    getById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, name, price, description, picture, stock, category FROM products WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                // Check if a product was found
                if (results.length > 0) {
                    resolve(results[0]); // Return the first result (the product with the matching ID)
                } else {
                    resolve(null); // Return null if no product is found
                }
            });
        });
    },

    // Add a new product
    add: (productData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO products (name, price, description, picture, stock, category) VALUES (?, ?, ?, ?, ?, ?)';
            const { name, price, description, picture, stock, category } = productData;
            db.query(query, [name, price, description, picture, stock, category], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId); // Return the ID of the newly inserted product
            });
        });
    }
};

module.exports = Product;
