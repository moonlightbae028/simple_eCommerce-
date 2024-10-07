const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',        // or your database host
    user: 'root',             // your MySQL username
    password: '',             // your MySQL password
    database: 'ecommerce1'     // your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

module.exports = connection;
