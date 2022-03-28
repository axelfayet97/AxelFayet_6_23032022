const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretToken = process.env.ACCESS_TOKEN_SECRET;

// Middleware d'authentification
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretToken);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error || 'Requête non authentifiée !' });
    };
};