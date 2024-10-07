// middleware/authMiddleware.js
function isAuthenticated(req, res, next) {
    // Check if the session has a user object and if the user has a userId
    if (req.session.user && req.session.user.userId) {
        return next(); // User is authenticated
    }
    res.redirect('/login'); // Redirect to login if not authenticated
}

module.exports = isAuthenticated;
