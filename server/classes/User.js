const jwt    = require('jsonwebtoken');
const config = require('../config');

class User {
    constructor() { }

    static createTempUser(userObj) {
        const user = {
            name: String(userObj.name),
            city: String(userObj.city),
            school: String(userObj.school),
            class: String(userObj.class),
            date: new Date()
        };
        const token = jwt.sign(user, config.tokenSecret);
        return token;
    }
}
module.exports = User;