const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET request for registration
router.get('/', (req, res) => {
    res.render('register', { error: null }); // Render the registration form
});

// POST request for registration
router.post('/', userController.register); // Call the register method

module.exports = router;
