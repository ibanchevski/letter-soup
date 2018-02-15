const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.validate = function(req, res) {
    const token = req.get('x-access-token');
    let validToken;

    jwt.verify(token, config.tokenSecret, function(error) {
        if (error) {
            validToken = false;
        } else {
            validToken = true;
        }
        res.send(validToken);
    });
};