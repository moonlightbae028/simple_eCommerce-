const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const Product = require('../models/Product');

// Route to get all products
router.get('/', productController.getProducts);

// Route to get products by category
router.get('/category', productController.getProductsByCategory);

// Route to add a new product (assumed admin functionality)
router.post('/add', productController.addProduct);

// Route to get a specific product by ID (single product view)
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.getById(productId); // Use getById from the model

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Check if the user is logged in (req.user should be set by passport or authentication middleware)
        const user = req.user || null; 

        res.render('productDetails', { 
            product, 
            user // Pass product and user to the view
        }); 
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
