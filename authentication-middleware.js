const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = 'Keep it a secret.';

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ you: 'cannont pass' }) 
            } else {
                req.decodedToken = decodedToken;
                next();
            }      
        });
    } else {
        res.status(401).json({ you: 'cannont pass' });
    }
}