const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Ensure you import your Product model

// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // User is logged in, proceed to the next middleware/route
    }
    res.redirect('/login'); // If not logged in, redirect to the login page
}

// Route to get a specific product by ID (single product view)
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        res.set('Cache-Control', 'no-store'); // Prevent caching
        
        const productId = req.params.id;
        const product = await Product.getById(productId); // Assuming Product model has a getById method

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const user = req.session.user; // Get user info from session

        // Render the product details view with the product and user data
        res.render('productDetails', { 
            product, 
            user 
        });
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
