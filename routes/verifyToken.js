const jwt = require('jsonwebtoken');

// Creo un middleware per verificare il token di auth
module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Accesso fallito. Token non valido');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).send('Invalid token');
    }
}