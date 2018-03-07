const User = require('../classes/User');

module.exports.createTempUser = function(req, res) {
    const token = User.createTempUser(req.body.user);
    res.send(token);
};