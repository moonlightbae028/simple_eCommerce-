const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Correctly import the User model

// GET request to load edit profile page
router.get('/', (req, res) => {
    const userId = req.query.id; // Get user ID from query parameters

    // Check if userId is provided; if not, redirect to login
    if (!userId) {
        return res.redirect('/login');
    }

    // Fetch user data from the database
    User.getById(userId)
        .then(user => {
            res.render('edit-profile', { user: user, error: null });
        })
        .catch(error => {
            res.render('edit-profile', { error: 'Failed to load user data', user: {} });
        });
});

// POST request to update profile
router.post('/', (req, res) => {
    const { fullName, username, email, userType } = req.body;
    const userId = req.query.id; // Get user ID from query parameters
    
    console.log("User ID:", userId); // Log the userId

    if (!userId) {
        return res.redirect('/login');
    }

    // Update user profile in the database
    User.update(userId, { fullName, username, email, userType })
        .then(() => {
            res.redirect('/profile');
        })
        .catch(error => {
            console.error("Update error:", error); // Log the error
            res.render('edit-profile', { error: 'Failed to update profile', user: req.body });
        });
});


module.exports = router;
