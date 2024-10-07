const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if user is not logged in
    }

    // Assuming user info is stored in the session
    const userId = req.session.user.id; // Adjust this according to your session setup

    // Fetch user data from the database
    User.getById(userId) // Create this method in your User model
        .then(user => {
            res.render('user-profile', { user }); // Render user-profile.ejs with user data
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            res.redirect('/'); // Redirect to home on error
        });
});

module.exports = router;
