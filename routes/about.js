const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('about',{ user: req.session.user }); // About page
});

module.exports = router;
