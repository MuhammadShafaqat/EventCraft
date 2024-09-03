const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwtAuth = require('../middleware/auth');

// Register Route
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    userModel.registerUser(username, password, (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'User registration failed.', error: err.message });
        }
        res.status(201).send({ message: 'User registered successfully!' });
    });
});

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    userModel.authenticateUser(username, password, (err, user) => {
        if (err) {
            return res.status(401).send({ message: 'Authentication failed.', error: err.message });
        }

        const token = jwtAuth.generateToken(user);
        res.status(200).send({ auth: true, token });
    });
});

module.exports = router;
