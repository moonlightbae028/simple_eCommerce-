const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('contact', { user: req.session.user }); // Contact page
});

module.exports = router;
