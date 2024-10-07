const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct

// Login Route - GET request to show the login page
router.get('/', (req, res) => {
    res.render('login'); // Render the login view
});

// Handle login POST request
router.post('/', userController.login); // Process login and store user in session

// Logout Route
router.get('/logout', userController.logout); // Log out the user and destroy session

module.exports = router;
