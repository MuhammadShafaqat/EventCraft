const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

// Function to generate a token
const generateToken = (user) => {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 8640000 }); // 24 hours
};

// Export the verifyToken and generateToken functions
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.id;
        next();
    });
};

// Export the generateToken function
exports.generateToken = generateToken;
