const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); // MySQL session store
const db = require('./db'); // MySQL connection
const path = require('path'); // For resolving paths
const pendingOrdersRoutes = require('./routes/pendingOrders'); // Pending orders routes
const productDetailsRoute = require('./routes/productDetails');

const app = express();

// MySQL session store options
const sessionStore = new MySQLStore({
    expiration: 10800000,   // 3 hours expiration
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, db);


const orderRoutes = require('./routes/orders');
app.use('/orders', orderRoutes);  // Assuming your order routes are in 'orders.js'

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set 'views' folder path

// Middleware for parsing form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from 'public' and 'uploads' directories
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',  // Use environment variable for better security
    resave: false, // Avoid resaving session if unmodified
    saveUninitialized: false, // Don't save uninitialized sessions
    store: sessionStore, // MySQL session store
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
        maxAge: 3600000 // 1 hour session expiration
    }
}));

// Make user session available in all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders')); // Orders route
app.use('/cart', require('./routes/cart'));
app.use('/checkout', require('./routes/checkout')); // Checkout route
app.use('/about', require('./routes/about'));
app.use('/contact', require('./routes/contact'));
app.use('/profile', require('./routes/profile'));
app.use('/admin', require('./routes/admin'));
app.use('/login', require('./routes/login')); // Login route
app.use('/register', require('./routes/register')); // Registration route
app.use('/logout', require('./routes/logout')); // Logout route
app.use('/edit-profile', require('./routes/editProfile'));
app.use('/pending-orders', pendingOrdersRoutes); // Pending orders route
app.use('/productDetails', productDetailsRoute);

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Central error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
