const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer'); // Import multer for handling file uploads

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/')); // Destination directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});

const upload = multer({ storage: storage });

// Handle product addition
router.post('/admin/add-product', upload.single('picture'), (req, res) => {
    const { name, price, description, stock } = req.body; // Extract stock here

    // File upload details
    const pictureName = req.file ? req.file.filename : null;

    console.log('Product Details:', { name, price, description, pictureName, stock }); // Debugging statement

    // Save product details in the database
    const sql = 'INSERT INTO products (name, price, description, picture, stock) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, price, description, pictureName, stock], (error, results) => {
        if (error) {
            console.error('Error saving product details:', error); // Log the error for debugging
            return res.status(500).send('Error saving product details');
        }
        res.redirect('/admin'); // Redirect after successful upload
    });
});

module.exports = router;
