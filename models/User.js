const db = require('../db'); // Ensure you have your database connection

const User = {
    register: (fullName, username, email, password, userType) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (fullName, username, email, password, userType) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [fullName, username, email, password, userType], (error, results) => {
                if (error) {
                    return reject(error); // Reject the promise on error
                }
                resolve(results); // Resolve the promise on success
            });
        });
    },

    login: (email, password) => {
        return new Promise((resolve, reject) => {
            // Log the attempted login for debugging
            console.log('Attempting to log in with:', email, password);
            
            const query = 'SELECT * FROM users WHERE email = ? AND password = ?'; // Use a hashed password in production
            db.query(query, [email, password], (error, results) => {
                if (error) {
                    return reject(error); // Reject the promise on error
                }
                if (results.length > 0) {
                    console.log('Login successful:', results[0]); // Log successful login
                    resolve(results[0]); // Resolve with user data
                } else {
                    console.error('Invalid credentials'); // Log invalid credentials
                    reject(new Error('Invalid credentials')); // Reject if no user found
                }
            });
        });
    },

    update: (id, { fullName, username, email, userType }) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET fullName = ?, username = ?, email = ?, userType = ? WHERE id = ?';
            db.query(query, [fullName, username, email, userType, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.affectedRows > 0) {
                    resolve(results);
                } else {
                    reject(new Error('User not found or no changes made'));
                }
            });
        });
    },
    
    getById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?'; // Adjust 'id' as needed
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error); // Reject the promise on error
                }
                if (results.length > 0) {
                    resolve(results[0]); // Resolve with user data
                } else {
                    reject(new Error('User not found')); // Reject if no user found
                }
            });
        });
    },
};

module.exports = User;
