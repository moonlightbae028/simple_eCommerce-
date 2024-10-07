const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Add fs module
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir); // Create the directory if it does not exist
}

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Use the uploads directory path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
    }
});

const upload = multer({ storage });

// Route to render admin panel
router.get('/', (req, res) => {
    // Add your logic to check if the user is an admin
    res.render('admin'); // Render the admin.ejs
});

// Route to add a product
router.post('/add-product', upload.single('picture'), (req, res) => {
    const { name, price, description, stock } = req.body; // Make sure to include stock

    // Check for required fields
    if (!name || !price || !description || !req.file) {
        return res.status(400).send('All fields are required'); // Validate inputs
    }

    const picturePath = req.file.path; // Path to the uploaded picture

    // Call the product controller's addProduct function
    productController.addProduct({ name, price, description, picturePath, stock }, (err, result) => {
        if (err) {
            console.error('Error adding product:', err); // Log error for debugging
            return res.status(500).send('Error adding product');
        }
        res.redirect('/admin'); // Redirect after adding the product
    });
});

// Route to view pending orders
router.get('/pending-orders', (req, res) => {
    orderController.getPendingOrders((err, orders) => {
        if (err) {
            console.error('Error fetching orders:', err); // Log error for debugging
            return res.status(500).send('Error fetching orders');
        }
        res.render('pending-orders', { orders }); // Render a view to show pending orders
    });
});

// Export the router
module.exports = router;
