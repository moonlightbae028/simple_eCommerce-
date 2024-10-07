const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your DB connection

// Route to render the cart page
router.get('/', (req, res) => {
    const cart = req.session.cart || [];
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    // Render the cart page with cart items and user session
    res.render('cart', { cartItems: cart, totalAmount, user: req.session.user });
});

// Add item to the cart
// Add item to the cart
router.post('/add', async (req, res) => {
    const { productId } = req.body;

    try {
        console.log('Adding product ID:', productId); // Debugging log

        const product = await getProductById(productId); // Fetch from DB
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Initialize cart in session if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = []; // Initialize cart
        }

        // Check if the product is already in the cart
        const existingItem = req.session.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity
        } else {
            req.session.cart.push({ ...product, quantity: 1 }); // Add new product
        }

        console.log('Cart after addition:', req.session.cart); // Log the cart for debugging
        res.redirect('/cart'); // Redirect to cart after adding
    } catch (error) {
        console.error('Error occurred in /cart/add:', error); // Log the error
        res.status(500).send('Internal Server Error');
    }
});



// Remove item from the cart
router.post('/remove', (req, res) => {
    const { productId } = req.body;

    try {
        if (!req.session.cart) {
            return res.status(400).send('Cart is empty');
        }

        // Filter out the item to be removed
        req.session.cart = req.session.cart.filter(item => item.id !== productId);

        console.log('Cart after removal:', req.session.cart); // Log the cart for debugging
        res.redirect('/cart'); // Redirect to cart after removing
    } catch (error) {
        console.error('Error occurred in /cart/remove:', error); // Log the error
        res.status(500).send('Internal Server Error');
    }
});


async function getProductById(productId) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        console.log('Database query result:', result); // Log the raw result for debugging

        // Ensure result is in the expected format
        if (!Array.isArray(result) || result.length === 0) {
            console.log(`No product found for ID: ${productId}`); // Log if no product is found
            return null; // Return null if no product found
        }

        return result[0]; // Return the first product found
    } catch (error) {
        console.error('Database query error:', error); // Log any errors from the query
        return null; // Return null on error
    }
}

module.exports = router; // Ensure you're exporting the router instance
