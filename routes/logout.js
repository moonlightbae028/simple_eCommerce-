const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.redirect('/'); // Redirect to home in case of an error
        }
        res.redirect('/'); // Redirect to home after successful logout
    });
});

module.exports = router;
