const db = require('../config/db');
const bcrypt = require('bcrypt');

// Register User
exports.registerUser = (username, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash password
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], callback);
};

// Authenticate User
exports.authenticateUser = (username, password, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) {
            return callback(err || new Error('User not found.'));
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (isPasswordValid) {
            callback(null, user);
        } else {
            callback(new Error('Invalid credentials.'));
        }
    });
};
