const User = require('../models/User');

const userController = {
    register: (req, res) => {
        const { fullName, username, email, password, userType } = req.body;

        User.register(fullName, username, email, password, userType)
            .then(() => {
                req.session.success = true; // Set a session variable for success
                res.redirect('/login'); // Redirect to login on success
            })
            .catch((error) => {
                console.error('Registration error:', error);
                res.render('register', { error: 'Registration failed. Please try again.', success: false });
            });
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            req.session.user = user; // Store user info in session
            req.session.success = true; // Set a session variable for successful login

            // Check userType to determine redirection
            if (user.userType === 'admin') {
                return res.redirect('/admin'); // Redirect to admin panel
            } else {
                return res.redirect('/'); // Redirect to the default page for regular users
            }
        } catch (error) {
            console.error(error);
            return res.render('login', { error: 'Invalid credentials', success: false });
        }
    },

    logout: (req, res) => {
        // Destroy the session and log out the user
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.redirect('/');
            }
            res.redirect('/login'); // Redirect to login after logout
        });
    }
};

module.exports = userController;
