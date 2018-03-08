const jwt    = require('jsonwebtoken');
const config = require('../config');

class User {
    constructor() { }

    static createTempUser(userName) {
        return jwt.sign(userName, config.tokenSecret);
    }
}
module.exports = User;